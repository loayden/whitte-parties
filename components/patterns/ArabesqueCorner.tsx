import React from 'react'

export default function ArabesqueCorner({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#D9A05B" strokeWidth="0.8" opacity="0.12">
        <path d="M2 22 C8 12, 18 8, 38 2" />
      </g>
    </svg>
  )
}
