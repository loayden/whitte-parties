"use client"
import React, { useEffect, useRef, useState } from 'react'

type EventItem = {
  row?: string
  title: string
  city?: string
  date?: string
  price?: number
  priceFrom?: number
  badge?: string
  scene?: string
}

const css = `
  /* ============ FONTS ============ */
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Reem+Kufi:wght@400..700&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');

  /* ============ DESIGN TOKENS ============ */
  :root{ --midnight:#0B0A08; --tent:#1C1812; --gold:#D9A05B; --amber:#FFC15E; --linen:#F8F3E8; --oxblood:#7A2B2B; --zellige:#2C7A74; --radius-sm:8px; --radius-md:16px; --radius-lg:24px; --radius-xl:32px; --radius-pill:9999px; --shadow-depth:0 20px 60px rgba(0,0,0,.45); --shadow-glow:0 0 24px rgba(255,193,94,.25); --ease-enter:cubic-bezier(.22,1,.36,1); --ease-exit:cubic-bezier(.65,0,.35,1); --pattern-stars: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23D9A05B' stroke-width='1'%3E%3Crect x='30' y='30' width='60' height='60'/%3E%3Crect x='30' y='30' width='60' height='60' transform='rotate(45 60 60)'/%3E%3C/g%3E%3C/svg%3E"); --pattern-grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E"); }

  /* Reset and layout extracted from the provided snippet */
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} html,body,#__next{height:100%;}
  .frame{position:relative;width:100%;max-width:1280px;min-height:calc(100vh - 240px);margin:0 auto;border-radius:32px;overflow:hidden;background:var(--midnight);color:var(--linen);border:1px solid rgba(217,160,91,.18);box-shadow:var(--shadow-depth);}
  .bg-pattern{position:absolute;inset:0;z-index:0;background-image:var(--pattern-stars);background-size:120px 120px;opacity:.05}
  .bg-glow{position:absolute;top:-110px;right:-90px;width:280px;height:280px;z-index:0;background:radial-gradient(circle,rgba(255,193,94,.35),transparent 70%);filter:blur(40px);border-radius:50%;animation:breathe 7s ease-in-out infinite}
  .particles{position:absolute;inset:0;z-index:1;overflow:hidden;pointer-events:none}
  .particle{position:absolute;bottom:0;border-radius:50%;background:var(--amber);box-shadow:0 0 6px rgba(255,193,94,.8);animation:drift linear infinite}
  .grain{position:absolute;inset:0;z-index:50;pointer-events:none;opacity:.05;mix-blend-mode:overlay;background-image:var(--pattern-grain)}
  .screen{position:relative;z-index:10;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-bottom:120px}
  .spacer{height:72px}
  .topbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:18px 20px 16px;background:linear-gradient(to bottom,rgba(11,10,8,.92) 45%,rgba(11,10,8,0));backdrop-filter:blur(10px)}
  .logo{display:flex;align-items:center;gap:10px}
  .logo-text span{display:block;font-family:'Fraunces',serif;font-weight:600;font-size:15px;letter-spacing:.18em;text-transform:uppercase;line-height:1.3}
  .logo-text small{display:block;font-family:'Reem Kufi',sans-serif;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:var(--gold)}
  .icon-btn{position:relative;width:40px;height:40px;border-radius:var(--radius-pill);display:flex;align-items:center;justify-content:center;background:rgba(248,243,232,.05);border:1px solid rgba(217,160,91,.18);backdrop-filter:blur(16px);color:var(--linen)}
  .icon-btn svg{width:18px;height:18px}
  .icon-btn .dot{position:absolute;top:8px;right:8px;width:6px;height:6px;border-radius:50%;background:var(--amber);box-shadow:0 0 6px var(--amber)}
  .hero{position:relative;margin:6px 18px 30px;height:clamp(340px,48vw,520px);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-depth)}
  .hero-bg{position:absolute;inset:0}
  .hero-pattern{position:absolute;inset:0;opacity:.14;background-image:var(--pattern-stars);background-size:90px 90px}
  .hero-glow{position:absolute;top:-60px;right:-40px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(255,193,94,.55),transparent 70%);filter:blur(30px);animation:breathe 4s ease-in-out infinite}
  .hero-dunes{position:absolute;bottom:-2px;left:0;width:100%;height:92px}
  .countdown{position:absolute;top:18px;right:18px;z-index:3;display:flex;flex-direction:column;align-items:flex-end;gap:3px;padding:8px 12px;border-radius:var(--radius-md);background:rgba(11,10,8,.5);border:1px solid rgba(217,160,91,.25);backdrop-filter:blur(10px)}
  .countdown .label{font-family:'Reem Kufi',sans-serif;font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:rgba(248,243,232,.6)}
  .countdown .time{font-family:'Space Mono',monospace;font-size:14px;color:var(--amber)}
  .hero-content{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;padding:22px;gap:8px}
  .eyebrow{display:inline-flex;align-items:center;gap:7px;font-family:'Reem Kufi',sans-serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;padding:6px 12px;border-radius:var(--radius-pill);background:rgba(11,10,8,.45);border:1px solid rgba(217,160,91,.35);backdrop-filter:blur(8px);color:var(--amber)}
  .eyebrow .live-dot{width:6px;height:6px;border-radius:50%;background:var(--amber);box-shadow:0 0 8px var(--amber);animation:breathe 2s ease-in-out infinite}
  .hero-title{font-family:'Fraunces',serif;font-weight:600;font-size:34px;line-height:1.1}
  .hero-meta{display:flex;align-items:center;gap:14px;font-size:13px;color:rgba(248,243,232,.85)}
  .hero-meta .mono{font-family:'Space Mono',monospace;color:var(--gold)}
  .hero-desc{font-size:12.5px;line-height:1.5;color:rgba(248,243,232,.72);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .btn-primary{display:inline-flex;align-items:center;gap:8px;margin-top:6px;padding:13px 24px;border:none;border-radius:var(--radius-pill);background:linear-gradient(135deg,var(--gold),var(--amber));color:var(--midnight);font-weight:600;font-size:14px;box-shadow:0 10px 30px rgba(217,160,91,.35);transition:transform .35s var(--ease-enter),box-shadow .35s var(--ease-enter)}
  .btn-primary:hover{box-shadow:var(--shadow-glow),0 10px 30px rgba(217,160,91,.35);transform:translateY(-2px)}
  .btn-primary:active{transform:scale(.97) translateY(0)}
  .row{margin-bottom:34px;opacity:0;transform:translateY(28px);filter:blur(6px);transition:opacity .9s var(--ease-enter),transform .9s var(--ease-enter),filter .9s var(--ease-enter)}
  .row.visible{opacity:1;transform:none;filter:blur(0)}
  .row-head{display:flex;align-items:baseline;justify-content:space-between;padding:0 20px 14px}
  .row-title{font-family:'Fraunces',serif;font-weight:600;font-size:19px;display:flex;align-items:center;gap:10px}
  .row-title::before{content:'';width:18px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--gold),var(--amber))}
  .row-link{font-family:'Reem Kufi',sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
  .row-scroll{display:flex;gap:14px;overflow-x:auto;padding:4px 20px 10px;scroll-snap-type:x mandatory}
  .card{flex:0 0 clamp(220px,22vw,280px);border-radius:var(--radius-lg);overflow:hidden;background:rgba(248,243,232,.05);border:1px solid rgba(217,160,91,.15);box-shadow:inset 0 1px 0 rgba(255,255,255,.06);backdrop-filter:blur(20px) saturate(140%);transition:transform .5s var(--ease-enter),box-shadow .5s var(--ease-enter),border-color .5s var(--ease-enter)}
  .card:hover,.card.tilt{border-color:rgba(255,193,94,.45);box-shadow:var(--shadow-glow),inset 0 1px 0 rgba(255,255,255,.06)}
  .card-media{position:relative;height:118px;overflow:hidden}
  .card-media .moon{position:absolute;top:-22px;right:-16px;width:70px;height:70px;border-radius:50%;background:rgba(248,243,232,.18);filter:blur(2px)}
  .card-media .star-mark{position:absolute;bottom:8px;left:8px;width:26px;height:26px;color:rgba(255,193,94,.5)}
  .card-media::after{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%);transform:translateX(-130%);transition:transform .9s var(--ease-enter)}
  .card:hover .card-media::after,.card.tilt .card-media::after{transform:translateX(130%)}
  .card-badge{position:absolute;top:10px;left:10px;z-index:2;font-family:'Reem Kufi',sans-serif;font-size:9px;letter-spacing:.12em;text-transform:uppercase;padding:4px 9px;border-radius:var(--radius-pill);background:rgba(11,10,8,.5);border:1px solid rgba(217,160,91,.3);color:var(--linen)}
  .card-price{position:absolute;top:10px;right:10px;z-index:2;font-family:'Space Mono',monospace;font-size:11px;padding:4px 9px;border-radius:var(--radius-pill);background:rgba(11,10,8,.55);border:1px solid rgba(217,160,91,.25);color:var(--amber)}
  .card-body{padding:12px 14px 14px}
  .card-title{font-family:'Fraunces',serif;font-weight:600;font-size:15px;line-height:1.25;margin-bottom:6px}
  .card-meta{font-size:11px;color:rgba(248,243,232,.6);margin-bottom:8px}
  .card-divider{height:4px;border-radius:2px;opacity:.5;background-image:repeating-linear-gradient(135deg,rgba(217,160,91,.6) 0 2px,transparent 2px 7px),repeating-linear-gradient(45deg,rgba(217,160,91,.6) 0 2px,transparent 2px 7px);background-blend-mode:screen}
  .tabbar{position:sticky;bottom:18px;z-index:40;display:flex;justify-content:space-around;align-items:center;margin:20px 18px 0;padding:10px 6px;border-radius:var(--radius-pill);background:rgba(28,24,18,.6);backdrop-filter:blur(24px) saturate(150%);border:1px solid rgba(217,160,91,.15);box-shadow:var(--shadow-depth)}
  .tab{display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:rgba(248,243,232,.5);font-family:'Reem Kufi',sans-serif;font-size:9px;letter-spacing:.1em;text-transform:uppercase;padding:7px 12px;border-radius:var(--radius-lg);transition:color .3s var(--ease-enter),background .3s var(--ease-enter),box-shadow .3s var(--ease-enter)}
  .tab svg{width:20px;height:20px}
  .tab.active{color:var(--amber);background:rgba(255,193,94,.1);box-shadow:inset 0 0 16px rgba(255,193,94,.25)}
  @keyframes breathe{0%,100%{opacity:.5;transform:scale(1);}50%{opacity:.9;transform:scale(1.06);}}
  @keyframes drift{0%{transform:translateY(0) translateX(0);opacity:0;}10%{opacity:.8;}85%{opacity:.5;}100%{transform:translateY(-820px) translateX(40px);opacity:0;}}
  @media (prefers-reduced-motion:reduce){.particle,.hero-glow,.bg-glow,.eyebrow .live-dot{animation:none!important}.row{transition:opacity .3s linear;transform:none!important;filter:none!important;opacity:1!important}.card,.card-media::after,.btn-primary{transition:none!important}}

  @media (max-width: 767px){
    .frame{min-height:calc(100vh - 180px);border-radius:24px}
    .hero{margin:6px 14px 24px;height:320px}
    .row-head,.row-scroll{padding-left:14px;padding-right:14px}
    .tabbar{margin:18px 14px 0}
  }
`

