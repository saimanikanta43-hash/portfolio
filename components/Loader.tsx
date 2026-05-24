"use client";

import { useEffect, useRef, useState } from "react";

const NAME = "SaiManiKanta";

const SCRIPT_CHARS = [
  // Telugu
  'అ','ఆ','ఇ','ఈ','క','గ','చ','జ','ట','డ','త','ద','న','ప','బ','మ','య','ర','ల','వ',
  // Hindi / Devanagari
  'अ','आ','क','ख','ग','घ','च','ज','ट','ड','त','द','न','प','ब','म','य','र','ल','व',
  // Arabic
  'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
  // Japanese Katakana
  'ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ',
  // Greek
  'Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ',
  // Korean
  '가','나','다','라','마','바','사','아','자','차','카','타','파','하',
  // Latin uppercase
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
];

// ── Timing (ms) ─────────────────────────────────────────────────────────────
const SCRAMBLE_START  = 1000;                                  // phase 2 begin
const SCRAMBLE_STAGGER = 60;                                   // per-letter start delay
const SCRAMBLE_SPEED  = 80;                                    // ms per character swap
const LOCK_START      = 3500;                                  // phase 3 begin
const LOCK_GAP        = 180;                                   // ms between each lock
const LAST_LOCK       = LOCK_START + (NAME.length - 1) * LOCK_GAP; // 5480ms
const TAGLINE_IN      = LAST_LOCK  + 300;                     // 5780ms
const EXIT_AT         = TAGLINE_IN + 600 + 800;               // 7180ms
const DONE_AT         = EXIT_AT    + 700;                      // 7880ms

export default function Loader() {
  const [visible,   setVisible]   = useState(true);
  const [logoIn,    setLogoIn]    = useState(false);
  const [exiting,   setExiting]   = useState(false);
  const [taglineIn, setTaglineIn] = useState(false);

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const intervals  = useRef<(ReturnType<typeof setInterval> | null)[]>(
    new Array(NAME.length).fill(null)
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    const add = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timers.push(id);
    };

    // Phase 1 — Logo fades in
    add(() => setLogoIn(true), 50);

    // Phase 2 — Each letter scrambles (staggered start)
    for (let i = 0; i < NAME.length; i++) {
      const idx = i;
      add(() => {
        const span = letterRefs.current[idx];
        if (!span) return;
        span.style.filter = "blur(0.5px)";
        intervals.current[idx] = setInterval(() => {
          const s = letterRefs.current[idx];
          if (s) s.textContent = SCRIPT_CHARS[Math.floor(Math.random() * SCRIPT_CHARS.length)];
        }, SCRAMBLE_SPEED);
      }, SCRAMBLE_START + idx * SCRAMBLE_STAGGER);
    }

    // Phase 3 — Lock letters left → right
    for (let i = 0; i < NAME.length; i++) {
      const idx    = i;
      const letter = NAME[idx];
      add(() => {
        const iv = intervals.current[idx];
        if (iv !== null) { clearInterval(iv); intervals.current[idx] = null; }
        const span = letterRefs.current[idx];
        if (!span) return;

        span.textContent         = letter;
        span.style.filter        = "blur(0px)";
        span.style.color         = "#ffffff";  // white flash
        span.style.transition    = "";

        setTimeout(() => {
          if (!letterRefs.current[idx]) return;
          letterRefs.current[idx]!.style.transition = "color 0.25s ease";
          letterRefs.current[idx]!.style.color      = "#c9a96e";
        }, 160);
      }, LOCK_START + idx * LOCK_GAP);
    }

    // Phase 4 — Tagline
    add(() => setTaglineIn(true), TAGLINE_IN);

    // Phase 5 — Exit
    add(() => setExiting(true), EXIT_AT);
    add(() => {
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
        @keyframes smk-cw     { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes smk-ccw60  { from { transform: rotate(60deg);  } to { transform: rotate(-300deg); } }
        @keyframes smk-cw-n60 { from { transform: rotate(-60deg); } to { transform: rotate(300deg);  } }
        @keyframes smk-pulse  { 0%,100% { transform: scale(1); } 50% { transform: scale(1.38); } }
        @keyframes smk-glow   { 0%,100% { opacity: 0.22; } 50% { opacity: 0.58; } }
        .smk-r1   { transform-box:fill-box;transform-origin:center;animation:smk-cw 10s linear infinite; }
        .smk-r2   { transform-box:fill-box;transform-origin:center;animation:smk-ccw60 7s linear infinite; }
        .smk-r3   { transform-box:fill-box;transform-origin:center;animation:smk-cw-n60 14s linear infinite; }
        .smk-dot  { transform-box:fill-box;transform-origin:center;animation:smk-pulse 2.4s ease-in-out infinite; }
        .smk-glow { animation:smk-glow 2.4s ease-in-out infinite; }
        @media (max-width: 768px) { .smk-name { font-size: 2.2rem !important; letter-spacing: 0.14em !important; } }
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

        {/* ── Studio name — direct DOM scramble via refs ── */}
        <div
          className="smk-name"
          style={{
            fontFamily:    "'Cormorant Garamond', serif",
            fontSize:      "3.5rem",
            fontWeight:    300,
            letterSpacing: "0.2em",
            display:       "flex",
            lineHeight:    1,
            userSelect:    "none",
            opacity:       logoIn ? 1 : 0,
            transition:    "opacity 0.6s ease 0.3s",
          }}
        >
          {NAME.split("").map((letter, i) => (
            <span
              key={i}
              ref={el => { letterRefs.current[i] = el; }}
              style={{
                display:   "inline-block",
                color:     "#c9a96e",
                minWidth:  "0.55em",
                textAlign: "center",
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
            transition:    "opacity 0.6s ease",
            margin:        0,
          }}
        >
          Wedding &amp; Portrait Photography
        </p>
      </div>
    </>
  );
}
