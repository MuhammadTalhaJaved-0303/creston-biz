"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";

const RINGS = [0, 1.1] as const;
const PULSE_SECONDS = 2.6;

/**
 * A small map-like tile: dotted ground, a soft blue glow and a gradient pin
 * with two rings that ripple outward. The ripple pauses under reduced motion.
 */
export function MapPulse() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative grid h-full w-full place-items-center overflow-hidden bg-surface-2 bg-dots [background-size:14px_14px]"
    >
      <span className="absolute inset-0 bg-[radial-gradient(closest-side_at_50%_50%,rgba(46,107,255,0.22),transparent)]" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-[28deg] bg-line-2/80" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 -rotate-[62deg] bg-line-2/80" />

      {RINGS.map((delay) => (
        <motion.span
          key={delay}
          className="absolute size-10 rounded-full border-2 border-blue"
          initial={{ scale: 0.7, opacity: 0.55 }}
          animate={reduce ? { scale: 0.7, opacity: 0.35 } : { scale: 2.4, opacity: 0 }}
          transition={reduce ? { duration: 0 } : { duration: PULSE_SECONDS, ease: "easeOut", repeat: Infinity, delay }}
        />
      ))}

      <span className="relative grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white shadow-[0_10px_24px_-8px_rgba(46,107,255,0.7)]">
        <MapPin className="size-5" strokeWidth={2} />
      </span>
    </div>
  );
}
