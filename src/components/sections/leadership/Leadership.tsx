import { UsersRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExperienceRows } from "@/components/sections/leadership/ExperienceRows";
import { FoundingMembers } from "@/components/sections/leadership/FoundingMembers";
import { FounderCard } from "@/components/sections/leadership/FounderCard";
import { founder } from "@/lib/content";

/**
 * Navy band introducing the founder: a tilted portrait with a caption card
 * on the left, the bio and the organisations he has worked with on the right,
 * then the two founding members.
 */
export function Leadership() {
  return (
    <section id="leadership" className="relative overflow-clip bg-navy py-[var(--spacing-section)] text-white">
      {/* Mesh glow, footer style, then a faint white dot grid fading towards the edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(44rem_26rem_at_10%_0%,rgba(46,107,255,0.28),transparent_60%),radial-gradient(36rem_24rem_at_92%_100%,rgba(43,196,236,0.2),transparent_60%),radial-gradient(30rem_22rem_at_55%_60%,rgba(124,107,255,0.1),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[22px_22px] [mask-image:radial-gradient(70rem_46rem_at_50%_45%,#000_30%,transparent_80%)]"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            tone="dark"
            label="Leadership"
            title={
              <>
                Led by someone who has run the function, not just sold it.
              </>
            }
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-16 lg:mt-20">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <Reveal className="md:sticky md:top-28">
              <FounderCard />
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-7 lg:pl-6 xl:pl-10">
            <Reveal staggered className="flex flex-col gap-6">
              {founder.bio.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <p className="text-body max-w-[62ch] text-white/75">{paragraph}</p>
                </RevealItem>
              ))}

              <RevealItem className="mt-2">
                <ExperienceRows />
              </RevealItem>

              <RevealItem>
                <p className="flex max-w-[64ch] items-start gap-2.5 text-caption text-white/70 [text-wrap:pretty]">
                  <UsersRound aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white/60" strokeWidth={1.75} />
                  <span>{founder.teamNote}</span>
                </p>
              </RevealItem>
            </Reveal>
          </div>
        </div>

        <FoundingMembers />
      </Container>
    </section>
  );
}
