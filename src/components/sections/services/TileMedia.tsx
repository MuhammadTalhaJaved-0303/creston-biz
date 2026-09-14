import Image from "next/image";
import type { ReactNode, RefObject } from "react";
import type { Service } from "@/lib/content";
import { cn } from "@/lib/cn";

type TileMediaProps = {
  readonly image: Service["image"];
  /** CSS object-position shared by the still and the loop so the crop never jumps. */
  readonly focal: string;
  readonly sizes: string;
  readonly playing: boolean;
  readonly videoRef: RefObject<HTMLVideoElement | null>;
  /** Fade the lower edge into the white card (band layout, and every layout on small screens). */
  readonly fadeClassName?: string;
  readonly className?: string;
  readonly children?: ReactNode;
};

/**
 * Photo with a muted video loop layered on top. The loop only becomes
 * visible once it is actually playing, so the still is always the fallback.
 */
export function TileMedia({ image, focal, sizes, playing, videoRef, fadeClassName, className, children }: TileMediaProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-3", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
        style={{ objectPosition: focal }}
      />
      {image.video ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 hidden size-full object-cover transition-opacity duration-500 ease-[var(--ease-out)] lg:block",
            playing ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition: focal }}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={image.video} type="video/mp4" />
        </video>
      ) : null}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.55)_50%,#fff_100%)]",
          fadeClassName,
        )}
      />
      {children}
    </div>
  );
}
