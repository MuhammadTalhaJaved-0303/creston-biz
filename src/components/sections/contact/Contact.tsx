import type { ReactNode } from "react";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { InquiryForm } from "@/components/sections/contact/InquiryForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactCopy } from "@/lib/content";

/** The phrase of the heading that carries the gradient. Falls back to plain text if the copy changes. */
const ACCENT_PHRASE = "Grow from there.";

function accentTitle(heading: string): ReactNode {
  const at = heading.indexOf(ACCENT_PHRASE);
  if (at < 0) return heading;
  return (
    <>
      {heading.slice(0, at)}
      <span className="text-gradient">{heading.slice(at)}</span>
    </>
  );
}

/**
 * Closing section: the invitation and ways to reach us on the left, the
 * inquiry form on the right. The form card stretches to the left column's
 * height on large screens so both columns share one baseline.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-[var(--spacing-section)]">
      <div aria-hidden="true" className="absolute inset-0 bg-mesh" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(246,248,252,0)_0%,#f6f8fc_100%)]"
      />

      <Container className="relative">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-y-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <SectionHeader
              id="contact-title"
              label={contactCopy.label}
              title={accentTitle(contactCopy.heading)}
              lede={contactCopy.lede}
            />
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-7 lg:row-span-2">
            <div className="relative isolate h-full">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 -z-10 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(46,107,255,0.38),transparent)] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-12 -left-12 -z-10 size-64 rounded-full bg-[radial-gradient(closest-side,rgba(43,196,236,0.32),transparent)] blur-2xl"
              />
              <div className="card flex h-full flex-col p-7 md:p-9">
                <InquiryForm />
              </div>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-5">
            <ContactDetails />
          </div>
        </div>
      </Container>
    </section>
  );
}
