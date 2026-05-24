"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaThLarge,
  FaHeart,
  FaRing,
  FaUsers,
  FaBaby,
  FaBirthdayCake,
  FaGraduationCap,
  FaHome,
  FaCalendarAlt,
  FaBriefcase,
  FaLightbulb,
  FaLeaf,
} from "react-icons/fa";

interface Category {
  label: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    label: "All",
    description: "The full collection",
    image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=800&q=80",
    icon: <FaThLarge size={20} className="text-white" />,
  },
  {
    label: "Weddings",
    description: "Timeless moments, forever told",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    icon: <FaRing size={20} className="text-white" />,
  },
  {
    label: "Engagement",
    description: "The beginning of forever",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    icon: <FaHeart size={20} className="text-white" />,
  },
  {
    label: "Couple Portraits",
    description: "Love captured in light",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    icon: <FaUsers size={20} className="text-white" />,
  },
  {
    label: "Maternity",
    description: "The glow of new life",
    image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=800&q=80",
    icon: <FaBaby size={20} className="text-white" />,
  },
  {
    label: "First Birthday",
    description: "One year of pure joy",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    icon: <FaBirthdayCake size={20} className="text-white" />,
  },
  {
    label: "Graduation",
    description: "Milestones worth remembering",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    icon: <FaGraduationCap size={20} className="text-white" />,
  },
  {
    label: "House Warming",
    description: "A new chapter begins",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    icon: <FaHome size={20} className="text-white" />,
  },
  {
    label: "Events",
    description: "Every gathering, beautifully preserved",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    icon: <FaCalendarAlt size={20} className="text-white" />,
  },
  {
    label: "Brand Collabs",
    description: "Visual stories for your brand",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    icon: <FaBriefcase size={20} className="text-white" />,
  },
  {
    label: "Conceptual",
    description: "Art beyond the ordinary",
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80",
    icon: <FaLightbulb size={20} className="text-white" />,
  },
  {
    label: "Spring",
    description: "Bloom, colour & soft light",
    image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=800&q=80",
    icon: <FaLeaf size={20} className="text-white" />,
  },
];

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animated, setAnimated] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    categories.forEach((_, i) => {
      const t = setTimeout(() => {
        setAnimated(prev => [...prev, i]);
      }, 80 * i);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="work" ref={sectionRef} style={{ background: "var(--bg)" }}>
      {/* Section header */}
      <div style={{ padding: "clamp(60px, 10vh, 100px) clamp(24px, 6vw, 80px) 60px" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 16,
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
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            color: "var(--text)",
            lineHeight: 1,
          }}
        >
          The Portfolio
        </motion.h2>
      </div>

      {/* Interactive category selector */}
      <div
        style={{
          padding: "0 clamp(24px, 4vw, 60px) clamp(60px, 10vh, 100px)",
        }}
      >
        <div
          className="flex w-full h-[480px] items-stretch overflow-hidden"
          style={{ borderRadius: "4px" }}
        >
          {categories.map((cat, index) => {
            const isActive = activeIndex === index;
            const isHovered = hoveredIndex === index;
            const inColor = isHovered;
            return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundImage: `url('${cat.image}')`,
                backgroundSize: isActive ? "auto 100%" : "auto 120%",
                backgroundPosition: "center",
                opacity: animated.includes(index) ? 1 : 0,
                transform: animated.includes(index) ? "translateX(0)" : "translateX(-50px)",
                filter: inColor ? "grayscale(0%)" : "grayscale(100%)",
                transition:
                  "flex 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease, transform 0.5s ease, box-shadow 0.7s ease, background-size 0.7s ease, border-color 0.3s ease, filter 0.6s ease",
                flex: isActive ? "7 1 0%" : "1 1 0%",
                minWidth: "48px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                backgroundColor: "#111",
                borderWidth: "1.5px",
                borderStyle: "solid",
                borderColor: isActive ? "#c9a96e" : "rgba(255,255,255,0.08)",
                boxShadow:
                  isActive
                    ? "0 20px 60px rgba(0,0,0,0.55)"
                    : "0 6px 20px rgba(0,0,0,0.30)",
                zIndex: isActive ? 10 : 1,
              }}
            >
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)",
                  transition: "background 0.7s ease",
                  pointerEvents: "none",
                }}
              />

              {/* Bottom label row */}
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "0 14px",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    minWidth: 38,
                    maxWidth: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(20,20,20,0.85)",
                    backdropFilter: "blur(8px)",
                    border: `1.5px solid ${isActive ? "#B85C75" : "#C0B8B0"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "border-color 0.3s ease",
                  }}
                >
                  {cat.icon}
                </div>

                {/* Text — only visible when expanded */}
                <div
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateX(0)" : "translateX(20px)",
                    transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      fontWeight: 500,
                      color: "#F2E8DC",
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {cat.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 300,
                      color: "#D4899A",
                      letterSpacing: "0.05em",
                      margin: 0,
                      marginTop: 2,
                    }}
                  >
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Rotated label when collapsed */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(-90deg)",
                  opacity: isActive ? 0 : 0.6,
                  transition: "opacity 0.4s ease",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#F2E8DC",
                  }}
                >
                  {cat.label}
                </span>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
