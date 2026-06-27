import Link from "next/link";
import CtaBand from "@/components/CtaBand";

const HERO_BG =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85";

const CATEGORIES = [
  {
    title:  "Weddings",
    count:  "24 STORIES",
    img:    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
    offset: false,
  },
  {
    title:  "Portraits",
    count:  "18 SESSIONS",
    img:    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    offset: true,
  },
  {
    title:  "Events",
    count:  "30 EVENTS",
    img:    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    offset: false,
  },
];

const SERVICES = [
  { num: "01", title: "Weddings & Films",       desc: "Full-day coverage, candid and unhurried — from the first nervous glance to the last dance." },
  { num: "02", title: "Pre-Wedding",             desc: "A relaxed session to find your rhythm together before the big day arrives." },
  { num: "03", title: "Portraits",               desc: "Individual, couple and family portraiture made to feel like you, not a pose." },
  { num: "04", title: "Events & Celebrations",   desc: "Birthdays, housewarmings, milestones — the ordinary days worth keeping." },
];

export default function Home() {
  return (
    <main>

      {/* ── Hero ── */}
      <div style={{ padding: "18px var(--pad) 0" }}>
        <div
          style={{
            position:   "relative",
            height:     600,
            background: `#DCCFBB url(${HERO_BG}) center/cover`,
            overflow:   "hidden",
          }}
        >
          <div
            style={{
              position:   "absolute",
              left: 0, right: 0, bottom: 0,
              padding:    "44px var(--pad)",
              color:      "#F6EFE3",
              background: "linear-gradient(to top, rgba(30,24,18,.82) 0%, rgba(30,24,18,.35) 45%, rgba(30,24,18,0) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <span style={{ width: 26, height: 1, background: "oklch(0.70 0.11 45)", display: "block" }} />
              <span
                style={{
                  fontFamily:    "var(--font-mono), monospace",
                  fontSize:      11,
                  letterSpacing: ".2em",
                  color:         "#e7c4a0",
                }}
              >
                WEDDING &amp; PORTRAIT PHOTOGRAPHY
              </span>
            </div>
            <h1 className="hero-title" style={{ maxWidth: 760, color: "#F6EFE3" }}>
              Light, held still long enough to remember.
            </h1>
          </div>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="section grid-2">
        <h2 className="h2">
          I photograph people &mdash; and the moments they forget the camera is there.
        </h2>
        <div>
          <p style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.95, color: "var(--muted)", margin: "0 0 22px" }}>
            I reach for my camera when words stop being enough. Weddings, portraits,
            first birthdays, quiet housewarmings &mdash; I show up for all of it, because
            every moment deserves to be treated like it matters.
          </p>
          <Link
            href="/about"
            style={{
              fontFamily:    "var(--font-mono), monospace",
              fontSize:      11,
              letterSpacing: ".16em",
              color:         "var(--accent)",
            }}
          >
            READ THE STORY &rarr;
          </Link>
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section style={{ padding: "0 var(--pad) var(--sec)" }}>
        <div className="sec-head">
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: ".22em", color: "var(--accent)" }}>
            SELECTED WORK
          </span>
          <span style={{ flex: 1, height: 1, background: "#DDD1C0" }} />
          <Link
            href="/work"
            style={{
              fontFamily:    "var(--font-mono), monospace",
              fontSize:      11,
              letterSpacing: ".16em",
              color:         "#8a7c68",
            }}
          >
            VIEW ALL &rarr;
          </Link>
        </div>

        <div className="grid-3">
          {CATEGORIES.map(({ title, count, img, offset }) => (
            <Link
              key={title}
              href="/work"
              className={offset ? "mt-46" : ""}
              style={{ display: "block" }}
            >
              <div style={{ height: 440, background: `#DCCFBB url(${img}) center/cover` }} />
              <div
                style={{
                  display:        "flex",
                  justifyContent: "space-between",
                  alignItems:     "baseline",
                  marginTop:      15,
                }}
              >
                <span style={{ fontFamily: "var(--font-spectral), serif", fontSize: 25, color: "var(--ink)" }}>
                  {title}
                </span>
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: ".1em", color: "#A4937A" }}>
                  {count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section section-alt">
        <h2 className="h2" style={{ marginBottom: 50 }}>What I offer</h2>
        <div>
          {SERVICES.map(({ num, title, desc }) => (
            <div key={num} className="svc">
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "var(--accent)" }}>
                {num}
              </span>
              <span style={{ fontFamily: "var(--font-spectral), serif", fontSize: 27, color: "var(--ink)" }}>
                {title}
              </span>
              <span className="svc-desc" style={{ fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: "var(--muted)" }}>
                {desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="section" style={{ textAlign: "center" }}>
        <p className="quote-text">
          &ldquo;He didn&apos;t just take photos &mdash; he captured the way the day actually felt.
          We relive it every time we look.&rdquo;
        </p>
        <div
          style={{
            fontFamily:    "var(--font-mono), monospace",
            fontSize:      11,
            letterSpacing: ".24em",
            color:         "var(--accent)",
            marginTop:     30,
          }}
        >
          &mdash; PIA &amp; ARJUN
        </div>
      </section>

      <CtaBand />

    </main>
  );
}
