"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "WORK",    href: "/work" },
  { label: "ABOUT",   href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const MENU_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Work",    href: "/work" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position:          "sticky",
          top:               0,
          zIndex:            50,
          background:        "rgba(243,236,226,.88)",
          backdropFilter:    "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom:      "1px solid rgba(0,0,0,.05)",
        }}
      >
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "22px var(--pad)",
          }}
        >
          {/* Brand */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "oklch(0.62 0.10 45)",
                display: "inline-block", flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily:    "var(--font-spectral), serif",
                fontSize:      23,
                fontWeight:    500,
                letterSpacing: ".01em",
                color:         "var(--ink)",
              }}
            >
              Nayanam
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            className="nav-desktop"
            style={{ gap: 40, fontSize: 12, letterSpacing: ".22em" }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{ color: pathname === href ? "var(--ink)" : "var(--muted)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Burger */}
          <button
            className="nav-burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              flexDirection: "column",
              gap:           5,
              padding:       4,
              background:    "none",
              border:        "none",
              cursor:        "pointer",
            }}
          >
            <span style={{ width: 24, height: 1.5, background: "var(--ink)", display: "block" }} />
            <span style={{ width: 24, height: 1.5, background: "var(--ink)", display: "block" }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position:      "fixed",
            inset:         0,
            zIndex:        60,
            background:    "var(--bg)",
            display:       "flex",
            flexDirection: "column",
            padding:       "26px 22px",
          }}
        >
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              marginBottom:   80,
            }}
          >
            <span style={{ fontFamily: "var(--font-spectral), serif", fontSize: 23, fontWeight: 500 }}>
              Nayanam
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: "none",
                border:     "none",
                fontSize:   30,
                cursor:     "pointer",
                lineHeight: 1,
                color:      "var(--ink)",
                padding:    0,
              }}
            >
              &times;
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {MENU_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-spectral), serif",
                  fontStyle:  "italic",
                  fontSize:   40,
                  color:      "var(--ink)",
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div
            style={{
              marginTop:     "auto",
              fontSize:      11,
              letterSpacing: ".2em",
              color:         "oklch(0.58 0.10 45)",
            }}
          >
            HELLO@NAYANAM.STUDIO
          </div>
        </div>
      )}
    </>
  );
}
