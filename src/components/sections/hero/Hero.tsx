import { Container } from "@/components/ui/Container";
import { Orbs } from "@/components/ui/Orbs";
import { FloatingCards } from "@/components/sections/hero/FloatingCards";
import { HeroCopy } from "@/components/sections/hero/HeroCopy";
import { HeroBackdrop } from "@/components/sections/hero/HeroBackdrop";
import { StatsStrip } from "@/components/sections/hero/StatsStrip";

const heroOrbs = [
  "left-[-10rem] top-[30%] size-[30rem] bg-blue/30",
  "right-[8%] top-[-6rem] size-[26rem] bg-cyan/30",
  "right-[-8rem] bottom-[10%] size-[24rem] bg-violet/25",
] as const;

/**
 * Opening screen: a bright office behind a soft wash with colour orbs
 * drifting through it, the proposition on the left and product-like cards
 * floating on the right. The photo drifts and zooms as the page scrolls.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0" aria-hidden="true">
        <HeroBackdrop />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,248,252,0.96)_0%,rgba(246,248,252,0.9)_38%,rgba(246,248,252,0.5)_62%,rgba(246,248,252,0.25)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,248,252,0.85)_0%,rgba(246,248,252,0)_30%,rgba(246,248,252,0)_60%,rgba(246,248,252,1)_100%)]" />
        <div className="absolute inset-0 bg-mesh" />
        <Orbs orbs={heroOrbs} />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14 items-center">
          <div className="col-span-12 lg:col-span-6">
            <HeroCopy />
          </div>
          <div className="col-span-12 lg:col-span-6 lg:pl-8">
            <FloatingCards />
          </div>
        </div>
        <div className="mt-10 pb-8 md:mt-14 md:pb-10">
          <StatsStrip />
        </div>
      </Container>
    </section>
  );
}
