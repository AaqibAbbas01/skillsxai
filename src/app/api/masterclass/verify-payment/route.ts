import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { generateCertHTML, generateEmailHTML } from '@/lib/certificate'
import { saveCertToNeon } from '@/lib/neon'

const RESEND_API_KEY = process.env.RESEND_API_KEY

const BASE_RESOURCES = [
  { filename: 'Claude-AI-Cheat-Sheet.html', srcFile: 'claude-ai-cheatsheet.html', contentType: 'text/html' },
  { filename: 'Free-AI-APIs-NVIDIA-Guide.html', srcFile: 'free-ai-apis-guide.html', contentType: 'text/html' },
  { filename: 'AI-Career-Roadmap-2026.html', srcFile: 'ai-career-roadmap-2026.html', contentType: 'text/html' },
] as const

const ULTIMATE_RESOURCE = { filename: 'AI-Agent-Masterclass-Sheet.csv', srcFile: 'Ai Agent Masterclass Sheet - Sheet1.csv', contentType: 'text/csv' } as const

const PLAN_AMOUNTS: Record<string, number> = { pro: 199, ultimate: 299 }

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

const MC_SKILLS = ['Artificial Intelligence', 'Prompt Engineering', 'AI Agents & Automation', 'AI Tools & APIs']

async function sendCertificateEmail(name: string, email: string, plan: string) {
  if (!RESEND_API_KEY || !name || !email) return
  const { Resend } = await import('resend')
  const resend = new Resend(RESEND_API_KEY)

  const saved = await saveCertToNeon(name, email, 'ai-masterclass', MC_SKILLS)
  const certId = saved?.certId || `SKX-MC-${Date.now().toString(36).toUpperCase()}`
  const dateStr = saved?.issuedAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const certUrl = saved?.certUrl || `https://skillsxai.com/certificatedownload/${certId}`

  const isUltimate = plan === 'ultimate'
  const certHtml = generateCertHTML(name, certId, dateStr)
  const emailHtml = generateEmailHTML(name, certId, dateStr, certUrl)

  const resourceList = isUltimate ? [...BASE_RESOURCES, ULTIMATE_RESOURCE] : [...BASE_RESOURCES]
  const downloadsDir = join(process.cwd(), 'public', 'downloads')
  const resourceAttachments: { filename: string; content: Buffer; contentType: string }[] = []
  for (const res of resourceList) {
    try {
      const content = await readFile(join(downloadsDir, res.srcFile))
      resourceAttachments.push({ filename: res.filename, content, contentType: res.contentType })
    } catch {
      // Skip files that can't be read
    }
  }

  const planLabel = isUltimate ? 'Ultimate Package' : 'Pro Package'
  await resend.emails.send({
    from: 'SkillsXAI <certificates@team.skillsxai.com>',
    to: email,
    subject: `Your AI Masterclass ${planLabel} — Certificate + Resources | ${name}`,
    html: emailHtml,
    attachments: [
      { filename: `SkillsXAI-Certificate-${name.replace(/\s+/g, '-')}.html`, content: Buffer.from(certHtml, 'utf-8'), contentType: 'text/html' },
      ...resourceAttachments,
    ],
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, utr, name, email, phone, plan } = body

    if (!orderId || typeof orderId !== 'string') {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 })
    }
    if (!utr || typeof utr !== 'string') {
      return NextResponse.json({ error: 'UPI Reference ID is required' }, { status: 400 })
    }

    const sanitizedUtr = utr.replace(/\s/g, '')
    if (!/^\d{12}$/.test(sanitizedUtr)) {
      return NextResponse.json({ error: 'Invalid UPI Reference ID' }, { status: 400 })
    }

    const selectedPlan = plan === 'ultimate' ? 'ultimate' : 'pro'
    const amount = PLAN_AMOUNTS[selectedPlan]

    const supabase = getSupabaseClient()

    if (supabase) {
      const { data: existing } = await supabase
        .from('masterclass_payments')
        .select('id')
        .eq('utr', sanitizedUtr)
        .maybeSingle()

      if (existing) {
        return NextResponse.json({
          success: false,
          verified: false,
          status: 'DUPLICATE_UTR',
          message: 'This UPI Reference ID has already been submitted. If you believe this is an error, please contact support.',
        })
      }

      await supabase.from('masterclass_payments').insert({
        name: name || '',
        email: email || '',
        phone: phone || '',
        utr: sanitizedUtr,
        amount,
        order_id: orderId,
        plan: selectedPlan,
        paytm_status: 'PENDING_MANUAL',
        paytm_result_msg: `UPI payment (${selectedPlan} plan) — awaiting manual verification`,
        verified: false,
      })
    }

    await saveCertToNeon(name || '', email || '', 'ai-masterclass', MC_SKILLS)

    sendCertificateEmail(name || '', email || '', selectedPlan).catch(() => {})

    const planLabel = selectedPlan === 'ultimate' ? 'Ultimate' : 'Pro'
    return NextResponse.json({
      success: true,
      verified: false,
      status: 'PENDING_MANUAL',
      message: `Payment recorded! Your certificate and ${planLabel} resources have been sent to your email. Our team will verify the payment within 24 hours.`,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
