"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { PlateContent } from "@/components/sections/stack/PlateContent";
import { cn } from "@/lib/cn";
import type { Layer } from "@/lib/content";

export const PLATE = { w: 380, h: 250 } as const;
const GAP_MIN = 14;
const GAP_MAX = 76;

type PlateProps = {
  readonly layer: Layer;
  readonly index: number;
  readonly explode: MotionValue<number>;
  readonly active: boolean;
};

/** One layer of the stack. Its height above the base follows the explode value. */
export function Plate({ layer, index, explode, active }: PlateProps) {
  const z = useTransform(explode, (v) => index * (GAP_MIN + v * (GAP_MAX - GAP_MIN)));
  return (
    <motion.div
      style={{ z, width: PLATE.w, height: PLATE.h, transformStyle: "preserve-3d" }}
      className="absolute left-0 top-0"
      aria-hidden="true"
    >
      <div
        className={cn(
          "relative h-full w-full rounded-[20px] border bg-white p-5 transition-[box-shadow,border-color,opacity] duration-500",
          active
            ? "border-blue/40 shadow-[0_40px_80px_-24px_rgba(46,107,255,0.45),0_0_0_4px_rgba(46,107,255,0.10)]"
            : "border-line shadow-[0_24px_60px_-28px_rgba(11,28,51,0.35)] opacity-95",
        )}
      >
        <span
          className={cn(
            "absolute -left-3 -top-3 grid size-8 place-items-center rounded-full border-2 border-white text-[0.75rem] font-bold shadow-sm",
            active ? "bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white" : "bg-surface-2 text-ink-2",
          )}
        >
          {index + 1}
        </span>
        <PlateContent layer={layer} />
      </div>
    </motion.div>
  );
}
