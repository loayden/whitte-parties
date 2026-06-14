import React from 'react'

export default function KilimBorder({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 6" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="#D9A05B" opacity="0.08">
        <rect x="0" y="2" width="100" height="2" rx="1" />
      </g>
    </svg>
  )
}
