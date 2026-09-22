import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type LogoProps = { readonly className?: string; readonly tone?: "light" | "dark" };

/** Simple text wordmark, shared by navigation and footer. */
export function Logo({ className, tone = "light" }: LogoProps) {
  const [a, b] = site.wordmark;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className={cn("font-extrabold tracking-[0.02em] text-[1.05rem] leading-none", tone === "light" ? "text-ink" : "text-white")}>
        {a} <span className={tone === "light" ? "text-blue" : "text-cyan"}>{b}</span>
      </span>
    </span>
  );
}
