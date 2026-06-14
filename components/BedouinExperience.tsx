'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Crown,
  Gem,
  GalleryHorizontal,
  Home,
  MapPin,
  Music2,
  Sparkles,
  UsersRound,
  X
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type View = 'home' | 'events' | 'gallery' | 'tickets' | 'profile'
type EventCategory = 'All' | 'VIP' | 'Desert' | 'White'

const photos = {
  nightMajlis: '/vibeup/vibeup-384.jpg',
  welcomeSign: '/vibeup/vibeup-36.jpg',
  barTeam: '/vibeup/vibeup-64.jpg',
  goldenDance: '/vibeup/vibeup-288.jpg',
  performerNight: '/vibeup/vibeup-381.jpg',
  crowdWhite: '/vibeup/vibeup-204.jpg',
  beachDance: '/vibeup/vibeup-199.jpg',
  stagePortrait: '/vibeup/vibeup-348.jpg',
  groupNight: '/vibeup/vibeup-349.jpg',
  guestCheckin: '/vibeup/vibeup-50.jpg',
  djStage: '/vibeup/vibeup-70.jpg',
  barService: '/vibeup/vibeup-16.jpg',
  grillSkewers: '/vibeup/vibeup-113.jpg',
  daytimeMajlis: '/vibeup/vibeup-51.jpg',
  violinDj: '/vibeup/vibeup-117.jpg',
  shawarmaChef: '/vibeup/vibeup-114.jpg',
  tentSuite: '/vibeup/vibeup-31.jpg',
  circleDance: '/vibeup/vibeup-192.jpg',
  beachPortrait: '/vibeup/vibeup-106.jpg'
}

const events = [
  {
    title: 'Desert Nights',
    category: 'VIP',
    city: 'Miami, FL',
    date: '2026-09-19T21:00:00-04:00',
    timeLabel: 'Sat, Sep 19, 9:00 PM',
    day: '19',
    month: 'SEP',
    image: photos.crowdWhite,
    tag: 'VIP Experience',
    price: '$250',
    description: 'A sunset-to-midnight white party with beachside majlis seating, live percussion, DJ sets, and premium table service.'
  },
  {
    title: 'White Oasis',
    category: 'White',
    city: 'Los Angeles, CA',
    date: '2026-10-02T20:30:00-07:00',
    timeLabel: 'Fri, Oct 2, 8:30 PM',
    day: '02',
    month: 'OCT',
    image: photos.tentSuite,
    tag: 'White Attire',
    price: '$190',
    description: 'A refined daytime escape built around private tent lounges, coastal views, curated vendors, and elegant white styling.'
  },
  {
    title: 'Bedouin Social',
    category: 'Desert',
    city: 'Coachella, CA',
    date: '2026-11-05T18:00:00-08:00',
    timeLabel: 'Thu, Nov 5, 6:00 PM',
    day: '05',
    month: 'NOV',
    image: photos.circleDance,
    tag: 'Elite Community',
    price: '$320',
    description: 'A community-led dance circle with live drums, Mediterranean food stations, and photo moments made for the golden hour.'
  },
  {
    title: 'Golden Majlis',
    category: 'VIP',
    city: 'Scottsdale, AZ',
    date: '2026-12-10T19:30:00-07:00',
    timeLabel: 'Thu, Dec 10, 7:30 PM',
    day: '10',
    month: 'DEC',
    image: photos.nightMajlis,
    tag: 'Dinner Ritual',
    price: '$280',
    description: 'A moonlit lounge experience with low seating, lanterns, grilled service, live entertainment, and slow luxury hospitality.'
  }
]

