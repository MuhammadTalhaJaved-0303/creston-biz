import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PillProps = { readonly children: ReactNode; readonly className?: string; readonly tone?: "light" | "dark" };

/** Small rounded label with a gradient dot, used above section headings. */
export function Pill({ children, className, tone = "light" }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.8rem] font-semibold tracking-[0.01em]",
        tone === "light" ? "bg-surface/90 border-line text-ink-2 shadow-[0_1px_2px_rgba(11,28,51,0.05)]" : "bg-white/10 border-white/15 text-white/85",
        className,
      )}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)]" />
      {children}
    </span>
  );
}
