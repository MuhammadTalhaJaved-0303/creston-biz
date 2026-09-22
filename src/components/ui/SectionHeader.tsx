import type { ReactNode } from "react";
import { Pill } from "@/components/ui/Pill";
import { WordReveal } from "@/components/ui/WordReveal";
import { cn } from "@/lib/cn";
import { headingTokens } from "@/lib/headingTokens";

type SectionHeaderProps = {
  readonly label: string;
  readonly title: ReactNode;
  readonly lede?: ReactNode;
  readonly align?: "left" | "center";
  readonly tone?: "light" | "dark";
  readonly className?: string;
  readonly id?: string;
};

/** Pill label, heading (words rise into view) and lede that open every section. */
export function SectionHeader({ label, title, lede, align = "left", tone = "light", className, id }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start", className)}>
      <Pill tone={dark ? "dark" : "light"}>{label}</Pill>
      <h2 id={id} className={cn("text-h2 max-w-[18ch]", dark ? "text-white" : "text-ink")}>
        <WordReveal tokens={headingTokens(title)} />
      </h2>
      {lede ? <p className={cn("text-lede max-w-[56ch]", dark ? "text-white/70" : "text-ink-2")}>{lede}</p> : null}
    </div>
  );
}
