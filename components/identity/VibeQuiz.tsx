"use client"
import React from 'react'

const options = [
  { id: 'dawn', label: 'Dawn' },
  { id: 'golden', label: 'Golden Hour' },
  { id: 'dusk', label: 'Dusk' },
  { id: 'midnight', label: 'Midnight' }
]

export default function VibeQuiz({ onFinish }: { onFinish: (seed: string) => void }) {
  const [choice, setChoice] = React.useState<string | null>(null)

  return (
    <div className="space-y-4">
      {options.map((o) => (
        <button key={o.id} onClick={() => setChoice(o.id)} className={`w-full p-3 rounded ${choice === o.id ? 'ring-2 ring-amber-300' : 'glass'}`}>
          {o.label}
        </button>
      ))}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-amber-300 rounded-md" onClick={() => onFinish(choice || 'default')}>Finish</button>
      </div>
    </div>
  )
}
