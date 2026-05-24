"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.12)",
    outline: "none",
    padding: "16px 0",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.95rem",
    fontWeight: 300,
    color: "var(--text)",
    transition: "border-color 0.3s ease",
  };

  return (
    <section
      id="contact"
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(80px, 12vh, 140px) clamp(24px, 8vw, 160px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(60px, 10vw, 140px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left — Info */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 24,
            }}
          >
            Get in Touch
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: 40,
            }}
          >
            Every story
            <br />
            <em>deserves a frame.</em>
          </motion.h2>

          <motion.div variants={fadeUp}>
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(184,92,117,0.3)",
                marginBottom: 40,
              }}
            />

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "#666666",
                marginBottom: 48,
                maxWidth: 380,
              }}
            >
              Whether it's a personal project, editorial commission, or
              something entirely new — let's create something worth
              remembering.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <a
                href="mailto:manikanta@photography.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.querySelector("span")!.style.color = "#111111")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.querySelector("span")!.style.color = "#888888")
                }
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    border: "1px solid rgba(212,137,154,0.3)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4899A" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 300,
                    color: "#888888",
                    transition: "color 0.3s ease",
                  }}
                >
                  manikanta@photography.com
                </span>
              </a>

              <a
                href="https://instagram.com/saimanikantaaa"
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 16 }}
                onMouseEnter={(e) =>
                  (e.currentTarget.querySelector("span")!.style.color = "#111111")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.querySelector("span")!.style.color = "#888888")
                }
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    border: "1px solid rgba(212,137,154,0.3)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4899A" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="#D4899A" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 300,
                    color: "#888888",
                    transition: "color 0.3s ease",
                  }}
                >
                  @saimanikantaaa
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          {sent ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginBottom: 16,
                }}
              >
                Thank you.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  color: "#666666",
                  lineHeight: 1.8,
                }}
              >
                Your message has been received. I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(184,92,117,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.12)")}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(184,92,117,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.12)")}
                />
              </div>
              <div>
                <textarea
                  placeholder="Tell me about your project..."
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(184,92,117,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.12)")}
                />
              </div>

              <button
                type="submit"
                style={{
                  alignSelf: "flex-start",
                  padding: "16px 40px",
                  border: "1px solid rgba(212,137,154,0.4)",
                  background: "transparent",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--text)",
                  transition: "background 0.4s ease, border-color 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,137,154,0.1)";
                  e.currentTarget.style.borderColor = "rgba(212,137,154,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(212,137,154,0.4)";
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>

    </section>
  );
}
