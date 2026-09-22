"use client";

import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { LottieData } from "@/lottie";

const Player = dynamic(() => import("@/components/ui/LottiePlayer").then((module) => module.LottiePlayer), { ssr: false });

type LottieIconProps = {
  readonly data: LottieData;
  /** Plays from the first frame once this becomes true. */
  readonly play: boolean;
  readonly className?: string;
  /** Accessible name; leave out for purely decorative icons. */
  readonly label?: string;
};

/**
 * One of the generated Lottie icons: plays once when asked, again on hover,
 * and sits fully drawn for readers who prefer reduced motion.
 */
export function LottieIcon({ data, play, className, label }: LottieIconProps) {
  const reduce = useReducedMotion() === true;
  const [hovers, setHovers] = useState(0);
  const token = play ? hovers + 1 : 0;

  return (
    <span
      className={cn("block", className)}
      onPointerEnter={() => setHovers((count) => count + 1)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Player data={data} token={token} reduce={reduce} />
    </span>
  );
}
