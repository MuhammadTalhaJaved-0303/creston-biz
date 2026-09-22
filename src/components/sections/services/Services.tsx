import { ServiceTile, type TileLayout } from "@/components/sections/services/ServiceTile";
import { ValueRibbon } from "@/components/sections/services/ValueRibbon";
import { Container } from "@/components/ui/Container";
import { Orbs } from "@/components/ui/Orbs";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services, type Service } from "@/lib/content";

type Placement = { readonly layout: TileLayout; readonly className: string };

/**
 * Bento placement: facilities stands tall on the left (7 of 12 columns),
 * office operations and events stack on the right (5 columns each).
 * Two columns on tablet, one on phone.
 */
const placements: Record<Service["id"], Placement> = {
  facilities: { layout: "band", className: "md:col-span-2 xl:col-span-7 xl:row-span-2" },
  "office-operations": { layout: "cornerRight", className: "xl:col-span-5" },
  events: { layout: "cornerLeft", className: "xl:col-span-5" },
};

const orbs = [
  "left-[-8rem] top-[6%] size-[28rem] bg-blue/25",
  "right-[-10rem] top-[38%] size-[32rem] bg-cyan/25",
  "left-[30%] bottom-[18%] size-[22rem] bg-violet/20",
] as const;

/** The three service pillars as a bento on a tinted ground, closed by the value ribbon. */
export function Services() {
  return (
    <section id="services" className="bg-ground-services relative overflow-hidden pt-[var(--spacing-section)]" aria-labelledby="services-title">
      <Orbs orbs={orbs} />
      <Container className="relative">
        <Reveal>
          <SectionHeader
            id="services-title"
            label="Services"
            title={
              <>
                Everything your office needs, <span className="text-gradient">under one contract.</span>
              </>
            }
            lede="Three business functions, each backed by professional coordination and one accountable partner."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 xl:grid-cols-12">
          {services.map((service, index) => {
            const placement = placements[service.id];
            return (
              <Reveal key={service.id} staggered delay={index * 0.08} amount={0.1} className={placement.className}>
                <RevealItem className="h-full">
                  <ServiceTile service={service} layout={placement.layout} />
                </RevealItem>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <ValueRibbon />
    </section>
  );
}
