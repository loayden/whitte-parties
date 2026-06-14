import React from 'react'

export default function StarGrid({ className = 'absolute inset-0 pointer-events-none' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="star" width="20" height="20" patternUnits="userSpaceOnUse">
          <g stroke="#D9A05B" strokeWidth="0.5" fill="none" opacity="0.06">
            <path d="M10 3 L12 8 L18 8 L13 11 L15 17 L10 13 L5 17 L7 11 L2 8 L8 8 Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#star)" />
    </svg>
  )
}
