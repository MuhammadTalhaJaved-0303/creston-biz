"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Inertial scrolling for the whole document. Lenis honours
 * prefers-reduced-motion on its own (lerp snaps to 1), and `anchors`
 * lets the in-page nav links glide instead of jump.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 0.95,
        anchors: { offset: -88 },
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
