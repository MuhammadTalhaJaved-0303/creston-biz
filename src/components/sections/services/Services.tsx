import { ServiceTile, type TileLayout } from "@/components/sections/services/ServiceTile";
import { Container } from "@/components/ui/Container";
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

/** The three service pillars as a bento, followed by the value proposition band. */
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
            lede="Three business functions, each backed by professional coordination and one accountable partner."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 xl:grid-cols-12">
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
        </div>

        <Reveal>
          <div className="mt-10 rounded-[var(--radius-card)] bg-navy p-6 text-white md:p-10">
            <p className="text-caption font-semibold uppercase tracking-[0.12em] text-white/70">Creston&apos;s value proposition</p>
            <h3 className="text-h3 mt-3 max-w-[40ch]">One Partner. Three Business Functions. One Integrated Solution.</h3>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <div key={service.id} className="border-t border-white/25 pt-4">
                  <h4 className="font-semibold">{service.name}</h4>
                  <p className="text-small mt-2 text-white/75">{service.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
