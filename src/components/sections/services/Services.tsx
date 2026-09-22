import { ServiceTile } from "@/components/sections/services/ServiceTile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/lib/content";

/** Three service pillars in the order supplied in the content brief. */
export function Services() {
  return (
    <section id="services" className="relative py-[var(--spacing-section)]" aria-labelledby="services-title">
      <Container>
        <Reveal>
          <SectionHeader
            id="services-title"
            label="Services"
            title={<>Everything your office needs, <span className="text-gradient">under one contract.</span></>}
            lede="Three business functions, each backed by professional coordination and one accountable partner."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:mt-16 md:gap-8">
          {services.map((service) => (
            <Reveal key={service.id}>
              <ServiceTile service={service} />
            </Reveal>
          ))}
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
