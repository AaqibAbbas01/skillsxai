'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle2, Award, Loader2, Mail, Share2 } from 'lucide-react'

// ─── Certificate HTML Generator ───────────────────────────────────────────────
function generateCertificateHTML(name: string): string {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const certId = `SKX-MC-${Date.now().toString(36).toUpperCase()}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Certificate of Participation — ${name} | SkillsXAI</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 297mm;
      height: 210mm;
      background: #fff;
      font-family: 'Inter', sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      width: 297mm;
      height: 210mm;
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 50%, #f8f0ff 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    /* Outer border */
    .border-outer {
      position: absolute;
      inset: 12mm;
      border: 3px solid transparent;
      background: linear-gradient(#fff, #fff) padding-box,
                  linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6) border-box;
      border-radius: 8px;
    }
    /* Inner border */
    .border-inner {
      position: absolute;
      inset: 15mm;
      border: 1px solid rgba(139,92,246,0.25);
      border-radius: 6px;
    }
    /* Corner ornaments */
    .corner {
      position: absolute;
      width: 20mm;
      height: 20mm;
    }
    .corner-tl { top: 14mm; left: 14mm; border-top: 3px solid #3b82f6; border-left: 3px solid #3b82f6; border-radius: 4px 0 0 0; }
    .corner-tr { top: 14mm; right: 14mm; border-top: 3px solid #8b5cf6; border-right: 3px solid #8b5cf6; border-radius: 0 4px 0 0; }
    .corner-bl { bottom: 14mm; left: 14mm; border-bottom: 3px solid #8b5cf6; border-left: 3px solid #8b5cf6; border-radius: 0 0 0 4px; }
    .corner-br { bottom: 14mm; right: 14mm; border-bottom: 3px solid #ec4899; border-right: 3px solid #ec4899; border-radius: 0 0 4px 0; }
    /* Background decoration */
    .bg-circle-1 {
      position: absolute;
      width: 80mm;
      height: 80mm;
      background: radial-gradient(circle, rgba(59,130,246,0.06), transparent);
      top: -20mm;
      left: -20mm;
      border-radius: 50%;
    }
    .bg-circle-2 {
      position: absolute;
      width: 80mm;
      height: 80mm;
      background: radial-gradient(circle, rgba(139,92,246,0.06), transparent);
      bottom: -20mm;
      right: -20mm;
      border-radius: 50%;
    }
    /* Content */
    .content {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 0 25mm;
      width: 100%;
    }
    .logo-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 6mm;
    }
    .logo-icon {
      width: 10mm;
      height: 10mm;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 3mm;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    .logo-text {
      font-size: 18px;
      font-weight: 700;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 0.5px;
    }
    .cert-title {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #8b5cf6;
      margin-bottom: 4mm;
    }
    .cert-heading {
      font-family: 'Playfair Display', serif;
      font-size: 40px;
      font-weight: 900;
      background: linear-gradient(135deg, #1e293b 30%, #3b82f6 70%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.1;
      margin-bottom: 5mm;
    }
    .present-text {
      font-size: 12px;
      color: #64748b;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 4mm;
    }
    .recipient-name {
      font-family: 'Playfair Display', serif;
      font-size: 48px;
      font-weight: 700;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 2mm;
      line-height: 1;
    }
    .name-underline {
      width: 70mm;
      height: 2px;
      background: linear-gradient(90deg, transparent, #8b5cf6, #3b82f6, transparent);
      margin: 0 auto 5mm;
    }
    .achievement-text {
      font-size: 11px;
      color: #475569;
      line-height: 1.6;
      max-width: 180mm;
      margin: 0 auto 6mm;
    }
    .achievement-text strong {
      color: #1e293b;
    }
    /* Stats row */
    .stats-row {
      display: flex;
      justify-content: center;
      gap: 8mm;
      margin-bottom: 7mm;
    }
    .stat-pill {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 2mm 5mm;
      border-radius: 20px;
      border: 1px solid rgba(59,130,246,0.25);
      background: rgba(59,130,246,0.05);
      font-size: 9px;
      color: #3b82f6;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    /* Footer row */
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 5mm;
      width: 100%;
      max-width: 240mm;
      margin: 0 auto;
    }
    .sig-block {
      text-align: center;
      width: 50mm;
    }
    .sig-line {
      width: 40mm;
      height: 1px;
      background: linear-gradient(90deg, transparent, #94a3b8, transparent);
      margin: 2mm auto 1mm;
    }
    .sig-name {
      font-size: 9px;
      font-weight: 600;
      color: #1e293b;
    }
    .sig-title {
      font-size: 8px;
      color: #64748b;
    }
    /* Seal */
    .seal {
      width: 24mm;
      height: 24mm;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 3px solid white;
      box-shadow: 0 0 0 1px rgba(139,92,246,0.3), 0 4px 20px rgba(59,130,246,0.3);
    }
    .seal-text {
      font-size: 7px;
      font-weight: 800;
      color: white;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.3;
    }
    .cert-id {
      font-size: 7px;
      color: #94a3b8;
      text-align: center;
      margin-top: 3mm;
    }
    /* Watermark stars */
    .watermark {
      position: absolute;
      font-size: 100px;
      opacity: 0.025;
      color: #8b5cf6;
      user-select: none;
    }
    @media print {
      html, body { width: 297mm; height: 210mm; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="border-outer"></div>
    <div class="border-inner"></div>
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>
    <div class="bg-circle-1"></div>
    <div class="bg-circle-2"></div>
    <div class="watermark" style="top:30%;left:5%;transform:rotate(-20deg)">✦</div>
    <div class="watermark" style="bottom:10%;right:5%;transform:rotate(15deg);font-size:60px">✦</div>

    <div class="content">
      <!-- Logo -->
      <div class="logo-row">
        <div class="logo-icon">🤖</div>
        <span class="logo-text">SkillsXAI</span>
      </div>

      <p class="cert-title">Certificate of Participation</p>

      <h1 class="cert-heading">This certifies that</h1>

      <p class="present-text">this certificate is proudly presented to</p>

      <div class="recipient-name">${name}</div>
      <div class="name-underline"></div>

      <p class="achievement-text">
        for successfully attending the <strong>SkillsXAI Free AI Masterclass</strong> and demonstrating
        a strong understanding of Artificial Intelligence concepts, tools, and practical applications.
        This participant has shown commitment to learning and excellence in the AI field.
      </p>

      <!-- Stats pills -->
      <div class="stats-row">
        <span class="stat-pill">🎓 AI Masterclass</span>
        <span class="stat-pill">📅 ${dateStr}</span>
        <span class="stat-pill">✅ Google Approved</span>
      </div>

      <!-- Footer -->
      <div class="footer-row">
        <div class="sig-block">
          <div style="height:8mm;display:flex;align-items:flex-end;justify-content:center;padding-bottom:1mm">
            <span style="font-family:'Playfair Display',serif;font-size:20px;color:#3b82f6;font-style:italic">Nawab Khan</span>
          </div>
          <div class="sig-line"></div>
          <div class="sig-name">Nawab Khan</div>
          <div class="sig-title">Founder & Lead Instructor, SkillsXAI</div>
        </div>

        <div class="seal">
          <span class="seal-text">SKILLS<br/>X AI<br/>VERIFIED</span>
        </div>

        <div class="sig-block">
          <div style="height:8mm;display:flex;align-items:flex-end;justify-content:center;padding-bottom:1mm">
            <span style="font-family:'Playfair Display',serif;font-size:16px;color:#8b5cf6;font-style:italic">SkillsXAI</span>
          </div>
          <div class="sig-line"></div>
          <div class="sig-name">SkillsXAI Institute</div>
          <div class="sig-title">AI Education & Certification Body</div>
        </div>
      </div>

      <p class="cert-id">Certificate ID: ${certId} · Issued: ${dateStr} · Verify at skillsxai.com</p>
    </div>
  </div>

  <!-- Print button (hidden when printing) -->
  <div class="no-print" style="position:fixed;bottom:20px;right:20px;display:flex;gap:10px;">
    <button onclick="window.print()" style="padding:12px 24px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:white;border:none;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 20px rgba(59,130,246,0.4);">
      🖨️ Download / Print Certificate
    </button>
  </div>
</body>
</html>`
}

