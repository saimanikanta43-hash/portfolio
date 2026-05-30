"use client";

import { useState, useRef, useEffect } from "react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import { motion } from "framer-motion";

// ── Drop your photos into public/images/portfolio/<category>/ ──────────────
// Name the cover image for each section "01.jpg" (or .webp / .png).
// Additional images go as 02.jpg, 03.jpg … — they'll be used in future galleries.
// The fallbackUrl is shown only while the local file is missing.

const PORTFOLIO_SLIDES = [
  {
    id:          "weddings",
    title:       "Weddings",
    imageUrl:    "/images/portfolio/weddings/01.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    count:       "24 stories",
    tagline:     "Every vow spoken in silence, every tear that said what words couldn't.",
  },
  {
    id:          "couples",
    title:       "Couple Portraits",
    imageUrl:    "/images/portfolio/couples/01.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    count:       "18 sessions",
    tagline:     "Two people, one frame — a story written in glances.",
  },
  {
    id:          "maternity",
    title:       "Maternity",
    imageUrl:    "/images/portfolio/maternity/01.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
    count:       "12 sessions",
    tagline:     "The last quiet before everything beautiful begins.",
  },
  {
    id:          "events",
    title:       "Events",
    imageUrl:    "/images/portfolio/events/01.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    count:       "30 events",
    tagline:     "The details everyone feels, but only you will remember.",
  },
  {
    id:          "conceptual",
    title:       "Conceptual",
    imageUrl:    "/images/portfolio/conceptual/01.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80",
    count:       "8 projects",
    tagline:  "Images that live somewhere between memory and dream.",
  },
];

const FILTERS        = ["ALL", "WEDDINGS", "COUPLES", "MATERNITY", "EVENTS", "CONCEPTUAL"];
const IDX_TO_FILTER  = ["WEDDINGS", "COUPLES", "MATERNITY", "EVENTS", "CONCEPTUAL"];
const TOTAL          = PORTFOLIO_SLIDES.length;

// ─── Mobile swipeable card carousel ────────────────────────────────────────

