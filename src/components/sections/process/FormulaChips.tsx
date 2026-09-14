import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { pricing } from "@/lib/content";

const chip = "inline-flex items-center rounded-full px-4 py-2 text-small font-semibold leading-none whitespace-nowrap";

function Glyph({ children }: { readonly children: ReactNode }) {
  return <span className="w-3 text-center text-[1.05rem] font-semibold leading-none text-ink-3">{children}</span>;
}

/** The rate formula as chips, revealed one by one, ending in the navy result. */
export function FormulaChips() {
  return (
    <Reveal staggered as="ul" delay={0.2} className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-3">
      {pricing.components.map((component, i) => (
        <RevealItem key={component} as="li" className="flex items-center gap-2.5">
          {i > 0 ? <Glyph>+</Glyph> : null}
          <span className={`${chip} border border-line-2 bg-surface-2 text-ink`}>{component}</span>
        </RevealItem>
      ))}
      <RevealItem as="li" className="flex items-center gap-2.5">
        <Glyph>=</Glyph>
        <span className={`${chip} bg-navy text-white shadow-[0_10px_24px_-10px_rgba(10,38,71,0.6)]`}>{pricing.result}</span>
      </RevealItem>
    </Reveal>
  );
}
