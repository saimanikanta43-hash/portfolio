export default function Hero() {
  return (
    <section
      id="hero"
      style={{ position: "relative", height: "100vh", background: "#080808", overflow: "hidden" }}
    >
      <style>{`
        @keyframes ringPulse {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.7; }
        }
        @keyframes spinCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes breathe {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(201,169,110,0.35)); }
          50%       { filter: drop-shadow(0 0 24px rgba(201,169,110,0.7)); }
        }
        @keyframes hero-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }

        /* Logo animations — opacity starts at 0 via globals.css, revealed by JS crossfade */
        #hero-logo-mark      { animation: breathe 4s ease-in-out 0s infinite; }
        #hero-logo-mark .tri-outer { animation: spinCW  18s linear infinite; transform-origin: 60px 60px; }
        #hero-logo-mark .tri-inner { animation: spinCCW 12s linear infinite; transform-origin: 60px 60px; }
        #hero-logo-mark .iris-ring { animation: ringPulse 3.5s ease-in-out 0s infinite; }

        .hero-scroll { animation: hero-bounce 2.2s ease-in-out infinite; }

        @media (max-width: 768px) {
          .hero-wordmark-text { font-size: clamp(1.6rem, 7vw, 2.4rem) !important; }
        }
      `}</style>

      {/* SVG grain */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10 }}
      >
        <filter id="hg">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hg)" opacity="0.042" />
      </svg>

      {/* Eye mark — matches loader logo position exactly for seamless crossfade */}
      <svg
        id="hero-logo-mark"
        width="120" height="120" viewBox="0 0 120 120"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{
          position:  "absolute",
          top:       "40%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          zIndex:    5,
        }}
      >
        <path d="M8,60 Q60,8 112,60 Q60,112 8,60 Z"
              fill="none" stroke="#c9a96e" strokeWidth="1"/>
        <circle className="iris-ring" cx="60" cy="60" r="28"
                fill="none" stroke="#c9a96e" strokeWidth="0.7" opacity="0.35"/>
        <circle cx="60" cy="60" r="22"
                fill="none" stroke="#c9a96e" strokeWidth="1"/>
        <g className="tri-outer">
          <polygon points="60,38 79,71 41,71"
                   fill="none" stroke="#c9a96e" strokeWidth="0.9"/>
        </g>
        <g className="tri-inner">
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

      {/* Text group — positioned below logo, revealed staggered via body.hero-revealed */}
      <div
        style={{
          position:      "absolute",
          top:           "calc(40% + 76px)",
          left:          "50%",
          transform:     "translateX(-50%)",
          textAlign:     "center",
          zIndex:        5,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "20px",
          width:         "100%",
          padding:       "0 24px",
        }}
      >
        {/* Wordmark + divider */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <span
            className="hero-name hero-wordmark-text"
            style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      "clamp(2rem, 5.5vw, 4rem)",
              fontWeight:    300,
              fontStyle:     "italic",
              color:         "#f5f0e8",
              lineHeight:    1,
              letterSpacing: "0.02em",
              whiteSpace:    "nowrap",
            }}
          >
            Stories by Nayanam
          </span>

          <div
            className="hero-divider"
            style={{
              width:      240,
              height:     1,
              background: "linear-gradient(to right, transparent, rgba(201,169,110,0.35), transparent)",
            }}
          />
        </div>

        {/* Tagline */}
        <span
          className="hero-tagline"
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      "0.52rem",
            fontWeight:    400,
            letterSpacing: "0.45em",
            color:         "#c9a96e",
            textTransform: "uppercase",
          }}
        >
          Wedding &amp; Portrait Photography
        </span>
      </div>

      {/* Radial vignette */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          background:    "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
          zIndex:        4,
        }}
      />

      {/* Scroll indicator — revealed via body.hero-revealed */}
      <div
        className="hero-scroll-wrap"
        style={{
          position:  "absolute",
          bottom:    36,
          left:      "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex:    6,
        }}
      >
        <div className="hero-scroll">
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
      </div>
    </section>
  )
}
