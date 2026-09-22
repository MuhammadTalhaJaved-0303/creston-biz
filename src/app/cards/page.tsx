import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ContactRound } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { businessCards } from "@/lib/business-cards";

export const metadata: Metadata = {
  title: "Digital business cards",
  description: "Meet the Creston Biz leadership team. View their digital business cards and save their contact details.",
  alternates: { canonical: "/cards" },
};

export default function CardsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <Link href="/" aria-label="Creston Biz home"><Logo /></Link>
      <div className="mb-10 mt-16 max-w-2xl">
        <ContactRound className="mb-5 size-8 text-blue" aria-hidden="true" />
        <h1 className="text-h2">Good connections start here.</h1>
        <p className="text-lede mt-5 text-ink-2">Meet our leadership. Open a card to connect, save contact details or share a QR code.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {businessCards.map((card) => (
          <Link key={card.slug} href={`/cards/${card.slug}`} className="card card-hover group overflow-hidden">
            <div className="relative aspect-[4/3] bg-surface-2">
              <Image src={card.photo} alt={`Portrait of ${card.name}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-[center_22%]" />
            </div>
            <div className="p-6">
              <h2 className="text-h4">{card.name}</h2>
              <p className="text-small mt-2 min-h-11 text-ink-2">{card.role}</p>
              <span className="mt-6 flex items-center justify-between border-t border-line pt-5 text-sm font-bold text-blue-2">Open business card<ArrowUpRight className="size-5" aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
