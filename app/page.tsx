"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Portfolio from "@/sections/Portfolio";
import FeaturedStory from "@/sections/FeaturedStory";
import Videos from "@/sections/Videos";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
// Cursor only on client — avoids hydration mismatch
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Fixed overlays */}
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <CustomCursor />
      <Loader />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <Portfolio />
        {/* <FeaturedStory /> */}
        <Videos />
        <About />
        <Contact />
      </main>
    </>
  );
}
