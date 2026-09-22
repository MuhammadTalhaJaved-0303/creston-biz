"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useRef, type PointerEvent } from "react";

const MAX_TILT_DEGREES = 3;
const LIFT = "-3px";

const setVars = (element: HTMLElement, vars: Readonly<Record<string, string>>) => {
  for (const [name, value] of Object.entries(vars)) element.style.setProperty(name, value);
};

/**
 * Feeds the cursor position and a light tilt into CSS variables on the
 * element (see the `spotlight` utility). Touch pointers and reduced
 * motion get the highlight only, never the tilt.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();

  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      const element = ref.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const vars: Record<string, string> = { "--mx": `${x}px`, "--my": `${y}px` };
      if (!reduce && event.pointerType === "mouse") {
        const px = x / bounds.width - 0.5;
        const py = y / bounds.height - 0.5;
        vars["--ry"] = `${(px * MAX_TILT_DEGREES * 2).toFixed(2)}deg`;
        vars["--rx"] = `${(-py * MAX_TILT_DEGREES * 2).toFixed(2)}deg`;
        vars["--ty"] = LIFT;
      }
      setVars(element, vars);
    },
    [reduce],
  );

  const onPointerLeave = useCallback(() => {
    const element = ref.current;
    if (element) setVars(element, { "--rx": "0deg", "--ry": "0deg", "--ty": "0px" });
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
