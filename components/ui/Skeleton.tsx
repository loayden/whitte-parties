import React from 'react'

export default function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-[rgba(255,255,255,0.03)] animate-pulse ${className}`} />
}
