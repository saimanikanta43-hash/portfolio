"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Work", "Story", "About", "Contact"];

export default function Navbar() {
  const [inHero,   setInHero]   = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const dark = inHero;

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-8 md:px-16"
        style={{
          paddingTop:    28,
          paddingBottom: 28,
          background:    dark
            ? "transparent"
            : scrolled
            ? "rgba(10,10,10,0.92)"
            : "transparent",
          backdropFilter: !dark && scrolled ? "blur(12px)" : "none",
          borderBottom:   !dark && scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition:     "background 0.6s ease, backdrop-filter 0.6s ease, border-bottom 0.6s ease",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily:    "'Playfair Display', serif",
            fontSize:      "1.1rem",
            fontWeight:    500,
            letterSpacing: "0.1em",
            color:         dark ? "rgba(255,255,255,0.88)" : scrolled ? "#f5f0e8" : "#F2E8DC",
            transition:    "color 0.5s ease",
          }}
        >
          SMK
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-10">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      "0.68rem",
                  fontWeight:    400,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color:         dark ? "rgba(255,255,255,0.42)" : scrolled ? "rgba(255,255,255,0.55)" : "#9E8E98",
                  transition:    "color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = dark ? "rgba(255,255,255,0.90)" : scrolled ? "#f5f0e8" : "#F2E8DC")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = dark ? "rgba(255,255,255,0.42)" : scrolled ? "rgba(255,255,255,0.55)" : "#9E8E98")
                }
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            gap:            5,
            padding:        4,
            background:     "none",
            border:         "none",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display:         "block",
                width:           22,
                height:          1,
                background:      dark ? "rgba(255,255,255,0.8)" : "#111111",
                transformOrigin: "center",
                transition:      "transform 0.3s ease, opacity 0.3s ease",
                transform:
                  menuOpen
                    ? i === 0 ? "translateY(6px) rotate(45deg)"
                    : i === 2 ? "translateY(-6px) rotate(-45deg)"
                    : "scaleX(0)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position:       "fixed",
              inset:          0,
              zIndex:         800,
              background:     "#0a0a0a",
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              gap:            48,
            }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => scrollTo(link)}
                style={{
                  fontFamily:    "'Playfair Display', serif",
                  fontSize:      "2.2rem",
                  fontWeight:    400,
                  color:         "rgba(255,255,255,0.85)",
                  letterSpacing: "0.05em",
                  background:    "none",
                  border:        "none",
                }}
              >
                {link}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{ width: 30, height: 1, background: "#c9a96e", opacity: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
