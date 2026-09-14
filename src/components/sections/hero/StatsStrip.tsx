import { StatCounter } from "@/components/sections/hero/StatCounter";
import { stats } from "@/lib/content";

/** Four proof points under the hero, the only place numbers appear. */
export function StatsStrip() {
  return (
    <dl className="glass grid grid-cols-2 gap-y-6 rounded-[1.5rem] px-6 py-6 md:grid-cols-4 md:px-8">
      {stats.map((stat, i) => (
        <div key={stat.label} className={i > 0 ? "md:border-l md:border-line md:pl-6" : ""}>
          <div className="flex flex-col-reverse gap-1.5">
            <dt className="text-small text-ink-2 max-w-[18ch]">{stat.label}</dt>
            <dd>
              <StatCounter stat={stat} />
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
