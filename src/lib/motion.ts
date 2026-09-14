/** Shared motion vocabulary so the whole page moves with one character. */
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
} as const;

export const duration = { quick: 0.3, base: 0.6, slow: 0.9 } as const;

export const viewportOnce = { once: true, amount: 0.3 } as const;

/** Standard entrance: fade and rise. Use with Reveal or motion variants. */
export const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
} as const;

export const stagger = (delay = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
});
