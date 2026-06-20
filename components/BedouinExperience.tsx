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
  Eye,
  Target,
  PlayCircle,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'

type View = 'home' | 'events' | 'gallery'

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

const recapVideo = '/vibeup/recap2final.mp4'

const events = [
  {
    title: 'BEDOUIN White Party',
    category: 'White',
    city: 'California Coast',
    date: '2026-09-19T18:00:00-07:00',
    endDate: '2026-09-20T23:00:00-07:00',
    timeLabel: 'Sat–Sun, Sep 19–20',
    day: '19–20',
    month: 'SEP',
    image: photos.crowdWhite,
    tag: 'Annual Celebration',
    price: 'Get Notified',
    description: 'Our annual cultural beach festival returns to California\u2019s most breathtaking coastline — two days of white-attire elegance, live music, art, and Arabic-inspired hospitality bringing together communities from around the world.'
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

const heroProof = [
  { value: '1,500+', label: 'guests in 2025' },
  { value: '2 days', label: 'coastal festival' },
  { value: 'White', label: 'signature dress code' }
]

const experienceBrief = [
  { title: 'Arrival', text: 'Guided check-in, welcome moments, and a polished first impression.' },
  { title: 'Atmosphere', text: 'Majlis lounges, coastal staging, white styling, and curated lighting.' },
  { title: 'Energy', text: 'DJ sets, live musicians, food stations, and social spaces built to flow.' }
]

const nav = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/gallery', label: 'Gallery', icon: GalleryHorizontal }
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
          </motion.div>
        </AnimatePresence>
        <nav
          className="bottom-nav"
          aria-label="Primary"
          style={{
            position: 'fixed',
            left: 18,
            right: 18,
            bottom: 'max(12px, env(safe-area-inset-bottom))',
            zIndex: 1000,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 10,
            pointerEvents: 'auto'
          }}
        >
          {nav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                aria-label={item.label}
                className={`nav-item ${active ? 'active' : ''}`}
                href={item.href}
                key={item.href}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  minHeight: 56,
                  display: 'grid',
                  placeItems: 'center',
                  alignContent: 'center',
                  pointerEvents: 'auto'
                }}
              >
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
          <div className="hero-actions">
            <Link className="primary-pill" href="/events">
              Explore Events <ChevronRight size={21} />
            </Link>
            <Link className="secondary-pill hero-secondary" href="/gallery">
              View Gallery
            </Link>
          </div>
          <div className="hero-proof" aria-label="BEDOUIN experience highlights">
            {heroProof.map((item) => (
              <span key={item.label}>
                <strong>{item.value}</strong>
                {item.label}
              </span>
            ))}
          </div>
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

      <section className="about-section">
        <div className="about-head">
          <p className="bronze-line">ABOUT BEDOUIN</p>
          <h2>A cultural bridge on the sand.</h2>
        </div>
        <div className="about-copy">
          <p>
            Every September, we bring the world together for an extraordinary celebration on California&rsquo;s most breathtaking coasts.
            Launching its inaugural edition in 2025, the BEDOUIN White Party made a massive wave, welcoming over
            <strong> 1,500 guests</strong> from diverse backgrounds and nationalities to celebrate unity and community.
          </p>
          <p>
            This is more than just a beach party — it is a vibrant, immersive cultural bridge. Our festival is a dedicated space
            where global diversity meets the rich tapestry of Middle Eastern heritage. Through captivating music, art, and shared
            experiences, we showcase the authentic beauty and warmth of Arabic cultures to the world.
          </p>
          <p>
            We gather on the sand to create unforgettable memories, break boundaries, and foster genuine human connection in an
            atmosphere full of energy, joy, and peace.
          </p>
        </div>
        <div className="about-media">
          <img src={photos.groupNight} alt="Guests from around the world at the 2025 BEDOUIN White Party" loading="lazy" decoding="async" />
          <div className="stat-chip">
            <strong>1,500+</strong>
            <span>Guests in 2025</span>
          </div>
        </div>
        <Link className="primary-pill" href="/events">
          Join Us This September &mdash; Get Notified <ChevronRight size={21} />
        </Link>
      </section>

      <section className="vision-mission">
        <div className="vm-head">
          <p className="bronze-line">VISION & MISSION</p>
          <h2>Where heritage meets the world.</h2>
        </div>
        <div className="vm-grid">
          <article className="vm-card">
            <Eye size={26} strokeWidth={1.6} />
            <h3>Our Vision</h3>
            <p>
              To become the premier cultural beach festival in the United States and a leading global destination that
              seamlessly blends diverse communities while celebrating Arabic heritage in a modern, inclusive, and upscale setting.
            </p>
          </article>
          <article className="vm-card">
            <Target size={26} strokeWidth={1.6} />
            <h3>Our Mission</h3>
            <p>
              To create an inspiring annual gathering that unites people of all backgrounds through the universal languages of
              art and music — presenting the true essence, joy, and hospitality of Arabic culture, fostering mutual understanding,
              and building lasting cross-cultural connections.
            </p>
          </article>
        </div>
      </section>

      <section className="recap-section">
        <div className="recap-head">
          <p className="bronze-line">2025 RECAP</p>
          <h2>Relive the night.</h2>
          <p>A look back at the energy, the crowd, and the moments that made our first BEDOUIN White Party unforgettable.</p>
        </div>
        <div className="recap-video">
          <video controls preload="metadata" poster={photos.crowdWhite} playsInline>
            <source src={recapVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="recap-play-badge">
            <PlayCircle size={20} strokeWidth={1.6} />
            <span>Watch the 2025 Recap</span>
          </div>
        </div>
      </section>

      <SectionTitle title="This September" href="/events" />
      <div className="event-strip">
        {events.map((event) => (
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
        <p>Explore the next BEDOUIN experience or open the gallery to understand the mood, crowd, food, music, and service standard.</p>
        <Link className="primary-pill" href="/events">
          Join Us This September <ChevronRight size={21} />
        </Link>
      </section>
    </>
  )
}

function EventsView() {
  const featuredCountdown = useCountdown(events[0].date)
  return (
    <section className="page-pad">
      <div className="page-hero dark" style={{ backgroundImage: `url(${photos.performerNight})` }}>
        <div>
          <p className="bronze-line">THE GATHERING</p>
          <h1>Events & Time</h1>
          <p>One weekend, curated with white dress code, private tables, arrival rituals, and a clear countdown.</p>
        </div>
        <div className="time-card">
          <Clock3 size={22} />
          <span>{featuredCountdown}</span>
          <small>{events[0].timeLabel}</small>
        </div>
      </div>

      <div className="event-list">
        {events.map((event) => (
          <EventCard event={event} key={event.title} />
        ))}
      </div>

      <section className="event-brief" aria-label="Event experience brief">
        {experienceBrief.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="recap-section page-recap">
        <div className="recap-head">
          <p className="bronze-line">2025 RECAP</p>
          <h2>Relive the night.</h2>
          <p>A look back at the energy, the crowd, and the moments that made our first BEDOUIN White Party unforgettable.</p>
        </div>
        <div className="recap-video">
          <video controls preload="metadata" poster={photos.crowdWhite} playsInline>
            <source src={recapVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="recap-play-badge">
            <PlayCircle size={20} strokeWidth={1.6} />
            <span>Watch the 2025 Recap</span>
          </div>
        </div>
      </section>
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
      <div className="gallery-intro-strip" aria-label="Gallery categories">
        <span>Arrival</span>
        <span>Performance</span>
        <span>Hospitality</span>
        <span>Community</span>
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
        <Link className="event-action" href={compact ? '/events' : '/gallery'} aria-label={`${compact ? 'View details for' : 'View gallery for'} ${event.title}`}>
          {compact ? 'View details' : 'See the Atmosphere'}
          <ChevronRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
