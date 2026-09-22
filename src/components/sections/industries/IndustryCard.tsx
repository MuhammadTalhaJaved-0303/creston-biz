"use client";

import { industryIcons } from "@/components/sections/industries/icons";
import { cn } from "@/lib/cn";
import type { Industry, Priority } from "@/lib/content";
import { useSpotlight } from "@/lib/useSpotlight";

const gradient = "bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)]";
const chipGradient = "bg-[linear-gradient(135deg,#1f55d6,#0a2647)]";

type PriorityStyle = {
  /** The status chip in the top-right corner. */
  readonly chip: string;
  /** The icon chip, stepping down from gradient to navy to soft as priority falls. */
  readonly icon: string;
  /** Priority focus tiles get a gradient hairline and a corner glow so they read first. */
  readonly featured: boolean;
};

const priorityStyles: Readonly<Record<Priority, PriorityStyle>> = {
  "Priority focus": {
    chip: cn(chipGradient, "text-white shadow-[0_8px_18px_-8px_rgba(46,107,255,0.7)]"),
    icon: cn(gradient, "text-white shadow-[0_10px_20px_-8px_rgba(46,107,255,0.6)]"),
    featured: true,
  },
  Active: {
    chip: "bg-surface-2 text-ink-2",
    icon: "bg-navy text-white shadow-[0_10px_20px_-8px_rgba(10,38,71,0.45)]",
    featured: false,
  },
  Selective: {
    chip: "border border-line-2 bg-surface text-ink-2",
    icon: "bg-surface-2 text-blue",
    featured: false,
  },
};

/** Gradient hairline drawn over the card edge. Sits outside the clipped layer so it covers the border. */
function FeaturedRing() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-[calc(var(--radius-card)+1px)]">
      <span className="ring-gradient block size-full rounded-[inherit]" />
    </span>
  );
}

/**
 * One industry tile: icon chip, priority chip, name and the need we meet.
 * The cursor lights the card and tilts it slightly (spotlight), the icon
 * nudges up and a gradient hairline draws along the bottom edge.
 */
export function IndustryCard({ industry }: { readonly industry: Industry }) {
  const Icon = industryIcons[industry.icon];
  const style = priorityStyles[industry.priority];
  const { ref: spotlightRef, onPointerMove, onPointerLeave } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={spotlightRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("group card spotlight flex h-full flex-col p-7", style.featured && "border-transparent hover:border-transparent")}
    >
      {/* Clipped decorative layer: corner glow and the hover hairline. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        {style.featured ? (
          <span className="absolute -right-16 -top-20 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(46,107,255,0.2),rgba(43,196,236,0.1)_50%,transparent_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        ) : null}
        <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#2e6bff,#2bc4ec)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100" />
      </span>
      {style.featured ? <FeaturedRing /> : null}

      <div className="relative flex items-center justify-between gap-4">
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-2xl transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:scale-105",
            style.icon,
          )}
        >
          <Icon aria-hidden="true" className="size-[22px]" strokeWidth={1.75} />
        </span>
        <span
          className={cn(
            "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1.5 text-[0.75rem] font-bold leading-none tracking-[0.01em]",
            style.chip,
          )}
        >
          {industry.priority}
        </span>
      </div>

      <h3 className="text-h4 relative mt-7 text-ink">{industry.name}</h3>
      <p className="text-body relative mt-2.5 text-ink-2">{industry.need}</p>
    </div>
  );
}
