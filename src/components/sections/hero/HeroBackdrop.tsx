import Image from "next/image";

/** Still photograph of a bright office behind the hero copy. */
export function HeroBackdrop() {
  return (
    <Image
      src="/video/hero-poster.jpg"
      alt=""
      aria-hidden="true"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  );
}
