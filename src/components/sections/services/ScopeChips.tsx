"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const VISIBLE_COUNT = 4;

type ScopeChipsProps = {
  readonly id: string;
  readonly items: ReadonlyArray<string>;
};

function Chip({ label }: { readonly label: string }) {
  return (
    <li className="text-small rounded-2xl bg-surface-2 px-3 py-1.5 font-medium text-ink-2 [text-wrap:pretty]">
      {label}
    </li>
  );
}

/**
 * The first four scope items as chips, with the rest folded behind a
 * "See full scope" button that expands them inline.
 */
export function ScopeChips({ id, items }: ScopeChipsProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const visible = items.slice(0, VISIBLE_COUNT);
  const rest = items.slice(VISIBLE_COUNT);
  const panelId = `${id}-scope-more`;

  return (
    <div>
      <ul className="flex flex-wrap gap-2" aria-label="Scope">
        {visible.map((label) => (
          <Chip key={label} label={label} />
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {open && rest.length > 0 ? (
          <motion.div
            key="rest"
            id={panelId}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: ease.out }}
          >
            <ul className="flex flex-wrap gap-2 pt-2" aria-label="Full scope">
              {rest.map((label) => (
                <Chip key={label} label={label} />
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {rest.length > 0 ? (
        <Button
          variant="ghost"
          className="mt-4 -ml-5"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Hide full scope" : "See full scope"}
          <ChevronDown
            aria-hidden="true"
            className={cn("size-4 transition-transform duration-300 ease-[var(--ease-out)]", open && "rotate-180")}
          />
        </Button>
      ) : null}
    </div>
  );
}
