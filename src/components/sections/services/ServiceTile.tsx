"use client";

import { useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ScopeChips } from "@/components/sections/services/ScopeChips";
import { TileMedia } from "@/components/sections/services/TileMedia";
import type { Service } from "@/lib/content";

const focal: Record<Service["id"], string> = {
  "office-operations": "22% 45%",
  facilities: "50% 58%",
  events: "50% 40%",
};

export const serviceAccents: Record<Service["id"], string> = {
  facilities: "bg-[#e8f2ed] text-[#285c4c]",
  "office-operations": "bg-[#eef2ff] text-[#2454b8]",
  events: "bg-[#f1edfa] text-[#6550a0]",
};

/** Consistent service pillars with a distinct objective after the scope. */
export function ServiceTile({ service }: { readonly service: Service }) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const startLoop = () => {
    const video = videoRef.current;
    if (!video || reduce || !window.matchMedia("(min-width: 1024px)").matches) return;
    video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const stopLoop = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <article
      className="card group relative overflow-hidden md:grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]"
      onPointerEnter={startLoop}
      onPointerLeave={stopLoop}
      aria-labelledby={`${service.id}-title`}
    >
      <TileMedia
        image={service.image}
        focal={focal[service.id]}
        sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
        playing={playing}
        videoRef={videoRef}
        fadeClassName="hidden"
        className="aspect-[16/9] w-full md:aspect-auto md:h-full md:min-h-[24rem]"
      />
      <div className="min-w-0 p-6 md:p-8 lg:p-10">
        <span className={`inline-flex rounded-full px-3 py-1 text-caption font-bold tracking-[0.08em] ${serviceAccents[service.id]}`}>
          SERVICE {service.number}
        </span>
        <h3 id={`${service.id}-title`} className="text-h3 mt-4 text-ink">{service.name}</h3>
        <p className="mt-3 text-body font-semibold text-ink">{service.tagline}</p>
        <p className="text-body mt-2 text-ink-2">{service.promise}</p>
        <div className="mt-6">
          <p className="mb-3 text-caption font-bold uppercase tracking-[0.1em] text-ink-3">Core services</p>
          <ScopeChips id={service.id} serviceName={service.name} items={service.scope} />
        </div>
        <div className="mt-5 border-t border-line pt-5">
          <p className="text-caption font-bold uppercase tracking-[0.1em] text-ink-3">Our objective</p>
          <p className="mt-2 text-small text-ink-2">{service.objective}</p>
        </div>
      </div>
    </article>
  );
}
