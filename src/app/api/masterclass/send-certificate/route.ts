import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { generateCertHTML, generateEmailHTML } from '@/lib/certificate'

const resendKey = process.env.RESEND_API_KEY

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

async function getOrCreateCert(name: string, email: string) {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data: existing } = await supabase
    .from('masterclass_certificates')
    .select('id, issued_at')
    .eq('email', email)
    .limit(1)
    .single()

  if (existing) return { certId: existing.id as string, issuedAt: existing.issued_at as string }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const ts = Date.now().toString(36)
  let id = ts
  for (let i = 0; i < 30 - ts.length; i++) id += chars.charAt(Math.floor(Math.random() * chars.length))
  const issuedAt = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  await supabase.from('masterclass_certificates').insert({
    id,
    name,
    email,
    issued_at: issuedAt,
    skills: ['Artificial Intelligence', 'Prompt Engineering', 'AI Agents & Automation', 'AI Tools & APIs'],
  })
  return { certId: id, issuedAt }
}

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
    }

    if (!resendKey) {
      return NextResponse.json(
        { sent: false, message: 'Email service not configured — certificate can still be downloaded.' },
        { status: 200 },
      )
    }

    const saved = await getOrCreateCert(name, email)
    const certId = saved?.certId || `SKX-MC-${Date.now().toString(36).toUpperCase()}`
    const dateStr = saved?.issuedAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    const certUrl = `https://skillsxai.com/certificate/${certId}`

    const resend = new Resend(resendKey)
    const certHtml = generateCertHTML(name, certId, dateStr, certUrl)
    const emailHtml = generateEmailHTML(name, certId, dateStr, certUrl)

    const { error } = await resend.emails.send({
      from: 'SkillsXAI <certificates@team.skillsxai.com>',
      to: email,
      subject: `Your AI Masterclass Certificate — ${name} | SkillsXAI`,
      html: emailHtml,
      attachments: [
        {
          filename: `SkillsXAI-Certificate-${name.replace(/\s+/g, '-')}.html`,
          content: Buffer.from(certHtml, 'utf-8'),
          contentType: 'text/html',
        },
      ],
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ sent: false, message: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ sent: true, message: 'Certificate emailed successfully!', certUrl })
  } catch (err) {
    console.error('send-certificate error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
