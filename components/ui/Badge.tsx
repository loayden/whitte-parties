import React from 'react'

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-[rgba(217,160,91,0.08)] border border-[rgba(217,160,91,0.08)]">{children}</span>
  )
}
