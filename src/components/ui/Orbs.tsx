import { cn } from "@/lib/cn";

type OrbsProps = {
  /** One class string per orb: size, position and colour, e.g. "left-[-6rem] top-[10%] size-[26rem] bg-blue/25". */
  readonly orbs: ReadonlyArray<string>;
};

/** Blurred colour orbs drifting behind a section so its ground has depth. */
export function Orbs({ orbs }: OrbsProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((classes, i) => (
        <span key={classes} className={cn("orb", i % 2 === 0 ? "animate-float-slow" : "animate-float", classes)} />
      ))}
    </div>
  );
}
