"use client";

import { useState, useRef, useEffect } from "react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import { motion } from "framer-motion";

const PORTFOLIO_SLIDES = [
  {
    id: "weddings",
    title: "Weddings",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    count: "24 stories",
  },
  {
    id: "couples",
    title: "Couple Portraits",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    count: "18 sessions",
  },
  {
    id: "maternity",
    title: "Maternity",
    imageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
    count: "12 sessions",
  },
  {
    id: "events",
    title: "Events",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    count: "30 events",
  },
  {
    id: "conceptual",
    title: "Conceptual",
    imageUrl: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80",
    count: "8 projects",
  },
];

// ─── Mobile-only swipeable card carousel ───────────────────────────────────

function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  const startXRef      = useRef(0);
  const isDraggingRef  = useRef(false);
  const wasSwipeRef    = useRef(false);
  const tappedTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = PORTFOLIO_SLIDES.length;

  const goTo = (i: number) => setActiveIndex(Math.max(0, Math.min(i, total - 1)));
  const nextSlide = () => goTo(activeIndex + 1);
  const prevSlide = () => goTo(activeIndex - 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current     = e.touches[0].clientX;
    isDraggingRef.current = true;
    wasSwipeRef.current   = false;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const diff = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      wasSwipeRef.current = true;
      diff > 0 ? nextSlide() : prevSlide();
    }
    isDraggingRef.current = false;
  };

  const handleCardClick = (i: number) => {
    // Swipe just fired — eat the synthetic click
    if (wasSwipeRef.current) { wasSwipeRef.current = false; return; }
    // Tapping a peeking card navigates to it
    if (i !== activeIndex) { setActiveIndex(i); return; }
    // Tapping the active card reveals color for 2 s
    if (tappedTimer.current) clearTimeout(tappedTimer.current);
    setTappedIndex(i);
    tappedTimer.current = setTimeout(() => setTappedIndex(null), 2000);
  };

  useEffect(() => () => { if (tappedTimer.current) clearTimeout(tappedTimer.current); }, []);

  // translateX formula:
  //   cardWidth = 100vw - 80px   (80px total = 40px peek each side)
  //   gap       = 16px
  //   step      = cardWidth + gap = 100vw - 64px
  //   offset    = 40px (left peek)
  //   translate = 40px - activeIndex * (100vw - 64px)
  const trackTransform = `translateX(calc(40px - ${activeIndex} * (100vw - 64px)))`;

  return (
    <div style={{ width: "100%", paddingBottom: 8 }}>

      {/* ── Carousel track ── */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ overflow: "hidden", width: "100%" }}
      >
        <div
          style={{
            display:    "flex",
            gap:        16,
            transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
            transform:  trackTransform,
            willChange: "transform",
          }}
        >
          {PORTFOLIO_SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              onClick={() => handleCardClick(i)}
              style={{
                flexShrink:    0,
                width:         "calc(100vw - 80px)",
                height:        "65vh",
                borderRadius:  4,
                overflow:      "hidden",
                position:      "relative",
                transform:     `scale(${i === activeIndex ? 1 : 0.96})`,
                opacity:       i === activeIndex ? 1 : 0.6,
                transition:    "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease",
                cursor:        "pointer",
              }}
            >
              {/* Photo */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                style={{
                  width:      "100%",
                  height:     "100%",
                  objectFit:  "cover",
                  filter:     tappedIndex === i ? "grayscale(0%)" : "grayscale(100%)",
                  transition: "filter 0.6s ease",
                }}
              />

              {/* Bottom gradient */}
              <div
                style={{
                  position:      "absolute",
                  inset:         0,
                  background:    "linear-gradient(transparent 40%, rgba(0,0,0,0.85))",
                  pointerEvents: "none",
                }}
              />

              {/* Text overlay */}
              <div style={{ position: "absolute", bottom: 24, left: 20, right: 20 }}>
                <p style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      "0.5rem",
                  letterSpacing: "0.3em",
                  color:         "#c9a96e",
                  textTransform: "uppercase",
                  margin:        "0 0 6px",
                }}>
                  {slide.title.toUpperCase()}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize:   "0.75rem",
                  fontWeight: 300,
                  color:      "rgba(255,255,255,0.9)",
                  margin:     0,
                }}>
                  {slide.count.charAt(0).toUpperCase() + slide.count.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            16,
        marginTop:      28,
        paddingLeft:    40,
        paddingRight:   40,
      }}>

        {/* Arrows + counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <button
            onClick={prevSlide}
            disabled={activeIndex === 0}
            aria-label="Previous"
            style={{
              background:  "none",
              border:      "none",
              color:       activeIndex === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.65)",
              fontSize:    "1.1rem",
              cursor:      activeIndex === 0 ? "default" : "pointer",
              padding:     "8px 14px",
              transition:  "color 0.2s ease",
            }}
          >
            ←
          </button>

          <span style={{
            fontFamily:  "'Cormorant Garamond', serif",
            fontSize:    "1rem",
            fontStyle:   "italic",
            color:       "#c9a96e",
            letterSpacing: "0.12em",
            minWidth:    44,
            textAlign:   "center",
          }}>
            {activeIndex + 1} / {total}
          </span>

          <button
            onClick={nextSlide}
            disabled={activeIndex === total - 1}
            aria-label="Next"
            style={{
              background:  "none",
              border:      "none",
              color:       activeIndex === total - 1 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.65)",
              fontSize:    "1.1rem",
              cursor:      activeIndex === total - 1 ? "default" : "pointer",
              padding:     "8px 14px",
              transition:  "color 0.2s ease",
            }}
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {PORTFOLIO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width:        i === activeIndex ? 8 : 5,
                height:       i === activeIndex ? 8 : 5,
                borderRadius: "50%",
                background:   i === activeIndex ? "#c9a96e" : "rgba(255,255,255,0.2)",
                border:       "none",
                padding:      0,
                cursor:       "pointer",
                transition:   "all 0.3s ease",
                flexShrink:   0,
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <section id="work">
      <HoverSlider
        className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] py-24 flex flex-col justify-center"
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
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl text-[#f5f0e8] mb-8 md:mb-16"
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
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(30%)" }}
              />
            ))}
          </HoverSliderImageWrap>

        </div>

        {/* Mobile carousel — hidden on desktop via globals.css .portfolio-mobile-carousel */}
        {/* Negative margin escapes the section's 5vw horizontal padding for full-bleed cards */}
        <div
          className="portfolio-mobile-carousel"
          style={{ margin: "0 -5vw" }}
        >
          <MobileCarousel />
        </div>

      </HoverSlider>
    </section>
  );
}
