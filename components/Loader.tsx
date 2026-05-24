"use client";

import { useEffect, useState } from "react";

const NAME = "SaiManiKanta";

// Timing constants (ms)
const LETTER_START  = 400;   // delay before first letter appears
const LETTER_GAP    = 120;   // gap between each letter
const HOLD_AFTER    = 900;   // pause after all letters shown
const EXIT_DURATION = 600;   // fade-out duration

const ALL_SHOWN = LETTER_START + (NAME.length - 1) * LETTER_GAP; // 1720ms
const EXIT_AT   = ALL_SHOWN + HOLD_AFTER;                         // 2620ms
const DONE_AT   = EXIT_AT   + EXIT_DURATION;                      // 3220ms

export default function Loader() {
  const [visible,  setVisible]  = useState(true);
  const [exiting,  setExiting]  = useState(false);
  const [revealed, setRevealed] = useState(0);

  // Lock body scroll for the full loader duration
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Master sequence: reveal letters → hold → fade out → unlock scroll
  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = [];

    NAME.split("").forEach((_, i) => {
      ts.push(setTimeout(() => setRevealed(i + 1), LETTER_START + i * LETTER_GAP));
    });

    ts.push(setTimeout(() => setExiting(true), EXIT_AT));
    ts.push(setTimeout(() => {
      document.body.style.overflow = "";
      setVisible(false);
    }, DONE_AT));

    return () => ts.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/*
        CSS keyframes injected here so they're scoped to the loader lifecycle.
        Prefixed with "smk-" to avoid any global collisions.
      */}
      <style>{`
        /* ── Orbital ring rotations ── */
        .smk-r1 {
          transform-box: fill-box;
          transform-origin: center;
          animation: smk-cw 10s linear infinite;
        }
        .smk-r2 {
          transform-box: fill-box;
          transform-origin: center;
          /* starts at 60° tilt, rotates counter-clockwise */
          animation: smk-ccw60 7s linear infinite;
        }
        .smk-r3 {
          transform-box: fill-box;
          transform-origin: center;
          /* starts at -60° tilt, rotates clockwise */
          animation: smk-cw-n60 14s linear infinite;
        }

        /* ── Center dot pulse ── */
        .smk-dot {
          transform-box: fill-box;
          transform-origin: center;
          animation: smk-pulse 2.4s ease-in-out infinite;
        }

        /* ── Glow halo behind center dot ── */
        .smk-glow {
          animation: smk-glow 2.4s ease-in-out infinite;
        }

        @keyframes smk-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes smk-ccw60 {
          from { transform: rotate(60deg); }
          to   { transform: rotate(-300deg); }
        }
        @keyframes smk-cw-n60 {
          from { transform: rotate(-60deg); }
          to   { transform: rotate(300deg); }
        }
        @keyframes smk-pulse {
          0%, 100% { transform: scale(1);    }
          50%      { transform: scale(1.38); }
        }
        @keyframes smk-glow {
          0%, 100% { opacity: 0.22; }
          50%      { opacity: 0.58; }
        }
      `}</style>

      <div
        style={{
          position:       "fixed",
          inset:          0,
          zIndex:         99999,
          background:     "#0a0a0a",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          gap:            60,
          opacity:        exiting ? 0 : 1,
          transition:     `opacity ${EXIT_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          pointerEvents:  exiting ? "none" : "auto",
        }}
        aria-hidden="true"
      >
        {/* ── Orbital logo ── */}
        <svg
          viewBox="-65 -65 130 130"
          width="130"
          height="130"
          style={{ overflow: "visible" }}
        >
          {/* Soft glow halo behind center dot */}
          <circle
            cx="0" cy="0" r="14"
            fill="#c9a96e"
            className="smk-glow"
            style={{ filter: "blur(7px)" }}
          />

          {/* Outer ring — no initial tilt, rotates clockwise */}
          <ellipse
            className="smk-r1"
            cx="0" cy="0" rx="57" ry="22"
            fill="none"
            stroke="#c9a96e"
            strokeWidth="1.3"
            opacity="0.80"
          />

          {/* Middle ring — 60° initial tilt, rotates counter-clockwise */}
          <ellipse
            className="smk-r2"
            cx="0" cy="0" rx="47" ry="19"
            fill="none"
            stroke="#c9a96e"
            strokeWidth="1.05"
            opacity="0.65"
          />

          {/* Inner ring — −60° initial tilt, rotates clockwise */}
          <ellipse
            className="smk-r3"
            cx="0" cy="0" rx="35" ry="14"
            fill="none"
            stroke="#c9a96e"
            strokeWidth="0.85"
            opacity="0.48"
          />

          {/* Center dot — pulses in size with a drop-shadow glow */}
          <circle
            className="smk-dot"
            cx="0" cy="0" r="4.5"
            fill="#c9a96e"
            style={{ filter: "drop-shadow(0 0 6px #c9a96e)" }}
          />
        </svg>

        {/* ── Letter-by-letter studio name ── */}
        <div
          style={{
            fontFamily:  "'Cormorant Garamond', serif",
            fontSize:    "clamp(1.6rem, 2.8vw, 2.8rem)",
            fontWeight:  300,
            letterSpacing: "0.22em",
            color:       "#c9a96e",
            display:     "flex",
            userSelect:  "none",
            lineHeight:  1,
          }}
        >
          {NAME.split("").map((letter, i) => (
            <span
              key={i}
              style={{
                display:   "inline-block",
                opacity:   revealed > i ? 1 : 0,
                transform: revealed > i ? "translateY(0px)" : "translateY(10px)",
                // Transition fires the moment `revealed` passes this index
                transition: revealed > i
                  ? "opacity 360ms ease, transform 360ms ease"
                  : "none",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
