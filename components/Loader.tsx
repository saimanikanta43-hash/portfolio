"use client";

import { useEffect, useRef, useState } from "react";

const name = ['S','a','i','M','a','n','i','K','a','n','t','a'];
const scriptChars = [
  'అ','ఆ','क','ख','ア','イ','Α','Β','가','나',
  'ا','ب','A','B','C','D','E','F','G','H',
];

export default function Loader() {
  const [visible,  setVisible]  = useState(true);
  const loaderRef  = useRef<HTMLDivElement>(null);
  const nameRef    = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let cancelled      = false;
    let activeInterval: ReturnType<typeof setInterval> | null = null;
    const allTimers:    ReturnType<typeof setTimeout>[] = [];

    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => { if (!cancelled) fn(); }, ms);
      allTimers.push(id);
    };

    // ── Direct DOM refs ──────────────────────────────────────────────────────
    const nameEl    = nameRef.current!;
    const taglineEl = taglineRef.current!;
    const loaderEl  = loaderRef.current!;

    // Shared pointer to the currently scrambling span
    let activeSpan: HTMLSpanElement | null = null;

    // ── Render: locked letters + one active scrambling span ──────────────────
    function renderDisplay(locked: string[]) {
      nameEl.innerHTML = "";

      locked.forEach(letter => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.cssText = "display:inline-block;color:#c9a96e;";
        nameEl.appendChild(span);
      });

      activeSpan = document.createElement("span");
      activeSpan.textContent = name[locked.length]; // initial placeholder
      activeSpan.style.cssText = "display:inline-block;color:#c9a96e;";
      nameEl.appendChild(activeSpan);
    }

    // ── Update only the active span's text ───────────────────────────────────
    function updateScrambleSpan(char: string) {
      if (activeSpan) activeSpan.textContent = char;
    }

    // ── Show tagline → fade out ──────────────────────────────────────────────
    function showTagline() {
      later(() => {
        taglineEl.style.transition = "opacity 500ms ease";
        taglineEl.style.opacity    = "1";
      }, 600);

      later(() => {
        loaderEl.style.transition = "opacity 700ms ease";
        loaderEl.style.opacity    = "0";
      }, 600 + 900);

      later(() => {
        document.body.style.overflow = "";
        setVisible(false);
      }, 600 + 900 + 700);
    }

    // ── Core loop: scramble 7 chars then lock ────────────────────────────────
    const lockedLetters: string[] = [];

    function lockNextLetter() {
      if (cancelled) return;

      if (lockedLetters.length >= name.length) {
        showTagline();
        return;
      }

      renderDisplay(lockedLetters);

      let count = 0;
      activeInterval = setInterval(() => {
        if (cancelled) { clearInterval(activeInterval!); return; }

        const rand = scriptChars[Math.floor(Math.random() * scriptChars.length)];
        updateScrambleSpan(rand);
        count++;

        if (count >= 7) {
          clearInterval(activeInterval!);
          activeInterval = null;

          // Snap to correct letter
          if (activeSpan) {
            activeSpan.textContent = name[lockedLetters.length];
          }

          lockedLetters.push(name[lockedLetters.length]);

          later(lockNextLetter, 80);
        }
      }, 70);
    }

    // ── Kick off ─────────────────────────────────────────────────────────────
    later(lockNextLetter, 300);

    return () => {
      cancelled = true;
      if (activeInterval) clearInterval(activeInterval);
      allTimers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      style={{
        position:       "fixed",
        width:          "100vw",
        height:         "100vh",
        background:     "#0a0a0a",
        zIndex:         9999,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "24px",
      }}
    >
      {/* Name — rebuilt letter-by-letter via direct DOM writes */}
      <div
        ref={nameRef}
        style={{
          display:       "inline-flex",
          alignItems:    "baseline",
          fontFamily:    "'Cormorant Garamond', 'Noto Sans', serif",
          fontSize:      "clamp(1.8rem, 5vw, 3.5rem)",
          fontWeight:    400,
          letterSpacing: "0.12em",
          color:         "#c9a96e",
          overflow:      "hidden",
        }}
      />

      {/* Tagline — starts invisible, fades in after all letters lock */}
      <p
        ref={taglineRef}
        style={{
          fontFamily:    "'Inter', sans-serif",
          fontSize:      "clamp(0.5rem, 2vw, 0.7rem)",
          fontWeight:    300,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color:         "rgba(201,169,110,0.6)",
          opacity:       0,
          margin:        0,
        }}
      >
        Wedding &amp; Portrait Photography
      </p>
    </div>
  );
}
