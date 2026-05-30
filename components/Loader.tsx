'use client'
import { useEffect, useRef } from 'react'

const FINAL_NAME = ['N','A','Y','A','N','A','M']
const CHARS = [
  'అ','ఆ','క','గ','చ',
  'क','ख','ग','घ','च',
  'ア','イ','ウ','カ','サ',
  'Α','Β','Γ','Δ','Λ',
  '가','나','다','라','마',
  'ا','ب','ت','ج','ح'
]

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const taglineRef   = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Pre-populate all spans with final letters for width measurement (prevents layout shift)
    const spans: HTMLSpanElement[] = []
    FINAL_NAME.forEach((letter) => {
      const span = document.createElement('span')
      span.textContent = letter
      span.style.cssText = `
        display: inline-block;
        text-align: center;
        visibility: hidden;
        color: #c9a96e;
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(2rem, 6vw, 4.5rem);
        letter-spacing: 0.15em;
        font-weight: 400;
        line-height: 1;
      `
      container.appendChild(span)
      spans.push(span)
    })

    function finishLoader() {
      const loaderLetters = containerRef.current
      const navLogo       = document.querySelector('.nav-logo') as HTMLElement | null

      // Fade out tagline immediately
      const tagline = taglineRef.current
      if (tagline) {
        tagline.style.transition = 'opacity 0.3s ease'
        tagline.style.opacity    = '0'
      }

      if (!loaderLetters || !navLogo) {
        // Fallback: skip fly, just crossfade
        document.body.classList.add('hero-revealed')
        const heroLogo = document.getElementById('hero-logo-mark')
        if (heroLogo) {
          (heroLogo as HTMLElement).style.transition = 'opacity 300ms ease'
          ;(heroLogo as HTMLElement).style.opacity   = '1'
        }
        const wrap = document.getElementById('loader-logo-wrap')
        if (wrap) {
          wrap.style.transition = 'opacity 300ms ease'
          wrap.style.opacity    = '0'
        }
        const bg = document.getElementById('loader-bg')
        if (bg) {
          bg.style.transition = 'opacity 500ms ease'
          bg.style.opacity    = '0'
        }
        setTimeout(() => {
          const loader = document.getElementById('smk-loader')
          if (loader) loader.remove()
          document.body.style.overflow = 'auto'
          onComplete()
        }, 1000)
        return
      }

      // ── PHASE 1: Letters fly from center to navbar logo position ──
      const loaderRect = loaderLetters.getBoundingClientRect()
      const navRect    = navLogo.getBoundingClientRect()

      const loaderCX = loaderRect.left + loaderRect.width  / 2
      const loaderCY = loaderRect.top  + loaderRect.height / 2
      const navCX    = navRect.left    + navRect.width     / 2
      const navCY    = navRect.top     + navRect.height    / 2

      const deltaX = navCX - loaderCX
      const deltaY = navCY - loaderCY
      const scale  = navRect.width / loaderRect.width

      loaderLetters.style.transformOrigin = 'center center'
      loaderLetters.style.transition      = 'transform 0.8s cubic-bezier(0.76,0,0.24,1)'
      loaderLetters.style.transform       = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`

      // ── PHASE 2: at 800ms — text lands, swap with nav logo, crossfade eye logos ──
      setTimeout(() => {
        // Swap: loader letters out, nav logo in (same position)
        loaderLetters.style.transition = 'opacity 0.3s ease'
        loaderLetters.style.opacity    = '0'
        navLogo.style.transition       = 'opacity 0.3s ease'
        navLogo.style.opacity          = '1'

        // Eye logo crossfade: loader → hero (simultaneously, logo never disappears)
        const wrap = document.getElementById('loader-logo-wrap')
        if (wrap) {
          const svg = wrap.querySelector('svg')
          if (svg) {
            // Clear animation fill-mode so JS opacity takes over cleanly
            ;(svg as unknown as HTMLElement).style.animation = 'none'
            svg.getBoundingClientRect() // force reflow
          }
          wrap.style.transition = 'opacity 300ms ease'
          wrap.style.opacity    = '0'
        }
        const heroLogo = document.getElementById('hero-logo-mark')
        if (heroLogo) {
          (heroLogo as HTMLElement).style.transition = 'opacity 300ms ease'
          ;(heroLogo as HTMLElement).style.opacity   = '1'
        }

        // Fade loader background (reveals hero behind it)
        const bg = document.getElementById('loader-bg')
        if (bg) {
          bg.style.transition = 'opacity 500ms ease'
          bg.style.opacity    = '0'
        }

        // Trigger staggered hero + nav-links reveal via CSS class
        // (see globals.css: body.hero-revealed rules with staggered delays)
        document.body.classList.add('hero-revealed')
      }, 800)

      // ── PHASE 3: remove loader after hero reveal completes ──
      setTimeout(() => {
        const loader = document.getElementById('smk-loader')
        if (loader) loader.remove()
        document.body.style.overflow = 'auto'
        onComplete()
      }, 1800)
    }

    function scrambleLetter(index: number) {
      if (index >= FINAL_NAME.length) {
        finishLoader()
        return
      }

      const span = spans[index]
      span.style.visibility = 'visible'

      let ticks = 0
      const totalTicks = 6

      const interval = setInterval(() => {
        const rand = CHARS[Math.floor(Math.random() * CHARS.length)]
        span.textContent      = rand
        span.style.color      = '#e8c060'
        span.style.textShadow = '0 0 8px rgba(201,169,110,0.8)'
        ticks++

        if (ticks >= totalTicks) {
          clearInterval(interval)
          span.textContent      = FINAL_NAME[index]
          span.style.color      = '#c9a96e'
          span.style.textShadow = 'none'
          span.style.color      = '#ffffff'
          setTimeout(() => {
            span.style.color = '#c9a96e'
            setTimeout(() => scrambleLetter(index + 1), 40)
          }, 50)
        }
      }, 40)
    }

    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      // Lock each span's width before scrambling to prevent layout shift
      spans.forEach(span => {
        const w = span.getBoundingClientRect().width
        span.style.width = `${w}px`
      })
      setTimeout(() => scrambleLetter(0), 200)
    })

    return () => {}
  }, [onComplete])

  return (
    <div id="smk-loader" style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      <style>{`
        @keyframes loaderLogoEntry {
          0%   { opacity: 0; transform: scale(0.75); }
          60%  { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes loaderBreathe {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(201,169,110,0.3)); }
          50%       { filter: drop-shadow(0 0 18px rgba(201,169,110,0.6)); }
        }
        @keyframes loaderSpinCW  { to { transform: rotate(360deg);  } }
        @keyframes loaderSpinCCW { to { transform: rotate(-360deg); } }

        .ldr-logo {
          animation:
            loaderLogoEntry 1.2s cubic-bezier(0.22,1,0.36,1) 0.1s both,
            loaderBreathe   3.5s ease-in-out 1.4s infinite;
        }
        .ldr-tri-cw  { animation: loaderSpinCW  18s linear infinite; transform-origin: 60px 60px; }
        .ldr-tri-ccw { animation: loaderSpinCCW 12s linear infinite; transform-origin: 60px 60px; }
      `}</style>

      {/* Background layer — fades out independently during transition */}
      <div
        id="loader-bg"
        style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}
      />

      {/* Eye logo — same absolute position as hero logo for seamless crossfade */}
      <div
        id="loader-logo-wrap"
        style={{
          position:  'absolute',
          top:       '40%',
          left:      '50%',
          transform: 'translate(-50%, -50%)',
          zIndex:    2,
        }}
      >
        <svg
          className="ldr-logo"
          width="120" height="120" viewBox="0 0 120 120"
          fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8,60 Q60,8 112,60 Q60,112 8,60 Z"
                fill="none" stroke="#c9a96e" strokeWidth="1"/>
          <circle cx="60" cy="60" r="28"
                  fill="none" stroke="#c9a96e" strokeWidth="0.7" opacity="0.35"/>
          <circle cx="60" cy="60" r="22"
                  fill="none" stroke="#c9a96e" strokeWidth="1"/>
          <g className="ldr-tri-cw">
            <polygon points="60,38 79,71 41,71"
                     fill="none" stroke="#c9a96e" strokeWidth="0.9"/>
          </g>
          <g className="ldr-tri-ccw">
            <polygon points="60,82 41,49 79,49"
                     fill="none" stroke="#c9a96e" strokeWidth="0.7" opacity="0.55"/>
          </g>
          <circle cx="60" cy="60" r="10"
                  fill="none" stroke="#c9a96e" strokeWidth="0.6" opacity="0.4"/>
          <circle cx="60" cy="60" r="4" fill="#c9a96e"/>
          <circle cx="63" cy="57" r="1.4" fill="#fff" opacity="0.9"/>
          <circle cx="8"   cy="60" r="2" fill="#c9a96e" opacity="0.6"/>
          <circle cx="112" cy="60" r="2" fill="#c9a96e" opacity="0.6"/>
          <line x1="60" y1="32" x2="60" y2="36" stroke="#c9a96e" strokeWidth="0.7" opacity="0.4"/>
          <line x1="60" y1="84" x2="60" y2="88" stroke="#c9a96e" strokeWidth="0.7" opacity="0.4"/>
          <line x1="32" y1="60" x2="36" y2="60" stroke="#c9a96e" strokeWidth="0.7" opacity="0.4"/>
          <line x1="84" y1="60" x2="88" y2="60" stroke="#c9a96e" strokeWidth="0.7" opacity="0.4"/>
        </svg>
      </div>

      {/* Text stack — letters + tagline, vertically centered below logo */}
      <div
        style={{
          position:      'absolute',
          top:           'calc(40% + 76px)',
          left:          '50%',
          transform:     'translateX(-50%)',
          zIndex:        2,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '20px',
        }}
      >
        {/* Letters container — flies to navbar via JS transform */}
        <div
          ref={containerRef}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}
        />

        {/* Tagline — fades out before letters fly */}
        <p
          ref={taglineRef}
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      '0.65rem',
            letterSpacing: '0.35em',
            color:         'rgba(201,169,110,0.5)',
            textTransform: 'uppercase',
            opacity:       0,
            margin:        0,
          }}
        >
          Wedding &amp; Portrait Photography
        </p>
      </div>
    </div>
  )
}
