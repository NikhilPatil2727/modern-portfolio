"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [hideIntro, setHideIntro] = useState(false);

  useEffect(() => {
    const startFadeTimer = window.setTimeout(() => {
      setHideIntro(true);
    }, 2100);

    const finishIntroTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 2800);

    return () => {
      window.clearTimeout(startFadeTimer);
      window.clearTimeout(finishIntroTimer);
    };
  }, []);

  return (
    <>
      {showIntro && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black transition-opacity duration-700 ${
            hideIntro ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_32%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
          <TypingAnimation
            as="h1"
            duration={120}
            delay={150}
            startOnView={false}
            className="font-display relative px-6 text-center text-6xl font-semibold tracking-[-0.05em] text-white sm:text-7xl md:text-8xl"
          >
            Hello 👋
          </TypingAnimation>
        </div>
      )}

      <main
        className={`space-y-0 transition-opacity duration-700 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <Hero />
        <Skills />
        <Projects limit={3} />
      </main>
    </>
  );
}
