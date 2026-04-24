import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

type CertData = {
  id: string
  name: string
  issued_at: string
  skills: string[]
}

async function getCert(id: string): Promise<CertData | null> {
  const supabase = getSupabase()
  if (!supabase) return null
  const { data } = await supabase
    .from('masterclass_certificates')
    .select('id, name, issued_at, skills')
    .eq('id', id)
    .single()
  return data as CertData | null
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const cert = await getCert(id)
  if (!cert) return { title: 'Certificate Not Found — SkillsXAI' }
  return {
    title: `Certificate — ${cert.name} | SkillsXAI`,
    description: `Verified AI Masterclass certificate for ${cert.name}, issued by SkillsXAI on ${cert.issued_at}.`,
    openGraph: {
      title: `${cert.name} — AI Masterclass Certificate`,
      description: `Verified certificate for completing the SkillsXAI AI Masterclass. Skills: ${cert.skills.join(', ')}.`,
      siteName: 'SkillsXAI',
    },
  }
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cert = await getCert(id)
  if (!cert) notFound()

  const liUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent('AI Masterclass — SkillsXAI')}&organizationName=${encodeURIComponent('SkillsXAI')}&issueYear=${new Date(cert.issued_at).getFullYear() || new Date().getFullYear()}&issueMonth=${(new Date(cert.issued_at).getMonth() + 1) || (new Date().getMonth() + 1)}&certUrl=${encodeURIComponent(`https://skillsxai.com/certificate/${cert.id}`)}&certId=${encodeURIComponent(cert.id)}`

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Gradient strip */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500" />

      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Verified badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Verified Certificate
          </div>

          {/* Logo */}
          <p className="text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            SkillsXAI
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-xs text-blue-300 font-semibold">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Approved
            </span>
          </div>
        </div>

        {/* Certificate card */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-8 shadow-[0_0_60px_rgba(59,130,246,0.08)] mb-8">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[4px] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
              Certificate of Achievement
            </p>
            <p className="text-sm text-gray-500">This certifies that</p>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent" style={{ fontFamily: 'serif' }}>
              {cert.name}
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              has successfully completed the <span className="text-white font-semibold">SkillsXAI AI Masterclass</span> program
              and demonstrated proficiency in Artificial Intelligence, Prompt Engineering, AI Agents & Automation,
              and practical AI tool applications.
            </p>

            {/* Skills */}
            <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
              {cert.skills.map((skill, i) => {
                const colors = [
                  'text-blue-300 border-blue-500/25 bg-blue-500/10',
                  'text-purple-300 border-purple-500/25 bg-purple-500/10',
                  'text-cyan-300 border-cyan-500/25 bg-cyan-500/10',
                  'text-pink-300 border-pink-500/25 bg-pink-500/10',
                ]
                return (
                  <span key={i} className={`px-3 py-1 rounded-md text-xs font-semibold border ${colors[i % colors.length]}`}>
                    {skill}
                  </span>
                )
              })}
            </div>

            {/* Metadata */}
            <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
              <span>ID: <span className="text-gray-400 font-mono">{cert.id}</span></span>
              <span>Issued: <span className="text-gray-400">{cert.issued_at}</span></span>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-600 pt-1">
              <span>Issuer: <span className="text-gray-400 font-semibold">SkillsXAI</span></span>
              <span>Instructor: <span className="text-gray-400 font-semibold">Nawab Khan</span></span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <a
            href={liUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl bg-[#0a66c2] text-white font-bold text-sm hover:bg-[#004182] transition-all flex items-center justify-center gap-2.5"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Add to LinkedIn Profile
          </a>
          <a
            href="https://skillsxai.com"
            className="w-full py-3 rounded-xl border border-white/10 text-gray-300 font-semibold text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            Visit SkillsXAI
          </a>
        </div>

        <p className="text-center text-xs text-gray-600 mt-8">
          This certificate was issued by SkillsXAI and is independently verifiable at this URL.
        </p>
      </div>
    </div>
  )
}
