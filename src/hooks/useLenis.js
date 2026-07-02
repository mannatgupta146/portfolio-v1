"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Keep ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Store the callback so it can be removed properly
    const update = (time) => {
      // GSAP ticker gives time in seconds, Lenis expects milliseconds
      lenis.raf(time * 1000);
    };

    // Drive Lenis using GSAP's ticker
    gsap.ticker.add(update);

    // Disable GSAP lag smoothing for smoother scrolling
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger calculates positions correctly
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();

      // Don't use ScrollTrigger.killAll() here!
      // Individual components should clean up their own triggers.
    };
  }, []);
}