"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Weddings", "Engagement", "Pre-Wedding", "Celebrations", "House Warming", "Conceptual"];

interface Video {
  id: number;
  title: string;
  category: string;
  duration: string;
  year: string;
  thumbnail: string;
  watermark: string;
}

const ALL_VIDEOS: Video[] = [
  {
    id: 1,
    title: "Priya & Arjun",
    category: "Weddings",
    duration: "4:32",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85&auto=format",
    watermark: "© ManiKanta",
  },
  {
    id: 2,
    title: "Golden Hour",
    category: "Engagement",
    duration: "2:18",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=85&auto=format",
    watermark: "© ManiKanta",
  },
  {
    id: 3,
    title: "Before Forever",
    category: "Pre-Wedding",
    duration: "3:15",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=85&auto=format",
    watermark: "© ManiKanta",
  },
  {
    id: 4,
    title: "Meera & Kiran",
    category: "Weddings",
    duration: "6:05",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=85&auto=format",
    watermark: "© ManiKanta",
  },
  {
    id: 5,
    title: "The New Home",
    category: "House Warming",
    duration: "2:40",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=85&auto=format",
    watermark: "© ManiKanta",
  },
  {
    id: 6,
    title: "Whispers",
    category: "Conceptual",
    duration: "1:55",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1200&q=85&auto=format",
    watermark: "© ManiKanta",
  },
];

export default function Videos() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "All"
    ? ALL_VIDEOS
    : ALL_VIDEOS.filter(v => v.category === activeCategory);

  const goTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-card]");
    const card = cards[index];
    if (!card) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollLeft =
      container.scrollLeft +
      cardRect.left -
      containerRect.left -
      (containerRect.width - cardRect.width) / 2;
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setCurrentIndex(index);
  }, []);

  // Reset carousel when category changes
  useEffect(() => {
    setCurrentIndex(0);
    const container = scrollRef.current;
    if (container) container.scrollLeft = 0;
  }, [activeCategory]);

  const prev = () => goTo(Math.max(0, currentIndex - 1));
  const next = () => goTo(Math.min(filtered.length - 1, currentIndex + 1));

  return (
    <section
      id="films"
      style={{ background: "var(--bg)", overflow: "hidden", position: "relative" }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(184,92,117,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <div
        ref={headerRef}
        style={{ padding: "clamp(60px,10vh,100px) clamp(24px,6vw,80px) 0" }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 12,
          }}
        >
          Moving Images
        </motion.p>

        {/* Gold rule under eyebrow */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            width: 40,
            height: 1,
            background: "var(--accent)",
            marginBottom: 20,
            transformOrigin: "left",
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            color: "var(--text)",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          Video Works
        </motion.h2>

        {/* Full-width divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: "rgba(184,92,117,0.2)",
            marginBottom: 20,
            transformOrigin: "left",
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
            fontWeight: 300,
            color: "var(--text-muted)",
            marginBottom: "clamp(28px,4vh,48px)",
            maxWidth: 560,
          }}
        >
          Cinematic films for weddings, engagements &amp; life&apos;s most intimate milestones.
        </motion.p>

        {/* ── Category tabs (horizontally scrollable) ── */}
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            marginBottom: "clamp(32px,5vh,56px)",
            scrollbarWidth: "none",
          }}
        >
          {CATEGORIES.map(cat => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: "7px 18px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: active ? "#111111" : "#888888",
                  background: "transparent",
                  border: `1px solid ${active ? "rgba(184,92,117,0.7)" : "rgba(0,0,0,0.12)"}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            );
          })}
          <style dangerouslySetInnerHTML={{ __html: `#films [style*="overflow-x: auto"]::-webkit-scrollbar{display:none}` }} />
        </div>
      </div>

      {/* ── Carousel ── */}
      <div style={{ position: "relative" }}>
        {/* Left nav arrow */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: "clamp(8px,2vw,32px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(212,137,154,0.4)",
            background: "rgba(250,250,248,0.9)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: currentIndex === 0 ? "default" : "pointer",
            opacity: currentIndex === 0 ? 0.3 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <ChevronLeft size={18} color="#D4899A" />
        </button>

        {/* Right nav arrow */}
        <button
          onClick={next}
          disabled={currentIndex === filtered.length - 1}
          aria-label="Next"
          style={{
            position: "absolute",
            right: "clamp(8px,2vw,32px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(212,137,154,0.4)",
            background: "rgba(250,250,248,0.9)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: currentIndex === filtered.length - 1 ? "default" : "pointer",
            opacity: currentIndex === filtered.length - 1 ? 0.3 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <ChevronRight size={18} color="#D4899A" />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            gap: 16,
            paddingLeft: "calc(50% - min(62vw,860px)/2)",
            paddingRight: "calc(50% - min(62vw,860px)/2)",
            paddingBottom: 0,
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `#films-track::-webkit-scrollbar{display:none}` }} />

          {filtered.length === 0 ? (
            <p style={{ color: "#888", fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", padding: "60px 0", margin: "0 auto" }}>
              No films in this category yet.
            </p>
          ) : (
            filtered.map((video, i) => (
              <div
                key={video.id}
                data-card
                onClick={() => goTo(i)}
                style={{
                  flexShrink: 0,
                  width: "min(62vw, 860px)",
                  scrollSnapAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.4s ease, opacity 0.4s ease",
                  opacity: i === currentIndex ? 1 : 0.55,
                  transform: i === currentIndex ? "scale(1)" : "scale(0.97)",
                }}
              >
                {/* Card */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                    border: `1px solid ${i === currentIndex ? "rgba(212,137,154,0.5)" : "rgba(255,255,255,0.06)"}`,
                    transition: "border-color 0.4s ease",
                  }}
                >
                  {/* Thumbnail */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: i === currentIndex ? "brightness(0.75)" : "brightness(0.5) grayscale(30%)",
                      transition: "filter 0.5s ease",
                    }}
                  />

                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
                    }}
                  />

                  {/* Watermark */}
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "0.75rem",
                      fontStyle: "italic",
                      color: "rgba(242,232,220,0.55)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {video.watermark}
                  </div>

                  {/* Play button */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        border: "1.5px solid rgba(212,137,154,0.75)",
                        background: "rgba(11,11,11,0.45)",
                        backdropFilter: "blur(6px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: i === currentIndex ? 1 : 0.4,
                        transition: "opacity 0.4s ease",
                      }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderTop: "10px solid transparent",
                          borderBottom: "10px solid transparent",
                          borderLeft: "18px solid #D4899A",
                          marginLeft: 5,
                        }}
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 14,
                      right: 16,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.08em",
                      color: "rgba(242,232,220,0.6)",
                    }}
                  >
                    {video.duration}
                  </div>

                  {/* Title overlay at bottom-left */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 14,
                      left: 20,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "#D4899A",
                        marginBottom: 4,
                      }}
                    >
                      {video.category}
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                        fontWeight: 400,
                        color: "#F2E8DC",
                        lineHeight: 1.1,
                      }}
                    >
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination counter */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginTop: 28,
            paddingBottom: "clamp(60px,10vh,100px)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 20,
              padding: "6px 16px",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "#D4899A",
                fontWeight: 500,
              }}
            >
              {currentIndex + 1}
            </span>
            <span style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>/</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(0,0,0,0.4)",
              }}
            >
              {filtered.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
