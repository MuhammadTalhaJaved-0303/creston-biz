import type { Highlight } from "@/lib/content";
import { highlightIcons } from "@/components/sections/services/highlightIcons";

/** One reason to choose Creston Biz: icon chip on top, title and body at the foot. */
export function HighlightTile({ highlight }: { readonly highlight: Highlight }) {
  const Icon = highlightIcons[highlight.icon];
  return (
    <article className="card card-hover relative flex h-full flex-col justify-between gap-6 overflow-hidden p-6 md:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 size-44 rounded-full bg-[radial-gradient(circle,rgba(46,107,255,0.12),rgba(43,196,236,0.06)_45%,transparent_70%)]"
      />
      <span className="relative grid size-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white shadow-[0_8px_20px_-8px_rgba(46,107,255,0.6)]">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <div className="relative">
        <h3 className="text-h4 text-ink">{highlight.title}</h3>
        <p className="text-small mt-2 text-ink-2">{highlight.body}</p>
      </div>
    </article>
  );
}
