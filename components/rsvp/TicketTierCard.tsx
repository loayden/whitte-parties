"use client"
import React from 'react'
import clsx from 'clsx'

export default function TicketTierCard({ tier, selected, onSelect }: { tier: string; selected?: boolean; onSelect: () => void }) {
  return (
    <div onClick={onSelect} className={clsx('p-4 rounded-md cursor-pointer', selected ? 'ring-2 ring-amber-300 scale-[1.02]' : 'hover:scale-[1.01]')}>
      <div className="font-medium">{tier}</div>
      <div className="font-mono text-sm">Details soon</div>
    </div>
  )
}
