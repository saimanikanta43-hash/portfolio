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
const START_DELAY    = 400;                                        // blank screen pause
const LETTER_CYCLE   = 400;                                        // ms per letter
const SCRAMBLE_SPEED = 60;                                         // ms per char swap
const FLASH_MS       = 80;                                         // white flash duration
const LAST_LOCK      = START_DELAY + LETTERS.length * LETTER_CYCLE; // 5200ms
const TAGLINE_IN     = LAST_LOCK  + 500;                           // 5700ms
const EXIT_AT        = TAGLINE_IN + 800;                           // 6500ms
const DONE_AT        = EXIT_AT    + 600;                           // 7100ms

export default function Loader() {
  const [visible,   setVisible]   = useState(true);
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
      timers.push(setTimeout(fn, ms));
    };

    // One letter at a time: reveal → scramble → lock
    LETTERS.forEach((letter, i) => {
      const scrambleAt = START_DELAY + i * LETTER_CYCLE;
      const lockAt     = scrambleAt + LETTER_CYCLE;

      // Make visible and start scrambling
      later(() => {
        const span = spanRefs.current[i];
        if (!span) return;
        span.style.visibility = "visible";
        intervals.current[i] = setInterval(() => {
          const s = spanRefs.current[i];
          if (s) s.textContent = rand();
        }, SCRAMBLE_SPEED);
      }, scrambleAt);

      // Lock: stop scramble, flash white → settle gold
      later(() => {
        const iv = intervals.current[i];
        if (iv !== null) { clearInterval(iv); intervals.current[i] = null; }

        const span = spanRefs.current[i];
        if (!span) return;

        span.textContent      = letter;
        span.style.transition = "";
        span.style.color      = "#ffffff";

        setTimeout(() => {
          const s = spanRefs.current[i];
          if (!s) return;
          s.style.transition = "color 0.15s ease";
          s.style.color      = "#c9a96e";
        }, FLASH_MS);
      }, lockAt);
    });

    later(() => setTaglineIn(true), TAGLINE_IN);
    later(() => setExiting(true),   EXIT_AT);
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
        @media (max-width: 768px) {
          .smk-name { font-size: 2.2rem !important; }
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
          gap:            28,
          opacity:        exiting ? 0 : 1,
          transition:     "opacity 0.6s ease",
          pointerEvents:  exiting ? "none" : "auto",
        }}
      >
        {/* ── Studio name ── */}
        <div
          className="smk-name"
          style={{
            fontFamily:    "'Cormorant Garamond', 'Noto Sans', 'Noto Sans Telugu', 'Noto Sans Devanagari', 'Noto Sans Arabic', sans-serif",
            fontSize:      "3.8rem",
            fontWeight:    400,
            letterSpacing: "0.15em",
            lineHeight:    1,
            userSelect:    "none",
            display:       "flex",
          }}
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={el => { spanRefs.current[i] = el; }}
              style={{
                display:    "inline-block",
                visibility: "hidden",  // holds layout; revealed one by one via JS
                color:      "#c9a96e",
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
            fontSize:      "0.65rem",
            fontWeight:    300,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color:         "rgba(201,169,110,0.7)",
            margin:        0,
            opacity:       taglineIn ? 1 : 0,
            transition:    "opacity 0.6s ease",
          }}
        >
          Wedding &amp; Portrait Photography
        </p>
      </div>
    </>
  );
}
