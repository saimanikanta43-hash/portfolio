"use client";

import { forwardRef } from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

// ─── Design notes ────────────────────────────────────────────────────────────
// Each building path traces the TOP silhouette (not filled).
// Adjacent buildings share a wall — the path never drops to ground mid-run.
// Path convention: V {top_y} H {right_x} creates one building column.
// Ground = y 490. Lower y-value = TALLER building.
// Scale: 1 "story" ≈ 4.8 SVG units.   ESB (102 fl) → y ≈ 2.
//
// Critical fix over v1: height variation between adjacent buildings is now
// 10–40 units (2–8 stories) not 3–8 units, creating a spiky urban silhouette
// instead of a smooth "hill" shape.  vectorEffect="non-scaling-stroke" keeps
// strokes visible at any viewport width (critical on mobile).

// ─── Segment A — far-left brownstones/rowhouses  (x 0 → 165) ────────────────
// Mix of 3–14-story buildings with NO monotonic trend — short next to tall.
const SEG_A =
  "M 0 490" +
  " V 476 H 10 V 484 H 18 V 465 H 30 V 479 H 38" +   // 3–6 st alternating
  " V 456 H 50 V 473 H 58 V 448 H 70 V 470 H 78" +   // bigger jump to 9 st
  " V 438 H 92 V 466 H 100 V 442 H 114 V 472 H 122" + // 11 st spike
  " V 430 H 138 V 464 H 146 V 418 H 162 V 448 H 165"; // 15 st spike at end

// ─── Segment B — left mid-rise cluster  (x 165 → 290) ───────────────────────
// Tall towers (20–36 st) immediately next to much shorter neighbors (8–13 st).
const SEG_B =
  "M 165 448" +
  " V 405 H 180 V 450 H 188" +    // 17 st tower, then drops to 8 st
  " V 388 H 204 V 445 H 212" +    // 21 st, drops hard
  " V 365 H 230 V 420 H 238" +    // 26 st spike!, shorter
  " V 345 H 255 V 408 H 262" +    // 30 st tower!, shorter
  " V 328 H 278 V 375 H 284" +    // 34 st, shorter
  " V 308 H 290";                  // connects to SEG_C

// ─── Segment C — approach to Chrysler  (x 290 → 402) ───────────────────────
// Buildings escalate into 35–50 story range with dramatic valleys.
const SEG_C =
  "M 290 308" +
  " V 275 H 308 V 318 H 315" +    // 45 st tower!, valley
  " V 258 H 334 V 298 H 342" +    // 48 st, valley
  " V 268 H 358 V 310 H 365" +    // 46 st, valley
  " V 245 H 382 V 285 H 390" +    // 51 st, valley
  " V 268 H 396 V 295 H 402";     // connects to Chrysler (x=402, y=295)

// ─── Segment D — Chrysler Building  (x 402 → 512) ──────────────────────────
// Art-deco stepped base + zigzag crown + needle spire.  UNCHANGED.
const SEG_D =
  "M 402 295" +
  " V 272 H 415 V 255 H 422 V 238 H 428" +
  " V 222 H 432 V 208 H 436 V 195 H 438 V 185" +
  " L 439 175 L 440 166 L 441 158 L 442 150" +
  " L 443 141 L 444 132 L 445 122 L 446 112" +
  " L 447 102 L 448 92 L 449 82" +
  " L 450 72 L 451 62 L 452 52 L 453 44 V 38" +
  " L 454 44 L 455 52 L 456 62 L 457 72" +
  " L 458 82 L 459 92 L 460 102 L 461 112" +
  " L 462 122 L 463 132 L 464 141 L 465 150" +
  " L 466 158 L 467 166 L 468 175 L 469 185" +
  " H 472 V 195 H 476 V 208 H 480 V 222" +
  " H 484 V 238 H 490 V 255 H 498 V 272 H 512 V 295";

// ─── Segment E — between Chrysler and ESB  (x 512 → 598) ───────────────────
// Key: these midtown buildings punch ABOVE 295 — some reach 50–55 stories.
const SEG_E =
  "M 512 295" +
  " V 252 H 528 V 298 H 536" +    // 49 st spike!, valley back
  " V 265 H 552 V 315 H 560" +    // 47 st, shorter valley
  " V 248 H 578 V 285 H 588" +    // 51 st spike!, shorter
  " V 255 H 598";                  // connects to ESB (x=598, y=255)

