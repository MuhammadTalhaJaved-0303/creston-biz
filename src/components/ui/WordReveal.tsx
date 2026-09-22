"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";
import type { HeadingToken } from "@/lib/headingTokens";
import { ease, viewportOnce } from "@/lib/motion";

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: (reduce: boolean) => ({ y: 0, transition: reduce ? { duration: 0 } : { duration: 0.75, ease: ease.out } }),
};

const lineVariants: Variants = {
  hidden: {},
  show: (reduce: boolean) => ({ transition: reduce ? { staggerChildren: 0 } : { staggerChildren: 0.045, delayChildren: 0.05 } }),
};

function Word({ text, gradient }: { readonly text: string; readonly gradient: boolean }) {
  return (
    <span className="-mb-[0.16em] -mt-[0.06em] inline-block overflow-hidden pb-[0.16em] pt-[0.06em] align-bottom">
      <motion.span variants={wordVariants} className={cn("inline-block", gradient && "text-gradient")}>
        {text}
      </motion.span>
    </span>
  );
}

/** Heading words that rise into place one after another the first time they scroll into view. */
export function WordReveal({ tokens }: { readonly tokens: ReadonlyArray<HeadingToken> }) {
  const reduce = useReducedMotion() === true;
  return (
    <motion.span variants={lineVariants} custom={reduce} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {tokens.map((token, i) => {
        if (token.kind === "space") return " ";
        if (token.kind === "break") return <br key={i} />;
        return <Word key={i} text={token.text} gradient={token.gradient} />;
      })}
    </motion.span>
  );
}
