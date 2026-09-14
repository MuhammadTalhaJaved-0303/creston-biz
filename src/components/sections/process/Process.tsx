import { PricingPanel } from "@/components/sections/process/PricingPanel";
import { Stepper } from "@/components/sections/process/Stepper";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const copy = {
  label: "Process",
  title: ["From first call to monthly report", "in six steps."],
  lede: "The same stages apply whether you outsource one role or the whole office. Each stage closes with a document you can hold.",
} as const;

/**
 * Process and pricing: the six stages on a scroll-drawn rail, then the
 * published rate formula in a gradient-ringed panel.
 */
export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative overflow-hidden border-y border-line bg-surface py-[var(--spacing-section)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-dots opacity-70 [mask-image:radial-gradient(55%_50%_at_50%_45%,#000_0%,transparent_100%)]"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            id="process-title"
            label={copy.label}
            title={
              <>
                {copy.title[0]} {copy.title[1]}
              </>
            }
            lede={copy.lede}
          />
        </Reveal>

        <div className="mt-14 md:mt-16">
          <Stepper />
        </div>

        <PricingPanel />
      </Container>
    </section>
  );
}
