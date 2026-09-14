"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CheckCircle2, ClipboardList, Users } from "lucide-react";
import { useRef } from "react";
import { ease } from "@/lib/motion";

const bars = [58, 72, 64, 88, 76, 92, 84] as const;
const team = ["SA", "MK", "RH", "AN"] as const;

/**
 * Three product-like cards that stand in for the monthly report, the
 * deployed team and the replacement promise. They drift slightly and
 * parallax against the scroll so the hero has depth.
 */
export function FloatingCards() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 28, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: ease.out, delay },
  });

  return (
    <div ref={ref} className="relative h-[31rem] lg:h-[35rem]" aria-hidden="true">
      {/* Report card */}
      <motion.div style={{ y: y1 }} className="absolute left-0 top-6 w-[19.5rem] sm:w-[22rem]">
        <motion.div {...enter(0.35)} className="glass rounded-[1.35rem] p-5 animate-float-slow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white">
                <ClipboardList className="size-4" />
              </span>
              <div>
                <p className="text-[0.9rem] font-bold leading-tight">Monthly service report</p>
                <p className="text-caption text-ink-3">August, all sites</p>
              </div>
            </div>
            <span className="rounded-full bg-green/10 px-2.5 py-1 text-[0.72rem] font-bold text-green">On SLA</span>
          </div>
          <div className="mt-5 flex h-20 items-end gap-1.5">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-md bg-[linear-gradient(180deg,#2e6bff,#2bc4ec)]"
                initial={{ height: "12%" }}
                animate={{ height: `${h}%` }}
                transition={reduce ? { duration: 0 } : { duration: 0.9, ease: ease.out, delay: 0.7 + i * 0.06 }}
                style={{ opacity: 0.55 + i * 0.06 }}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
            <div>
              <p className="text-caption text-ink-3">Attendance</p>
              <p className="text-[1.1rem] font-extrabold tabular-nums">98.4%</p>
            </div>
            <div>
              <p className="text-caption text-ink-3">Issues closed</p>
              <p className="text-[1.1rem] font-extrabold tabular-nums">126 of 128</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Team card */}
      <motion.div style={{ y: y2 }} className="absolute right-0 top-[17.5rem] w-[17rem] sm:w-[19rem] lg:top-[19.5rem]">
        <motion.div {...enter(0.55)} className="glass rounded-[1.35rem] p-5 animate-float">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-navy text-white">
              <Users className="size-4" />
            </span>
            <div>
              <p className="text-[0.9rem] font-bold leading-tight">Deployed team</p>
              <p className="text-caption text-ink-3">Pilot, day 12 of 45</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {team.map((initials, i) => (
              <span
                key={initials}
                className="-ml-2 first:ml-0 grid size-9 place-items-center rounded-full border-2 border-white bg-surface-3 text-[0.7rem] font-bold text-navy"
                style={{ zIndex: team.length - i }}
              >
                {initials}
              </span>
            ))}
            <span className="ml-3 text-small text-ink-2">3 roles live</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-3">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#2e6bff,#2bc4ec)]"
              initial={{ width: "0%" }}
              animate={{ width: "27%" }}
              transition={reduce ? { duration: 0 } : { duration: 1.1, ease: ease.out, delay: 1 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Guarantee chip */}
      <motion.div style={{ y: y3 }} className="absolute left-4 top-[26.5rem] sm:left-8 lg:top-[30rem]">
        <motion.div {...enter(0.75)} className="glass inline-flex items-center gap-2.5 rounded-full py-2.5 pl-3 pr-5 animate-float-slow">
          <CheckCircle2 className="size-5 text-green" />
          <span className="text-[0.9rem] font-semibold">Replacement guarantee active</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
