"use client";

import { useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ScopeChips } from "@/components/sections/services/ScopeChips";
import { TileMedia } from "@/components/sections/services/TileMedia";
import type { Service } from "@/lib/content";

/**
 * band: photo across the top on wide screens (photo left on tablet).
 * cornerRight / cornerLeft: photo tucked into the top corner beside the copy,
 * with the scope chips running underneath at full width.
 */
export type TileLayout = "band" | "cornerRight" | "cornerLeft";

const VIDEO_MEDIA_QUERY = "(min-width: 1024px)";

/** Where each photo should be anchored; the tile assets are all portrait. */
const focal: Record<Service["id"], string> = {
  "office-operations": "50% 45%",
  workforce: "50% 42%",
  facilities: "50% 58%",
};

const sizes: Record<TileLayout, string> = {
  band: "(min-width: 1280px) 700px, (min-width: 768px) 40vw, 100vw",
  cornerRight: "(min-width: 1280px) 230px, (min-width: 768px) 50vw, 100vw",
  cornerLeft: "(min-width: 1280px) 230px, (min-width: 768px) 50vw, 100vw",
};

const layoutClasses: Record<TileLayout, { readonly top: string; readonly media: string; readonly fade: string; readonly copy: string }> = {
  band: {
    top: "flex flex-col md:flex-row xl:flex-1 xl:flex-col",
    media:
      "aspect-[16/10] w-full md:aspect-auto md:w-[40%] md:min-h-[19rem] md:shrink-0 md:rounded-br-[var(--radius-tile)] xl:w-full xl:flex-1 xl:min-h-[16rem] xl:rounded-none",
    fade: "md:hidden xl:block",
    copy: "relative z-10 -mt-4 flex flex-col px-6 md:mt-0 md:flex-1 md:justify-center md:px-8 md:py-8 xl:-mt-6 xl:flex-none xl:justify-start xl:pt-0 xl:pb-0",
  },
  cornerRight: {
    top: "flex flex-col xl:flex-1 xl:flex-row",
    media:
      "aspect-[16/10] w-full xl:order-last xl:aspect-auto xl:min-h-[19rem] xl:w-[42%] xl:shrink-0 xl:rounded-bl-[var(--radius-tile)]",
    fade: "xl:hidden",
    copy: "relative z-10 -mt-4 px-6 md:px-8 xl:mt-0 xl:flex-1 xl:pr-5 xl:pt-8",
  },
  cornerLeft: {
    top: "flex flex-col xl:flex-1 xl:flex-row",
    media:
      "aspect-[16/10] w-full xl:aspect-auto xl:min-h-[19rem] xl:w-[42%] xl:shrink-0 xl:rounded-br-[var(--radius-tile)]",
    fade: "xl:hidden",
    copy: "relative z-10 -mt-4 px-6 md:px-8 xl:mt-0 xl:flex-1 xl:pl-5 xl:pt-8",
  },
};

type ServiceTileProps = { readonly service: Service; readonly layout: TileLayout };

/** One managed function: photo (video loop on hover), kind badge, name, promise and scope. */
export function ServiceTile({ service, layout }: ServiceTileProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const classes = layoutClasses[layout];

  const startLoop = () => {
    const video = videoRef.current;
    if (!video || reduce || !window.matchMedia(VIDEO_MEDIA_QUERY).matches) return;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const stopLoop = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <article
      className="card card-hover group relative flex h-full flex-col overflow-hidden"
      onPointerEnter={startLoop}
      onPointerLeave={stopLoop}
      aria-labelledby={`${service.id}-title`}
    >
      <div className={classes.top}>
        <TileMedia
          image={service.image}
          focal={focal[service.id]}
          sizes={sizes[layout]}
          playing={playing}
          videoRef={videoRef}
          fadeClassName={classes.fade}
          className={classes.media}
        >
          <span className="glass absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-caption font-semibold text-ink">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)]" />
            {service.kind}
          </span>
        </TileMedia>

        <div className={classes.copy}>
          <h3 id={`${service.id}-title`} className="text-h3 text-ink">
            {service.name}
          </h3>
          <p className="text-body mt-3 text-ink-2">{service.promise}</p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-5 md:px-8 md:pb-7">
        <ScopeChips id={service.id} items={service.scope} />
      </div>
    </article>
  );
}
