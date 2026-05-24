"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stories = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=85&auto=format",
    title: "Between Light\nand Shadow",
    body: "Every frame holds a breath — the moment before movement, the silence after sound. These stories are made of light the world barely noticed.",
    align: "left",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600&q=85&auto=format",
    title: "The Weight\nof Stillness",
    body: "Nature does not rush. Neither does the eye that truly sees. These images were never captured — they were waited for.",
    align: "right",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1600&q=85&auto=format",
    title: "Remnants\nof Time",
    body: "Architecture carries memory in its walls. The cities we build outlive the stories we forget. I photograph what remains.",
    align: "left",
  },
];

function StoryBlock({
  story,
  index,
}: {
  story: (typeof stories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.8], [0, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.45], [40, 0]);

  const isLeft = story.align === "left";

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div
        style={{
          gridColumn: isLeft ? "1" : "2",
          gridRow: "1",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            y: imgY,
            position: "absolute",
            inset: "-10%",
            backgroundImage: `url('${story.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isLeft
              ? "linear-gradient(to right, transparent 60%, rgba(11,11,11,1) 100%)"
              : "linear-gradient(to left, transparent 60%, rgba(11,11,11,1) 100%)",
          }}
        />
      </div>

      {/* Text */}
      <div
        style={{
          gridColumn: isLeft ? "2" : "1",
          gridRow: "1",
          display: "flex",
          alignItems: "center",
          padding: "clamp(40px, 8vw, 120px)",
          background: "#150E18",
          zIndex: 1,
        }}
      >
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#D4899A",
              marginBottom: 24,
            }}
          >
            Series {String(index + 1).padStart(2, "0")}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#F2E8DC",
              marginBottom: 32,
              whiteSpace: "pre-line",
            }}
          >
            {story.title}
          </h2>
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(212,137,154,0.4)",
              marginBottom: 28,
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#9E8E98",
              maxWidth: 380,
            }}
          >
            {story.body}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function FeaturedStory() {
  return (
    <section id="story" style={{ background: "#150E18" }}>
      {/* Header */}
      <div
        style={{
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px) 60px",
          textAlign: "center",
        }}
      >
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
            color: "#D4899A",
            marginBottom: 16,
          }}
        >
          The Stories Behind
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
            color: "#F2E8DC",
            lineHeight: 1,
          }}
        >
          Featured Series
        </motion.h2>
      </div>

      {stories.map((story, i) => (
        <StoryBlock key={story.id} story={story} index={i} />
      ))}
    </section>
  );
}
