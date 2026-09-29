import { LeadershipPortrait } from "@/components/sections/leadership/LeadershipPortrait";
import { Reveal } from "@/components/ui/Reveal";
import { foundingMembers } from "@/lib/content";

const copy = {
  heading: "Directors",
} as const;

/** The founding members under the founder: portrait, role and what each brings to Creston. */
export function FoundingMembers() {
  return (
    <div className="mt-16 lg:mt-24">
      <Reveal>
        <div className="flex flex-col gap-3 border-t border-white/10 pt-10">
          <h3 className="text-h3 text-white">{copy.heading}</h3>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {foundingMembers.map((member) => (
          <Reveal key={member.id} amount={0.15} className="h-full">
            <article
              aria-labelledby={`${member.id}-name`}
              className="flex h-full flex-col gap-6 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.05] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-[border-color,transform] duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-white/20 motion-reduce:transition-none"
            >
              <LeadershipPortrait src={member.photo} name={member.name} />
              <div className="min-w-0">
                <h4 id={`${member.id}-name`} className="text-h4 text-white">
                  {member.name}
                </h4>
                <p className="text-small mt-1 font-medium text-cyan">{member.role}</p>
                <p className="text-small mt-4 text-white/80">{member.summary}</p>
                <p className="text-small mt-3 text-white/70">{member.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
