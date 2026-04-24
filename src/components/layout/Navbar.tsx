'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, GraduationCap, Briefcase } from 'lucide-react'

const schoolNavItems = [
  { name: 'Home', href: '/schools' },
  { name: 'Curriculum', href: '/activities' },
  { name: 'Blog', href: '/blog' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const proNavItems = [
  { name: 'Home', href: '/professionals' },
  { name: 'Courses', href: '/professionals#courses' },
  { name: 'Placement', href: '/professionals#placement' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const gatewayNavItems = [
  { name: 'For Schools', href: '/schools' },
  { name: 'For Professionals', href: '/professionals' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const defaultNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Activities', href: '/activities' },
  { name: 'Blog', href: '/blog' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide Navbar entirely on private funnel pages
  if (pathname.startsWith('/masterclass')) return null

  const isGateway = pathname === '/'
  const isSchools = pathname.startsWith('/schools')
  const isPro = pathname.startsWith('/professionals')

  const navItems = isGateway
    ? gatewayNavItems
    : isSchools
    ? schoolNavItems
    : isPro
    ? proNavItems
    : defaultNavItems

  const accentColor = isPro ? 'text-purple-400' : 'text-primary-400'
  const accentGradient = isPro ? 'from-purple-500 to-pink-500' : 'from-primary-500 to-accent-cyan'

  const ctaLabel = isSchools ? 'Partner With Us' : isPro ? 'Enroll Now' : 'Get Started'
  const ctaHref = '/contact'
  const ctaClass = isPro
    ? 'text-sm px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all'
    : 'btn-primary text-sm'

  const isActive = (href: string) =>
    href === pathname || (href !== '/' && href !== '/professionals' && pathname.startsWith(href))

  // Portal switcher: which side is active
  const portalActive: 'students' | 'professionals' | null = isSchools
    ? 'students'
    : isPro
    ? 'professionals'
    : null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-32 h-10"
            >
              <Image src="/logo.svg" alt="SkillsXAI" width={128} height={40} className="object-contain" />
            </motion.div>
            {isSchools && (
              <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-medium">
                <GraduationCap className="w-3 h-3" /> Schools
              </span>
            )}
            {isPro && (
              <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-medium">
                <Briefcase className="w-3 h-3" /> Professionals
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Portal switcher pill — always visible */}
            <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 gap-0.5">
              <button
                onClick={() => router.push('/schools')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  portalActive === 'students'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Students
              </button>
              <button
                onClick={() => router.push('/professionals')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  portalActive === 'professionals'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Professionals
              </button>
            </div>

            <div className="w-px h-5 bg-white/10" />

            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="relative group">
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive(item.href) ? accentColor : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </span>
                <motion.span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r ${accentGradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: isActive(item.href) ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
            <Link href={ctaHref} className={ctaClass}>
              {ctaLabel}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg glass">
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="py-4 px-6 space-y-4">
              {/* Mobile portal switcher */}
              <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 gap-1 mb-2">
                <button
                  onClick={() => { router.push('/schools'); setIsOpen(false) }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    portalActive === 'students'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Students
                </button>
                <button
                  onClick={() => { router.push('/professionals'); setIsOpen(false) }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    portalActive === 'professionals'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Professionals
                </button>
              </div>
              <div className="border-t border-white/10 pt-2" />
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-lg font-medium transition-colors ${
                    isActive(item.href) ? accentColor : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link href={ctaHref} onClick={() => setIsOpen(false)} className={`block text-center mt-4 ${ctaClass}`}>
                {ctaLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