// ─── Segment F — Empire State Building  (x 598 → 738) ──────────────────────
// Five setbacks + observation deck + broadcast mast.  UNCHANGED.
const SEG_F =
  "M 598 255" +
  " V 228 H 610 V 212 H 618" +
  " V 190 H 624 V 170 H 630" +
  " V 148 H 634 V 126 H 638" +
  " V 102 H 641 V 78 H 644" +
  " V 55 H 647 V 48 H 648 V 40 H 649 V 35" +
  " V 18 H 651 V 8 H 652 V 2" +
  " H 653 V 8 H 655 V 18" +
  " H 657 V 35 H 658 V 40 H 659 V 48 H 662 V 55" +
  " V 78 H 665 V 102 H 668" +
  " V 126 H 672 V 148 H 676" +
  " V 170 H 682 V 190 H 688" +
  " V 212 H 696 V 228 H 710 V 255 H 738";

// ─── Segment G — post-ESB midtown  (x 738 → 878) ───────────────────────────
// Was the flattest part of v1.  Now dramatic 55–60 story towers mixed with
// shorter 20-story neighbors — classic Midtown Manhattan density.
const SEG_G =
  "M 738 255" +
  " V 218 H 756 V 268 H 764" +    // 57 st immediate spike!, valley
  " V 232 H 780 V 282 H 790" +    // 54 st, shorter valley
  " V 245 H 808 V 290 H 818" +    // 51 st, shorter valley
  " V 228 H 836 V 275 H 846" +    // 55 st, shorter valley
  " V 240 H 862 V 278 H 870" +    // 52 st, shorter valley
  " V 230 H 878";                  // connects to One WTC (x=878, y=230)

// ─── Segment H — One World Trade Center  (x 878 → 992) ─────────────────────
// Tapered glass monolith + spire.  UNCHANGED (starts at y=230, adapts 5px).
const SEG_H =
  "M 878 230" +
  " V 205 H 892 V 185 H 896" +
  " L 900 158 L 904 132 L 908 108 L 912 86" +
  " L 916 66 L 919 48 L 922 33" +
  " L 924 21 L 926 12 L 928 5 L 929 2" +
  " L 930 5 L 932 12 L 934 21 L 936 33" +
  " L 939 48 L 942 66 L 946 86 L 950 108" +
  " L 954 132 L 958 158 L 962 185" +
  " H 966 V 205 H 978 V 220 H 992";

// ─── Segment I — post-WTC financial district  (x 992 → 1132) ───────────────
// Lower Manhattan skyscrapers — some of the tallest on the right side.
// Includes towers reaching 62–66 story equivalent (y 174–182).
const SEG_I =
  "M 992 220" +
  " V 182 H 1010 V 222 H 1018" +  // 64 st tower!, drops
  " V 195 H 1035 V 232 H 1044" +  // 61 st, valley
  " V 174 H 1062 V 215 H 1070" +  // 66 st spike!, valley
  " V 188 H 1088 V 228 H 1098" +  // 63 st, valley
  " V 202 H 1116 V 235 H 1126" +  // 60 st, valley
  " V 218 H 1132";                 // connects to SEG_J

// ─── Segment J — right wing  (x 1132 → 1440) ───────────────────────────────
// v1 was a smooth staircase to ground.  Now: tall buildings (y 200–215)
// scattered right up to x 1280, then rapid descent with continued variation.
const SEG_J =
  "M 1132 218" +
  " V 248 H 1148 V 205 H 1162" +  // dip, then 60 st spike!
  " V 235 H 1178 V 275 H 1188" +  // tall, valley
  " V 218 H 1205 V 268 H 1216" +  // 57 st!, valley
  " V 242 H 1232 V 292 H 1244" +  // tall, valley
  " V 260 H 1260 V 318 H 1272" +  // medium-tall, valley
  " V 278 H 1292 V 335 H 1305" +  // 44 st, shorter
  " V 298 H 1322 V 358 H 1334" +  // 40 st, shorter
  " V 318 H 1352 V 380 H 1364" +  // 36 st, shorter
  " V 340 H 1382 V 402 H 1394" +  // 31 st, shorter
  " V 362 H 1412 V 422 H 1424" +  // 27 st, shorter
  " V 382 H 1436 V 490 H 1440";   // last building + ground close

// ─── Cloud paths ─────────────────────────────────────────────────────────────
// Positioned in sky above the shorter building wings (safely above y 120).
const CLOUD_L =
  "M 22 92 Q 13 83 18 73 Q 10 62 22 55 Q 14 42 32 44 Q 30 28 52 32" +
  " Q 54 14 78 20 Q 85 5 108 13 Q 118 -1 142 8 Q 154 -4 175 7" +
  " Q 190 -2 208 14 Q 222 6 232 26 Q 250 24 252 44 Q 266 52 258 70" +
  " Q 268 82 252 92 L 22 92 Z";

