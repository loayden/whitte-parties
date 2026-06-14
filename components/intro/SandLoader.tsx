"use client"
import React from 'react'

export default function SandLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber to-gold animate-pulse opacity-90 flex items-center justify-center"> 
          <div className="w-12 h-12 rounded-full bg-[rgba(11,10,8,0.6)]" />
        </div>
        <div className="text-sm">Loading the desert...</div>
      </div>
    </div>
  )
}
