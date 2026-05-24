"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "100+", label: "Sessions" },
  { value: "50+", label: "Weddings" },
  { value: "5+", label: "Genres" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "clamp(80px, 14vh, 140px) clamp(32px, 10vw, 160px)",
      }}
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 48,
        }}
      >
        About
      </motion.p>

      {/* Main statement */}
      <div style={{ maxWidth: 820, marginBottom: 64 }}>
        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: 400,
              lineHeight: 1.12,
              color: "var(--text)",
              margin: 0,
            }}
          >
            I'm SaiManiKanta.
          </motion.h2>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.12,
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            I photograph people.
          </motion.h2>
        </div>
      </div>

      {/* Two-column personal text */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 6vw, 96px)",
          maxWidth: 920,
          marginBottom: 80,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.88rem, 1.2vw, 1rem)",
            fontWeight: 300,
            lineHeight: 1.9,
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          I reach for my camera when words stop being enough. Weddings, portraits,
          first birthdays, quiet house warmings — I show up for all of it, because
          I believe every moment deserves to be treated like it matters.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.88rem, 1.2vw, 1rem)",
            fontWeight: 300,
            lineHeight: 1.9,
            color: "var(--text-muted)",
            opacity: 0.7,
            margin: 0,
          }}
        >
          I don't pose people. I watch them forget the camera is there — and
          that's when I click. The best frame is always the one nobody saw coming.
        </motion.p>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
        style={{
          display: "flex",
          gap: "clamp(40px, 8vw, 120px)",
          paddingTop: 40,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          maxWidth: 920,
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 + i * 0.1 }}
            viewport={{ once: true }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 400,
                color: "var(--text)",
                lineHeight: 1,
                margin: 0,
                marginBottom: 10,
              }}
            >
              {s.value}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                margin: 0,
                opacity: 0.5,
              }}
            >
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