const CLOUD_R1 =
  "M 1168 96 Q 1157 86 1164 76 Q 1152 64 1166 57 Q 1158 43 1178 44" +
  " Q 1175 28 1198 30 Q 1204 12 1228 18 Q 1238 2 1262 10 Q 1273 -2 1298 7" +
  " Q 1310 -3 1332 9 Q 1346 1 1358 18 Q 1375 12 1382 32 Q 1400 30 1402 50" +
  " Q 1418 58 1412 75 Q 1425 88 1407 98 L 1168 98 Z";

const CLOUD_R2 =
  "M 1270 112 Q 1262 103 1268 93 Q 1260 81 1275 76 Q 1272 64 1290 66" +
  " Q 1290 52 1310 55 Q 1318 42 1340 48 Q 1350 36 1370 44 Q 1384 38 1394 56" +
  " Q 1412 56 1414 74 Q 1430 82 1422 96 Q 1432 108 1414 112 L 1270 112 Z";

// ─── Sailboat ─────────────────────────────────────────────────────────────────
const SAILBOAT =
  "M 670 508 L 750 508" +   // hull bottom
  " M 710 508 L 710 452" +  // mast
  " M 710 453 L 670 505" +  // left sail
  " M 670 505 L 750 505" +  // sail base
  " M 750 505 L 710 453";   // right sail

// ─── Component ────────────────────────────────────────────────────────────────

