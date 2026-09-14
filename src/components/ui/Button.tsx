import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-[var(--ease-out)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(180deg,#143f74_0%,#0a2647_100%)] shadow-[var(--shadow-btn)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_16px_32px_-12px_rgba(46,107,255,0.55)]",
  secondary:
    "text-ink bg-surface border border-line-2 shadow-[0_1px_2px_rgba(11,28,51,0.06)] hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_12px_28px_-12px_rgba(11,28,51,0.25)]",
  ghost: "text-ink-2 hover:text-ink hover:bg-surface-2",
};

type Common = { readonly variant?: Variant; readonly size?: Size; readonly arrow?: boolean; readonly children: ReactNode };

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover/btn:translate-x-0.5"
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & Common;

export function ButtonLink({ variant = "primary", size = "md", arrow = false, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & Common;

export function Button({ variant = "primary", size = "md", arrow = false, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