function MobileCarousel() {
  const [activeIndex,    setActiveIndex]    = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("WEDDINGS");
  const [tappedIndex,    setTappedIndex]    = useState<number | null>(null);

  const startXRef   = useRef(0);
  const isDragging  = useRef(false);
  const wasSwipe    = useRef(false);
  const tappedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = (i: number) => {
    const idx = Math.max(0, Math.min(i, TOTAL - 1));
    setActiveIndex(idx);
    setSelectedFilter(IDX_TO_FILTER[idx]);
  };

  const next = () => navigate(activeIndex + 1);
  const prev = () => navigate(activeIndex - 1);

  const handleFilterClick = (filter: string, fi: number) => {
    setSelectedFilter(filter);
    navigate(filter === "ALL" ? 0 : fi - 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isDragging.current = true;
    wasSwipe.current   = false;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const diff = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      wasSwipe.current = true;
      diff > 0 ? next() : prev();
    }
    isDragging.current = false;
  };

  const handleCardClick = (i: number) => {
    if (wasSwipe.current) { wasSwipe.current = false; return; }
    // Navigate if not the active card
    if (i !== activeIndex) navigate(i);
    // Any tap reveals colour for 2 s then returns to B&W
    if (tappedTimer.current) clearTimeout(tappedTimer.current);
    setTappedIndex(i);
    tappedTimer.current = setTimeout(() => setTappedIndex(null), 2000);
  };

  useEffect(() => () => { if (tappedTimer.current) clearTimeout(tappedTimer.current); }, []);

  // translateX: step = cardWidth + gap = (100vw - 80px) + 16px = 100vw - 64px
  // offset:     40px left peek
  const trackX = `translateX(calc(40px - ${activeIndex} * (100vw - 64px)))`;

  return (
    <div>

      {/* ── Filter pills ── */}
      <div
        className="portfolio-filter-scroll"
        style={{
          display:                "flex",
          overflowX:              "auto",
          gap:                    8,
          paddingBottom:          28,
          scrollbarWidth:         "none",
          msOverflowStyle:        "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        {FILTERS.map((f, fi) => {
          const active = f === selectedFilter || (f === "ALL" && activeIndex === 0 && selectedFilter === "WEDDINGS");
          return (
            <button
              key={f}
              onClick={() => handleFilterClick(f, fi)}
              style={{
                flexShrink:    0,
                padding:       "7px 16px",
                borderRadius:  20,
                border:        `1px solid ${active ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.15)"}`,
                background:    active ? "rgba(201,169,110,0.12)" : "transparent",
                color:         active ? "#c9a96e" : "rgba(255,255,255,0.38)",
                fontFamily:    "'Inter', sans-serif",
                fontSize:      "0.52rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                cursor:        "pointer",
                transition:    "all 0.25s ease",
                whiteSpace:    "nowrap",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* ── Carousel ── */}
      <div style={{ position: "relative" }}>

        {/* Track */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ overflow: "hidden", width: "100%" }}
        >
          <div
            style={{
              display:    "flex",
              gap:        16,
              transform:  trackX,
              transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
              willChange: "transform",
            }}
          >
            {PORTFOLIO_SLIDES.map((slide, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={slide.id}
                  onClick={() => handleCardClick(i)}
                  style={{
                    flexShrink:  0,
                    width:       "calc(100vw - 80px)",
                    height:      "60vh",
                    borderRadius: 8,
                    overflow:    "hidden",
                    position:    "relative",
                    transform:   `scale(${isActive ? 1 : 0.96})`,
                    opacity:     isActive ? 1 : 0.55,
                    transition:  "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease",
                    cursor:      "pointer",
                  }}
                >
                  {/* Photo — B&W by default, colour on tap for 2 s */}
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = slide.fallbackUrl }}
                    style={{
                      width:      "100%",
                      height:     "100%",
                      objectFit:  "cover",
                      filter:     tappedIndex === i ? "grayscale(0%)" : "grayscale(100%)",
                      transition: "filter 0.6s ease",
                    }}
                  />

                  {/* Dual gradient — dark top + dark bottom */}
                  <div
                    style={{
                      position:      "absolute",
                      inset:         0,
                      background:    "linear-gradient(rgba(0,0,0,0.60) 0%, transparent 35%, transparent 52%, rgba(0,0,0,0.88) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* ── Top info bar ── */}
                  <div
                    style={{
                      position:       "absolute",
                      top:            22,
                      left:           20,
                      right:          20,
                      display:        "flex",
                      justifyContent: "space-between",
                      alignItems:     "center",
                    }}
                  >
                    <span style={{
                      fontFamily:    "'Inter', sans-serif",
                      fontSize:      "0.47rem",
                      letterSpacing: "0.3em",
                      color:         "#c9a96e",
                      textTransform: "uppercase",
                    }}>
                      {slide.title.toUpperCase()}
                    </span>
                    <span style={{
                      fontFamily:    "'Inter', sans-serif",
                      fontSize:      "0.5rem",
                      letterSpacing: "0.08em",
                      color:         "rgba(255,255,255,0.6)",
                      display:       "flex",
                      alignItems:    "center",
                      gap:           5,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <rect x="1" y="2.5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="0.8"/>
                        <circle cx="5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="0.8"/>
                        <path d="M3.5 2.5V2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v.5" stroke="currentColor" strokeWidth="0.8"/>
                      </svg>
                      {slide.count}
                    </span>
                  </div>

                  {/* ── Center: title + gold divider ── */}
                  <div
                    style={{
                      position:  "absolute",
                      top:       "50%",
                      left:      20,
                      right:     20,
                      transform: "translateY(-52%)",
                      textAlign: "center",
                    }}
                  >
                    <p style={{
                      fontFamily:    "'Cormorant Garamond', serif",
                      fontSize:      "clamp(1.9rem, 9vw, 2.8rem)",
                      fontStyle:     "italic",
                      fontWeight:    300,
                      color:         "#f5f0e8",
                      lineHeight:    1.25,
                      margin:        "0 0 18px",
                      letterSpacing: "0.02em",
                    }}>
                      {slide.title}
                    </p>
                    <div style={{
                      width:      44,
                      height:     1,
                      background: "rgba(201,169,110,0.55)",
                      margin:     "0 auto",
                    }} />
                  </div>

                  {/* ── Bottom: tagline + counter ── */}
                  <div
                    style={{
                      position:  "absolute",
                      bottom:    22,
                      left:      20,
                      right:     20,
                      textAlign: "center",
                    }}
                  >
                    <p style={{
                      fontFamily:    "'Cormorant Garamond', serif",
                      fontStyle:     "italic",
                      fontSize:      "0.6rem",
                      color:         "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      lineHeight:    1.9,
                      margin:        "0 0 12px",
                    }}>
                      {slide.tagline}
                    </p>
                    <p style={{
                      fontFamily:    "'Cormorant Garamond', serif",
                      fontStyle:     "italic",
                      fontSize:      "0.85rem",
                      color:         "#c9a96e",
                      letterSpacing: "0.18em",
                      margin:        0,
                      opacity:       isActive ? 1 : 0,
                      transition:    "opacity 0.35s ease",
                    }}>
                      {String(i + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Left arrow (overlaid) ── */}
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          aria-label="Previous"
          style={{
            position:           "absolute",
            left:               20,
            top:                "62%",
            transform:          "translateY(-50%)",
            width:              44,
            height:             44,
            borderRadius:       "50%",
            background:         activeIndex === 0 ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.52)",
            border:             "1px solid rgba(255,255,255,0.1)",
            color:              activeIndex === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.88)",
            display:            "flex",
            alignItems:         "center",
            justifyContent:     "center",
            cursor:             activeIndex === 0 ? "default" : "pointer",
            backdropFilter:     "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex:             10,
            fontSize:           "1.3rem",
            lineHeight:         1,
            transition:         "color 0.2s ease, background 0.2s ease",
          } as React.CSSProperties}
        >
          ‹
        </button>

        {/* ── Right arrow (overlaid) ── */}
        <button
          onClick={next}
          disabled={activeIndex === TOTAL - 1}
          aria-label="Next"
          style={{
            position:           "absolute",
            right:              20,
            top:                "62%",
            transform:          "translateY(-50%)",
            width:              44,
            height:             44,
            borderRadius:       "50%",
            background:         activeIndex === TOTAL - 1 ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.52)",
            border:             "1px solid rgba(255,255,255,0.1)",
            color:              activeIndex === TOTAL - 1 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.88)",
            display:            "flex",
            alignItems:         "center",
            justifyContent:     "center",
            cursor:             activeIndex === TOTAL - 1 ? "default" : "pointer",
            backdropFilter:     "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex:             10,
            fontSize:           "1.3rem",
            lineHeight:         1,
            transition:         "color 0.2s ease, background 0.2s ease",
          } as React.CSSProperties}
        >
          ›
        </button>

      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <section id="work">
      <HoverSlider
        className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] flex flex-col justify-center portfolio-section"
        style={{ padding: "96px 5%" }}
      >

        {/* Section header — visible on all viewports */}
        <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our Work
          </motion.p>

          {/* Short gold line — mobile only (via globals.css) */}
          <div className="portfolio-mobile-divider" style={{ width: 48, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 16 }} />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl text-[#f5f0e8] mb-6 md:mb-16"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, lineHeight: 1 }}
          >
            The Portfolio
          </motion.h2>
        </div>

        {/* Desktop layout — hidden on mobile via globals.css .portfolio-desktop-content */}
        <div
          className="portfolio-desktop-content"
          style={{
            display:        "flex",
            flexDirection:  "row",
            alignItems:     "center",
            justifyContent: "center",
            gap:            80,
            maxWidth:       1000,
            margin:         "0 auto",
            width:          "100%",
            flexWrap:       "wrap",
          }}
        >

          {/* Left: category names */}
          <div className="flex flex-col space-y-3 md:space-y-6" style={{ flex: "0 0 auto" }}>
            {PORTFOLIO_SLIDES.map((slide, index) => (
              <div key={slide.id} className="flex items-center gap-4">
                <TextStaggerHover
                  index={index}
                  text={slide.title}
                  className="cursor-pointer"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize:   "clamp(1.8rem, 4vw, 3.2rem)",
                    fontWeight: 400,
                    color:      "#f5f0e8",
                    lineHeight: 1.15,
                  }}
                />
                <span
                  style={{
                    fontFamily:    "'Inter', sans-serif",
                    fontSize:      "0.65rem",
                    letterSpacing: "0.2em",
                    color:         "rgba(201,169,110,0.6)",
                    textTransform: "uppercase",
                    whiteSpace:    "nowrap",
                  }}
                >
                  {slide.count}
                </span>
              </div>
            ))}
          </div>

          {/* Right: image reveal */}
          <HoverSliderImageWrap
            className="h-[320px] md:h-[560px] flex-shrink-0"
            style={{ width: 380 }}
          >
            {PORTFOLIO_SLIDES.map((slide, index) => (
              <HoverSliderImage
                key={slide.id}
                index={index}
                imageUrl={slide.imageUrl}
                src={slide.imageUrl}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = slide.fallbackUrl }}
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(30%)" }}
              />
            ))}
          </HoverSliderImageWrap>

        </div>

        {/* Mobile carousel — hidden on desktop via globals.css .portfolio-mobile-carousel  */}
        <div className="portfolio-mobile-carousel">

          {/* Description — mobile only */}
          <p style={{
            fontFamily:    "'Cormorant Garamond', serif",
            fontSize:      "1rem",
            fontStyle:     "italic",
            color:         "rgba(245,240,232,0.55)",
            lineHeight:    1.7,
            marginBottom:  28,
            letterSpacing: "0.01em",
          }}>
            Every session is a story — captured in light, lived in moments,
            and felt long after the camera is put away.
          </p>

          {/* Carousel (breaks out of 5vw section padding for full-bleed cards) */}
          <div style={{ margin: "0 -5vw" }}>
            <MobileCarousel />
          </div>

        </div>

      </HoverSlider>
    </section>
  );
}
