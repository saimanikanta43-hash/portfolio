"use client";

import { useState } from "react";

const DETAILS = [
  { l: "EMAIL",      v: "hello@nayanam.studio" },
  { l: "PHONE",      v: "+91 98765 43210" },
  { l: "INSTAGRAM",  v: "@nayanam.captures" },
  { l: "BASED IN",   v: "India — available worldwide" },
];

const labelStyle: React.CSSProperties = {
  display:       "block",
  fontSize:      11,
  letterSpacing: ".18em",
  color:         "#8a7c68",
  marginBottom:  10,
};

export default function Contact() {
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [form,    setForm]    = useState({
    name: "", email: "", eventDate: "", shootType: "", message: "",
  });

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const body = {
        name:    form.name,
        email:   form.email,
        message: [
          form.eventDate  && `Event Date: ${form.eventDate}`,
          form.shootType  && `Type of Shoot: ${form.shootType}`,
          form.message,
        ].filter(Boolean).join("\n\n"),
      };
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please email me at hello@nayanam.studio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="section">

        {/* ── Page header ── */}
        <div
          style={{
            fontFamily:    "var(--font-mono), monospace",
            fontSize:      11,
            letterSpacing: ".24em",
            color:         "var(--accent)",
            marginBottom:  18,
          }}
        >
          LET&apos;S BEGIN
        </div>
        <h1 className="page-title" style={{ marginBottom: 50, maxWidth: 760 }}>
          Tell me your story.
        </h1>

        <div className="contact-grid">

          {/* ── Form ── */}
          <div>
            {sent ? (
              <div style={{ paddingTop: 40 }}>
                <p style={{ fontFamily: "var(--font-spectral), serif", fontSize: 32, color: "var(--ink)", marginBottom: 16 }}>
                  Thank you.
                </p>
                <p style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: "var(--muted)" }}>
                  Your message has been received. I&apos;ll reply within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                <div className="form-2col">
                  <div>
                    <label style={labelStyle}>YOUR NAME</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Pia & Arjun"
                      required
                      value={form.name}
                      onChange={set("name")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>EMAIL</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="you@email.com"
                      required
                      value={form.email}
                      onChange={set("email")}
                    />
                  </div>
                </div>

                <div className="form-2col">
                  <div>
                    <label style={labelStyle}>EVENT DATE</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="DD / MM / YYYY"
                      value={form.eventDate}
                      onChange={set("eventDate")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>TYPE OF SHOOT</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Wedding, portrait..."
                      value={form.shootType}
                      onChange={set("shootType")}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>TELL ME ABOUT YOUR DAY</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Where, who, and what you're imagining..."
                    required
                    value={form.message}
                    onChange={set("message")}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: 14, color: "#b44", lineHeight: 1.6 }}>{error}</p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display:       "inline-block",
                      fontSize:      12,
                      letterSpacing: ".2em",
                      padding:       "16px 40px",
                      background:    "var(--ink)",
                      color:         "#F6EFE3",
                      border:        "none",
                      cursor:        loading ? "default" : "pointer",
                      opacity:       loading ? 0.6 : 1,
                    }}
                  >
                    {loading ? "SENDING..." : "SEND ENQUIRY →"}
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* ── Contact details ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
            {DETAILS.map(({ l, v }) => (
              <div key={l}>
                <div style={{ fontSize: 11, letterSpacing: ".18em", color: "#8a7c68", marginBottom: 8 }}>{l}</div>
                <div style={{ fontFamily: "var(--font-spectral), serif", fontSize: 21, color: "var(--ink)" }}>{v}</div>
              </div>
            ))}
            <div style={{ padding: "22px 24px", background: "var(--bg-alt)" }}>
              <p style={{ fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: "var(--muted)", margin: 0 }}>
                I reply to every enquiry personally, usually within 48 hours.
                For dates within the month, a text is fastest.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
