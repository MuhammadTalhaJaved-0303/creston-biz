"use client";

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { StepItem } from "@/components/sections/process/StepItem";
import { processSteps } from "@/lib/content";
import { stagger } from "@/lib/motion";

/** Portion of the scroll range over which the rail draws; the last node lights just before the end. */
const RAIL_SPAN = 0.94;
/** Columns from the tablet breakpoint until the rail goes single-row at xl. */
const TABLET_COLUMNS = 3;
/** The list can be taller than a phone viewport, so a small slice is enough to start the entrance. */
const listViewport = { once: true, amount: 0.15 } as const;

/**
 * Six stages on a rail whose gradient line draws as the list scrolls through
 * the viewport. Nodes light up as the line reaches them. Under reduced motion
 * the rail is shown fully drawn.
 */
export function Stepper() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const progress = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => progress.set(reduce ? 1 : value));

  /**
   * Reduced motion shows the rail complete. The set is deferred by a frame so
   * it lands after the derived values have subscribed (StrictMode remounts
   * their subscriptions and would otherwise drop a synchronous update).
   */
  useEffect(() => {
    if (!reduce) return;
    const id = requestAnimationFrame(() => progress.set(1));
    return () => cancelAnimationFrame(id);
  }, [reduce, progress]);

  const last = processSteps.length - 1;

  return (
    <motion.ol
      ref={ref}
      className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-12 xl:grid-cols-6"
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={listViewport}
      transition={reduce ? { duration: 0 } : undefined}
    >
      {processSteps.map((step, i) => (
        <StepItem
          key={step.n}
          step={step}
          progress={progress}
          start={(i / last) * RAIL_SPAN}
          end={((i + 1) / last) * RAIL_SPAN}
          hasSegment={i < last}
          endsTabletRow={(i + 1) % TABLET_COLUMNS === 0}
        />
      ))}
    </motion.ol>
  );
}
