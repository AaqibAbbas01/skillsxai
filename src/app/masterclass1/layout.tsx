import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Masterclass — SkillsXAI',
  description: 'Claim your free masterclass resources and certificate.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MasterclassLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // No Navbar / Footer — private funnel page
  return <>{children}</>
}
