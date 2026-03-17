'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TestTube2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  Users,
  Zap,
  BadgeCheck,
  Rocket,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

const curriculum = [
  {
    week: 'Week 1–2',
    title: 'Testing Fundamentals & Cypress Basics',
    topics: [
      'Software testing lifecycle: unit, integration, E2E',
      'Cypress setup, configuration, and folder structure',
      'Writing your first Cypress test: selectors & assertions',
      'cy.intercept() for network stubbing & mocking',
      'Cypress Dashboard: recordings & debugging',
    ],
  },
  {
    week: 'Week 3–4',
    title: 'Playwright Deep Dive',
    topics: [
      'Playwright vs Cypress — when to use which',
      'Page Object Model (POM) design pattern',
      'Cross-browser testing: Chromium, Firefox, Safari',
      'Parallel execution & sharding for speed',
      'Tracing, screenshots & video on failure',
    ],
  },
  {
    week: 'Week 5–6',
    title: 'API & Contract Testing',
    topics: [
      'REST API testing fundamentals with Postman',
      'Automated API tests with Newman & GitHub Actions',
      'Contract testing with Pact.js',
      'Authentication: JWT, OAuth in API tests',
      'Data-driven testing with CSV / JSON fixtures',
    ],
  },
  {
    week: 'Week 7–8',
    title: 'CI/CD, Reporting & Real Projects',
    topics: [
      'GitHub Actions pipelines for automated test runs',
      'Allure & HTML reporting for stakeholders',
      'Visual regression testing with Playwright',
      'Accessibility testing with axe-core',
      'Capstone: Full test suite for e-commerce app',
    ],
  },
]

const tools = [
  { name: 'Playwright', icon: '🎭', desc: 'Microsoft E2E testing' },
  { name: 'Cypress', icon: '🌲', desc: 'Fast browser automation' },
  { name: 'Jest', icon: '🃏', desc: 'Unit & integration tests' },
  { name: 'Postman', icon: '📮', desc: 'API testing & docs' },
  { name: 'GitHub Actions', icon: '⚙️', desc: 'CI/CD pipelines' },
  { name: 'Selenium', icon: '🕸️', desc: 'Classic browser automation' },
  { name: 'Newman', icon: '🔄', desc: 'Postman CLI runner' },
  { name: 'Allure', icon: '📊', desc: 'Beautiful test reports' },
]

const projects = [
  {
    title: 'E-Commerce Test Suite',
    desc: 'Complete E2E test coverage for a live e-commerce site — product search, cart, checkout, payment, order tracking.',
    tags: ['Playwright', 'POM', 'GitHub Actions'],
  },
  {
    title: 'API Automation Framework',
    desc: 'Automated API test suite for a REST API — CRUD operations, auth, error scenarios, data-driven tests.',
    tags: ['Postman', 'Newman', 'Pact.js'],
  },
  {
    title: 'CI/CD Testing Pipeline',
    desc: 'Full CI/CD pipeline that runs tests on every PR, generates reports, and blocks merges on failures.',
    tags: ['GitHub Actions', 'Allure', 'Cypress'],
  },
]

const careerRoles = [
  { role: 'QA Automation Engineer', salary: '₹5L – ₹14L', demand: 'Very High' },
  { role: 'SDET (Software Dev in Test)', salary: '₹7L – ₹18L', demand: 'Very High' },
  { role: 'Test Lead / Manager', salary: '₹10L – ₹24L', demand: 'High' },
  { role: 'DevOps / QA Engineer', salary: '₹8L – ₹20L', demand: 'Very High' },
  { role: 'Freelance QA Consultant', salary: '$25–60/hr', demand: 'High' },
]