const gallery = [
  { title: 'Moonlit Majlis', type: 'Private Lounge', image: photos.nightMajlis, span: 'tall' },
  { title: 'White Energy', type: 'Golden Hour Dance', image: photos.goldenDance, span: 'wide' },
  { title: 'Hospitality Team', type: 'Mobile Bar', image: photos.barTeam, span: '' },
  { title: 'Stage Ritual', type: 'Live Performance', image: photos.performerNight, span: '' },
  { title: 'Beach Crowd', type: 'White Party', image: photos.crowdWhite, span: 'wide' },
  { title: 'Dance Circle', type: 'Live Drums', image: photos.circleDance, span: 'wide' },
  { title: 'Arrival Lounge', type: 'Tent Seating', image: photos.tentSuite, span: 'tall' },
  { title: 'Guest Portraits', type: 'Community', image: photos.groupNight, span: '' },
  { title: 'Coastal Setup', type: 'Daytime Majlis', image: photos.daytimeMajlis, span: '' },
  { title: 'Cuisine Station', type: 'Grill Service', image: photos.grillSkewers, span: '' },
  { title: 'Shawarma Craft', type: 'Live Food', image: photos.shawarmaChef, span: 'tall' },
  { title: 'Violin & DJ', type: 'Hybrid Music', image: photos.violinDj, span: '' },
  { title: 'Check-In Moment', type: 'Guest Flow', image: photos.guestCheckin, span: '' },
  { title: 'DJ Booth', type: 'Beach Sound', image: photos.djStage, span: '' },
  { title: 'Welcome Detail', type: 'Brand Moment', image: photos.welcomeSign, span: '' },
  { title: 'Bar Service', type: 'Premium Service', image: photos.barService, span: 'wide' },
  { title: 'Guest Connection', type: 'Beach Dance', image: photos.beachDance, span: '' },
  { title: 'Stage Friends', type: 'Night Social', image: photos.stagePortrait, span: '' },
  { title: 'Beach Portrait', type: 'Group Memory', image: photos.beachPortrait, span: 'wide' }
]

const signatureMoments = [
  {
    title: 'Arrival That Feels Hosted',
    text: 'Guests are guided into a white-dress-code world with wristband flow, photo moments, and warm hospitality from the first minute.',
    image: photos.guestCheckin
  },
  {
    title: 'Music With Cultural Texture',
    text: 'Deep house, live violin, percussion, and performance moments move the party from sunset elegance into high-energy night.',
    image: photos.violinDj
  },
  {
    title: 'Food, Lounge, And Service',
    text: 'Majlis seating, grilled stations, shawarma service, mobile bartending, and relaxed table moments keep the experience premium.',
    image: photos.shawarmaChef
  }
]

const partyFlow = [
  { step: '01', title: 'Sunset Arrival', text: 'White styling, beach atmosphere, wristbands, portraits, and welcome drinks.' },
  { step: '02', title: 'Majlis Social', text: 'Low seating, carpets, lanterns, food vendors, and easy conversation zones.' },
  { step: '03', title: 'Peak Energy', text: 'DJ sets, live musicians, dance circles, stage moments, and crowd interaction.' },
  { step: '04', title: 'Night Lounge', text: 'Moonlit seating, private groups, premium service, and a slower luxury close.' }
]

const nav = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/gallery', label: 'Gallery', icon: GalleryHorizontal, featured: true }
]

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = Math.max(0, new Date(target).getTime() - now)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)

  return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(date))
}

