"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { ease, viewportOnce } from "@/lib/motion";

/*
 * Variants take `custom` (true when the reader prefers reduced motion) so the
 * server and client render the same hidden markup, and reduced motion only
 * zeroes the transition instead of changing what is rendered.
 */
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (reduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: reduce ? { duration: 0 } : { duration: 0.7, ease: ease.out },
  }),
};

const staggerVariants = (delay: number): Variants => ({
  hidden: {},
  show: (reduce: boolean) => ({
    transition: reduce ? { staggerChildren: 0, delayChildren: 0 } : { staggerChildren: 0.08, delayChildren: delay },
  }),
});

type RevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  /** Stagger direct children (each child should be a <RevealItem>). */
  readonly staggered?: boolean;
  readonly delay?: number;
  readonly as?: "div" | "section" | "ul" | "li";
};

/** One-time entrance when the block scrolls into view. */
export function Reveal({ children, className, staggered = false, delay = 0.05, as = "div" }: RevealProps) {
  const reduce = useReducedMotion() === true;
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={staggered ? staggerVariants(delay) : riseVariants}
      custom={reduce}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: { readonly children: ReactNode; readonly className?: string; readonly as?: "div" | "li" }) {
  const reduce = useReducedMotion() === true;
  const Tag = motion[as];
  return (
    <Tag className={className} variants={riseVariants} custom={reduce}>
      {children}
    </Tag>
  );
}
