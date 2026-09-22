import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { ribbon, services } from "@/lib/content";

/** The outcomes list twice over so the marquee loops without a seam. */
const track = [...ribbon.outcomes, ...ribbon.outcomes];

/**
 * Full-bleed gradient band under the bento: the proposition, one line per
 * service, and a slow marquee of the outcomes a client actually notices.
 */
export function ValueRibbon() {
  return (
    <div className="bg-band relative mt-16 overflow-hidden text-white md:mt-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] bg-size-[18px_18px] [mask-image:linear-gradient(90deg,transparent,#000_30%,#000_70%,transparent)]"
      />
      <Container className="relative py-12 md:py-16">
        <Reveal>
          <Pill tone="dark">Why one partner</Pill>
          <h3 className="text-h2 mt-5 max-w-[22ch]">{ribbon.heading}</h3>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="border-t border-white/25 pt-4">
                <h4 className="text-h4 text-white">{service.name}</h4>
                <p className="text-body mt-2 text-white/80">{service.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
      <div className="marquee relative border-t border-white/15 py-4">
        <div className="animate-marquee flex w-max gap-3 pr-3">
          {track.map((item, i) => (
            <span
              key={`${item}-${i}`}
              aria-hidden={i >= ribbon.outcomes.length ? true : undefined}
              className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-4 py-2 text-small font-semibold backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
