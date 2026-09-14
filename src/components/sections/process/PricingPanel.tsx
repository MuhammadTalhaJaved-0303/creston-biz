import { Calculator } from "lucide-react";
import { FormulaChips } from "@/components/sections/process/FormulaChips";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { pricing } from "@/lib/content";

/**
 * The pricing panel under the stepper: heading and lede on the left, the
 * note and rate-build call to action on the right, and the formula as a
 * full-width row of chips beneath both.
 */
export function PricingPanel() {
  return (
    <Reveal className="mt-20">
      <div className="card ring-gradient relative overflow-hidden border-transparent p-6 sm:p-8 lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-36 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(43,196,236,0.18),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/4 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(46,107,255,0.1),transparent_62%)]"
        />

        <div className="relative grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 lg:col-span-7 lg:pr-6">
            <Pill>{pricing.label}</Pill>
            <h3 className="text-h3 mt-5 text-ink">{pricing.heading}</h3>
            <p className="text-lede mt-4 max-w-[46ch] text-ink-2">{pricing.lede}</p>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="flex h-full flex-col gap-5 rounded-[var(--radius-tile)] border border-line bg-surface-2 p-6 sm:flex-row sm:items-start lg:flex-col">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white shadow-[0_10px_24px_-10px_rgba(46,107,255,0.7)]">
                <Calculator aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <div className="flex flex-1 flex-col">
                <p className="text-body text-ink-2">{pricing.note}</p>
                <div className="mt-6">
                  <ButtonLink href="#contact" size="lg" arrow>
                    {pricing.cta}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 border-t border-line pt-8">
            <p className="text-caption font-semibold uppercase tracking-[0.08em] text-ink-2">How the rate is built</p>
            <FormulaChips />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
