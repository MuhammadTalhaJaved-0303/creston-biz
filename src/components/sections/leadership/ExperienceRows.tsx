import { Building2, HandCoins, Landmark } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { founder } from "@/lib/content";

type Row = { readonly label: string; readonly icon: LucideIcon; readonly items: ReadonlyArray<string> };

const rows: ReadonlyArray<Row> = [
  { label: "Donors", icon: HandCoins, items: founder.experience.donors },
  { label: "Government", icon: Landmark, items: founder.experience.government },
  { label: "Organisations", icon: Building2, items: founder.experience.organisations },
];

/**
 * Frosted navy panel listing the donors, agencies and organisations the founder
 * has worked with directly, one labelled row of chips per group.
 */
export function ExperienceRows() {
  return (
    <div className="@container rounded-[var(--radius-card)] border border-white/10 bg-white/[0.05] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_60px_-24px_rgba(0,0,0,0.5)] motion-reduce:transition-none md:p-7">
      <h3 className="text-h4 text-white">{founder.experience.label}</h3>
      <dl className="mt-4 divide-y divide-white/10">
        {rows.map(({ label, icon: Icon, items }) => (
          <div key={label} className="grid gap-x-6 gap-y-2.5 py-4 first:pt-0 last:pb-0 @md:grid-cols-[8.5rem_minmax(0,1fr)] @md:items-start">
            <dt className="flex items-center gap-2 pt-1.5 text-caption font-bold uppercase tracking-[0.12em] text-white/65">
              <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
              {label}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="inline-flex max-w-full items-center rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-center text-[0.8rem] font-medium leading-snug text-white/85 @md:px-3.5 @md:text-[0.85rem]"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
