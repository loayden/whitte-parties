"use client"
import React from 'react'
import IconButton from '../ui/IconButton'


export default function TopBar() {
  return (
    <header className="app-topbar safe-top">
      <div className="app-topbar-inner">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(217,160,91,0.16)] flex items-center justify-center text-[11px] tracking-[0.28em] uppercase">BW</div>
          <div>
            <div className="font-display text-lg leading-none">Bedouin</div>
            <div className="text-[10px] tracking-[0.28em] uppercase text-linen/45 mt-1">White Parties</div>
          </div>
        </div>
        <div>
        <IconButton>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="#F8F3E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </IconButton>
        </div>
      </div>
    </header>
  )
}
