"use client";

import { useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MousePointer2 } from "lucide-react";
import { useRef, useState } from "react";
import { LayerList } from "@/components/sections/stack/LayerList";
import { PLATE, Plate } from "@/components/sections/stack/Plate";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stack } from "@/lib/content";
import { useMediaQuery } from "@/lib/useMediaQuery";

const EXPLODE_END = 0.22;
const LAYERS = stack.layers.length;

const activeFor = (p: number) =>
  Math.min(LAYERS - 1, Math.max(0, Math.floor((p - EXPLODE_END) / ((1 - EXPLODE_END) / LAYERS))));

/**
 * Exploded view. On large screens the section pins for ~3 viewports: the
 * plates pull apart over the first fifth of the scroll, then the active
 * layer steps from the base to the top. Smaller screens get the exploded
 * stack at rest with a tappable index.
 */
export function StackScene() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const scrubbed = desktop && !reduce;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const explodeScroll = useTransform(scrollYProgress, [0, EXPLODE_END], [0, 1]);
  const explodeRest = useMotionValue(1);
  const explode = scrubbed ? explodeScroll : explodeRest;

  const [scrollActive, setScrollActive] = useState(0);
  const [pickedActive, setPickedActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = activeFor(p);
    setScrollActive((prev) => (prev === next ? prev : next));
  });
  const active = scrubbed ? scrollActive : pickedActive;

  return (
    <div ref={ref} className={scrubbed ? "lg:h-[340vh]" : undefined}>
      <div className={scrubbed ? "py-[var(--spacing-section)] lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0 lg:pt-20" : "py-[var(--spacing-section)]"}>
        <Container>
          <div className="grid grid-cols-12 items-center gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-5">
              <SectionHeader label={stack.label} title={stack.heading} lede={stack.lede} />
              {scrubbed ? <p className="mt-4 hidden items-center gap-2 text-small font-medium text-blue lg:inline-flex">
                <MousePointer2 aria-hidden="true" className="size-4" />
                {stack.hint}
              </p> : null}
              <LayerList layers={stack.layers} active={active} onSelect={scrubbed ? undefined : setPickedActive} />
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="relative mx-auto h-[21rem] w-full max-w-[40rem] overflow-visible sm:h-[30rem] lg:h-[36rem]" style={{ perspective: 1500 }}>
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[64%] h-24 w-[70%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(11,28,51,0.16),transparent)] blur-md"
                />
                <div
                  className="absolute left-[36%] top-[60%] origin-center scale-[0.44] max-[374px]:left-[22%] max-[374px]:scale-[0.34] sm:left-1/2 sm:scale-[0.76] lg:scale-100 lg:top-[62%]"
                  style={{
                    width: PLATE.w,
                    height: PLATE.h,
                    transform: "translate(-50%, -50%) rotateX(56deg) rotateZ(-34deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {stack.layers.map((layer, i) => (
                    <Plate key={layer.id} layer={layer} index={i} explode={explode} active={i === active} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
