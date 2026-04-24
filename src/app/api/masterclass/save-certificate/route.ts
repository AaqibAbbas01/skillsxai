import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

function generateId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const ts = Date.now().toString(36)
  let rand = ''
  for (let i = 0; i < 30 - ts.length; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `${ts}${rand}`
}

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
    }

    const supabase = getSupabase()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: existing } = await supabase
      .from('masterclass_certificates')
      .select('id, issued_at')
      .eq('email', email)
      .limit(1)
      .single()

    if (existing) {
      const certUrl = `https://skillsxai.com/certificate/${existing.id}`
      return NextResponse.json({ certId: existing.id, certUrl, issuedAt: existing.issued_at })
    }

    const certId = generateId()
    const issuedAt = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const { error } = await supabase.from('masterclass_certificates').insert({
      id: certId,
      name,
      email,
      issued_at: issuedAt,
      skills: ['Artificial Intelligence', 'Prompt Engineering', 'AI Agents & Automation', 'AI Tools & APIs'],
    })

    if (error) {
      console.error('save-certificate insert error:', error)
      return NextResponse.json({ error: 'Failed to save certificate' }, { status: 500 })
    }

    const certUrl = `https://skillsxai.com/certificate/${certId}`
    return NextResponse.json({ certId, certUrl, issuedAt })
  } catch (err) {
    console.error('save-certificate error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
