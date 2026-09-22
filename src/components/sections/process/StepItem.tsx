"use client";

import { motion, useInView, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { closingIcons, fallbackClosingIcon } from "@/components/sections/process/stepIcons";
import { LottieIcon } from "@/components/ui/LottieIcon";
import { cn } from "@/lib/cn";
import type { Step } from "@/lib/content";
import { rise } from "@/lib/motion";
import { stepAnimations } from "@/lottie";

type StepItemProps = {
  readonly step: Step;
  /** Rail progress, 0 to 1, shared by every step. */
  readonly progress: MotionValue<number>;
  /** Progress at which this node lights up. */
  readonly start: number;
  /** Progress at which the segment to the next node is fully drawn. */
  readonly end: number;
  /** False for the last step, which has nothing to connect to. */
  readonly hasSegment: boolean;
  /** True when the step sits at the end of a three-column row (tablet and small desktop). */
  readonly endsTabletRow: boolean;
};

const NODE_RAMP = 0.03;
const gradientH = "bg-[linear-gradient(90deg,#2e6bff,#2bc4ec)]";
const gradientV = "bg-[linear-gradient(180deg,#2e6bff,#2bc4ec)]";

/**
 * One stage: a numbered node on the rail, the segment that draws towards the
 * next node, and the card with an animated icon, the stage's title, summary
 * and closing document.
 * Vertical timeline on phones, three-column rows on tablets, one rail at xl.
 */
export function StepItem({ step, progress, start, end, hasSegment, endsTabletRow }: StepItemProps) {
  const reduce = useReducedMotion();
  const lit = useTransform(progress, [start, start + NODE_RAMP], [0, 1]);
  const drawn = useTransform(progress, [start, end], [0, 1]);
  const Icon = closingIcons[step.n] ?? fallbackClosingIcon;
  const animation = stepAnimations[step.n];

  /* The icon assembles itself when the rail lights this node, or once the card itself is well in view. */
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.7 });
  const [litPlay, setLitPlay] = useState(false);
  useMotionValueEvent(lit, "change", (value) => {
    if (value > 0.5) setLitPlay(true);
  });
  const play = litPlay || cardInView;

  const verticalRail = hasSegment ? "md:hidden" : "hidden";
  const horizontalRail = !hasSegment ? "hidden" : endsTabletRow ? "hidden xl:block" : "hidden md:block";

  return (
    <motion.li className="relative flex gap-4 md:flex-col md:gap-6" variants={rise} transition={reduce ? { duration: 0 } : undefined}>
      {/* Phone rail: node centre down to the next node centre (gap-y-6 on the list). */}
      <span aria-hidden="true" className={cn("pointer-events-none absolute left-5 top-5 h-[calc(100%+1.5rem)] w-0.5 -translate-x-1/2", verticalRail)}>
        <span className="absolute inset-0 rounded-full bg-line-2" />
        <motion.span className={cn("absolute inset-0 origin-top rounded-full", gradientV)} style={{ scaleY: drawn }} />
      </span>
      {/* Tablet and desktop rail: node centre across to the next node centre (gap-x-6 on the list). */}
      <span aria-hidden="true" className={cn("pointer-events-none absolute left-5 top-5 h-0.5 w-[calc(100%+1.5rem)] -translate-y-1/2", horizontalRail)}>
        <span className="absolute inset-0 rounded-full bg-line-2" />
        <motion.span className={cn("absolute inset-0 origin-left rounded-full", gradientH)} style={{ scaleX: drawn }} />
      </span>

      <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-navy text-[0.95rem] font-bold tabular-nums text-white ring-4 ring-surface">
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] shadow-[0_0_0_4px_#fff,0_0_0_9px_rgba(46,107,255,0.16),0_10px_24px_-8px_rgba(46,107,255,0.7)]"
          style={{ opacity: lit }}
        />
        <span className="relative">{step.n}</span>
      </span>

      <div ref={cardRef} className="card card-hover flex min-w-0 flex-1 flex-col p-5">
        {animation ? (
          <span className="mb-4 grid size-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#eef2ff,#e4f7fc)]">
            <LottieIcon data={animation} play={play} className="size-12" />
          </span>
        ) : null}
        <h3 className="text-h4 text-ink">{step.title}</h3>
        <p className="mt-2 text-small text-ink-2">{step.body}</p>
        <div className="mt-auto pt-5">
          <div className="rounded-xl bg-surface-2 px-3 py-2.5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink-2">Closes with</p>
            <p className="mt-1 flex items-start gap-1.5 text-caption font-semibold leading-snug text-ink">
              <Icon aria-hidden="true" className="mt-px size-4 shrink-0 text-blue" strokeWidth={1.75} />
              <span>{step.closes}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