export default function BedouinExperience({ view }: { view: View }) {
  const pathname = usePathname()

  return (
    <main className="bedouin-root">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="phone-shell">
        <TopChrome />
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="screen-scroll"
          >
            {view === 'home' && <HomeView />}
            {view === 'events' && <EventsView />}
            {view === 'gallery' && <GalleryView />}
            {view === 'tickets' && <TicketsView />}
          </motion.div>
        </AnimatePresence>
        <nav className="bottom-nav" aria-label="Primary">
          {nav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link className={`nav-item ${active ? 'active' : ''} ${item.featured ? 'featured' : ''}`} href={item.href} key={item.href}>
                <Icon aria-hidden="true" strokeWidth={1.65} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </main>
  )
}

function TopChrome() {
  return (
    <header className="top-chrome">
      <Link href="/" className="brand-lockup" aria-label="BEDOUIN WHITE PARTiES home">
        <span className="brand-kicker">WHITE PARTY EXPERIENCE</span>
        <span>BEDOUIN</span>
        <small>WHITE PARTiES</small>
      </Link>
    </header>
  )
}

function HomeView() {
  return (
    <>
      <section className="hero-stage">
        <div className="hero-image" style={{ backgroundImage: `url(${photos.tentSuite})` }} />
        <div className="hero-wash" />
        <div className="hero-copy">
          <p className="bronze-line">NOT JUST PARTIES,</p>
          <h1>A LIFESTYLE IN WHITE</h1>
          <span className="ornament-line" />
          <p>Premium beach and desert-style gatherings with white dress code, majlis lounges, live music, elevated food, and a community that comes ready to celebrate.</p>
          <Link className="primary-pill" href="/events">
            Explore Parties <ChevronRight size={21} />
          </Link>
        </div>
      </section>

      <section className="home-editorial">
        <div className="editorial-copy">
          <p className="bronze-line">THE EXPERIENCE</p>
          <h2>Parties designed like a full cultural escape.</h2>
          <p>
            BEDOUIN White Parties blend the clean visual impact of all-white styling with Arabian-inspired hospitality, beach energy,
            curated music, food stations, and lounge moments that make every guest feel part of the scene.
          </p>
        </div>
        <div className="editorial-media">
          <img src={photos.crowdWhite} alt="Guests dancing at a BEDOUIN white beach party" fetchPriority="high" decoding="async" />
        </div>
      </section>

      <SectionTitle title="Upcoming Parties" href="/events" />
      <div className="event-strip">
        {events.slice(0, 3).map((event) => (
          <EventCard event={event} key={event.title} compact />
        ))}
      </div>

      <section className="moment-stack" aria-label="Signature party moments">
        {signatureMoments.map((moment, index) => (
          <article className="moment-card" key={moment.title}>
            <img src={moment.image} alt={moment.title} loading="lazy" decoding="async" />
            <div>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{moment.title}</h3>
              <p>{moment.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="feature-panel">
        <div>
          <h2>More Than A Party</h2>
          <span className="ornament-line" />
          <p>An immersive production that connects culture, people, music, food, and timeless moments.</p>
          <Link className="secondary-pill" href="/gallery">
            Discover More <ChevronRight size={18} />
          </Link>
        </div>
        <div className="feature-grid">
          <Feature icon={Sparkles} title="Arabian Inspired" text="Authentic decor and atmosphere" />
          <Feature icon={Music2} title="World Class Music" text="Top DJs and live performances" />
          <Feature icon={Crown} title="Luxury Service" text="Premium hospitality experience" />
          <Feature icon={UsersRound} title="Elite Community" text="Connect with exceptional people" />
        </div>
      </section>

      <section className="story-band">
        <div className="story-image">
          <img src={photos.nightMajlis} alt="Moonlit private majlis lounge at night" loading="lazy" decoding="async" />
        </div>
        <div className="story-copy">
          <p className="bronze-line">FROM DAY TO NIGHT</p>
          <h2>Relaxed in the sun. Electric after dark.</h2>
          <p>
            The day starts with soft coastal light, white outfits, vendor tents, and lounge seating. As the sun drops, the music gets deeper,
            the stage becomes the center, and the venue shifts into a moonlit social club.
          </p>
        </div>
      </section>

      <section className="flow-section">
        <div className="flow-head">
          <p className="bronze-line">PARTY FLOW</p>
          <h2>Every detail has a role.</h2>
        </div>
        <div className="flow-grid">
          {partyFlow.map((item) => (
            <article key={item.step}>
              <strong>{item.step}</strong>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-gallery-preview">
        <div>
          <p className="bronze-line">REAL MOMENTS</p>
          <h2>See the atmosphere before you book.</h2>
          <Link className="secondary-pill" href="/gallery">
            Open Gallery <ChevronRight size={18} />
          </Link>
        </div>
        <div className="preview-mosaic">
          {[photos.goldenDance, photos.performerNight, photos.groupNight, photos.daytimeMajlis].map((image, index) => (
            <img src={image} alt={`BEDOUIN party gallery preview ${index + 1}`} key={image} loading="lazy" decoding="async" />
          ))}
        </div>
      </section>

      <section className="closing-cta">
        <Gem size={34} strokeWidth={1.45} />
        <h2>White attire. Warm hospitality. A night people remember.</h2>
        <p>Reserve the next BEDOUIN experience or explore the gallery to understand the mood, crowd, food, music, and service standard.</p>
        <Link className="primary-pill" href="/events">
          View Events <ChevronRight size={21} />
        </Link>
      </section>
    </>
  )
}

function EventsView() {
  const [filter, setFilter] = useState<EventCategory>('All')
  const featuredCountdown = useCountdown(events[0].date)
  const filtered = useMemo(
    () => events.filter((event) => filter === 'All' || event.category === filter),
    [filter]
  )

  return (
    <section className="page-pad">
      <div className="page-hero dark" style={{ backgroundImage: `url(${photos.performerNight})` }}>
        <div>
          <p className="bronze-line">NEXT GATHERING</p>
          <h1>Events & Time</h1>
          <p>Every night is curated with white dress code, private tables, arrival rituals, and a clear countdown.</p>
        </div>
        <div className="time-card">
          <Clock3 size={22} />
          <span>{featuredCountdown}</span>
          <small>{events[0].timeLabel}</small>
        </div>
      </div>

      <div className="filter-row" role="tablist" aria-label="Event filters">
        {(['All', 'VIP', 'Desert', 'White'] as EventCategory[]).map((item) => (
          <button className={filter === item ? 'selected' : ''} key={item} onClick={() => setFilter(item)} type="button">
            {item}
          </button>
        ))}
      </div>

      <div className="event-list">
        {filtered.map((event) => (
          <EventCard event={event} key={event.title} />
        ))}
      </div>
    </section>
  )
}

function GalleryView() {
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null)

  return (
    <section className="page-pad">
      <div className="gallery-head">
        <p className="bronze-line">REAL BEDOUIN MOMENTS</p>
        <h1>Gallery</h1>
        <p>White attire, beach majlis lounges, live performances, food stations, premium bars, and the crowd energy that defines the experience.</p>
      </div>
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <button className={`gallery-tile ${item.span}`} key={item.title} type="button" onClick={() => setSelected(item)}>
            <img src={item.image} alt={item.title} loading={index < 4 ? 'eager' : 'lazy'} decoding="async" />
            <span>
              <strong>{item.title}</strong>
              <small>{item.type}</small>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="lightbox-card"
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="close-lightbox" type="button" onClick={() => setSelected(null)} aria-label="Close gallery image">
                <X size={20} />
              </button>
              <img src={selected.image} alt={selected.title} />
              <div>
                <strong>{selected.title}</strong>
                <span>{selected.type}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function TicketsView() {
  return (
    <section className="page-pad">
      <div className="page-hero ticket-hero">
        <p className="bronze-line">WHITE LIST ACCESS</p>
        <h1>Tickets</h1>
        <p>Frontend-only reservation cards for the luxury party concept. No backend or payment flow is attached.</p>
      </div>
      <div className="ticket-stack">
        {['Majlis Entry', 'VIP Carpet Lounge', 'Royal Table'].map((tier, index) => (
          <article className="ticket-card" key={tier}>
            <div>
              <small>Tier 0{index + 1}</small>
              <h2>{tier}</h2>
              <p>{index === 0 ? 'Entry, welcome tea, and dance floor.' : index === 1 ? 'Premium seating, bottle service, and gallery access.' : 'Private table, concierge arrival, and artist meet.'}</p>
            </div>
            <strong>{['$150', '$290', '$620'][index]}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProfileView() {
  return (
    <section className="page-pad">
      <div className="profile-card">
        <div className="profile-mark">
          <Crown size={34} />
        </div>
        <p className="bronze-line">GUEST PROFILE</p>
        <h1>White List Member</h1>
        <p>Saved events, invitation status, attire notes, and VIP preferences can live here when the backend is added.</p>
        <div className="profile-stats">
          <span><strong>04</strong> Parties</span>
          <span><strong>VIP</strong> Status</span>
          <span><strong>12</strong> Gallery Saves</span>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ title, href }: { title: string; href: string }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      <Link href={href}>
        See all <ChevronRight size={14} />
      </Link>
    </div>
  )
}

function Feature({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <article>
      <Icon size={20} strokeWidth={1.6} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function EventCard({ event, compact = false }: { event: (typeof events)[number]; compact?: boolean }) {
  const [day, month] = [event.day, event.month]

  return (
    <article className={`party-card ${compact ? 'compact' : ''}`}>
      <div className="party-image">
        <img src={event.image} alt={event.title} loading={compact ? 'lazy' : 'eager'} decoding="async" />
        <div className="date-chip" aria-hidden="true">
          <strong>{day}</strong>
          <span>{month}</span>
        </div>
      </div>
      <div className="party-body">
        <div className="location">
          <MapPin size={14} />
          <span>{event.city}</span>
        </div>
        <h3>{event.title}</h3>
        <div className="event-time">
          <Clock3 size={14} />
          <span>{formatTime(event.date)}</span>
        </div>
        <p>{event.description}</p>
        <div className="party-meta">
          <span>{event.tag}</span>
          <span>{event.price}</span>
        </div>
        <small>{compact ? 'View details' : 'Limited spots available'}</small>
      </div>
    </article>
  )
}