export default function StaticHome({ events = [] }: { events?: EventItem[] }) {
  const screenRef = useRef<HTMLDivElement | null>(null)
  const particlesRef = useRef<HTMLDivElement | null>(null)
  const [countdown, setCountdown] = useState('06:00:00')

  useEffect(() => {
    // particles
    const field = particlesRef.current
    if (field) {
      for (let i = 0; i < 16; i++) {
        const p = document.createElement('div')
        p.className = 'particle'
        const size = 2 + Math.random() * 3
        p.style.width = `${size}px`
        p.style.height = `${size}px`
        p.style.left = `${Math.random() * 100}%`
        p.style.animationDuration = `${10 + Math.random() * 12}s`
        p.style.animationDelay = `${-Math.random() * 20}s`
        field.appendChild(p)
      }
    }

    // cards tilt
    const cardNodes = Array.from(screenRef.current?.querySelectorAll<HTMLElement>('.card') || [])
    const handlerRefs: { el: HTMLElement; move: EventListener; leave: EventListener }[] = []
    cardNodes.forEach((c) => {
      const move = (ev: MouseEvent) => {
        const r = c.getBoundingClientRect()
        const x = (ev.clientX - r.left) / r.width - 0.5
        const y = (ev.clientY - r.top) / r.height - 0.5
        c.style.transform = `perspective(700px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`
        c.classList.add('tilt')
      }
      const leave = () => {
        c.style.transform = ''
        c.classList.remove('tilt')
      }
      c.addEventListener('mousemove', move as EventListener)
      c.addEventListener('mouseleave', leave as EventListener)
      handlerRefs.push({ el: c, move: move as EventListener, leave: leave as EventListener })
    })

    // scroll reveal
    const rows = screenRef.current?.querySelectorAll('.row') || []
    if ('IntersectionObserver' in window && screenRef.current) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target) }
        })
      }, { root: screenRef.current, threshold: 0.15 })
      rows.forEach((r) => obs.observe(r))
    } else {
      rows.forEach((r) => r.classList.add('visible'))
    }

    // countdown
    const target = Date.now() + (6 * 60 * 60 + 12 * 60) * 1000
    const pad = (n: number) => n < 10 ? `0${n}` : `${n}`
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${pad(h)}:${pad(m)}:${pad(s)}`)
    }
    tick()
    const id = setInterval(tick, 1000)

    return () => {
      clearInterval(id)
      handlerRefs.forEach((h) => {
        h.el.removeEventListener('mousemove', h.move)
        h.el.removeEventListener('mouseleave', h.leave)
      })
    }
  }, [])

  const STAR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="6" y="6" width="12" height="12"/><rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)"/></svg>`

  const grouped = {
    'this-week': events.filter((e) => e.row === 'this-week'),
    vip: events.filter((e) => e.row === 'vip'),
    escapes: events.filter((e) => e.row === 'escapes')
  }

  return (
    <div className="frame">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="bg-pattern" />
      <div className="bg-glow" />
      <div className="particles" id="particles" ref={particlesRef} />

      <div className="screen" ref={screenRef}>
        <header className="topbar">
          <div className="logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="11" r="5" stroke="#D9A05B" strokeWidth="1.4" />
              <path d="M3 23c0-7 22-7 22 0" stroke="#FFC15E" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <div className="logo-text">
              <span>Bedouin</span>
              <small>White Parties</small>
            </div>
          </div>
          <button className="icon-btn" aria-label="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 10a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10z" />
              <path d="M10 19a2 2 0 004 0" />
            </svg>
            <span className="dot" />
          </button>
        </header>

        <section className="hero">
          <div className="hero-bg scene-sunset" />
          <div className="hero-pattern" />
          <div className="hero-glow" />
          <svg className="hero-dunes" viewBox="0 0 400 100" preserveAspectRatio="none">
            <path d="M0,55 C70,15 140,85 210,35 C280,-5 340,60 400,25 L400,100 L0,100 Z" fill="#0B0A08" />
          </svg>
          <div className="countdown">
            <span className="label">Starts in</span>
            <span className="time" id="countdown">{countdown}</span>
          </div>
          <div className="hero-content">
            <span className="eyebrow"><span className="live-dot" />VIP Only · Joshua Tree, CA</span>
            <h1 className="hero-title">Mirage Nights</h1>
            <div className="hero-meta">
              <span>Tonight · 9:00 PM</span>
              <span className="mono">From $250</span>
            </div>
            <p className="hero-desc">An open-air majlis beneath a thousand stars — live oud, fire dancers, and a midnight feast under woven silk canopies.</p>
            <button className="btn-primary">Reserve Your Spot
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
        </section>

        {(['this-week','vip','escapes'] as const).map((key) => (
          <section className="row" key={key}>
            <div className="row-head">
              <h2 className="row-title">{key === 'this-week' ? 'This Week' : key === 'vip' ? 'VIP Only' : 'Desert Escapes'}</h2>
              <span className="row-link">See All</span>
            </div>
            <div className="row-scroll" data-row={key}>
              {grouped[key].map((e, idx) => (
                <article className="card" key={`${key}-${idx}`}>
                  <div className={`card-media scene-${e.scene ?? 'dusk'}`}>
                    <span className="card-badge">{e.badge ?? ''}</span>
                    <span className="card-price">${e.price ?? e.priceFrom ?? '—'}</span>
                    <span className="moon" />
                    <span className="star-mark" dangerouslySetInnerHTML={{ __html: STAR }} />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{e.title}</h3>
                    <p className="card-meta">{e.city ?? ''} · {e.date ?? ''}</p>
                    <div className="card-divider" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="spacer" />
      </div>

      <div className="grain" />
    </div>
  )
}
