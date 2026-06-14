import React from 'react'
import KilimBorder from '../patterns/KilimBorder'

export default function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="glass-scrim" />
      </div>
      <div className={`glass p-4 relative z-10`}>{children}
      </div>
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none">
        <KilimBorder />
      </div>
    </div>
  )
}
