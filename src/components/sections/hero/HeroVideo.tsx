"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Muted, looping background video behind the hero. Only mounted on wider
 * screens, where it is actually visible; phones get the poster alone and
 * skip the download. Paused for readers who prefer reduced motion.
 */
export function HeroVideo() {
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.pause();
      return;
    }
    el.play().catch(() => undefined);
  }, [reduce, wide]);

  if (!wide) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/video/hero-poster.jpg" alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />;
  }

  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/video/hero-poster.jpg"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/video/hero.webm" type="video/webm" />
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  );
}
