import Image from "next/image";
import { MapPin } from "lucide-react";
import { IndustryCard } from "@/components/sections/industries/IndustryCard";
import { Container } from "@/components/ui/Container";
import { Orbs } from "@/components/ui/Orbs";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { industries } from "@/lib/content";

const copy = {
  label: "Industries",
  title: ["Built for teams that", "outgrew informal support."],
  lede: "From a single reception desk to a multi-site programme office, the model is the same: a confirmed requirement, a deployed team and a monthly report.",
  photoCaption: "On site across Punjab",
  note: "Priority focus marks where new engagements start first.",
} as const;

const orbs = [
  "left-[-10rem] top-[30%] size-[30rem] bg-violet/20",
  "right-[-8rem] top-[-4rem] size-[26rem] bg-cyan/25",
] as const;

/** Columns on the widest layout; the entrance cascade restarts on each row. */
const columns = 3;
const cascade = 0.1;

/**
 * Six industry tiles in a 3x2 grid (2 columns on tablet, 1 on phone),
 * centred heading above and a single legend line below. Each tile owns
 * its entrance so a phone reader sees cards as they arrive, not after a
 * third of the whole list has scrolled past.
 */
export function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-heading" className="bg-ground-industries relative overflow-hidden py-[var(--spacing-section)]">
      <Orbs orbs={orbs} />
      <Container className="relative">
        <div className="grid grid-cols-12 items-center gap-x-6 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-7">
            <SectionHeader
              id="industries-heading"
              label={copy.label}
              lede={copy.lede}
              title={
                <>
                  {copy.title[0]} <span className="text-gradient">{copy.title[1]}</span>
                </>
              }
            />
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-5" delay={0.1}>
            <div className="card card-hover relative mx-auto aspect-[4/3] max-w-[34rem] overflow-hidden lg:aspect-[5/4]">
              <Image
                src="/images/tiles/atrium.jpg"
                alt="A bright office atrium with a colleague walking through"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-[50%_35%]"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(11,28,51,0.55))]" />
              <span className="glass absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full py-2 pl-3 pr-4 text-[0.85rem] font-semibold text-ink">
                <MapPin aria-hidden="true" className="size-4 text-blue" />
                {copy.photoCaption}
              </span>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-12 gap-6 md:mt-16">
          {industries.map((industry, i) => (
            <Reveal
              key={industry.name}
              staggered
              as="li"
              delay={(i % columns) * cascade}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <RevealItem className="h-full">
                <IndustryCard industry={industry} />
              </RevealItem>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <p className="mt-10 flex items-center justify-center gap-2.5 text-center text-small text-ink-3">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)]" />
            {copy.note}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
