"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const PARALLAX_RANGE = 900;

/** Still photograph of a bright office behind the hero copy, drifting down and zooming slightly as the page scrolls. */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, PARALLAX_RANGE], [0, reduce ? 0 : 150]);
  const scale = useTransform(scrollY, [0, PARALLAX_RANGE], [1.04, reduce ? 1.04 : 1.16]);

  return (
    <motion.div className="absolute inset-0 will-change-transform" style={{ y, scale }}>
      <Image src="/video/hero-poster.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover" />
    </motion.div>
  );
}