// ─── Success Page Content ─────────────────────────────────────────────────────
function SuccessContent() {
  const params = useSearchParams()
  const name = params.get('name') || 'Participant'
  const email = params.get('email') || ''
  const [downloading, setDownloading] = useState(false)

  const handleDownloadCertificate = () => {
    setDownloading(true)
    const html = generateCertificateHTML(name)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SkillsXAI-Certificate-${name.replace(/\s+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setTimeout(() => setDownloading(false), 1500)
  }

  const proItems = [
    { icon: Award, label: 'Professional Certificate', desc: 'Download via button below', color: 'text-yellow-400', status: 'Ready' },
    { icon: '🎬', label: 'AI Agents Masterclass Recording', desc: 'Will be sent to ' + (email || 'your email'), color: 'text-blue-400', status: 'Sending' },
    { icon: '⚡', label: 'Advanced Prompts Pack (100+)', desc: 'Will be sent to your email', color: 'text-purple-400', status: 'Sending' },
    { icon: Mail, label: 'AI Tool Email Updates', desc: 'Subscribed · First email within 24hrs', color: 'text-green-400', status: 'Active' },
    { icon: '📘', label: 'AI Career Roadmap PDF', desc: 'Will be sent to your email', color: 'text-pink-400', status: 'Sending' },
    { icon: '🚀', label: 'Early Course Access', desc: 'Your account is now VIP-flagged', color: 'text-orange-400', status: 'Active' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] to-[#0f172a] py-16 px-4 relative overflow-hidden">
      <div className="fixed w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-3xl -top-40 -right-40 pointer-events-none" />
      <div className="fixed w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl -bottom-40 -left-40 pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-block">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              SkillsXAI
            </span>
          </a>
        </div>

        {/* Success Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center mb-10"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)]">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Payment Successful! 🎉</h1>
          <p className="text-gray-400 text-lg">
            Welcome to the Pro Club, <span className="text-white font-semibold">{name}</span>!
          </p>
          <p className="text-gray-500 text-sm mt-2">
            A confirmation has been sent to{' '}
            <span className="text-blue-400">{email}</span>
          </p>
        </motion.div>

        {/* Certificate Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-[#1a1200] via-[#0f172a] to-[#0a0f1a] p-8 mb-6 shadow-[0_0_40px_rgba(234,179,8,0.1)]"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Your Certificate is Ready!</h2>
              <p className="text-gray-400 text-sm">Personalised for: <span className="text-yellow-400 font-semibold">{name}</span></p>
            </div>
          </div>

          {/* Certificate Mini Preview */}
          <div className="mb-6 rounded-xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 p-5 text-center">
            <p className="text-xs uppercase tracking-widest text-yellow-500/70 mb-2 font-semibold">Certificate of Participation</p>
            <p className="text-gray-400 text-xs mb-1">This certifies that</p>
            <p className="text-2xl font-bold text-yellow-300 font-serif mb-2">{name}</p>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mx-auto mb-2" />
            <p className="text-gray-500 text-xs">has successfully attended the SkillsXAI Free AI Masterclass</p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">🎓 AI Masterclass</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs">✅ Google Approved</span>
            </div>
          </div>

          <button
            onClick={handleDownloadCertificate}
            disabled={downloading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg hover:from-yellow-400 hover:to-orange-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.25)] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {downloading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Certificate…
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Certificate (HTML)
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-500 mt-3">
            Open the downloaded file in any browser → Print → Save as PDF for a perfect A4 certificate.
          </p>
        </motion.div>

        {/* Pro Items Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            Your Pro Package — Delivery Status
          </h3>
          <div className="space-y-3">
            {proItems.map((item, i) => {
              const isComponent = typeof item.icon !== 'string'
              const Icon = isComponent ? (item.icon as React.ElementType) : null
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-lg">
                    {Icon ? <Icon className={`w-4 h-4 ${item.color}`} /> : item.icon as string}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                      item.status === 'Ready'
                        ? 'bg-green-500/15 text-green-400'
                        : item.status === 'Active'
                        ? 'bg-blue-500/15 text-blue-400'
                        : 'bg-yellow-500/15 text-yellow-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Share & Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center space-y-4"
        >
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="https://wa.me/?text=I%20just%20completed%20the%20SkillsXAI%20AI%20Masterclass%20and%20got%20my%20certificate!%20🎉%20Check%20it%20out%20at%20skillsxai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600/20 border border-green-500/30 text-green-300 hover:bg-green-600/30 transition-all text-sm font-semibold"
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </a>
            <a
              href="/professionals"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 text-blue-300 hover:from-blue-600/30 hover:to-purple-600/30 transition-all text-sm font-semibold"
            >
              Explore Full Courses →
            </a>
          </div>
          <p className="text-gray-600 text-xs">
            Questions? Email us at{' '}
            <a href="mailto:hello@skillsxai.com" className="text-blue-400 hover:underline">
              hello@skillsxai.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Page with Suspense ───────────────────────────────────────────────────────
export default function MasterclassSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
