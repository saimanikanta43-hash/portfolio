"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = ["Work", "Story", "About", "Contact"];

export default function Navbar() {
  // true while the hero section is still intersecting the viewport (including while pinned)
  const [inHero, setInHero]   = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    // IntersectionObserver correctly detects when GSAP un-pins the hero
    // and it scrolls out of view, so we don't need a scroll-distance heuristic.
    const io = new IntersectionObserver(
      ([entry]) => setInHero(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the hero is visible use dark nav; once past hero use scroll-driven light nav
  const dark = inHero;

  const scrollTo = (id: string) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-8 md:px-16"
      style={{
        paddingTop: 28,
        paddingBottom: 28,
        background: dark
          ? "transparent"
          : scrolled
          ? "rgba(250,250,248,0.92)"
          : "transparent",
        backdropFilter: !dark && scrolled ? "blur(12px)" : "none",
        borderBottom:
          !dark && scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition:
          "background 0.6s ease, backdrop-filter 0.6s ease, border-bottom 0.6s ease",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.1rem",
          fontWeight: 500,
          letterSpacing: "0.1em",
          color: dark ? "rgba(255,255,255,0.88)" : scrolled ? "#111111" : "#F2E8DC",
          transition: "color 0.5s ease",
        }}
      >
        SMK
      </button>

      <ul className="flex gap-10">
        {links.map((link) => (
          <li key={link}>
            <button
              onClick={() => scrollTo(link)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 400,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: dark
                  ? "rgba(255,255,255,0.42)"
                  : scrolled
                  ? "#888888"
                  : "#9E8E98",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = dark ? "rgba(255,255,255,0.90)" : scrolled ? "#111111" : "#F2E8DC")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = dark
                  ? "rgba(255,255,255,0.42)"
                  : scrolled
                  ? "#888888"
                  : "#9E8E98")
              }
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
