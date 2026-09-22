"use client";

import { motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { LottieIcon } from "@/components/ui/LottieIcon";
import { Button } from "@/components/ui/Button";
import { contactCopy } from "@/lib/content";
import { ease } from "@/lib/motion";
import { successAnimation } from "@/lottie";

type InquirySuccessProps = {
  readonly onReset: () => void;
};

const RESET_LABEL = "Send another";

/** Replaces the form once an inquiry is accepted. */
export function InquirySuccess({ onReset }: InquirySuccessProps) {
  const reduce = useReducedMotion();
  const pop = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 22, delay: 0.1 };
  const fade = (delay: number) => (reduce ? { duration: 0 } : { duration: 0.6, ease: ease.out, delay });

  return (
    <div className="flex h-full flex-col items-center justify-center py-8 text-center md:py-12" role="status" aria-live="polite">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={pop}
        className="grid size-28 place-items-center rounded-full bg-surface-2"
      >
        <LottieIcon data={successAnimation} play className="size-24" />
      </motion.span>

      <motion.h3 className="text-h3 mt-7 text-ink" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fade(0.2)}>
        {contactCopy.success.heading}
      </motion.h3>

      <motion.p
        className="text-body mt-3 max-w-[38ch] text-ink-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={fade(0.3)}
      >
        {contactCopy.success.body}
      </motion.p>

      <motion.div className="mt-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fade(0.4)}>
        <Button variant="ghost" onClick={onReset}>
          <RotateCcw aria-hidden="true" className="size-4" strokeWidth={1.75} />
          {RESET_LABEL}
        </Button>
      </motion.div>
    </div>
  );
}
