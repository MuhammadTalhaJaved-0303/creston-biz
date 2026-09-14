import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type LogoProps = { readonly className?: string; readonly tone?: "light" | "dark"; readonly size?: "sm" | "md" };

/** Mark plus wordmark. The mark is a rounded gradient tile with the initial. */
export function Logo({ className, tone = "light", size = "md" }: LogoProps) {
  const [a, b] = site.wordmark;
  const box = size === "sm" ? "size-8 rounded-[10px] text-[0.95rem]" : "size-9 rounded-[11px] text-[1.05rem]";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "grid place-items-center font-extrabold text-white bg-[linear-gradient(135deg,#2e6bff_0%,#123a6b_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_16px_-6px_rgba(46,107,255,0.6)]",
          box,
        )}
      >
        C
      </span>
      <span className={cn("font-extrabold tracking-[0.02em] text-[1.05rem] leading-none", tone === "light" ? "text-ink" : "text-white")}>
        {a} <span className={tone === "light" ? "text-blue" : "text-cyan"}>{b}</span>
      </span>
    </span>
  );
}
