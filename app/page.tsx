"use client";

import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Portfolio from "@/sections/Portfolio";
import Videos from "@/sections/Videos";
import About from "@/sections/About";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Fixed overlays */}
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Loader onComplete={() => {}} />

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