const NycSkylineSvg = forwardRef<SVGSVGElement, Props>(({ className, style }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 1440 520"
    preserveAspectRatio="xMidYMax meet"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    {/* ── Ghost layer: always-visible faint outline — not animated ── */}
    <g opacity={0.065} fill="none" stroke="white" strokeWidth="1" strokeLinecap="round"
       strokeLinejoin="round" vectorEffect="non-scaling-stroke">
      <path d={CLOUD_L} />
      <path d={CLOUD_R1} />
      <path d={CLOUD_R2} />
      <path d={SEG_A} />
      <path d={SEG_B} />
      <path d={SEG_C} />
      <path d={SEG_D} />
      <path d={SEG_E} />
      <path d={SEG_F} />
      <path d={SEG_G} />
      <path d={SEG_H} />
      <path d={SEG_I} />
      <path d={SEG_J} />
      <path d={SAILBOAT} />
    </g>

    {/* ── Architectural detail layer — window bands & structural lines ── */}
    <g opacity={0.12} fill="none" stroke="white" strokeWidth="0.7" strokeLinecap="round"
       vectorEffect="non-scaling-stroke">
      {/* ESB — horizontal setback ledge lines */}
      <line x1="610" y1="227" x2="710" y2="227" />
      <line x1="618" y1="211" x2="696" y2="211" />
      <line x1="624" y1="189" x2="688" y2="189" />
      <line x1="630" y1="169" x2="682" y2="169" />
      <line x1="634" y1="147" x2="676" y2="147" />
      <line x1="638" y1="125" x2="672" y2="125" />
      <line x1="641" y1="101" x2="668" y2="101" />
      <line x1="645" y1="58"  x2="645" y2="100" />
      <line x1="648" y1="58"  x2="648" y2="100" />
      <line x1="652" y1="58"  x2="652" y2="100" />
      <line x1="656" y1="58"  x2="656" y2="100" />
      <line x1="659" y1="58"  x2="659" y2="100" />
      <line x1="643" y1="108" x2="643" y2="147" />
      <line x1="648" y1="108" x2="648" y2="147" />
      <line x1="653" y1="108" x2="653" y2="147" />
      <line x1="658" y1="108" x2="658" y2="147" />
      <line x1="663" y1="108" x2="663" y2="147" />

      {/* ESB — horizontal window rows mid-body */}
      <line x1="612" y1="242" x2="708" y2="242" />
      <line x1="614" y1="252" x2="706" y2="252" />

      {/* Chrysler — floor-band lines */}
      <line x1="415" y1="271" x2="498" y2="271" />
      <line x1="422" y1="254" x2="490" y2="254" />
      <line x1="428" y1="237" x2="484" y2="237" />
      <line x1="432" y1="221" x2="480" y2="221" />
      <line x1="436" y1="207" x2="476" y2="207" />
      <line x1="422" y1="260" x2="422" y2="295" />
      <line x1="432" y1="260" x2="432" y2="295" />
      <line x1="442" y1="260" x2="442" y2="295" />
      <line x1="452" y1="260" x2="452" y2="295" />
      <line x1="462" y1="260" x2="462" y2="295" />
      <line x1="472" y1="260" x2="472" y2="295" />
      <line x1="480" y1="260" x2="480" y2="295" />

      {/* One WTC — horizontal glass-band lines */}
      <line x1="896" y1="155" x2="962" y2="155" />
      <line x1="900" y1="122" x2="958" y2="122" />
      <line x1="905" y1="90"  x2="953" y2="90"  />
      <line x1="910" y1="62"  x2="948" y2="62"  />
      <line x1="915" y1="38"  x2="943" y2="38"  />

      {/* SEG_G midtown towers — floor lines */}
      <line x1="740" y1="235" x2="754" y2="235" />
      <line x1="740" y1="248" x2="754" y2="248" />
      <line x1="780" y1="248" x2="794" y2="248" />
      <line x1="780" y1="258" x2="794" y2="258" />
      <line x1="836" y1="240" x2="846" y2="240" />
      <line x1="836" y1="252" x2="846" y2="252" />

      {/* SEG_I financial district — floor lines */}
      <line x1="994" y1="198" x2="1008" y2="198" />
      <line x1="994" y1="210" x2="1008" y2="210" />
      <line x1="1035" y1="210" x2="1042" y2="210" />
      <line x1="1062" y1="188" x2="1068" y2="188" />
      <line x1="1062" y1="200" x2="1068" y2="200" />
      <line x1="1088" y1="202" x2="1096" y2="202" />

      {/* SEG_C pre-Chrysler towers */}
      <line x1="292" y1="288" x2="306" y2="288" />
      <line x1="292" y1="300" x2="306" y2="300" />
      <line x1="335" y1="272" x2="340" y2="272" />
      <line x1="382" y1="256" x2="388" y2="256" />
      <line x1="382" y1="270" x2="388" y2="270" />

      {/* Left-wing mid-rise buildings (SEG_B) */}
      <line x1="168" y1="420" x2="178" y2="420" />
      <line x1="168" y1="432" x2="178" y2="432" />
      <line x1="205" y1="400" x2="210" y2="400" />
      <line x1="230" y1="380" x2="236" y2="380" />
      <line x1="256" y1="358" x2="260" y2="358" />

      {/* Ground horizon */}
      <line x1="0" y1="492" x2="1440" y2="492" />

      {/* Water ripples */}
      <line x1="20"   y1="497" x2="180"  y2="497" />
      <line x1="220"  y1="497" x2="420"  y2="497" />
      <line x1="480"  y1="500" x2="650"  y2="500" />
      <line x1="760"  y1="497" x2="1050" y2="497" />
      <line x1="1120" y1="497" x2="1380" y2="497" />
      <line x1="60"   y1="503" x2="320"  y2="503" />
      <line x1="840"  y1="503" x2="1100" y2="503" />
    </g>

    {/* ══ ANIMATED PATHS — GSAP drives strokeDashoffset to 0 on scroll ══ */}
    {/* vectorEffect="non-scaling-stroke" keeps stroke pixel-perfect on all screens */}

    {/* Clouds draw first — sky awakens before the city */}
    <path data-skyline-cloud="l"  vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.44)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" d={CLOUD_L}  />
    <path data-skyline-cloud="r1" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" d={CLOUD_R1} />
    <path data-skyline-cloud="r2" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" d={CLOUD_R2} />

    {/* Building segments — far left to far right */}
    <path data-skyline="A" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d={SEG_A} />
    <path data-skyline="B" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.62)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d={SEG_B} />
    <path data-skyline="C" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.68)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d={SEG_C} />
    <path data-skyline="D" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.82)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d={SEG_D} />
    <path data-skyline="E" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d={SEG_E} />
    <path data-skyline="F" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.96)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d={SEG_F} />
    <path data-skyline="G" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.62)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d={SEG_G} />
    <path data-skyline="H" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.86)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d={SEG_H} />
    <path data-skyline="I" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.62)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d={SEG_I} />
    <path data-skyline="J" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.52)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d={SEG_J} />

    {/* Sailboat — draws in after skyline is mostly complete */}
    <path data-skyline-water="boat" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(255,255,255,0.52)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" d={SAILBOAT} />
  </svg>
));

NycSkylineSvg.displayName = "NycSkylineSvg";
export default NycSkylineSvg;
