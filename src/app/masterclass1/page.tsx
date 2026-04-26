'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  ChevronRight,
  ChevronLeft,
  Star,
  Check,
  Download,
  Award,
  Bot,
  BookOpen,
  Gift,
  Crown,
  Sparkles,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Smartphone,
} from 'lucide-react'

// ─── Shared SVG constants for certificate ────────────────────────────────────
const GOOGLE_LOGO_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>'
const SKILLSXAI_LOGO_BIG = '<svg viewBox="0 0 320 60" width="180" height="34" style="vertical-align:middle"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="50%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs><text x="160" y="44" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="48" fill="url(#lg)" letter-spacing="2">SkillsXAI</text></svg>'

// ─── Certificate Generator ────────────────────────────────────────────────────
function generateCertificateHTML(name: string, certIdOverride?: string, certUrlOverride?: string): string {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const certId = certIdOverride || `SKX-MC-${Date.now().toString(36).toUpperCase()}`
  const verifyUrl = certUrlOverride || 'https://skillsxai.com'
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Certificate of Achievement — ${name} | SkillsXAI</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{width:297mm;height:210mm;background:#0a0f1a;font-family:'Inter',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .page{width:297mm;height:210mm;position:relative;overflow:hidden;background:linear-gradient(160deg,#0a0f1a 0%,#0f172a 40%,#0d1528 70%,#0a0f1a 100%);display:flex;flex-direction:column;align-items:center;justify-content:center}
    .strip-t{position:absolute;top:0;left:0;right:0;height:3mm;background:linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6,#ec4899,#3b82f6)}
    .strip-b{position:absolute;bottom:0;left:0;right:0;height:3mm;background:linear-gradient(90deg,#8b5cf6,#ec4899,#3b82f6,#06b6d4,#8b5cf6)}
    .border-outer{position:absolute;inset:7mm;border:2px solid transparent;background:linear-gradient(#0f172a,#0f172a) padding-box,linear-gradient(135deg,#3b82f6,#06b6d4,#8b5cf6,#ec4899) border-box;border-radius:6px}
    .border-inner{position:absolute;inset:10mm;border:1px solid rgba(59,130,246,.15);border-radius:4px}
    .grid-bg{position:absolute;inset:0;background-image:radial-gradient(rgba(59,130,246,.06) 1px,transparent 1px);background-size:8mm 8mm;pointer-events:none}
    .orb1{position:absolute;width:120mm;height:120mm;background:radial-gradient(circle,rgba(59,130,246,.08),transparent 70%);top:-30mm;right:-20mm;border-radius:50%}
    .orb2{position:absolute;width:100mm;height:100mm;background:radial-gradient(circle,rgba(139,92,246,.08),transparent 70%);bottom:-25mm;left:-15mm;border-radius:50%}
    .orb3{position:absolute;width:60mm;height:60mm;background:radial-gradient(circle,rgba(6,182,212,.06),transparent 70%);top:40%;left:10%;border-radius:50%}
    .corner{position:absolute;width:16mm;height:16mm}
    .c-tl{top:8mm;left:8mm;border-top:2px solid #3b82f6;border-left:2px solid #3b82f6;border-radius:4px 0 0 0}
    .c-tr{top:8mm;right:8mm;border-top:2px solid #06b6d4;border-right:2px solid #06b6d4;border-radius:0 4px 0 0}
    .c-bl{bottom:8mm;left:8mm;border-bottom:2px solid #8b5cf6;border-left:2px solid #8b5cf6;border-radius:0 0 0 4px}
    .c-br{bottom:8mm;right:8mm;border-bottom:2px solid #ec4899;border-right:2px solid #ec4899;border-radius:0 0 4px 0}
    .content{position:relative;z-index:10;text-align:center;padding:0 22mm;width:100%}
    .top-row{display:flex;flex-direction:column;align-items:center;gap:3mm;margin-bottom:3mm}
    .g-badge{display:inline-flex;align-items:center;gap:4px;padding:1.5mm 4mm;border-radius:20px;border:1px solid rgba(66,133,244,.25);background:rgba(66,133,244,.08);font-size:8px;color:#93bbfc;font-weight:600;letter-spacing:.3px;box-shadow:0 0 12px rgba(66,133,244,.1)}
    .sep{width:70mm;height:1px;background:linear-gradient(90deg,transparent,#3b82f6,#8b5cf6,transparent);margin:0 auto 3mm}
    .cert-label{font-size:10px;font-weight:700;letter-spacing:5px;text-transform:uppercase;background:linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:2mm}
    .cert-heading{font-family:'Playfair Display',serif;font-size:34px;font-weight:900;color:#e2e8f0;line-height:1.15;margin-bottom:3mm}
    .rec-name{font-family:'Playfair Display',serif;font-size:44px;font-weight:700;background:linear-gradient(135deg,#60a5fa,#06b6d4,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1;margin-bottom:1mm}
    .name-line{width:80mm;height:2px;background:linear-gradient(90deg,transparent,#3b82f6,#8b5cf6,transparent);margin:0 auto 4mm}
    .desc{font-size:9px;color:#94a3b8;line-height:1.7;max-width:200mm;margin:0 auto 4mm}
    .desc strong{color:#e2e8f0}
    .tags{display:flex;justify-content:center;gap:4mm;margin-bottom:3mm;flex-wrap:wrap}
    .tag{padding:1.5mm 4mm;border-radius:4px;font-size:7px;font-weight:600;letter-spacing:.3px;border:1px solid}
    .t1{color:#60a5fa;border-color:rgba(59,130,246,.3);background:rgba(59,130,246,.1)}
    .t2{color:#a78bfa;border-color:rgba(139,92,246,.3);background:rgba(139,92,246,.1)}
    .t3{color:#22d3ee;border-color:rgba(6,182,212,.3);background:rgba(6,182,212,.1)}
    .t4{color:#f472b6;border-color:rgba(236,72,153,.3);background:rgba(236,72,153,.1)}
    .cv{font-size:7.5px;color:#64748b;margin-bottom:5mm;font-style:italic}
    .cv a{color:#60a5fa;text-decoration:none}
    .foot{display:flex;justify-content:space-between;align-items:flex-end;padding:0 8mm;width:100%;max-width:250mm;margin:0 auto}
    .sig{text-align:center;width:55mm}
    .sig-ln{width:40mm;height:1px;background:linear-gradient(90deg,transparent,rgba(59,130,246,.4),transparent);margin:2mm auto 1mm}
    .sig-nm{font-size:9px;font-weight:700;color:#e2e8f0}
    .sig-ti{font-size:7px;color:#64748b;margin-top:.5mm}
    .seal{width:26mm;height:26mm;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #0f172a;box-shadow:0 0 0 2px rgba(59,130,246,.5),0 0 30px rgba(139,92,246,.3)}
    .seal-in{width:20mm;height:20mm;border-radius:50%;border:1px solid rgba(255,255,255,.2);display:flex;flex-direction:column;align-items:center;justify-content:center}
    .seal-tx{font-size:6px;font-weight:800;color:white;letter-spacing:1px;text-transform:uppercase;text-align:center;line-height:1.4}
    .cid{font-size:7px;color:#475569;text-align:center;margin-top:3mm;letter-spacing:.3px}
    .actions{display:flex;justify-content:center;gap:4mm;margin-top:3mm}
    .act-btn{display:inline-flex;align-items:center;gap:2mm;padding:2mm 5mm;border-radius:5px;font-size:7.5px;font-weight:700;text-decoration:none;border:1px solid;transition:opacity .2s}
    .act-btn:hover{opacity:.85}
    .li-btn{color:#fff;background:#0a66c2;border-color:#0a66c2}
    .follow-btn{color:#60a5fa;background:rgba(59,130,246,.1);border-color:rgba(59,130,246,.3)}
    .wm{position:absolute;font-family:'Inter',sans-serif;font-size:100px;opacity:.02;color:#3b82f6;user-select:none;font-weight:900;letter-spacing:10px}
    @media print{html,body{width:297mm;height:210mm;background:#0a0f1a} .no-print{display:none!important}}
  </style>
</head>
<body>
  <div class="page">
    <div class="strip-t"></div><div class="strip-b"></div>
    <div class="border-outer"></div><div class="border-inner"></div>
    <div class="grid-bg"></div>
    <div class="orb1"></div><div class="orb2"></div><div class="orb3"></div>
    <div class="corner c-tl"></div><div class="corner c-tr"></div>
    <div class="corner c-bl"></div><div class="corner c-br"></div>
    <div class="wm" style="top:22%;left:2%;transform:rotate(-12deg)">AI</div>
    <div class="wm" style="bottom:12%;right:2%;transform:rotate(8deg);font-size:70px">SKILLS</div>
    <div class="content">
      <div class="top-row">
        ${SKILLSXAI_LOGO_BIG}
        <div class="g-badge">${GOOGLE_LOGO_SVG} &nbsp;Approved by Google</div>
      </div>
      <div class="sep"></div>
      <p class="cert-label">Certificate of Achievement</p>
      <h1 class="cert-heading">This Certificate is Proudly Presented to</h1>
      <div class="rec-name">${name}</div>
      <div class="name-line"></div>
      <p class="desc">for successfully completing the <strong>SkillsXAI AI Masterclass</strong> program and demonstrating proficiency in <strong>Artificial Intelligence fundamentals</strong>, <strong>Prompt Engineering</strong>, <strong>AI Agents & Automation</strong>, and <strong>practical AI tool applications</strong>. This achievement validates the holder&rsquo;s competence in leveraging AI technologies for professional and business applications.</p>
      <div class="tags">
        <span class="tag t1">Artificial Intelligence</span>
        <span class="tag t2">Prompt Engineering</span>
        <span class="tag t3">AI Agents & Automation</span>
        <span class="tag t4">AI Tools & APIs</span>
      </div>
      <p class="cv">This certificate may be presented in resumes, CVs, and LinkedIn profiles as proof of AI competency.</p>
      <div class="foot">
        <div class="sig">
          <div style="height:8mm;display:flex;align-items:flex-end;justify-content:center;padding-bottom:1mm"><span style="font-family:'Playfair Display',serif;font-size:17px;color:#60a5fa;font-style:italic">Nawab Khan</span></div>
          <div class="sig-ln"></div>
          <div class="sig-nm">Nawab Khan</div>
          <div class="sig-ti">Founder & Lead Instructor, SkillsXAI</div>
        </div>
        <div class="seal"><div class="seal-in"><span class="seal-tx">SKILLS<br/>X AI<br/>CERTIFIED</span></div></div>
        <div class="sig">
          <div style="height:8mm;display:flex;align-items:flex-end;justify-content:center;padding-bottom:1mm">${GOOGLE_LOGO_SVG}</div>
          <div class="sig-ln"></div>
          <div class="sig-nm">Google Approved</div>
          <div class="sig-ti">Technology Partner</div>
        </div>
      </div>
      <p class="cid">Certificate ID: ${certId} &middot; Issued: ${dateStr} &middot; <a href="${verifyUrl}" style="color:#60a5fa;text-decoration:none">Verify Certificate</a></p>
      <div class="actions no-print">
        <a class="act-btn li-btn" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent('AI Masterclass — SkillsXAI')}&organizationName=${encodeURIComponent('SkillsXAI')}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(verifyUrl)}&certId=${encodeURIComponent(certId)}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          Add to LinkedIn
        </a>
        <a class="act-btn follow-btn" href="https://skillsxai.com" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="#60a5fa"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          Follow SkillsXAI
        </a>
      </div>
    </div>
  </div>
  <div class="no-print" style="position:fixed;bottom:20px;right:20px;display:flex;gap:10px">
    <button style="padding:12px 24px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:white;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(59,130,246,.4)" onclick="window.print()">Print / Save as PDF</button>
  </div>
</body>
</html>`
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface UserData {
  name: string
  email: string
  phone: string
}

interface FeedbackData {
  overall: number
  content: number
  instructor: number
  recommend: number
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────
const steps = [
  { label: 'Your Details', icon: User },
  { label: 'Feedback', icon: Star },
  { label: 'Claim Rewards', icon: Gift },
]

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const Icon = step.icon
          const done = i < current
          const active = i === current
          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="relative flex items-center w-full">
                {i > 0 && (
                  <div
                    className={`absolute left-0 right-1/2 h-0.5 -translate-y-0 ${
                      done ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/10'
                    }`}
                  />
                )}
                {i < steps.length - 1 && (
                  <div
                    className={`absolute left-1/2 right-0 h-0.5 ${
                      done ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/10'
                    }`}
                  />
                )}
                <div
                  className={`relative z-10 mx-auto w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    done
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-purple-500 shadow-[0_0_16px_rgba(139,92,246,0.5)]'
                      : active
                      ? 'bg-gradient-to-br from-blue-600 to-purple-700 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                      : 'bg-dark-700 border-white/10'
                  }`}
                >
                  {done ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500'}`} />
                  )}
                </div>
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center ${
                  active ? 'text-blue-300' : done ? 'text-purple-400' : 'text-gray-600'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({
  value,
  onChange,
  label,
}: {
  value: number
  onChange: (v: number) => void
  label: string
}) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= (hovered || value)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-600'
              }`}
            />
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 self-center text-sm text-yellow-400 font-medium">
            {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][value]}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Page 1: Registration ─────────────────────────────────────────────────────
function RegistrationStep({
  data,
  onChange,
  onNext,
}: {
  data: UserData
  onChange: (d: UserData) => void
  onNext: () => void
}) {
  const [errors, setErrors] = useState<Partial<UserData>>({})

  const validate = () => {
    const e: Partial<UserData> = {}
    if (!data.name.trim()) e.name = 'Full name is required'
    if (!data.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email'
    if (!data.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid 10-digit Indian mobile number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Step 1 of 3 — Your Details
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Thank You for Completing Our Masterclass!</h2>
        <p className="text-gray-400">Please fill in your details below to download your professional AI certificate.</p>
      </div>

      <div className="glass-card rounded-2xl p-8 space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" /> Full Name *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="e.g. Priya Sharma"
            className={`w-full bg-dark-700/60 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
              errors.name ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500/40'
            }`}
          />
          {errors.name && (
            <p className="text-red-400 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400" /> Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="e.g. priya@gmail.com"
            className={`w-full bg-dark-700/60 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
              errors.email ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500/40'
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-400" /> Phone Number *
          </label>
          <div className="flex">
            <span className="flex items-center px-3 bg-dark-700/80 border border-r-0 border-white/10 rounded-l-xl text-gray-400 text-sm">
              +91
            </span>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              placeholder="98765 43210"
              className={`flex-1 bg-dark-700/60 border rounded-r-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                errors.phone ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500/40'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* Certificate Preview */}
        <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-[#0a0f1a] to-[#0f172a] p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[length:6px_6px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-radial-gradient from-blue-500/10 to-transparent rounded-full pointer-events-none" />
          <div className="relative text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">SkillsXAI</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-[9px] text-blue-300 font-semibold">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google Approved
              </span>
            </div>
            <p className="text-[9px] uppercase tracking-[3px] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">Certificate of Achievement</p>
            <p className="text-[9px] text-gray-500">This certificate is proudly presented to</p>
            <p className="text-lg font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent" style={{ fontFamily: 'serif' }}>
              {data.name.trim() || 'Your Name'}
            </p>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto" />
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 rounded text-[7px] font-semibold text-blue-300 border border-blue-500/25 bg-blue-500/10">AI</span>
              <span className="px-1.5 py-0.5 rounded text-[7px] font-semibold text-purple-300 border border-purple-500/25 bg-purple-500/10">Prompt Engineering</span>
              <span className="px-1.5 py-0.5 rounded text-[7px] font-semibold text-cyan-300 border border-cyan-500/25 bg-cyan-500/10">AI Agents</span>
              <span className="px-1.5 py-0.5 rounded text-[7px] font-semibold text-pink-300 border border-pink-500/25 bg-pink-500/10">Tools</span>
            </div>
            <p className="text-[8px] text-gray-600 italic">Add to your Resume, CV & LinkedIn profile</p>
          </div>
        </div>
        {/* LinkedIn preview teaser */}
        <div className="flex items-center gap-3 p-3 rounded-xl border border-[#0a66c2]/15 bg-[#0a66c2]/5">
          <div className="w-8 h-8 rounded-lg bg-[#0a66c2] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white">Add to LinkedIn in 1 click</p>
            <p className="text-[10px] text-gray-500">Auto-fills certificate name, issuer, date & credential ID. Add AI skills & upload as media.</p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group"
        >
          Continue to Feedback
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  )
}

// ─── Page 2: Feedback ─────────────────────────────────────────────────────────
function FeedbackStep({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: FeedbackData
  onChange: (d: FeedbackData) => void
  onNext: () => void
  onBack: () => void
}) {
  const handleRating = (key: keyof FeedbackData, val: number) =>
    onChange({ ...data, [key]: val })

  const isValid =
    data.overall > 0 && data.content > 0 && data.instructor > 0 && data.recommend > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm font-medium mb-4">
          <Star className="w-4 h-4" />
          Step 2 of 3 — Share Your Feedback
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">How Was Your Experience?</h2>
        <p className="text-gray-400">Your honest feedback helps us make the masterclass even better.</p>
      </div>

      <div className="glass-card rounded-2xl p-8 space-y-6">
        <StarRating
          value={data.overall}
          onChange={(v) => handleRating('overall', v)}
          label="Overall Masterclass Experience *"
        />
        <StarRating
          value={data.content}
          onChange={(v) => handleRating('content', v)}
          label="Quality of Content *"
        />
        <StarRating
          value={data.instructor}
          onChange={(v) => handleRating('instructor', v)}
          label="Instructor Clarity & Engagement *"
        />
        <StarRating
          value={data.recommend}
          onChange={(v) => handleRating('recommend', v)}
          label="Would you recommend SkillsXAI to others? *"
        />

        <div className="flex gap-3 pt-2">
          <button
            onClick={onBack}
            className="flex-1 py-3.5 rounded-xl border border-white/10 text-gray-300 font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            className="flex-[2] py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all shadow-lg hover:shadow-yellow-500/25 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Claim Your Rewards
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        {!isValid && (
          <p className="text-center text-xs text-gray-500">Please rate all 4 sections to continue.</p>
        )}
      </div>
    </motion.div>
  )
}

// ─── UPI Config ──────────────────────────────────────────────────────────────
const UPI_ID = '9910356706@pthdfc'
const UPI_NAME = 'SkillsXAI'
type PlanType = 'pro' | 'ultimate'
const PLAN_CONFIG = {
  pro: { amount: 199, label: 'Pro Package', tag: 'POPULAR' },
  ultimate: { amount: 299, label: 'Ultimate Package', tag: 'BEST VALUE' },
} as const

// ─── Page 4: Rewards ──────────────────────────────────────────────────────────
function RewardsStep({
  userData,
  onBack,
}: {
  userData: UserData
  onBack: () => void
}) {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('pro')
  const [paidPlan, setPaidPlan] = useState<PlanType | null>(null)
  const [payState, setPayState] = useState<'idle' | 'verifying' | 'success'>('idle')
  const [utrInput, setUtrInput] = useState('')
  const [utrError, setUtrError] = useState('')
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyMessage, setVerifyMessage] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [certUrl, setCertUrl] = useState('')
  const [savedCertId, setSavedCertId] = useState('')

  const currentPlan = PLAN_CONFIG[selectedPlan]

  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan)
    if (paidPlan && plan !== paidPlan) {
      setPayState('idle')
      setUtrInput('')
      setUtrError('')
      setVerifyMessage('')
    }
  }
  const orderId = useRef(`SKXMC-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`).current

  const saveCertToDb = async () => {
    try {
      const res = await fetch('/api/masterclass/save-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userData.name, email: userData.email }),
      })
      const data = await res.json()
      if (data.certId && data.certUrl) {
        setSavedCertId(data.certId)
        setCertUrl(data.certUrl)
        return { certId: data.certId as string, certUrl: data.certUrl as string }
      }
    } catch { /* silent */ }
    const fallbackId = `SKX-MC-${Date.now().toString(36).toUpperCase()}`
    setSavedCertId(fallbackId)
    return { certId: fallbackId, certUrl: '' }
  }

  const linkedInAddUrl = certUrl
    ? `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent('AI Masterclass — SkillsXAI')}&organizationName=${encodeURIComponent('SkillsXAI')}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(certUrl)}&certId=${encodeURIComponent(savedCertId)}`
    : `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent('AI Masterclass — SkillsXAI')}&organizationName=${encodeURIComponent('SkillsXAI')}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent('https://skillsxai.com')}&certId=${encodeURIComponent(savedCertId || 'SKX-MC')}`

  const upiDeepLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${currentPlan.amount}&cu=INR&tn=${encodeURIComponent(`SkillsXAI Masterclass ${orderId}`)}`

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerify = async () => {
    const trimmed = utrInput.trim().replace(/\s/g, '')
    if (!trimmed) {
      setUtrError('Please enter your UPI Reference ID')
      return
    }
    if (!/^\d{12}$/.test(trimmed)) {
      setUtrError('Please enter a valid UPI Reference ID')
      return
    }
    setUtrError('')
    setVerifyLoading(true)
    setVerifyMessage('')

    try {
      const res = await fetch('/api/masterclass/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          utr: trimmed,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          plan: selectedPlan,
        }),
      })
      const data = await res.json()

      if (data.verified || data.status === 'PENDING_MANUAL') {
        await saveCertToDb()
        setPaidPlan(selectedPlan)
        setPayState('success')
        setVerifyMessage(data.message || 'Payment recorded! Certificate and resources have been sent to your email.')
      } else if (data.status === 'PENDING') {
        setVerifyMessage(data.message || 'Payment is still processing. Please wait and try again.')
      } else if (data.status === 'DUPLICATE_UTR') {
        setUtrError(data.message || 'This UPI Reference ID has already been submitted.')
      } else {
        setUtrError(data.message || 'Verification failed. Please contact support.')
      }
    } catch {
      setUtrError('Something went wrong. Please try again.')
    } finally {
      setVerifyLoading(false)
    }
  }

  const handleDownloadCertificate = () => {
    setDownloading(true)
    const html = generateCertificateHTML(userData.name, savedCertId || undefined, certUrl || undefined)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SkillsXAI-Certificate-${userData.name.replace(/\s+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setTimeout(() => setDownloading(false), 1500)
  }

  const handleDownloadDoc = (filename: string) => {
    window.open(`/downloads/${filename}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-300 text-sm font-medium mb-4">
          <Crown className="w-4 h-4" />
          Step 3 of 3 — Choose Your Package
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Great job, {userData.name.split(' ')[0]}!
        </h2>
        <p className="text-gray-400">
          Thank you for your feedback. Choose your package below.
        </p>
      </div>

      {/* ── Plan Selection ── */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Pro Plan — ₹199 */}
        <button
          onClick={() => handlePlanSelect('pro')}
          className={`relative text-left rounded-2xl p-5 border-2 transition-all ${
            selectedPlan === 'pro'
              ? 'border-yellow-500/60 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 shadow-[0_0_30px_rgba(234,179,8,0.1)]'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
          }`}
        >
          {selectedPlan === 'pro' && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
            </div>
          )}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-[10px] font-bold mb-3">
            <Crown className="w-3 h-3" /> POPULAR
          </div>
          <p className="text-lg font-bold text-white mb-1">Pro Package</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-white">₹199</span>
            <span className="text-gray-500 text-sm line-through">₹2,499</span>
          </div>
          <div className="space-y-2 text-xs text-gray-400">
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Professional Certificate</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Claude AI Cheat Sheet (50+ Prompts)</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Free AI APIs & NVIDIA Guide</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> AI Career Roadmap 2026</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Free AI Agents Masterclass</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Free 1-on-1 Career Counselling</p>
          </div>
        </button>

        {/* Ultimate Plan — ₹299 */}
        <button
          onClick={() => handlePlanSelect('ultimate')}
          className={`relative text-left rounded-2xl p-5 border-2 transition-all ${
            selectedPlan === 'ultimate'
              ? 'border-purple-500/60 bg-gradient-to-br from-purple-500/10 to-blue-500/5 shadow-[0_0_30px_rgba(139,92,246,0.15)]'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
          }`}
        >
          {selectedPlan === 'ultimate' && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
          )}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold mb-3">
            <Sparkles className="w-3 h-3" /> BEST VALUE
          </div>
          <p className="text-lg font-bold text-white mb-1">Ultimate Package</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-white">₹299</span>
            <span className="text-gray-500 text-sm line-through">₹3,999</span>
          </div>
          <div className="space-y-2 text-xs text-gray-400">
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Everything in Pro Package</p>
            <p className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 fill-purple-400" /> <span className="text-purple-300 font-semibold">AI Agents Masterclass Sheet (CSV)</span></p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Advanced AI Prompts Pack (100+)</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Weekly AI Tool Updates Newsletter</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Early Access to New Courses</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> 20% Discount on Full Courses</p>
          </div>
        </button>
      </div>

      {/* PRO PACKAGE DETAILS */}
      <div className="relative rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-[#1a1200]/60 via-[#0f172a] to-[#10063a]/60 p-8 shadow-[0_0_80px_rgba(212,175,55,0.08)] overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/3 via-purple-600/3 to-transparent pointer-events-none rounded-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yellow-500/5 to-transparent rounded-3xl pointer-events-none" />

        <div className="relative">
          {/* Badge + Price */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold ${
              selectedPlan === 'ultimate'
                ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30 text-purple-200'
                : 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/30 text-yellow-200'
            }`}>
              <Crown className={`w-4 h-4 ${selectedPlan === 'ultimate' ? 'text-purple-400' : 'text-yellow-400'}`} />
              {currentPlan.label.toUpperCase()}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">₹{currentPlan.amount}</span>
              <span className="text-gray-400 text-sm line-through">{selectedPlan === 'ultimate' ? '₹3,999' : '₹2,499'}</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">{selectedPlan === 'ultimate' ? '93% OFF' : '92% OFF'}</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            Your Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400">AI Career Starter Kit</span>
          </h3>
          <p className="text-gray-400 mb-6 text-sm">One-time payment · Instant access · Lifetime validity · Show on your CV</p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 py-3 mb-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 500+ students enrolled</span>
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.9/5 rating</span>
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-blue-500" /> Google Approved</span>
          </div>

          {/* ── UPI Payment Flow ── */}
          {payState === 'idle' && (
            <div className="space-y-5">
              {/* Certificate preview */}
              <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-yellow-300">Certificate Preview</p>
                  <p className="text-xs text-gray-400">
                    Personalised as:{' '}
                    <span className="text-white font-semibold">&quot;{userData.name}&quot;</span>{' '}
                    — downloads instantly after you confirm payment.
                  </p>
                </div>
              </div>

              {/* LinkedIn Showcase */}
              <div className="p-4 rounded-xl border border-[#0a66c2]/25 bg-[#0a66c2]/5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0a66c2] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white mb-1">Add to Your LinkedIn Profile</p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      After payment, you&apos;ll get a one-click button to add this certificate to your LinkedIn.
                      It auto-fills the <span className="text-blue-300">certificate name</span>, <span className="text-blue-300">issuer</span>, <span className="text-blue-300">date</span> & <span className="text-blue-300">credential ID</span>. Then add skills like <span className="text-white font-medium">Artificial Intelligence</span>, <span className="text-white font-medium">Prompt Engineering</span> & upload the PDF as media.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500"><CheckCircle2 className="w-3 h-3 text-green-500" /> Auto-fills details</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500"><CheckCircle2 className="w-3 h-3 text-green-500" /> Add AI skills</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500"><CheckCircle2 className="w-3 h-3 text-green-500" /> Upload PDF media</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay via UPI */}
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 space-y-5">
                <p className="text-sm font-bold text-blue-300 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> Pay ₹{currentPlan.amount} via UPI
                </p>

                <div className="flex justify-center">
                  <div className="p-3 bg-white rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <img
                      src="/upi-qr.png"
                      alt={`Scan to pay ₹${currentPlan.amount}`}
                      className="w-44 h-44 object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between bg-dark-700/60 border border-white/10 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-xs text-gray-500">UPI ID</p>
                    <p className="text-white font-mono font-semibold text-sm">{UPI_ID}</p>
                  </div>
                  <button
                    onClick={copyUpiId}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-semibold hover:bg-blue-500/25 transition-all"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex-1 h-px bg-white/10" />
                  <span>or pay with your favourite app</span>
                  <span className="flex-1 h-px bg-white/10" />
                </div>

                {/* ── GPay / PhonePe / Paytm Buttons ── */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Google Pay */}
                  <a
                    href={`gpay://upi/pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${currentPlan.amount}&cu=INR&tn=${encodeURIComponent(`SkillsXAI ${orderId}`)}`}
                    className="flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">Google Pay</span>
                  </a>

                  {/* PhonePe */}
                  <a
                    href={`phonepe://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${currentPlan.amount}&cu=INR&tn=${encodeURIComponent(`SkillsXAI ${orderId}`)}`}
                    className="flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#5f259f]/10 hover:border-[#5f259f]/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#5f259f] flex items-center justify-center shadow-md group-hover:shadow-[0_0_16px_rgba(95,37,159,0.4)] transition-shadow">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                        <path d="M6.5 3h5.2c3.3 0 5.8 1.1 7 3.1.9 1.5 1 3.2.4 5-.9 2.6-3.3 4.2-6.2 4.2H10l-1.2 5.3c-.1.2-.3.4-.5.4H5.8c-.3 0-.5-.3-.4-.6L8.2 3.6c.1-.3.3-.5.6-.5h-2.3zm4.3 2.1l-1.5 6.5h2c2.1 0 3.6-1.1 4.1-3 .5-1.8-.5-3.5-2.7-3.5h-1.9z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-[#5f259f] transition-colors">PhonePe</span>
                  </a>

                  {/* Paytm */}
                  <a
                    href={`paytmmp://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${currentPlan.amount}&cu=INR&tn=${encodeURIComponent(`SkillsXAI ${orderId}`)}`}
                    className="flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#00baf2]/10 hover:border-[#00baf2]/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00325b] flex items-center justify-center shadow-md group-hover:shadow-[0_0_16px_rgba(0,186,242,0.4)] transition-shadow">
                      <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none">
                        <path d="M11 12h5.5c4.5 0 7.2 2.2 7.2 6 0 4.3-3.2 7-7.8 7h-2.4l-1.5 6H8l3-19zm5 2.5l-1.5 8h1.8c2.8 0 4.5-1.6 4.5-4.2 0-2.3-1.5-3.8-4-3.8h-.8z" fill="#00baf2"/>
                        <path d="M29 18h3.5l-.5 2.3h.1c1-1.6 2.5-2.6 4.3-2.6 2.5 0 3.8 1.7 3.3 4.2l-2 9.1h-3.5l1.7-7.8c.2-1.2-.3-2-1.5-2-1.5 0-2.7 1.3-3.1 3.2l-1.5 6.6H26l3-13z" fill="#00baf2"/>
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-[#00baf2] transition-colors">Paytm</span>
                  </a>
                </div>

                {/* Generic UPI fallback */}
                <a
                  href={upiDeepLink}
                  className="w-full py-3 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/[0.07] hover:border-white/20 transition-all"
                >
                  <Smartphone className="w-4 h-4" /> Other UPI App
                </a>

                <p className="text-center text-xs text-gray-500">
                  Amount: <span className="text-white font-bold">₹{currentPlan.amount}</span> · Pay to:{' '}
                  <span className="text-blue-300">{UPI_ID}</span>
                </p>

                <div className="p-3 rounded-xl border border-purple-500/15 bg-purple-500/5 flex items-center gap-3">
                  <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Your Order ID (add in payment note)</p>
                    <p className="text-sm font-mono text-purple-300 truncate">{orderId}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(orderId)
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs hover:bg-purple-500/25 transition-all flex-shrink-0"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
              </div>

              <button
                onClick={() => setPayState('verifying')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center justify-center gap-3"
              >
                <Crown className="w-5 h-5 text-yellow-400" />
                I&apos;ve Paid ₹{currentPlan.amount} — Unlock My Package
              </button>
            </div>
          )}

          {/* Step 2: Enter UTR */}
          {payState === 'verifying' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5">
                <p className="text-sm font-bold text-purple-300 mb-1">Enter Your UPI Reference ID</p>
                <p className="text-xs text-gray-400">
                  Open your UPI app → go to &quot;Transaction History&quot; → copy the Reference ID / UTR number.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-blue-500/15 bg-blue-500/5 flex items-center gap-3">
                <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Your Order ID</p>
                  <p className="text-sm font-mono text-blue-300 truncate">{orderId}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <input
                  type="text"
                  inputMode="numeric"
                  value={utrInput}
                  onChange={(e) => { setUtrInput(e.target.value.replace(/\D/g, '')); setUtrError('') }}
                  placeholder="e.g. 407812345678"
                  className={`w-full bg-dark-700/60 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono tracking-widest text-lg ${
                    utrError ? 'border-red-500/60' : 'border-white/10 focus:border-purple-500/40'
                  }`}
                />
                {utrError && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {utrError}
                  </p>
                )}
                {verifyMessage && !utrError && (
                  <p className="text-yellow-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {verifyMessage}
                  </p>
                )}
              </div>
              <button
                onClick={handleVerify}
                disabled={verifyLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg hover:from-green-500 hover:to-emerald-500 transition-all shadow-[0_0_30px_rgba(34,197,94,0.25)] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {verifyLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Verifying Payment…</>
                ) : (
                  <><CheckCircle2 className="w-5 h-5" /> Verify & Get My Certificate</>
                )}
              </button>
              <button
                onClick={() => setPayState('idle')}
                className="w-full py-2.5 text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                ← Back to payment
              </button>
            </motion.div>
          )}

          {/* Step 3: Everything unlocked */}
          {payState === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5"
            >
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{currentPlan.label} Unlocked!</h4>
                <p className="text-gray-400 text-sm">Everything is yours. Download your resources below.</p>
              </div>

              {/* Certificate Preview */}
              <div className="rounded-xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="text-xs text-blue-400 font-semibold">Google Approved</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-yellow-500/70 mb-2 font-semibold">Certificate of Achievement</p>
                <p className="text-gray-400 text-xs mb-1">This certifies that</p>
                <p className="text-2xl font-bold text-yellow-300" style={{ fontFamily: 'serif' }}>{userData.name}</p>
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mx-auto my-2" />
                <p className="text-gray-500 text-xs">has completed the SkillsXAI AI Masterclass</p>
                <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-medium">AI Fundamentals</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-medium">Prompt Engineering</span>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-300 text-[10px] font-medium">AI Agents</span>
                </div>
                <p className="text-[10px] text-gray-600 mt-2 italic">Add this to your Resume, CV & LinkedIn profile</p>
                {certUrl && (
                  <div className="mt-3 flex items-center justify-center gap-2 p-2 rounded-lg bg-green-500/5 border border-green-500/15">
                    <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <a href={certUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/30 truncate">
                      {certUrl}
                    </a>
                    <button
                      onClick={() => navigator.clipboard.writeText(certUrl)}
                      className="text-[9px] text-gray-500 hover:text-white px-1.5 py-0.5 rounded bg-white/5 border border-white/10 flex-shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>

              {/* Certificate Download */}
              <button
                onClick={handleDownloadCertificate}
                disabled={downloading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg hover:from-yellow-400 hover:to-orange-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {downloading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Generating…</>
                ) : (
                  <><Award className="w-5 h-5" /> Download Certificate</>
                )}
              </button>

              {/* Add to LinkedIn */}
              <a
                href={linkedInAddUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#0a66c2] text-white font-bold text-sm hover:bg-[#004182] transition-all shadow-[0_0_20px_rgba(10,102,194,0.25)] flex items-center justify-center gap-2.5"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Add Certificate to LinkedIn
              </a>

              {/* LinkedIn instructions */}
              <div className="p-3 rounded-xl border border-[#0a66c2]/15 bg-[#0a66c2]/5">
                <p className="text-xs font-bold text-white mb-2">After clicking &quot;Add to LinkedIn&quot;:</p>
                <div className="space-y-1.5 text-[11px] text-gray-400">
                  <p className="flex items-start gap-2"><span className="text-[#0a66c2] font-bold mt-px">1.</span> Certificate name, issuer & credential ID are auto-filled</p>
                  <p className="flex items-start gap-2"><span className="text-[#0a66c2] font-bold mt-px">2.</span> Click <span className="text-white font-medium">&quot;+ Add skill&quot;</span> → type <span className="text-blue-300">Artificial Intelligence</span>, <span className="text-blue-300">Prompt Engineering</span>, <span className="text-blue-300">AI Agents</span></p>
                  <p className="flex items-start gap-2"><span className="text-[#0a66c2] font-bold mt-px">3.</span> Click <span className="text-white font-medium">&quot;+ Add media&quot;</span> → upload your downloaded certificate PDF</p>
                  <p className="flex items-start gap-2"><span className="text-[#0a66c2] font-bold mt-px">4.</span> Hit <span className="text-white font-medium">&quot;Save&quot;</span> — done! Your certificate is now on your profile</p>
                </div>
              </div>

              {/* Downloadable Resources */}
              <div className="space-y-2.5">
                <p className="text-sm font-bold text-white flex items-center gap-2"><Download className="w-4 h-4 text-blue-400" /> Your {selectedPlan === 'ultimate' ? 'Ultimate' : 'Pro'} Resources</p>
                {[
                  { title: 'Claude AI Cheat Sheet — 50+ Power Prompts', file: 'claude-ai-cheatsheet.html', color: 'from-orange-500 to-red-500' },
                  { title: 'Free AI APIs & NVIDIA NIM Guide', file: 'free-ai-apis-guide.html', color: 'from-green-500 to-emerald-600' },
                  { title: 'AI Career Roadmap 2026 — India Edition', file: 'ai-career-roadmap-2026.html', color: 'from-pink-500 to-purple-600' },
                  ...(selectedPlan === 'ultimate' ? [{ title: 'AI Agent Masterclass Sheet', file: 'Ai Agent Masterclass Sheet - Sheet1.csv', color: 'from-blue-500 to-cyan-500' }] : []),
                ].map((doc, i) => (
                  <button
                    key={i}
                    onClick={() => handleDownloadDoc(doc.file)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all text-left group"
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${doc.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1">{doc.title}</span>
                    <Download className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>

              {/* Upgrade to Ultimate (shown only if user paid for Pro) */}
              {paidPlan === 'pro' && selectedPlan === 'pro' && (
                <button
                  onClick={() => handlePlanSelect('ultimate')}
                  className="w-full p-4 rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all text-left flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">Upgrade to Ultimate Package — ₹299</p>
                    <p className="text-xs text-gray-500">Get the AI Agent Masterclass Sheet + bonus resources</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </button>
              )}

              {/* Counselling & Masterclass */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-green-500/15 bg-green-500/5 text-center">
                  <Phone className="w-5 h-5 text-green-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white mb-1">Free Career Counselling</p>
                  <p className="text-[10px] text-gray-500 mb-2">We&apos;ll call you within 48 hours</p>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold">SCHEDULED</span>
                </div>
                <div className="p-4 rounded-xl border border-blue-500/15 bg-blue-500/5 text-center">
                  <Bot className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white mb-1">AI Agents Masterclass</p>
                  <p className="text-[10px] text-gray-500 mb-2">Recording sent to your email</p>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold">SENDING</span>
                </div>
              </div>

              <p className="text-center text-xs text-gray-500">
                Open any HTML file in browser → Print → Save as PDF.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Back */}
      <button
        onClick={onBack}
        className="w-full py-3 rounded-xl border border-white/10 text-gray-400 font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Feedback
      </button>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function MasterclassPage() {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<UserData>({ name: '', email: '', phone: '' })
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    overall: 0,
    content: 0,
    instructor: 0,
    recommend: 0,
  })
  const saveRegistration = async () => {
    try {
      await fetch('/api/masterclass/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          feedback: {
            overall: feedbackData.overall,
            content: feedbackData.content,
            instructor: feedbackData.instructor,
            recommend: feedbackData.recommend,
          },
        }),
      })
    } catch {
      /* silent */
    }
  }

  const handleFeedbackNext = () => {
    saveRegistration()
    setStep(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] to-[#0f172a] py-12 px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="fixed w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl -top-40 -left-40 pointer-events-none" />
      <div className="fixed w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-3xl -bottom-40 -right-40 pointer-events-none" />

      {/* Logo */}
      <div className="text-center mb-8">
        <a href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            SkillsXAI
          </span>
          <span>Masterclass Portal</span>
        </a>
      </div>

      <div className="max-w-3xl mx-auto">
        <ProgressBar current={step} />

        <AnimatePresence mode="wait">
          {step === 0 && (
            <RegistrationStep
              key="step0"
              data={userData}
              onChange={setUserData}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <FeedbackStep
              key="step1"
              data={feedbackData}
              onChange={setFeedbackData}
              onNext={handleFeedbackNext}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <RewardsStep
              key="step2"
              userData={userData}
              onBack={() => setStep(1)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
