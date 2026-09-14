import { Container } from "@/components/ui/Container";
import { FloatingCards } from "@/components/sections/hero/FloatingCards";
import { HeroCopy } from "@/components/sections/hero/HeroCopy";
import { HeroVideo } from "@/components/sections/hero/HeroVideo";
import { StatsStrip } from "@/components/sections/hero/StatsStrip";

/**
 * Opening screen: a bright office in motion behind a white wash, the
 * proposition on the left and product-like cards floating on the right.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0" aria-hidden="true">
        <HeroVideo />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,248,252,0.98)_0%,rgba(246,248,252,0.94)_38%,rgba(246,248,252,0.6)_62%,rgba(246,248,252,0.35)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,248,252,0.9)_0%,rgba(246,248,252,0)_30%,rgba(246,248,252,0)_60%,rgba(246,248,252,1)_100%)]" />
        <div className="absolute inset-0 bg-mesh" />
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
