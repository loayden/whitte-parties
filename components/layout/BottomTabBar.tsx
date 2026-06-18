"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomTabBar() {
  const pathname = usePathname()

  const tabs = [
    { href: '/', label: 'Home', icon: <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" /> },
    { href: '/events', label: 'Events', icon: <path d="M3 12h18" stroke="currentColor" strokeWidth="1" /> },
    { href: '/gallery', label: 'Gallery', icon: <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1" /> },
  ]

  return (
    <nav aria-label="Main navigation" className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
        const isFeatured = tab.label === 'Gallery'

        return (
          <Link key={tab.href} href={tab.href} aria-label={tab.label} className={`nav-item ${isActive ? 'active' : ''} ${isFeatured ? 'featured' : ''}`}>
            <svg className="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="none">{tab.icon}</svg>
            <span>{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
