"use client";

import { useLottieLight } from "lottie-react";
import { useEffect, useRef } from "react";
import type { LottieData } from "@/lottie";

type LottiePlayerProps = {
  readonly data: LottieData;
  /** 0 means "not yet"; each new value plays the icon once from the start. */
  readonly token: number;
  /** Park on the final frame instead of animating. */
  readonly reduce: boolean;
};

/**
 * Draws one generated icon with the light SVG engine. Client-only: the
 * engine touches the DOM, so LottieIcon loads this without server rendering.
 */
export function LottiePlayer({ data, token, reduce }: LottiePlayerProps) {
  const lottie = useLottieLight({ src: data, autoplay: false, loop: false });
  const { state, play, stop, seek, setDisplayRef } = lottie;
  const ready = state !== "loading" && state !== "error";
  const playedToken = useRef(0);
  const parked = useRef(false);

  useEffect(() => {
    if (!ready) return;
    if (reduce) {
      if (parked.current) return;
      parked.current = true;
      seek({ frame: data.op - 1 });
      return;
    }
    if (token === 0 || playedToken.current === token) return;
    playedToken.current = token;
    stop();
    play();
  }, [ready, reduce, token, data.op, play, stop, seek]);

  return <span ref={setDisplayRef} className="block size-full" />;
}
