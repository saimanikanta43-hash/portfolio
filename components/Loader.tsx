"use client";

import { useEffect, useRef, useState } from "react";

const NAME    = "SaiManiKanta";
const LETTERS = NAME.split("");

const SCRIPT_CHARS = [
  'అ','ఆ','ఇ','ఈ','క','గ','చ','జ','ట','డ','త','ద','న','ప','బ','మ','య','ర','ల','వ',
  'अ','आ','क','ख','ग','घ','च','ज','ट','ड','त','द','न','प','ब','म','य','र','ल','व',
  'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
  'ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ',
  'Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ',
  '가','나','다','라','마','바','사','아','자','차','카','타','파','하',
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
];

const rand = () => SCRIPT_CHARS[Math.floor(Math.random() * SCRIPT_CHARS.length)];

// ── Timing ────────────────────────────────────────────────────────────────────
const LOGO_IN       = 1000;                                        // logo fully in
const LETTER_CYCLE  = 400;                                         // ms per letter (scramble + lock)
const SCRAMBLE_SPEED = 60;                                         // ms per char swap
const FLASH_DURATION = 80;                                         // white flash ms
const LAST_LOCK     = LOGO_IN + LETTERS.length * LETTER_CYCLE;    // 5800ms
const TAGLINE_IN    = LAST_LOCK  + 600;                            // 6400ms
const EXIT_AT       = TAGLINE_IN + 400 + 500;                      // 7300ms
const DONE_AT       = EXIT_AT    + 700;                            // 8000ms

