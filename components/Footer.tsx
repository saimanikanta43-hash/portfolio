import Link from "next/link";

const EXPLORE = [
  { label: "Home",    href: "/" },
  { label: "Work",    href: "/work" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ padding: "var(--sec) var(--pad) 40px", background: "#2A231D", color: "#D9CDBC" }}>
      <div className="foot-grid" style={{ paddingBottom: 48, borderBottom: "1px solid #463c31" }}>

        {/* Brand + tagline */}
        <div>
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}
          >
            <span
              style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "oklch(0.65 0.11 45)",
                display: "inline-block",
              }}
            />
            <span style={{ fontFamily: "var(--font-spectral), serif", fontSize: 23, fontWeight: 500, color: "#F6EFE3" }}>
              Nayanam
            </span>
          </Link>
          <p style={{ fontWeight: 300, fontSize: 14, lineHeight: 1.85, color: "#A8997F", margin: 0, maxWidth: 320 }}>
            Wedding &amp; portrait photography &mdash; quietly documenting the moments worth keeping.
          </p>
        </div>

        {/* Explore */}
        <div>
          <div className="foot-head">EXPLORE</div>
          <div className="foot-links">
            {EXPLORE.map(({ label, href }) => (
              <Link key={href} href={href} style={{ color: "#D9CDBC" }}>{label}</Link>
            ))}
          </div>
        </div>

        {/* Elsewhere */}
        <div>
          <div className="foot-head">ELSEWHERE</div>
          <div className="foot-links">
            <a href="https://instagram.com/nayanam.captures" target="_blank" rel="noreferrer" style={{ color: "#D9CDBC" }}>
              Instagram
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" style={{ color: "#D9CDBC" }}>
              Pinterest
            </a>
            <a href="mailto:hello@nayanam.studio" style={{ color: "#D9CDBC" }}>
              hello@nayanam.studio
            </a>
          </div>
        </div>

      </div>

      <div
        style={{
          display:        "flex",
          flexWrap:       "wrap",
          gap:            12,
          justifyContent: "space-between",
          paddingTop:     26,
          fontSize:       11,
          letterSpacing:  ".1em",
          color:          "#7e7059",
        }}
      >
        <span>&copy; 2026 NAYANAM. ALL RIGHTS RESERVED.</span>
        <span>MADE WITH CARE</span>
      </div>
    </footer>
  );
}
