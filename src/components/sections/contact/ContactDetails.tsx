import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { MapPulse } from "@/components/sections/contact/MapPulse";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { contact } from "@/lib/site";

const chipTone = {
  gradient: "bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white",
  navy: "bg-navy text-white",
  soft: "bg-surface-2 text-blue",
} as const;

const LINKEDIN_LABEL = "Connect on LinkedIn";
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

type ChipProps = { readonly tone: keyof typeof chipTone; readonly children: ReactNode };

function Chip({ tone, children }: ChipProps) {
  return <span className={cn("grid size-11 shrink-0 place-items-center rounded-2xl", chipTone[tone])}>{children}</span>;
}

function Label({ children }: { readonly children: ReactNode }) {
  return <span className="block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-2">{children}</span>;
}

/** Lets an email wrap before the "@" when a narrow screen forces a break. */
function Breakable({ value }: { readonly value: string }) {
  const at = value.indexOf("@");
  if (at <= 0) return value;
  return (
    <>
      {value.slice(0, at)}
      <wbr />
      {value.slice(at)}
    </>
  );
}

type LinkRowProps = {
  readonly href: string;
  readonly tone: keyof typeof chipTone;
  readonly icon: ReactNode;
  readonly label: string;
  readonly value: string;
};

/** One tappable contact channel: chip, label, value and an arrow that nudges on hover. */
function LinkRow({ href, tone, icon, label, value }: LinkRowProps) {
  return (
    <a href={href} className="card card-hover group flex items-center gap-4 p-4">
      <Chip tone={tone}>{icon}</Chip>
      <span className="min-w-0 flex-1">
        <Label>{label}</Label>
        <span className="mt-0.5 block break-words text-[0.9rem] font-semibold leading-snug text-ink sm:text-[0.95rem]">
          <Breakable value={value} />
        </span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.75}
        className="hidden size-5 shrink-0 text-ink-3 transition-[transform,color] duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue sm:block"
      />
    </a>
  );
}

/** The office address beside a small animated map tile. */
function OfficeCard() {
  return (
    <div className="card card-hover flex flex-col-reverse overflow-hidden sm:flex-row">
      <div className="flex min-w-0 flex-1 items-start gap-4 p-4">
        <Chip tone="soft">
          <MapPin aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </Chip>
        <span className="min-w-0 flex-1">
          <Label>Office</Label>
          <span className="mt-0.5 block text-pretty text-[0.95rem] font-semibold leading-snug text-ink">{contact.addressLines[0]}</span>
          <span className="text-small mt-1 block text-pretty text-ink-2">
            {contact.addressLines[1]}
            <span className="block">{contact.addressLines[2]}</span>
          </span>
        </span>
      </div>
      <div className="h-28 w-full shrink-0 border-b border-line sm:h-auto sm:w-[7.5rem] sm:border-b-0 sm:border-l lg:w-[6rem] xl:w-[7.5rem]">
        <MapPulse />
      </div>
    </div>
  );
}

/** Email, phone and office rows, then the LinkedIn link. */
export function ContactDetails() {
  return (
    <div>
      <Reveal staggered as="ul" className="flex flex-col gap-3">
        <RevealItem as="li">
          <LinkRow
            href={`mailto:${contact.email}`}
            tone="gradient"
            icon={<Mail aria-hidden="true" className="size-5" strokeWidth={1.75} />}
            label="Email"
            value={contact.email}
          />
        </RevealItem>
        <RevealItem as="li">
          <LinkRow
            href={contact.phoneHref}
            tone="navy"
            icon={<Phone aria-hidden="true" className="size-5" strokeWidth={1.75} />}
            label="Phone"
            value={contact.phoneDisplay}
          />
        </RevealItem>
        <RevealItem as="li">
          <OfficeCard />
        </RevealItem>
      </Reveal>

      <Reveal className="mt-6">
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full text-small font-semibold text-ink-2 transition-colors hover:text-blue"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-surface-2 text-navy transition-colors group-hover:bg-blue group-hover:text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
              <path d={LINKEDIN_PATH} />
            </svg>
          </span>
          {LINKEDIN_LABEL}
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.75}
            className="size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </Reveal>
    </div>
  );
}
