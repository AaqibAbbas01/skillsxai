'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  TestTube2,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Target,
  Rocket,
  Award,
  Clock,
  TrendingUp,
  MessageSquare,
  FileText,
  Shield,
  Zap,
  Brain,
  Code2,
  Database,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  IndianRupee,
} from 'lucide-react'

const FloatingBrain3D = dynamic(() => import('@/components/3d/FloatingBrain3D'), { ssr: false })
import RegistrationModal from '@/components/ui/RegistrationModal'

// ─── Data ──────────────────────────────────────────────────────────────────

const courses = [
  {
    id: 'workflow-automation',
    icon: Bot,
    emoji: '🤖',
    title: 'Workflow Automation with AI Agents',
    tagline: 'Build intelligent automation pipelines',
    duration: '8 Weeks',
    level: 'Beginner → Advanced',
    salary: '₹4L – ₹15L / year',
    tools: ['n8n', 'Make.com', 'Zapier', 'LangChain', 'OpenAI API', 'Python'],
    highlights: [
      'Build end-to-end automated workflows with AI',
      'Create autonomous AI agents with memory & reasoning',
      'Connect 500+ apps without writing backend code',
      'Deploy production-ready automation pipelines on cloud',
      'Build custom chatbots, lead gen bots & support agents',
    ],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-[#1a0530] to-[#2a0840]',
    borderColor: 'border-purple-500/25',
    glowColor: 'hover:shadow-[0_0_60px_rgba(139,92,246,0.2)]',
    textColor: 'text-purple-400',
    href: '/professionals/courses/workflow-automation',
  },
  {
    id: 'qa-automation',
    icon: TestTube2,
    emoji: '🧪',
    title: 'QA Automation',
    tagline: 'Master modern test automation at scale',
    duration: '8 Weeks',
    level: 'Beginner → Advanced',
    salary: '₹5L – ₹18L / year',
    tools: ['Playwright', 'Cypress', 'Jest', 'GitHub Actions', 'Postman', 'Selenium'],
    highlights: [
      'Write robust E2E tests with Playwright & Cypress',
      'API testing & contract testing with Postman/Newman',
      'CI/CD pipeline integration with GitHub Actions',
      'Page Object Model & design patterns for scalable tests',
      'Performance, accessibility & visual regression testing',
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-[#020d20] to-[#041830]',
    borderColor: 'border-blue-500/25',
    glowColor: 'hover:shadow-[0_0_60px_rgba(59,130,246,0.2)]',
    textColor: 'text-blue-400',
    href: '/professionals/courses/qa-automation',
  },
  {
    id: 'data-analyst',
    icon: BarChart3,
    emoji: '📊',
    title: 'Data Analyst',
    tagline: 'Transform data into business intelligence',
    duration: '10 Weeks',
    level: 'Beginner → Advanced',
    salary: '₹4L – ₹14L / year',
    tools: ['Python', 'SQL', 'Power BI', 'Tableau', 'Pandas', 'Excel'],
    highlights: [
      'Data wrangling & cleaning with Pandas & NumPy',
      'Advanced SQL for analytics & reporting',
      'Interactive dashboards with Power BI & Tableau',
      'Statistical analysis, hypothesis testing & ML basics',
      'Real-world capstone project with live dataset',
    ],
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'from-[#021a1a] to-[#042828]',
    borderColor: 'border-cyan-500/25',
    glowColor: 'hover:shadow-[0_0_60px_rgba(6,182,212,0.2)]',
    textColor: 'text-cyan-400',
    href: '/professionals/courses/data-analyst',
  },
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    emoji: '📣',
    title: 'Digital Marketing with AI',
    tagline: 'AI-powered marketing strategies that convert',
    duration: '8 Weeks',
    level: 'Beginner → Advanced',
    salary: '₹4L – ₹12L / year',
    tools: ['ChatGPT', 'Google Ads', 'Meta Ads', 'SEO Tools', 'Canva AI', 'HubSpot'],
    highlights: [
      'Master AI-driven SEO, SEM & content marketing',
      'Run high-ROI Google & Meta ad campaigns with AI',
      'Automate social media with AI scheduling tools',
      'Build marketing funnels & lead gen pipelines',
      'Analytics, A/B testing & conversion optimization',
    ],
    color: 'from-orange-500 to-amber-500',
    bgColor: 'from-[#1a0e00] to-[#2a1800]',
    borderColor: 'border-orange-500/25',
    glowColor: 'hover:shadow-[0_0_60px_rgba(249,115,22,0.2)]',
    textColor: 'text-orange-400',
    href: '/professionals/courses/digital-marketing',
  },
]

const placementSteps = [
  {
    step: '01',
    title: 'Resume & LinkedIn Makeover',
    desc: 'Our career coaches rebuild your resume from scratch using ATS-friendly templates and optimize your LinkedIn profile to attract top recruiters.',
    icon: FileText,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    step: '02',
    title: 'Technical Mock Interviews',
    desc: 'Practice with 5+ live mock interviews simulating real company interviews. Get structured feedback after each session to sharpen your answers.',
    icon: MessageSquare,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    step: '03',
    title: 'Exclusive Job Referrals',
    desc: 'Get direct referrals to our hiring partner companies — IT firms, startups, banks, and MNCs. Skip the queue with internal recommendations.',
    icon: Users,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    step: '04',
    title: 'Offer Letter Support',
    desc: "We negotiate on your behalf and keep your case open until you hold a confirmed offer letter. Your success is our success — literally.",
    icon: Award,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
]

const whyUs = [
  {
    icon: Brain,
    title: 'AI-First Curriculum',
    desc: 'Every course integrates the latest AI tools so you graduate ahead of the industry, not behind it.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Code2,
    title: 'Real Industry Projects',
    desc: 'Build 3–5 production-grade projects for a portfolio that makes hiring managers stop scrolling.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Users,
    title: '1:1 Live Mentorship',
    desc: 'Dedicated weekly mentor sessions with professionals who work at top companies — not just theory.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Shield,
    title: '100% Placement Guarantee',
    desc: "Complete the course, meet the requirements, and get placed — or we refund your fees. No fine print.",
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Industry-Led Curriculum',
    desc: 'Curriculum co-designed with hiring managers updated every quarter to match current job requirements.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: Clock,
    title: 'Flexible Batches',
    desc: 'Weekday & weekend batches available. Live classes recorded and accessible for 6 months.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
]

const testimonials = [
  {
    quote:
      "I was a manual tester for 4 years with zero automation experience. After the QA Automation course, I cracked interviews at 3 MNCs simultaneously and joined with an 80% salary hike. The mock interviews were game-changing.",
    author: 'Rahul Sharma',
    role: 'QA Automation Engineer',
    company: 'Wipro Technologies',
    hike: '80% Hike',
    rating: 5,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    quote:
      "The AI Agents course changed my entire career trajectory. Within 3 months of completing it, I was freelancing for international clients, building automation workflows, and earning 3x my previous salary.",
    author: 'Priya Kapoor',
    role: 'AI Automation Specialist',
    company: 'Freelance (US Clients)',
    hike: '3× Salary',
    rating: 5,
    color: 'from-purple-500 to-pink-500',
  },
  {
    quote:
      "Switched from a non-tech operations background to data analytics. The Power BI and Python projects I built in the course got me calls from 8 companies. Joined HDFC Bank within 45 days of completing the course.",
    author: 'Amit Verma',
    role: 'Data Analyst',
    company: 'HDFC Bank',
    hike: '65% Hike',
    rating: 5,
    color: 'from-cyan-500 to-teal-500',
  },
]

const faqs = [
  {
    q: 'What exactly is the 100% placement guarantee?',
    a: "We commit to placing you in a relevant role before your course ends. If you complete all assignments, attend mock interviews, and submit job applications but don't receive an offer within 60 days of completion, we provide a full fee refund. Our current placement rate is 100%.",
  },
  {
    q: 'Do I need prior technical experience to join?',
    a: 'No prior experience is required! Our courses start from absolute basics. You only need a laptop, stable internet, and the drive to learn. We have successfully placed students from HR, sales, operations, and even homemakers.',
  },
  {
    q: 'Are the courses online or offline?',
    a: 'All courses are conducted live online via Zoom with screen sharing and hands-on labs. Sessions are recorded and accessible for 6 months. Doubt-clearing sessions are scheduled twice a week.',
  },
  {
    q: 'What are the fees and EMI options?',
    a: "All our professional courses are priced at ₹35,000 + GST. We offer 0% interest EMI over 3 or 6 months. Scholarships of up to 50% are available for students, freshers, and career-break candidates. Contact us to discuss.",
  },
  {
    q: 'How many hours per week do I need to commit?',
    a: 'Expect 15–20 hours per week — including 8 hours of live classes, plus assignments and projects. Weekend-only batches are available for working professionals who cannot commit weekdays.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function ProfessionalsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="relative">
      <RegistrationModal portal="professionals" />
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D bg */}
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0 opacity-60">
          <FloatingBrain3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-transparent to-dark-900 z-10" />
        <div className="hero-orb w-[500px] h-[500px] bg-purple-600/25 -top-40 -left-40" />
        <div className="hero-orb w-[400px] h-[400px] bg-pink-500/20 bottom-10 right-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Placement badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 mb-8"
            >
              <BadgeCheck className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-purple-200 font-medium">
                100% Placement Assistance · Guaranteed
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Upskill. </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Automate.
              </span>
              <br />
              <span className="text-white">Get Hired.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
              Industry-ready courses in AI Automation, QA Testing &amp; Data Analytics.
              Learn from experts, build real projects, and land your dream job — backed by
              our <span className="text-purple-400 font-semibold">100% placement guarantee</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="#courses"
                className="inline-flex items-center gap-2 text-lg px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/20"
              >
                <PlayCircle className="w-5 h-5" />
                Explore Courses
              </Link>
              <Link href="/contact" className="btn-secondary flex items-center gap-2 text-lg">
                Talk to Advisor
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { value: '100%', label: 'Placement Rate' },
                { value: '4', label: 'Job-Ready Courses' },
                { value: '1:1', label: 'Mentorship' },
                { value: '8–10w', label: 'Avg. Duration' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {s.value}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-purple-500/50 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-purple-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Why SkillsXAI Pro ── */}
      <section className="py-24 relative bg-gradient-to-b from-dark-900/50 to-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Why </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                SkillsXAI Pro?
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              We don&apos;t just teach — we make sure you get placed. Here&apos;s how we do it differently.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyUs.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-card p-7 group">
                <div
                  className={`w-14 h-14 mb-5 rounded-xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Courses ── */}
      <section id="courses" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Courses
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Four high-demand, career-transforming programs with guaranteed placement support
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {courses.map((course, index) => (
              <motion.div key={course.id} variants={itemVariants} className="group">
                <div
                  className={`relative h-full overflow-hidden rounded-3xl border ${course.borderColor} bg-gradient-to-br ${course.bgColor} p-7 transition-all duration-500 ${course.glowColor} hover:-translate-y-1`}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/3 to-transparent rounded-3xl pointer-events-none" />

                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <course.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-semibold ${course.textColor} mb-1`}>
                        {course.duration}
                      </div>
                      <div className="text-xs text-gray-500">{course.level}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                  <p className={`text-sm font-medium ${course.textColor} mb-4`}>{course.tagline}</p>

                  <ul className="space-y-2 mb-6">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-gray-400 text-sm">
                        <CheckCircle2 className={`w-4 h-4 ${course.textColor} flex-shrink-0 mt-0.5`} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Salary */}
                  <div className="flex items-center gap-2 mb-6 py-3 px-4 rounded-xl bg-white/5 border border-white/10">
                    <IndianRupee className={`w-4 h-4 ${course.textColor}`} />
                    <span className="text-gray-300 text-sm font-medium">Expected Salary: </span>
                    <span className={`font-bold text-sm ${course.textColor}`}>{course.salary}</span>
                  </div>

                  <Link
                    href={course.href}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${course.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity`}
                  >
                    View Course Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Placement Process ── */}
      <section id="placement" className="py-24 relative bg-gradient-to-b from-dark-800/30 to-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm mb-6">
              <BadgeCheck className="w-4 h-4" />
              100% Placement Assistance — How It Works
            </motion.div>
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">We Don&apos;t Stop Until </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                You&apos;re Hired
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Our dedicated placement team works with you from day one — not just after graduation.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {placementSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`relative glass-card p-7 border ${step.border}`}
              >
                <div className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold">
                  STEP {step.step}
                </div>
                <div className={`w-12 h-12 mb-5 rounded-xl ${step.bg} flex items-center justify-center mt-2`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Placement guarantee banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">100% Placement Guarantee</h3>
                  <p className="text-white/75 max-w-lg">
                    Complete the course, pass our evaluations, and get placed — or receive a full
                    fee refund. We have maintained a 100% placement record since inception.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Hiring Domain Highlights ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-14"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Our Graduates Work At</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Placed across IT services, fintech, startups, MNCs, and global remote roles
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { category: 'IT Services', companies: 'Wipro · Infosys · TCS · HCL', icon: '🏢', color: 'border-blue-500/20 bg-blue-500/5' },
              { category: 'Fintech & Banking', companies: 'HDFC · Paytm · Razorpay · PhonePe', icon: '🏦', color: 'border-green-500/20 bg-green-500/5' },
              { category: 'Tech Startups', companies: 'SaaS · No-Code · AI Startups', icon: '🚀', color: 'border-purple-500/20 bg-purple-500/5' },
              { category: 'Global Remote', companies: 'US · UK · UAE · Singapore', icon: '🌍', color: 'border-cyan-500/20 bg-cyan-500/5' },
              { category: 'E-Commerce', companies: 'Flipkart · Meesho · Nykaa', icon: '🛒', color: 'border-orange-500/20 bg-orange-500/5' },
              { category: 'Healthcare Tech', companies: 'Apollo · Practo · 1mg', icon: '🏥', color: 'border-pink-500/20 bg-pink-500/5' },
              { category: 'EdTech', companies: 'BYJU\'S · Unacademy · upGrad', icon: '📚', color: 'border-yellow-500/20 bg-yellow-500/5' },
              { category: 'Consulting', companies: 'Deloitte · Accenture · Capgemini', icon: '💼', color: 'border-teal-500/20 bg-teal-500/5' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`rounded-2xl border ${item.color} p-5 text-center`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{item.category}</div>
                <div className="text-xs text-gray-500">{item.companies}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 relative bg-gradient-to-b from-dark-800/30 to-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Real Success </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Stories
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Don&apos;t take our word for it — hear from professionals who transformed their careers
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, index) => (
              <motion.div key={index} variants={itemVariants} className="glass-card p-8 relative">
                {/* Salary hike badge */}
                <div
                  className={`absolute -top-4 right-6 px-3 py-1.5 rounded-full bg-gradient-to-r ${t.color} text-white text-xs font-bold`}
                >
                  {t.hike}
                </div>

                <div className="flex gap-1 mb-4 mt-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.author}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                    <div className="text-xs text-gray-500">@ {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Frequently Asked </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Questions
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-400 leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-10 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent pointer-events-none" />
              <div className="relative">
                <Rocket className="w-12 h-12 mx-auto mb-6 text-purple-400" />
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Start Your </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Career Transformation
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                  Join hundreds of professionals who have already changed their careers with
                  SkillsXAI. The next batch starts soon — seats are limited.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-lg px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/20"
                  >
                    <Zap className="w-5 h-5" />
                    Enroll Now
                  </Link>
                  <Link href="#courses" className="btn-secondary flex items-center gap-2 text-lg">
                    <GraduationCap className="w-5 h-5" />
                    Browse Courses
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
