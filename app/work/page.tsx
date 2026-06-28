"use client";

import { useState } from "react";
import CtaBand from "@/components/CtaBand";

const FILTERS = ["ALL", "WEDDINGS", "PORTRAITS", "PRE-WEDDING"] as const;
type Filter = (typeof FILTERS)[number];

const IMAGES: { src: string; height: number; cat: string }[] = [
  { src: "/images/weddings/1.JPG",              height: 420, cat: "WEDDINGS" },
  { src: "/images/portraits/1.JPG",             height: 300, cat: "PORTRAITS" },
  { src: "/images/pre-wedding/DSC04811.JPG",    height: 420, cat: "PRE-WEDDING" },
  { src: "/images/weddings/4.JPG",              height: 360, cat: "WEDDINGS" },
  { src: "/images/portraits/3.JPG",             height: 440, cat: "PORTRAITS" },
  { src: "/images/pre-wedding/SMK03530.JPG",    height: 360, cat: "PRE-WEDDING" },
  { src: "/images/weddings/7.JPG",              height: 380, cat: "WEDDINGS" },
  { src: "/images/portraits/6.JPG",             height: 340, cat: "PORTRAITS" },
  { src: "/images/pre-wedding/_SMK5613.JPG",    height: 300, cat: "PRE-WEDDING" },
  { src: "/images/weddings/10.JPG",             height: 300, cat: "WEDDINGS" },
  { src: "/images/portraits/SMK08790.JPG",      height: 380, cat: "PORTRAITS" },
  { src: "/images/pre-wedding/_SMK5700.JPG",    height: 440, cat: "PRE-WEDDING" },
  { src: "/images/weddings/14.JPG",             height: 350, cat: "WEDDINGS" },
  { src: "/images/portraits/9.JPG",             height: 290, cat: "PORTRAITS" },
  { src: "/images/pre-wedding/DSC04826.JPG",    height: 380, cat: "PRE-WEDDING" },
  { src: "/images/weddings/17.JPG",             height: 400, cat: "WEDDINGS" },
  { src: "/images/portraits/12.JPG",            height: 320, cat: "PORTRAITS" },
  { src: "/images/pre-wedding/_SMK5633.JPG",    height: 420, cat: "PRE-WEDDING" },
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
