import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Download, Globe, Mail, MapPin, Phone, UserRoundPlus } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { businessCards, businessCardUrl, directionsUrl, getBusinessCard } from "@/lib/business-cards";
import { contact, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return businessCards.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = getBusinessCard((await params).slug);
  if (!card) notFound();
  return {
    title: `${card.name}, digital business card`,
    description: `${card.role} at ${site.name}. Save contact details and connect.`,
    alternates: { canonical: businessCardUrl(card) },
    openGraph: {
      title: `${card.name} | ${site.name}`,
      description: card.role,
      url: businessCardUrl(card),
      images: [{ url: card.photo }],
    },
  };
}

export default async function BusinessCardPage({ params }: Props) {
  const card = getBusinessCard((await params).slug);
  if (!card) notFound();
  const downloads = `/cards/${card.slug}/download`;
  const actions = [
    { label: "Call office", href: contact.phoneHref, Icon: Phone },
    { label: "Email office", href: `mailto:${contact.email}`, Icon: Mail },
    { label: "Directions", href: directionsUrl, Icon: MapPin },
  ];

  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="Business card navigation" className="mb-7 flex items-center justify-between print:hidden">
        <Link href="/" aria-label="Creston Biz home"><Logo /></Link>
        <Link href="/cards" className="flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-2"><ArrowLeft className="size-4" aria-hidden="true" />All cards</Link>
      </nav>

      <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-card)]">
        <div className="grid md:grid-cols-[0.85fr_1.15fr]">
          <header className="relative flex flex-col bg-navy text-white">
            <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3] md:aspect-[4/5]">
              <Image src={card.photo} alt={`Portrait of ${card.name}`} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover object-[center_20%]" preload />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-navy to-transparent" />
            </div>
            <div className="relative px-6 pb-8 pt-3 sm:px-8">
              <h1 className="max-w-[14ch] text-[2rem] leading-[1.12] font-extrabold tracking-tight sm:text-[2.35rem]">{card.name}</h1>
              <p className="mt-3 max-w-64 text-base font-medium text-cyan">{card.role}</p>
              <p className="mt-5 border-t border-white/20 pt-5 text-sm text-white/80">{site.legalName}</p>
              {card.education && <p className="mt-4 text-xs leading-relaxed text-white/75">{card.education.join(" • ")}</p>}
            </div>
          </header>

          <div className="p-6 sm:p-8 md:p-10">
            <a href={`${downloads}/contact.vcf`} download className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-blue-2 px-5 py-4 text-base font-bold text-white transition-colors hover:bg-navy print:hidden"><UserRoundPlus className="size-5" aria-hidden="true" />Save contact</a>
            <div className="mt-5 grid grid-cols-3 gap-2 print:hidden">
              {actions.map(({ label, href, Icon }) => (
                <a key={label} href={href} className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl bg-surface-2 px-2 py-3 text-center text-xs font-semibold text-navy transition-colors hover:bg-surface-3"><Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />{label}</a>
              ))}
            </div>

            <section aria-labelledby="contact-heading" className="mt-8">
              <h2 id="contact-heading" className="text-base font-bold">Connect through Creston Biz</h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">The phone and email below are our shared office contact details.</p>
              <dl className="mt-5 divide-y divide-line">
                <div className="py-4"><dt className="text-xs text-ink-2">Office phone</dt><dd className="mt-1 text-sm font-semibold"><a href={contact.phoneHref}>{contact.phoneDisplay}</a></dd></div>
                <div className="py-4"><dt className="text-xs text-ink-2">Office email</dt><dd className="mt-1 text-sm font-semibold break-all"><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
                <div className="py-4"><dt className="text-xs text-ink-2">Website</dt><dd className="mt-1"><a href={site.url} className="flex items-center gap-2 text-sm font-semibold text-blue-2"><Globe className="size-4" aria-hidden="true" />crestonbiz.com<ArrowUpRight className="ml-auto size-4" aria-hidden="true" /></a></dd></div>
                <div className="py-4"><dt className="text-xs text-ink-2">Visit our office</dt><dd className="mt-2 text-sm leading-relaxed text-ink-2">{contact.addressLines.map((line) => <span key={line} className="block">{line}</span>)}<a href={directionsUrl} className="mt-3 inline-flex min-h-10 items-center gap-2 font-semibold text-blue-2">Show on map<ArrowUpRight className="size-4" aria-hidden="true" /></a></dd></div>
              </dl>
              {card.linkedin && <a href={card.linkedin} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-2">Connect on LinkedIn<ArrowUpRight className="size-4" aria-hidden="true" /></a>}
            </section>
          </div>
        </div>

        <div className="grid gap-10 border-t border-line bg-surface-2/50 p-6 sm:p-8 md:grid-cols-[1.3fr_0.7fr] md:p-10">
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-h4">About {card.name}</h2>
            {card.bio.map((paragraph) => <p key={paragraph} className="text-small mt-4 text-ink-2">{paragraph}</p>)}
          </section>
          <section aria-labelledby="qr-heading" className="flex flex-col items-center text-center">
            <h2 id="qr-heading" className="text-base font-bold">Keep the connection.</h2>
            <p className="mt-2 text-xs text-ink-2">Scan to open this business card.</p>
            <Image src={`${downloads}/qr.png`} alt={`QR code for ${card.name}'s digital business card`} width={224} height={224} unoptimized className="mt-4 w-56 max-w-full rounded-xl border border-line bg-white" />
            <div className="mt-3 flex gap-5 print:hidden">
              <a href={`${downloads}/qr.png`} download className="flex min-h-11 items-center gap-1.5 text-xs font-bold text-blue-2"><Download className="size-3.5" aria-hidden="true" />PNG</a>
              <a href={`${downloads}/qr.svg`} download className="flex min-h-11 items-center gap-1.5 text-xs font-bold text-blue-2"><Download className="size-3.5" aria-hidden="true" />SVG for print</a>
            </div>
            <a href={`${downloads}/contact-qr.png`} download className="mt-2 text-xs font-semibold text-blue-2 underline underline-offset-4 print:hidden">Download contact-only QR</a>
            <p className="mt-2 max-w-56 text-xs leading-relaxed text-ink-2 print:hidden">Saves contact details without an internet connection.</p>
          </section>
        </div>
      </article>
      <footer className="px-4 py-7 text-center text-xs text-ink-2">{site.footerLine}</footer>
    </main>
  );
}
