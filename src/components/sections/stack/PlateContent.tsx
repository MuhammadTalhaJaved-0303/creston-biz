import { BadgeCheck, Building2, ClipboardCheck, FileSignature, ShieldCheck, Sparkles, Users, Wrench } from "lucide-react";
import type { Layer } from "@/lib/content";

const bars = [40, 62, 54, 78, 66, 90] as const;
const team = ["SA", "MK", "RH", "AN", "FZ"] as const;

/** Flat, icon-and-shape mini UI drawn on each plate. No text that must be read. */
export function PlateContent({ layer }: { readonly layer: Layer }) {
  switch (layer.id) {
    case "contract":
      return (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="grid size-9 place-items-center rounded-xl bg-navy text-white"><FileSignature className="size-4" /></span>
            <span className="rounded-full bg-green/10 px-2.5 py-1 text-[0.7rem] font-bold text-green">Signed</span>
          </div>
          <div className="space-y-2">
            <span className="block h-2 w-3/4 rounded bg-surface-3" />
            <span className="block h-2 w-full rounded bg-surface-3" />
            <span className="block h-2 w-5/6 rounded bg-surface-3" />
            <span className="block h-2 w-2/3 rounded bg-surface-3" />
          </div>
          <div className="flex items-end justify-between">
            <span className="h-7 w-24 rounded bg-[linear-gradient(90deg,#2e6bff,#2bc4ec)] opacity-80" />
            <span className="text-[0.7rem] font-bold text-ink-2">SLA agreed</span>
          </div>
        </div>
      );
    case "team":
      return (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white"><Users className="size-4" /></span>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[0.7rem] font-bold text-ink-2">5 roles</span>
          </div>
          <div className="flex items-center">
            {team.map((t, i) => (
              <span key={t} className="-ml-2 first:ml-0 grid size-10 place-items-center rounded-full border-2 border-white bg-surface-3 text-[0.7rem] font-bold text-navy" style={{ zIndex: team.length - i }}>
                {t}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((n) => (
              <span key={n} className="h-8 rounded-lg bg-surface-2" />
            ))}
          </div>
        </div>
      );
    case "compliance":
      return (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="grid size-9 place-items-center rounded-xl bg-navy text-white"><ShieldCheck className="size-4" /></span>
            <BadgeCheck className="size-6 text-green" />
          </div>
          <ul className="space-y-2.5">
            {["Payroll run", "EOBI filed", "PESSI filed"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="grid size-5 place-items-center rounded-full bg-green/15 text-green"><ClipboardCheck className="size-3" /></span>
                <span className="h-2 flex-1 rounded bg-surface-3" />
              </li>
            ))}
          </ul>
        </div>
      );
    case "reporting":
      return (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white"><Sparkles className="size-4" /></span>
            <span className="rounded-full bg-green/10 px-2.5 py-1 text-[0.7rem] font-bold text-green">98.4%</span>
          </div>
          <div className="flex h-16 items-end gap-1.5">
            {bars.map((h, i) => (
              <span key={i} className="flex-1 rounded-md bg-[linear-gradient(180deg,#2e6bff,#2bc4ec)]" style={{ height: `${h}%`, opacity: 0.5 + i * 0.08 }} />
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="grid size-9 place-items-center rounded-xl bg-navy text-white"><Building2 className="size-4" /></span>
            <Wrench className="size-5 text-ink-3" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <span key={n} className={`h-9 rounded-lg ${n % 3 === 0 ? "bg-[linear-gradient(135deg,#2e6bff33,#2bc4ec33)]" : "bg-surface-2"}`} />
            ))}
          </div>
        </div>
      );
  }
}
