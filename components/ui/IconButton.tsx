"use client"
import React from 'react'

export default function IconButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="p-2 rounded-md glass hover:scale-[1.03]">
      {children}
    </button>
  )
}