export default function QAAutomationPage() {
  const [openWeek, setOpenWeek] = useState<number | null>(0)

  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="hero-orb w-[500px] h-[500px] bg-blue-600/20 -top-40 -left-40" />
        <div className="hero-orb w-[400px] h-[400px] bg-cyan-500/15 bottom-0 right-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/professionals"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-6">
                <TestTube2 className="w-3.5 h-3.5" /> QA Automation · Testing Engineering
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">QA Automation</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  with Playwright & Cypress
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Become a highly sought-after QA Automation Engineer. Master Playwright and
                Cypress, build bulletproof CI/CD pipelines, and learn API testing skills
                that companies pay premium salaries for.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Clock, label: '8 Weeks', sub: 'Duration' },
                  { icon: Users, label: '15–20 hrs/wk', sub: 'Commitment' },
                  { icon: BadgeCheck, label: '100%', sub: 'Placement' },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-4 text-center">
                    <item.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                    <div className="font-bold text-white text-lg">{item.label}</div>
                    <div className="text-gray-500 text-xs">{item.sub}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Zap className="w-5 h-5" /> Enroll Now
                </Link>
                <Link href="/contact" className="btn-secondary flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Talk to Advisor
                </Link>
              </div>
            </div>

            {/* Course card */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8 border border-blue-500/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <TestTube2 className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
                    Enrolling Now
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-gray-400 text-sm">Course Fee</span>
                    <span className="text-white font-bold">₹35,000 + GST</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-gray-400 text-sm">EMI Option</span>
                    <span className="text-green-400 font-semibold">0% · 3 or 6 months</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-gray-400 text-sm">Batch Size</span>
                    <span className="text-white font-semibold">Max 20 students</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-400 text-sm">Next Batch</span>
                    <span className="text-blue-400 font-semibold">March 2026</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {[
                    '8-week live online training',
                    '1:1 weekly mentorship sessions',
                    '3 real-world automation projects',
                    'Resume & LinkedIn makeover',
                    '100% placement assistance',
                    '6-month recording access',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-gray-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all"
                >
                  Apply for This Course <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section className="py-20 relative bg-gradient-to-b from-dark-900/50 to-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">
            <span className="text-white">Course </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Curriculum</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {curriculum.map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden border border-blue-500/15"
              >
                <button
                  onClick={() => setOpenWeek(openWeek === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold flex-shrink-0">
                      {module.week}
                    </span>
                    <span className="font-semibold text-white">{module.title}</span>
                  </div>
                  {openWeek === i ? (
                    <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openWeek === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="px-6 pb-6 space-y-2">
                        {module.topics.map((topic, j) => (
                          <li key={j} className="flex items-start gap-3 text-gray-400 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">
            <span className="text-white">Tools You&apos;ll </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Master</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-5 text-center group hover:border-blue-500/40 transition-colors"
              >
                <div className="text-3xl mb-3">{tool.icon}</div>
                <div className="font-bold text-white mb-1">{tool.name}</div>
                <div className="text-gray-500 text-xs">{tool.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="py-20 relative bg-gradient-to-b from-dark-800/30 to-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">
            <span className="text-white">Projects You&apos;ll </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Build</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-7 border border-blue-500/15"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Outcomes ── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">
            <span className="text-white">Career </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Outcomes</span>
          </h2>
          <div className="overflow-hidden rounded-2xl border border-blue-500/20">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-500/10">
                  <th className="text-left py-4 px-6 text-blue-300 font-semibold text-sm">Role</th>
                  <th className="text-left py-4 px-6 text-blue-300 font-semibold text-sm">Expected Salary</th>
                  <th className="text-left py-4 px-6 text-blue-300 font-semibold text-sm">Demand</th>
                </tr>
              </thead>
              <tbody>
                {careerRoles.map((role, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/3 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{role.role}</td>
                    <td className="py-4 px-6 text-green-400 font-semibold">{role.salary}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${role.demand === 'Very High' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                          'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                        {role.demand}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 relative">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="glass-card p-10 border border-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
            <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Become a QA Pro?</h2>
            <p className="text-gray-400 mb-8">March 2026 batch is filling up fast. Apply now.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
            >
              Apply Now — March 2026 Batch <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
