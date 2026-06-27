import Link from "next/link";

export default function CtaBand() {
  return (
    <section
      style={{
        padding:        "var(--sec) var(--pad)",
        background:     "oklch(0.40 0.06 45)",
        color:          "#F6EFE3",
        display:        "flex",
        flexWrap:       "wrap",
        gap:            30,
        alignItems:     "center",
        justifyContent: "space-between",
      }}
    >
      <h2 className="cta-title" style={{ color: "#F6EFE3" }}>
        Have a story to tell? Let&apos;s begin.
      </h2>
      <Link
        href="/contact"
        style={{
          display:       "inline-block",
          fontSize:      12,
          letterSpacing: ".22em",
          padding:       "17px 42px",
          background:    "#F6EFE3",
          color:         "#3a2e22",
          fontWeight:    400,
          whiteSpace:    "nowrap",
        }}
      >
        BOOK A DATE
      </Link>
    </section>
  );
}
