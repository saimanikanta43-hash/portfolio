import CtaBand from "@/components/CtaBand";

const ABOUT_PHOTO =
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80";

const STATS = [
  { n: "100+", l: "SESSIONS PHOTOGRAPHED" },
  { n: "50+",  l: "WEDDINGS & FILMS" },
  { n: "5",    l: "YEARS BEHIND THE LENS" },
];

const STEPS = [
  { num: "01", title: "Say hello",      body: "Tell me about your day, your people and what you're dreaming of." },
  { num: "02", title: "Plan together",  body: "We map the moments that matter and the rhythm of the day." },
  { num: "03", title: "The day itself", body: "I stay close but unseen, letting it all unfold naturally." },
  { num: "04", title: "Your gallery",   body: "Hand-edited images delivered in a private online gallery." },
];

export default function About() {
  return (
    <main>

      {/* ── Bio ── */}
      <section className="section about-grid">
        <div
          className="about-photo"
          style={{ backgroundImage: `url(${ABOUT_PHOTO})` }}
        />
        <div>
          <div
            style={{
              fontFamily:    "var(--font-mono), monospace",
              fontSize:      11,
              letterSpacing: ".24em",
              color:         "var(--accent)",
              marginBottom:  18,
            }}
          >
            THE PERSON BEHIND THE LENS
          </div>
          <h1 className="page-title">Hello, I&apos;m Nayanam.</h1>
          {[
            "I'm a wedding and portrait photographer based in India. I started with a borrowed camera and a stubborn need to keep the things that pass too quickly — a laugh, a held hand, the light at the end of a long day.",
            "My work lives somewhere between documentary and portraiture. I don't direct much. I watch, I wait, and I photograph the moment you forget I'm there. That's almost always the real one.",
            "When I'm not shooting, I'm probably editing past midnight with chai, or scouting golden-hour corners of a city I've never been to.",
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontWeight:   300,
                fontSize:     16,
                lineHeight:   1.95,
                color:        "#5C5547",
                margin:       i < 2 ? "0 0 20px" : "0 0 30px",
              }}
            >
              {text}
            </p>
          ))}
          <span style={{ fontFamily: "var(--font-spectral), serif", fontStyle: "italic", fontSize: 30, color: "var(--ink)" }}>
            &mdash; Nayanam
          </span>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section className="section section-alt" style={{ textAlign: "center" }}>
        <h2 className="h2" style={{ lineHeight: 1.3, margin: "0 auto", maxWidth: 820 }}>
          I believe the best photographs aren&apos;t taken. They&apos;re noticed &mdash; and then quietly kept.
        </h2>
      </section>

      {/* ── Stats ── */}
      <section className="section">
        <div className="grid-3">
          {STATS.map(({ n, l }) => (
            <div key={l} className="stat">
              <div className="stat-n">{n}</div>
              <div className="stat-l">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: "0 var(--pad) var(--sec)" }}>
        <h2 className="h2" style={{ marginBottom: 46 }}>How we&apos;ll work together</h2>
        <div className="grid-4">
          {STEPS.map(({ num, title, body }) => (
            <div key={num} className="step">
              <div className="step-num">{num}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />

    </main>
  );
}
