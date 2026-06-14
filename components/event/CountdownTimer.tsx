"use client"
import React from 'react'

function getRemaining(targetDate: string) {
  const t = new Date(targetDate).getTime() - Date.now()
  if (t <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const seconds = Math.floor((t / 1000) % 60)
  const minutes = Math.floor((t / 1000 / 60) % 60)
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24)
  const days = Math.floor(t / (1000 * 60 * 60 * 24))
  return { days, hours, minutes, seconds }
}

export default function CountdownTimer({ date }: { date: string }) {
  const [time, setTime] = React.useState(() => getRemaining(date))

  React.useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(date)), 1000)
    return () => clearInterval(id)
  }, [date])

  return (
    <div className="inline-flex gap-3 font-mono text-sm">
      <div>{time.days}d</div>
      <div>{String(time.hours).padStart(2, '0')}h</div>
      <div>{String(time.minutes).padStart(2, '0')}m</div>
      <div>{String(time.seconds).padStart(2, '0')}s</div>
    </div>
  )
}
