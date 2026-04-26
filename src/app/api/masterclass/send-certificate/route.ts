import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { generateCertHTML, generateEmailHTML } from '@/lib/certificate'
import { saveCertToNeon } from '@/lib/neon'

const resendKey = process.env.RESEND_API_KEY

const BASE_RESOURCES = [
  { filename: 'Claude-AI-Cheat-Sheet.html', srcFile: 'claude-ai-cheatsheet.html', contentType: 'text/html' },
  { filename: 'Free-AI-APIs-NVIDIA-Guide.html', srcFile: 'free-ai-apis-guide.html', contentType: 'text/html' },
  { filename: 'AI-Career-Roadmap-2026.html', srcFile: 'ai-career-roadmap-2026.html', contentType: 'text/html' },
] as const

const ULTIMATE_RESOURCE = { filename: 'AI-Agent-Masterclass-Sheet.csv', srcFile: 'Ai Agent Masterclass Sheet - Sheet1.csv', contentType: 'text/csv' } as const

async function loadResources(plan: string) {
  const resourceList = plan === 'ultimate' ? [...BASE_RESOURCES, ULTIMATE_RESOURCE] : [...BASE_RESOURCES]
  const downloadsDir = join(process.cwd(), 'public', 'downloads')
  const attachments: { filename: string; content: Buffer; contentType: string }[] = []

  for (const res of resourceList) {
    try {
      const content = await readFile(join(downloadsDir, res.srcFile))
      attachments.push({ filename: res.filename, content, contentType: res.contentType })
    } catch {
      // Skip files that can't be read
    }
  }

  return attachments
}

export async function POST(req: Request) {
  try {
    const { name, email, plan } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
    }

    if (!resendKey) {
      return NextResponse.json(
        { sent: false, message: 'Email service not configured — certificate can still be downloaded.' },
        { status: 200 },
      )
    }

    const selectedPlan = plan === 'ultimate' ? 'ultimate' : 'pro'

    const saved = await saveCertToNeon(
      name,
      email,
      'ai-masterclass',
      ['Artificial Intelligence', 'Prompt Engineering', 'AI Agents & Automation', 'AI Tools & APIs']
    )
    const certId = saved?.certId || `SKX-MC-${Date.now().toString(36).toUpperCase()}`
    const dateStr = saved?.issuedAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    const certUrl = saved?.certUrl || `https://skillsxai.com/certificatedownload/${certId}`

    const resend = new Resend(resendKey)
    const certHtml = generateCertHTML(name, certId, dateStr, certUrl)
    const emailHtml = generateEmailHTML(name, certId, dateStr, certUrl)

    const resources = await loadResources(selectedPlan)
    const planLabel = selectedPlan === 'ultimate' ? 'Ultimate Package' : 'Pro Package'

    const { error } = await resend.emails.send({
      from: 'SkillsXAI <certificates@team.skillsxai.com>',
      to: email,
      subject: `Your AI Masterclass ${planLabel} — Certificate + Resources | ${name}`,
      html: emailHtml,
      attachments: [
        {
          filename: `SkillsXAI-Certificate-${name.replace(/\s+/g, '-')}.html`,
          content: Buffer.from(certHtml, 'utf-8'),
          contentType: 'text/html',
        },
        ...resources,
      ],
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ sent: false, message: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ sent: true, message: `Certificate and ${planLabel} resources emailed successfully!`, certUrl })
  } catch (err) {
    console.error('send-certificate error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
