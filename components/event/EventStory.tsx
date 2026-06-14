"use client"
import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountdownTimer from './CountdownTimer'

gsap.registerPlugin(ScrollTrigger)

export default function EventStory({ event }: { event: any }) {
  const heroRef = React.useRef<HTMLDivElement | null>(null)
  const scrubRef = React.useRef<any>(null)

  React.useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=600',
          scrub: true,
          pin: true
        }
      })

      tl.to(heroRef.current, { scale: 0.98, ease: 'power1.out' })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div>
      <div ref={heroRef} className="h-[60vh] rounded-lg mb-6 overflow-hidden relative">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${event.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute left-6 bottom-6">
          <h1 className="font-display text-3xl">{event.title}</h1>
          <div className="mt-2"><CountdownTimer date={event.date} /></div>
        </div>
      </div>

      <section className="space-y-8">
        <div className="glass p-6">
          <h3 className="font-medium">The Setting</h3>
          <p className="mt-2">{event.description}</p>
        </div>

        <div className="glass p-6">
          <h3 className="font-medium">The Lineup</h3>
          <div className="mt-3 flex gap-3 overflow-x-auto">
            {event.lineupSlugs.map((a: string) => (
              <div key={a} className="w-44 p-3 glass rounded">
                <div className="font-medium">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed left-0 right-0 bottom-4 px-4">
        <div className="max-w-4xl mx-auto glass rounded-pill p-3 flex items-center justify-between">
          <div>
            <div className="font-mono text-sm">From ${event.priceFrom}</div>
            <div className="text-sm">{event.city}</div>
          </div>
          <div>
            <a href={`/app/events/${event.slug}/rsvp`} className="px-4 py-2 bg-amber-300 text-midnight rounded-md">Reserve Your Spot</a>
          </div>
        </div>
      </div>
    </div>
  )
}
