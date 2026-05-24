"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [skylineIn, setSkylineIn] = useState(false);
  const [textIn,    setTextIn]    = useState(false);
  const [lineIn,    setLineIn]    = useState(false);
  const skylineInnerRef           = useRef<HTMLDivElement>(null);
  const loadDone                  = useRef(false);
  const rafRef                    = useRef<number>(0);

  // Load sequence
  useEffect(() => {
    const t1 = setTimeout(() => setSkylineIn(true),        400);
    const t2 = setTimeout(() => setTextIn(true),          1000);
    const t3 = setTimeout(() => setLineIn(true),          1500);
    const t4 = setTimeout(() => { loadDone.current = true; }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Scroll parallax via RAF
  useEffect(() => {
    const tick = () => {
      if (loadDone.current && skylineInnerRef.current) {
        const y     = window.scrollY;
        const ty    = -(y * 0.4);
        const scale = Math.max(0.97, 1 - y * 0.00006);
        skylineInnerRef.current.style.transform = `translateY(${ty}px) scale(${scale})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position:   "relative",
        height:     "100vh",
        background: "#0a0a0a",
        overflow:   "hidden",
      }}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes hero-bounce {
          0%, 100% { transform: translateY(0);  }
          50%       { transform: translateY(7px); }
        }
        .hero-scroll { animation: hero-bounce 2.2s ease-in-out infinite; }
      `}</style>

      {/* ── SVG grain noise overlay ── */}
      <svg
        aria-hidden
        style={{
          position:      "absolute",
          inset:         0,
          width:         "100%",
          height:        "100%",
          pointerEvents: "none",
          zIndex:        10,
        }}
      >
        <filter id="hg">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hg)" opacity="0.042" />
      </svg>

      {/* ── Center text block ── */}
      <div
        style={{
          position:  "absolute",
          top:       "35%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex:    5,
          width:     "100%",
          padding:   "0 24px",
        }}
      >
        <h1
          style={{
            fontFamily:    "'Cormorant Garamond', serif",
            fontSize:      "clamp(2.6rem, 6vw, 6rem)",
            fontWeight:    300,
            color:         "#f5f0e8",
            letterSpacing: "0.08em",
            margin:        0,
            lineHeight:    1,
            opacity:       textIn ? 1 : 0,
            transform:     textIn ? "translateY(0)" : "translateY(24px)",
            transition:    "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          SaiManiKanta
        </h1>

        <div
          style={{
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
            gap:        "14px",
            margin:     "18px 0 0",
            opacity:    textIn ? 0.85 : 0,
            transform:  textIn ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s ease 0.12s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s",
          }}
        >
          <div style={{ width: 30, height: 1, background: "#c9a96e", flexShrink: 0 }} />
          <p
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      "clamp(0.55rem, 0.85vw, 0.85rem)",
              fontWeight:    300,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color:         "#c9a96e",
              margin:        0,
            }}
          >
            Wedding &amp; Portrait Photography
          </p>
          <div style={{ width: 30, height: 1, background: "#c9a96e", flexShrink: 0 }} />
        </div>

        {/* Gold rule */}
        <div
          style={{
            width:      lineIn ? 50 : 0,
            height:     1,
            background: "#c9a96e",
            margin:     "22px auto 0",
            opacity:    0.75,
            transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>

      {/* ── Skyline: clip-path sweep wrapper ── */}
      <div
        style={{
          position:   "absolute",
          bottom:     0,
          left:       0,
          right:      0,
          clipPath:   skylineIn ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          opacity:    skylineIn ? 1 : 0,
          transition: "clip-path 2s cubic-bezier(0.16,1,0.3,1), opacity 1.8s ease",
        }}
      >
        {/* Inner: parallax + scale driven by RAF */}
        <div
          ref={skylineInnerRef}
          style={{
            transformOrigin: "bottom center",
            willChange:      "transform",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/skyline.svg"
            alt=""
            aria-hidden
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </div>

      {/* ── Bottom fade — keeps dark floor anchored regardless of parallax ── */}
      <div
        style={{
          position:      "absolute",
          bottom:        0,
          left:          0,
          right:         0,
          height:        "22%",
          background:    "linear-gradient(to top, #0a0a0a 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex:        3,
        }}
      />

      {/* ── Radial vignette ── */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          background:    "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
          zIndex:        4,
        }}
      />

      {/* ── Scroll indicator ── */}
      <div
        className="hero-scroll"
        style={{
          position:  "absolute",
          bottom:    36,
          left:      "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex:    6,
          opacity:   textIn ? 0.65 : 0,
          transition: "opacity 1s ease 0.6s",
        }}
      >
        <p
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      "0.52rem",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color:         "#c9a96e",
            margin:        "0 0 10px",
          }}
        >
          Scroll
        </p>
        <svg width="1" height="20" viewBox="0 0 1 20" style={{ display: "block", margin: "0 auto" }}>
          <line x1="0.5" y1="0" x2="0.5" y2="20" stroke="#c9a96e" strokeWidth="0.7" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
