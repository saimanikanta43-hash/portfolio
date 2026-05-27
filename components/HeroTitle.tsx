"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroTitle() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 250], [1, 0]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        zIndex: 99999,
        pointerEvents: "none",
        opacity,
      }}
    >
      <div style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
        <motion.p
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          // Starts sliding up as the logo begins to fade away
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 3.4 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            fontWeight: 400,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Stories by Nayanam
        </motion.p>
      </div>
    </motion.div>
  );
}
