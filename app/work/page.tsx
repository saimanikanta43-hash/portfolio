"use client";

import { useState } from "react";
import CtaBand from "@/components/CtaBand";

const FILTERS = ["ALL", "WEDDINGS", "PORTRAITS", "PRE-WEDDING", "EVENTS"] as const;
type Filter = (typeof FILTERS)[number];

const IMAGES: { src: string; height: number; cat: string }[] = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", height: 420, cat: "WEDDINGS" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", height: 300, cat: "PORTRAITS" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", height: 360, cat: "WEDDINGS" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", height: 340, cat: "PORTRAITS" },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80", height: 440, cat: "PRE-WEDDING" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", height: 320, cat: "EVENTS" },
  { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80", height: 380, cat: "WEDDINGS" },
  { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80", height: 300, cat: "PRE-WEDDING" },
  { src: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&q=80", height: 420, cat: "PORTRAITS" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", height: 350, cat: "WEDDINGS" },
  { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80", height: 290, cat: "EVENTS" },
  { src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80", height: 400, cat: "PORTRAITS" },
];

export default function Work() {
  const [active, setActive] = useState<Filter>("ALL");

  const filtered = active === "ALL" ? IMAGES : IMAGES.filter((img) => img.cat === active);

  return (
    <main>

      {/* ── Header ── */}
      <section style={{ padding: "var(--sec) var(--pad) 0" }}>
        <div
          style={{
            fontFamily:    "var(--font-mono), monospace",
            fontSize:      11,
            letterSpacing: ".24em",
            color:         "var(--accent)",
            marginBottom:  18,
          }}
        >
          THE PORTFOLIO
        </div>
        <h1 className="page-title">Work</h1>
        <p
          style={{
            fontWeight:   300,
            fontSize:     17,
            lineHeight:   1.9,
            maxWidth:     560,
            color:        "var(--muted)",
            marginBottom: 40,
          }}
        >
          A growing collection of weddings, portraits and quiet in-between moments.
          Every gallery is photographed and edited by hand.
        </p>

        {/* Filter chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`chip${active === f ? " is-active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ── Masonry ── */}
      <section style={{ padding: "0 var(--pad) var(--sec)" }}>
        <div className="masonry">
          {filtered.map(({ src, height, cat }, i) => (
            <div key={`${cat}-${i}`} className="tile">
              <div
                style={{
                  height,
                  background: `#DCCFBB url(${src}) center/cover`,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <CtaBand />

    </main>
  );
}
