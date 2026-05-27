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

    // Create one span per letter — all hidden initially
    const spans: HTMLSpanElement[] = []
    FINAL_NAME.forEach(() => {
      const span = document.createElement('span')
      span.style.cssText = `
        display: inline-block;
        min-width: 0.6em;
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

    function scrambleLetter(index: number) {
      if (index >= FINAL_NAME.length) {
        // Fade in tagline
        const tagline = taglineRef.current
        if (tagline) {
          setTimeout(() => {
            tagline.style.transition = 'opacity 500ms ease'
            tagline.style.opacity    = '1'
          }, 200)
        }

        // Fade out loader
        setTimeout(() => {
          const loader = document.getElementById('smk-loader')
          if (loader) {
            loader.style.transition = 'opacity 0.5s ease'
            loader.style.opacity    = '0'
            setTimeout(() => {
              loader.style.display = 'none'
              document.body.style.overflow = 'auto'
              onComplete()
            }, 500)
          }
        }, 400)
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
          // Brief flash
          span.style.color = '#ffffff'
          setTimeout(() => {
            span.style.color = '#c9a96e'
            // Start next letter
            setTimeout(() => scrambleLetter(index + 1), 40)
          }, 50)
        }
      }, 40)
    }

    document.body.style.overflow = 'hidden'
    setTimeout(() => scrambleLetter(0), 200)

    return () => {}
  }, [onComplete])

  return (
    <div
      id="smk-loader"
      style={{
        position:        'fixed',
        inset:           0,
        background:      '#0a0a0a',
        zIndex:          9999,
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      <div
        ref={containerRef}
        style={{
          display:        'flex',
          flexDirection:  'row',
          alignItems:     'baseline',
        }}
      />
      <p
        ref={taglineRef}
        style={{
          fontFamily:    "'Inter', sans-serif",
          fontSize:      '0.65rem',
          letterSpacing: '0.35em',
          color:         'rgba(201,169,110,0.5)',
          textTransform: 'uppercase',
          marginTop:     '1.5rem',
          opacity:       0,
          margin:        '1.5rem 0 0',
        }}
      >
        Wedding &amp; Portrait Photography
      </p>
    </div>
  )
}
