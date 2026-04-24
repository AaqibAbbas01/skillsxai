'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/masterclass')) return
    const container = containerRef.current
    if (!container) return

    // Create particles
    const particleCount = 50
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100 + 100}%`
      particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`)
      particle.style.setProperty('--ty', `${-Math.random() * 800 - 200}px`)
      particle.style.animationDelay = `${Math.random() * 15}s`
      particle.style.animationDuration = `${15 + Math.random() * 10}s`
      
      // Vary particle size and color
      const size = 2 + Math.random() * 4
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      
      const colors = [
        'rgba(59, 130, 246, 0.6)',
        'rgba(6, 182, 212, 0.6)',
        'rgba(139, 92, 246, 0.6)',
      ]
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      
      container.appendChild(particle)
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return <div ref={containerRef} className="particles-bg" />
}