export default function Loader() {
  const [visible,   setVisible]   = useState(true);
  const [logoIn,    setLogoIn]    = useState(false);
  const [exiting,   setExiting]   = useState(false);
  const [taglineIn, setTaglineIn] = useState(false);

  const spanRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const intervals = useRef<(ReturnType<typeof setInterval> | null)[]>(
    new Array(LETTERS.length).fill(null)
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    // Phase 1 — Logo scales in
    later(() => setLogoIn(true), 50);

    // Phase 2 & 3 — One letter at a time: scramble → lock
    LETTERS.forEach((letter, i) => {
      const scrambleAt = LOGO_IN + i * LETTER_CYCLE;
      const lockAt     = scrambleAt + LETTER_CYCLE;

      // Show this letter and begin scrambling
      later(() => {
        const span = spanRefs.current[i];
        if (!span) return;

        span.style.transition = "";
        span.style.opacity    = "1";
        span.style.fontSize   = "1.1em";
        span.style.color      = "#c9a96e";

        intervals.current[i] = setInterval(() => {
          const s = spanRefs.current[i];
          if (s) s.textContent = rand();
        }, SCRAMBLE_SPEED);
      }, scrambleAt);

      // Lock this letter
      later(() => {
        const iv = intervals.current[i];
        if (iv !== null) { clearInterval(iv); intervals.current[i] = null; }

        const span = spanRefs.current[i];
        if (!span) return;

        // Snap: correct char, white flash, scale pop
        span.textContent      = letter;
        span.style.transition = "";
        span.style.color      = "#ffffff";
        span.style.transform  = "scale(1.15)";

        // Settle to gold + shrink back to normal size
        setTimeout(() => {
          const s = spanRefs.current[i];
          if (!s) return;
          s.style.transition = "color 0.15s ease, transform 0.15s ease, font-size 0.15s ease";
          s.style.color      = "#c9a96e";
          s.style.transform  = "scale(1)";
          s.style.fontSize   = "1em";
        }, FLASH_DURATION);
      }, lockAt);
    });

    // Phase 4 — Tagline
    later(() => setTaglineIn(true), TAGLINE_IN);

    // Phase 5 — Exit
    later(() => setExiting(true), EXIT_AT);
    later(() => {
      document.body.style.overflow = "";
      setVisible(false);
    }, DONE_AT);

    return () => {
      timers.forEach(clearTimeout);
      intervals.current.forEach(iv => { if (iv !== null) clearInterval(iv); });
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes smk-cw     { from{transform:rotate(0deg);}   to{transform:rotate(360deg);}  }
        @keyframes smk-ccw60  { from{transform:rotate(60deg);}  to{transform:rotate(-300deg);} }
        @keyframes smk-cw-n60 { from{transform:rotate(-60deg);} to{transform:rotate(300deg);}  }
        @keyframes smk-pulse  { 0%,100%{transform:scale(1);}    50%{transform:scale(1.38);}    }
        @keyframes smk-glow   { 0%,100%{opacity:0.22;}          50%{opacity:0.58;}              }
        .smk-r1  {transform-box:fill-box;transform-origin:center;animation:smk-cw 10s linear infinite;}
        .smk-r2  {transform-box:fill-box;transform-origin:center;animation:smk-ccw60 7s linear infinite;}
        .smk-r3  {transform-box:fill-box;transform-origin:center;animation:smk-cw-n60 14s linear infinite;}
        .smk-dot {transform-box:fill-box;transform-origin:center;animation:smk-pulse 2.4s ease-in-out infinite;}
        .smk-glow{animation:smk-glow 2.4s ease-in-out infinite;}
        @media (max-width:768px){
          .smk-name{font-size:2.8rem !important;letter-spacing:0.14em !important;}
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position:       "fixed",
          inset:          0,
          zIndex:         99999,
          background:     "#0a0a0a",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          gap:            44,
          opacity:        exiting ? 0 : 1,
          transition:     "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents:  exiting ? "none" : "auto",
        }}
      >
        {/* ── Orbital logo ── */}
        <div
          style={{
            opacity:    logoIn ? 1 : 0,
            transform:  logoIn ? "scale(1)" : "scale(0.8)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <svg viewBox="-65 -65 130 130" width="110" height="110" style={{ overflow: "visible" }}>
            <circle cx="0" cy="0" r="14" fill="#c9a96e" className="smk-glow" style={{ filter: "blur(7px)" }} />
            <ellipse className="smk-r1" cx="0" cy="0" rx="57" ry="22" fill="none" stroke="#c9a96e" strokeWidth="1.3"  opacity="0.80" />
            <ellipse className="smk-r2" cx="0" cy="0" rx="47" ry="19" fill="none" stroke="#c9a96e" strokeWidth="1.05" opacity="0.65" />
            <ellipse className="smk-r3" cx="0" cy="0" rx="35" ry="14" fill="none" stroke="#c9a96e" strokeWidth="0.85" opacity="0.48" />
            <circle className="smk-dot" cx="0" cy="0" r="4.5" fill="#c9a96e" style={{ filter: "drop-shadow(0 0 6px #c9a96e)" }} />
          </svg>
        </div>

        {/* ── Studio name ── */}
        <div
          className="smk-name"
          style={{
            fontFamily:    "'Cormorant Garamond','Noto Sans','Noto Sans Telugu','Noto Sans Devanagari','Noto Sans Arabic',sans-serif",
            fontSize:      "3.5rem",
            fontWeight:    300,
            letterSpacing: "0.2em",
            display:       "flex",
            alignItems:    "center",
            lineHeight:    1,
            userSelect:    "none",
            opacity:       logoIn ? 1 : 0,
            transition:    "opacity 0.6s ease 0.3s",
          }}
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={el => { spanRefs.current[i] = el; }}
              style={{
                display:        "inline-block",
                opacity:        0,       // hidden until it's this letter's turn
                color:          "#c9a96e",
                verticalAlign:  "middle",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* ── Tagline ── */}
        <p
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      "0.58rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color:         "#c9a96e",
            opacity:       taglineIn ? 0.6 : 0,
            transition:    "opacity 0.4s ease",
            margin:        0,
          }}
        >
          Wedding &amp; Portrait Photography
        </p>
      </div>
    </>
  );
}
