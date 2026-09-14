import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { contact, nav, site } from "@/lib/site";

const year = 2026;

/** Navy closing band with the wordmark, links and contact details. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white/75">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(40rem_20rem_at_10%_0%,rgba(46,107,255,0.25),transparent_60%),radial-gradient(30rem_18rem_at_90%_100%,rgba(43,196,236,0.18),transparent_60%)]" />
      <Container className="relative pt-16 pb-8 md:pt-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <Logo tone="dark" />
            <p className="text-small mt-5 max-w-[40ch] text-white/70">{site.footerLine}</p>
          </div>
          <nav aria-label="Footer" className="col-span-6 md:col-span-3 md:col-start-7">
            <p className="text-caption font-bold uppercase tracking-[0.12em] text-white/65">Explore</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-small hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#contact" className="text-small hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <address className="col-span-6 md:col-span-3 not-italic">
            <p className="text-caption font-bold uppercase tracking-[0.12em] text-white/65">Contact</p>
            <div className="mt-4 flex flex-col gap-2.5 text-small">
              <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors break-words">
                {contact.email}
              </a>
              <a href={contact.phoneHref} className="hover:text-white transition-colors">
                {contact.phoneDisplay}
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <span className="text-white/65 mt-1">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </div>
          </address>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-caption text-white/65">
          <span>
            &copy; {year} {site.legalName}. All rights reserved.
          </span>
          <span>Lahore, Pakistan</span>
        </div>
      </Container>
    </footer>
  );
}
