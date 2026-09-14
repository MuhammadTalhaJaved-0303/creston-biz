import { HighlightTile } from "@/components/sections/services/HighlightTile";
import { ServiceTile, type TileLayout } from "@/components/sections/services/ServiceTile";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { highlights, services, type Service } from "@/lib/content";

type Placement = { readonly layout: TileLayout; readonly className: string };

/** Bento placement: 7/5 on the first band, 5/7 on the second. Two columns on tablet, one on phone. */
const placements: Record<Service["id"], Placement> = {
  "office-operations": { layout: "band", className: "md:col-span-2 xl:col-span-7 xl:row-span-2" },
  workforce: { layout: "cornerRight", className: "xl:col-span-5 xl:row-span-2" },
  facilities: { layout: "cornerLeft", className: "xl:col-span-5 xl:row-span-2" },
};

/**
 * The three managed functions as a bento: two photo tiles up top, the
 * facilities tile and four highlight tiles below.
 */
export function Services() {
  return (
    <section id="services" className="relative py-[var(--spacing-section)]" aria-labelledby="services-title">
      <Container>
        <Reveal>
          <SectionHeader
            id="services-title"
            label="Services"
            title={
              <>
                Everything your office needs, <span className="text-gradient">under one contract.</span>
              </>
            }
            lede="Three managed functions, each backed by the same reporting and service-level standard."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 xl:auto-rows-[minmax(15rem,auto)] xl:grid-cols-12">
          {services.map((service, index) => {
            const placement = placements[service.id];
            return (
              <Reveal key={service.id} staggered delay={index * 0.08} className={placement.className}>
                <RevealItem className="h-full">
                  <ServiceTile service={service} layout={placement.layout} />
                </RevealItem>
              </Reveal>
            );
          })}

          <Reveal staggered className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-2 xl:col-span-7 xl:row-span-2">
            {highlights.map((highlight) => (
              <RevealItem key={highlight.title} className="h-full">
                <HighlightTile highlight={highlight} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
