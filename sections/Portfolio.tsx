"use client";

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

export default function Portfolio() {
  return (
    <section id="work">
      <HoverSlider className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] py-24 flex flex-col justify-center"
        style={{ padding: "96px 5%" }}>

        {/* Section header — capped at 1000px, centered */}
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
            className="text-5xl md:text-7xl text-[#f5f0e8] mb-16"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, lineHeight: 1 }}
          >
            The Portfolio
          </motion.h2>
        </div>

        {/* Main layout — centered, capped at 1000px */}
        <div style={{
          display:        "flex",
          flexDirection:  "row",
          alignItems:     "center",
          justifyContent: "center",
          gap:            80,
          maxWidth:       1000,
          margin:         "0 auto",
          width:          "100%",
          flexWrap:       "wrap",
        }}>

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
          <HoverSliderImageWrap className="h-[320px] md:h-[560px] flex-shrink-0"
            style={{ width: 380 }}>
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
      </HoverSlider>
    </section>
  );
}
