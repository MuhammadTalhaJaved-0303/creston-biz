import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: ElementType;
  /** Wider measure for full-bleed compositions (diagrams, rails). */
  readonly wide?: boolean;
};

/** Page measure: 1320px, with fluid side gutters that never collapse below 20px. */
export function Container({ children, className, as: Tag = "div", wide = false }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[var(--spacing-gutter)]",
        wide ? "max-w-[96rem]" : "max-w-[var(--container-site)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
