"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/content";
import { ease } from "@/lib/motion";

/** Counts from zero to the value once the strip enters view. */
export function StatCounter({ stat }: { readonly stat: Stat }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [shown, setShown] = useState(0);

  /* Markup starts at 0 on server and client alike; reduced motion jumps
     to the value through a zero-duration animation instead of branching. */
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: reduce ? 0 : 1.4,
      ease: ease.out,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  return (
    <span ref={ref} className="text-figure text-ink">
      {stat.prefix ? <span className="text-[0.55em] font-bold text-ink-2 align-[0.2em] mr-0.5">{stat.prefix}</span> : null}
      {shown.toLocaleString("en-US")}
      {stat.suffix ? <span className="text-[0.7em] text-blue">{stat.suffix}</span> : null}
    </span>
  );
}
