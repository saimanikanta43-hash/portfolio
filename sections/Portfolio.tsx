"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  "All", "Weddings", "Engagement", "Couple Portraits",
  "Maternity", "First Birthday", "Graduation",
  "House Warming", "Events", "Brand Collabs", "Conceptual",
];

interface Photo { src: string; category: string; tall?: boolean; }

const PHOTOS: Photo[] = [
  // Weddings
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", category: "Weddings" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80", category: "Weddings", tall: true },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80", category: "Weddings" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80", category: "Weddings", tall: true },
  // Engagement
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80", category: "Engagement", tall: true },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80", category: "Engagement" },
  // Couple Portraits
  { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80", category: "Couple Portraits" },
  { src: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=900&q=80", category: "Couple Portraits", tall: true },
  // Maternity
  { src: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=900&q=80", category: "Maternity", tall: true },
  { src: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=900&q=80", category: "Maternity" },
  // First Birthday
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80", category: "First Birthday" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80", category: "First Birthday", tall: true },
  // Graduation
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80", category: "Graduation" },
  { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80", category: "Graduation", tall: true },
  // House Warming
  { src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80", category: "House Warming" },
  { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80", category: "House Warming", tall: true },
  // Events
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80", category: "Events", tall: true },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80", category: "Events" },
  // Brand Collabs
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80", category: "Brand Collabs" },
  { src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80", category: "Brand Collabs", tall: true },
  // Conceptual
  { src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=900&q=80", category: "Conceptual", tall: true },
  { src: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=900&q=80", category: "Conceptual" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory]   = useState("All");
  const [hoveredIndex,   setHoveredIndex]     = useState<number | null>(null);
  const [litIndex,       setLitIndex]         = useState<number | null>(null);
  const [isTouch,        setIsTouch]          = useState(false);
  const litTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) setIsTouch(true);
  }, []);

  useEffect(() => {
    setHoveredIndex(null);
    setLitIndex(null);
  }, [activeCategory]);

  const filtered = activeCategory === "All"
    ? PHOTOS
    : PHOTOS.filter(p => p.category === activeCategory);

  const handleTap = (i: number) => {
    if (!isTouch) return;
    if (litTimer.current) clearTimeout(litTimer.current);
    setLitIndex(i);
    litTimer.current = setTimeout(() => setLitIndex(null), 2000);
  };

  return (
    <section id="work" style={{ background: "#0f0f0f" }}>
      <style>{`
        .pfol-grid { column-count: 3; column-gap: 3px; }
        @media (max-width: 768px) { .pfol-grid { column-count: 2; } }
        .pfol-filters::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Section header ── */}
      <div style={{ padding: "clamp(60px, 10vh, 100px) clamp(24px, 6vw, 80px) 40px" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color:         "var(--accent)",
            marginBottom:  16,
          }}
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize:   "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            color:      "var(--text)",
            lineHeight: 1,
          }}
        >
          The Portfolio
        </motion.h2>
      </div>

      {/* ── Category filters ── */}
      <div
        className="pfol-filters"
        style={{
          display:    "flex",
          flexWrap:   "wrap",
          gap:        "clamp(16px, 2.5vw, 28px)",
          padding:    "0 clamp(24px, 6vw, 80px) clamp(32px, 5vh, 56px)",
          overflowX:  "auto",
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      "0.65rem",
              fontWeight:    400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:         activeCategory === cat ? "#c9a96e" : "rgba(255,255,255,0.38)",
              background:    "none",
              border:        "none",
              padding:       0,
              whiteSpace:    "nowrap",
              transition:    "color 0.3s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Masonry grid ── */}
      <div className="pfol-grid">
        {filtered.map((photo, i) => {
          const isHovered  = hoveredIndex === i;
          const showColor  = isTouch ? litIndex === i : isHovered;

          return (
            <motion.div
              key={`${photo.src}-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
              style={{
                breakInside: "avoid",
                marginBottom: "3px",
                overflow:    "hidden",
                display:     "block",
              }}
              onMouseEnter={() => { if (!isTouch) setHoveredIndex(i); }}
              onMouseLeave={() => { if (!isTouch) setHoveredIndex(null); }}
              onClick={() => handleTap(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.category}
                style={{
                  width:       "100%",
                  display:     "block",
                  aspectRatio: photo.tall ? "3/4" : "4/3",
                  objectFit:   "cover",
                  filter:      showColor ? "grayscale(0%)" : "grayscale(100%)",
                  transform:   isHovered && !isTouch ? "scale(1.03)" : "scale(1)",
                  transition:  "filter 0.6s ease, transform 0.6s ease",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <div style={{ height: "clamp(60px, 10vh, 100px)" }} />
    </section>
  );
}
