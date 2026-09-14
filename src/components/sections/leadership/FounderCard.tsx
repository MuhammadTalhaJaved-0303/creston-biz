import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { founder } from "@/lib/content";

/**
 * The founder portrait in a gradient-ringed frame, tilted a couple of
 * degrees, with a navy caption card overlapping its bottom-right corner.
 * The frame settles level and the photo eases in slightly on hover.
 */
export function FounderCard() {
  return (
    <div className="relative w-full max-w-[22rem] pb-24 sm:pb-20 lg:max-w-[24rem]">
      {/* Glow behind the frame. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -rotate-2 rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(46,107,255,0.55),rgba(43,196,236,0.35)_55%,rgba(124,107,255,0.4))] opacity-70 blur-3xl"
      />

      {/* Portrait frame. */}
      <div className="group relative aspect-[4/5] -rotate-2 rounded-[var(--radius-card)] ring-gradient shadow-[0_40px_90px_-30px_rgba(46,107,255,0.7),0_20px_40px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:rotate-0 motion-reduce:transition-none">
        <div className="absolute inset-px overflow-hidden rounded-[calc(var(--radius-card)-1px)] bg-navy-2">
          <Image
            src={founder.photo.portrait}
            alt={`Portrait of ${founder.name}`}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 22rem, 90vw"
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          {/* Soft navy fade at the foot so the caption card sits on a calm ground. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,rgba(10,38,71,0)_0%,rgba(10,38,71,0.55)_100%)]"
          />
          {/* Hairline highlight along the top edge. */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/30" />
        </div>
      </div>

      {/* Caption card, white on navy, overlapping the frame. */}
      <div className="absolute bottom-0 right-0 w-[min(20rem,100%)] rounded-[var(--radius-tile)] border border-white/12 bg-[linear-gradient(180deg,#143f74_0%,#0a2647_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),var(--shadow-float)] sm:-right-6 md:right-0 lg:-right-6">
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
