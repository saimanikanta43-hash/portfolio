"use client";

import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    const finalName = ['S','a','i','M','a','n','i','K','a','n','t','a'];
    const chars = ['అ','क','ア','Α','가','ا','B','D','F','H','M','R'];
    let lockedHTML = '';
    let i = 0;

    const loaderEl    = document.getElementById('loader')         as HTMLElement;
    const lockedDisplay = document.getElementById('locked-display') as HTMLElement;
    const letterDisplay = document.getElementById('letter-display') as HTMLElement;
    const taglineEl   = document.getElementById('loader-tagline') as HTMLElement;

    document.body.style.overflow = 'hidden';

    function finish() {
      setTimeout(() => {
        // Fade tagline in via JS — CSS transitions are suppressed on children
        let op = 0;
        const fadeIn = setInterval(() => {
          op = Math.min(op + 0.05, 1);
          taglineEl.style.opacity = String(op);
          if (op >= 1) clearInterval(fadeIn);
        }, 40);

        setTimeout(() => {
          loaderEl.style.transition = 'opacity 0.8s ease';
          loaderEl.style.opacity = '0';
          setTimeout(() => {
            loaderEl.style.display = 'none';
            document.body.style.overflow = 'auto';
          }, 800);
        }, 900);
      }, 700);
    }

    function nextLetter() {
      if (i >= finalName.length) { finish(); return; }
      let ticks = 0;
      const max = 8;
      const timer = setInterval(() => {
        const r = Math.floor(Math.random() * chars.length);
        letterDisplay.textContent = chars[r];
        ticks++;
        if (ticks >= max) {
          clearInterval(timer);
          lockedHTML += `<span class="locked">${finalName[i]}</span>`;
          lockedDisplay.innerHTML = lockedHTML;
          letterDisplay.textContent = '';
          i++;
          setTimeout(nextLetter, 60);
        }
      }, 65);
    }

    setTimeout(nextLetter, 500);

    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <>
      <style>{`
        #loader {
          position: fixed;
          inset: 0;
          background: #0a0a0a;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        #loader * {
          animation: none !important;
          transform: none !important;
          transition: none !important;
        }
        #locked-display {
          display: flex;
          flex-direction: row;
          gap: 4px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 400;
          color: #c9a96e;
          letter-spacing: 0.15em;
          min-height: 1.2em;
        }
        #letter-display {
          display: inline-block;
          text-align: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 400;
          color: #c9a96e;
          letter-spacing: 0.15em;
          min-height: 1.2em;
          min-width: 1em;
        }
        .locked {
          display: inline-block;
          animation: none !important;
          transform: none !important;
          transition: none !important;
        }
        #loader-tagline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.5rem, 2vw, 0.7rem);
          letter-spacing: 0.35em;
          color: rgba(201, 169, 110, 0.6);
          text-transform: uppercase;
          opacity: 0;
        }
      `}</style>
      <div id="loader">
        <div id="locked-display" />
        <div id="letter-display" />
        <div id="loader-tagline">WEDDING &amp; PORTRAIT PHOTOGRAPHY</div>
      </div>
    </>
  );
}
