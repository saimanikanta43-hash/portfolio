"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
};

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please email me directly at nayanam@photography.com");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
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
                color: "var(--text-muted)",
                marginBottom: 16,
                maxWidth: 380,
              }}
            >
              Currently booking weddings &amp; portraits for 2025–26.
              Let&apos;s create something worth remembering.
            </p>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--text-muted)",
                marginBottom: 48,
                maxWidth: 380,
                opacity: 0.7,
              }}
            >
              Whether it&apos;s a wedding, editorial commission, or something
              entirely new — reach out and I&apos;ll reply within 48 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <a
                href="mailto:nayanam@photography.com"
                style={{ display: "flex", alignItems: "center", gap: 16 }}
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
                    flexShrink: 0,
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
                    color: "var(--text-muted)",
                    transition: "color 0.3s ease",
                  }}
                >
                  nayanam@photography.com
                </span>
              </a>

              <a
                href="https://instagram.com/storiesbynayanam"
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 16 }}
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
                    flexShrink: 0,
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
                    color: "var(--text-muted)",
                    transition: "color 0.3s ease",
                  }}
                >
                  @storiesbynayanam
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
                Thank you ✦
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                }}
              >
                Your message has been received. I&apos;ll reply within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <label htmlFor="contact-name" style={srOnly}>Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(184,92,117,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>

              <div>
                <label htmlFor="contact-email" style={srOnly}>Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(184,92,117,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>

              <div>
                <label htmlFor="contact-message" style={srOnly}>Tell me about your wedding or shoot</label>
                <textarea
                  id="contact-message"
                  placeholder="Tell me about your wedding or shoot..."
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(184,92,117,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>

              {error && (
                <p
                  role="alert"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    color: "#e07070",
                    lineHeight: 1.6,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
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
                  color: loading ? "rgba(245,240,232,0.4)" : "var(--text)",
                  cursor: loading ? "default" : "pointer",
                  transition: "background 0.4s ease, border-color 0.4s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (loading) return;
                  e.currentTarget.style.background = "rgba(212,137,154,0.1)";
                  e.currentTarget.style.borderColor = "rgba(212,137,154,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(212,137,154,0.4)";
                }}
              >
                {loading ? "Sending..." : "Start the Conversation"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
