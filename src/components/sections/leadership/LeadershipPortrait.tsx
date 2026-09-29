import Image from "next/image";

type LeadershipPortraitProps = {
  readonly src: string;
  readonly name: string;
};

/** One frame size for every leader; contain preserves the entire source photo. */
export function LeadershipPortrait({ src, name }: LeadershipPortraitProps) {
  return (
    <div className="ring-gradient relative aspect-[4/5] w-full max-w-[20rem] shrink-0 overflow-hidden rounded-[var(--radius-tile)] bg-navy-2">
      <Image
        src={src}
        alt={`Portrait of ${name}`}
        fill
        sizes="(max-width: 410px) calc(100vw - 90px), 320px"
        quality={95}
        className="object-contain"
      />
    </div>
  );
}
