"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient line along the top edge that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 26, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[linear-gradient(90deg,#2e6bff,#2bc4ec_60%,#7c6bff)]"
      style={{ scaleX }}
    />
  );
}
