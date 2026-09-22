import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { foundingMembers } from "@/lib/content";

const copy = {
  heading: "Founding members",
  lede: "Two founding members set the company's direction alongside Hasan, bringing technology, training and business growth to the model.",
} as const;

/** The founding members under the founder: portrait, role and what each brings to Creston. */
export function FoundingMembers() {
  return (
    <div className="mt-16 lg:mt-24">
      <Reveal>
        <div className="flex flex-col gap-3 border-t border-white/10 pt-10">
          <h3 className="text-h3 text-white">{copy.heading}</h3>
          <p className="text-body max-w-[60ch] text-white/70">{copy.lede}</p>
        </div>
      </Reveal>

      <Reveal staggered className="mt-10 grid gap-6 lg:grid-cols-2">
        {foundingMembers.map((member) => (
          <RevealItem key={member.id} className="h-full">
            <article
              aria-labelledby={`${member.id}-name`}
              className="flex h-full flex-col gap-6 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.05] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-[border-color,transform] duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-white/20 motion-reduce:transition-none sm:flex-row md:p-7"
            >
              <div className="ring-gradient relative aspect-[4/5] w-40 shrink-0 overflow-hidden rounded-[var(--radius-tile)] sm:w-44 lg:w-48">
                <Image
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(min-width: 1024px) 12rem, (min-width: 640px) 11rem, 10rem"
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <h4 id={`${member.id}-name`} className="text-h4 text-white">
                  {member.name}
                </h4>
                <p className="text-small mt-1 font-medium text-cyan">{member.role}</p>
                <p className="text-small mt-4 text-white/80">{member.summary}</p>
                <p className="text-small mt-3 text-white/70">{member.bio}</p>
                <Link href={`/cards/${member.id}`} className="mt-5 inline-flex min-h-11 items-center text-small font-semibold text-cyan underline underline-offset-4">View business card</Link>
              </div>
            </article>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}
