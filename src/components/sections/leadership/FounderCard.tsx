import { GraduationCap } from "lucide-react";
import { LeadershipPortrait } from "@/components/sections/leadership/LeadershipPortrait";
import { founder } from "@/lib/content";

/**
 * The founder uses the same portrait frame as the founding members.
 * Keep the caption below the photo so it cannot obscure the portrait.
 */
export function FounderCard() {
  return (
    <div className="relative w-full max-w-[370px] rounded-[var(--radius-card)] border border-white/10 bg-white/[0.05] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <LeadershipPortrait src={founder.photo.portrait} name={founder.name} />
      <div className="mt-6">
        <h3 className="text-h4 text-white">{founder.name}</h3>
        <p className="text-small mt-0.5 font-medium text-cyan">{founder.role}</p>
        <ul className="mt-3.5 flex flex-col gap-1.5 border-t border-white/10 pt-3.5">
          {founder.education.map((line) => (
            <li key={line} className="flex items-start gap-2 text-caption text-white/60">
              <GraduationCap aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-cyan/80" strokeWidth={1.75} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
