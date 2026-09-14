import { cn } from "@/lib/cn";
import type { Layer } from "@/lib/content";

type LayerListProps = {
  readonly layers: ReadonlyArray<Layer>;
  readonly active: number;
  readonly onSelect?: (index: number) => void;
};

/** The five layers as a vertical index. The active one opens to show its body. */
export function LayerList({ layers, active, onSelect }: LayerListProps) {
  return (
    <ol className="mt-8 flex flex-col gap-2">
      {layers.map((layer, i) => {
        const isActive = i === active;
        return (
          <li key={layer.id}>
            <button
              type="button"
              onClick={() => onSelect?.(i)}
              aria-current={isActive ? "step" : undefined}
              className={cn(
                "w-full rounded-2xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow] duration-400",
                isActive ? "card border-line-2" : "border-transparent hover:bg-surface-2/70",
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-[0.75rem] font-bold",
                    isActive ? "bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white" : "bg-surface-2 text-ink-2",
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("text-[1.02rem] font-bold", isActive ? "text-ink" : "text-ink-2")}>{layer.title}</span>
              </span>
              <span
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-out)]",
                  isActive ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <span className="overflow-hidden">
                  <span className="block pl-10 text-small text-ink-2">{layer.body}</span>
                  <span className="mt-2.5 flex flex-wrap gap-1.5 pl-10">
                    {layer.items.map((item) => (
                      <span key={item} className="rounded-full bg-surface-2 px-2.5 py-1 text-caption font-semibold text-ink-2">
                        {item}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
