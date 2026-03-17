'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUpRight
} from 'lucide-react'

const footerLinks = {
  schools: [
    { name: 'School Program', href: '/schools' },
    { name: 'Curriculum', href: '/activities' },
    { name: 'Partner With Us', href: '/contact' },
    { name: 'Terms & Conditions', href: '/terms' },
  ],
  professionals: [
    { name: 'All Courses', href: '/professionals' },
    { name: 'AI Agents Course', href: '/professionals/courses/workflow-automation' },
    { name: 'QA Automation', href: '/professionals/courses/qa-automation' },
    { name: 'Data Analyst', href: '/professionals/courses/data-analyst' },
    { name: 'Digital Marketing', href: '/professionals/courses/digital-marketing' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/contact' },
  ],
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-primary-500/20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-32 h-10"
              >
                <Image
                  src="/logo.svg"
                  alt="SkillsXAI"
                  width={128}
                  height={40}
                  className="object-contain"
                />
              </motion.div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              India&apos;s leading AI learning platform — empowering school students with AI
              literacy and helping professionals upskill with 100% placement assistance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@skillsxai.com" className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>info@skillsxai.com</span>
              </a>
              <a href="tel:+918285347868" className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91 8285347868</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Plot 28, Sheesham Courtyard, Sainik Farm, New Delhi 110030</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Schools</h3>
            <ul className="space-y-3">
              {footerLinks.schools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Pro Courses</h3>
            <ul className="space-y-3">
              {footerLinks.professionals.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 SkillsXAI. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-400/50 transition-all"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
