"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { hero } from "@/lib/content";
import { ease } from "@/lib/motion";
import { primaryCta, secondaryCta } from "@/lib/site";

/** Entrance for the hero copy: label, headline, lede, actions, in sequence. */
export function HeroCopy() {
  const reduce = useReducedMotion();
  const t = (delay: number) => (reduce ? { duration: 0 } : { duration: 0.8, ease: ease.out, delay });
  const from = { opacity: 0, y: 18 };
  const to = { opacity: 1, y: 0 };

  return (
    <div className="max-w-[40rem]">
      <motion.div initial={from} animate={to} transition={t(0.05)}>
        <Pill>{hero.label}</Pill>
      </motion.div>

      <motion.h1 className="text-h1 text-ink mt-6" initial={from} animate={to} transition={t(0.15)}>
        {hero.headline[0]}
        <br />
        <span className="text-gradient">{hero.headline[1]}</span>
      </motion.h1>

      <motion.p className="text-lede text-ink-2 mt-6 max-w-[34rem]" initial={from} animate={to} transition={t(0.3)}>
        {hero.lede}
      </motion.p>

      <motion.div className="mt-8 flex flex-wrap items-center gap-3" initial={from} animate={to} transition={t(0.42)}>
        <ButtonLink href={primaryCta.href} size="lg" arrow>
          {primaryCta.label}
        </ButtonLink>
        <ButtonLink href={secondaryCta.href} size="lg" variant="secondary">
          {secondaryCta.label}
        </ButtonLink>
      </motion.div>

      <motion.p className="mt-7 inline-flex items-center gap-2 text-small text-ink-3" initial={from} animate={to} transition={t(0.55)}>
        <MapPin aria-hidden="true" className="size-4 text-blue" />
        {hero.trust}
      </motion.p>
    </div>
  );
}
