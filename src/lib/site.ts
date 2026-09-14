/** Site-wide constants. Everything that identifies the company lives here. */
export const site = {
  name: "Creston Biz",
  wordmark: ["CRESTON", "BIZ"],
  legalName: "Creston Business Services (Private) Limited",
  description:
    "Office operations, workforce and facilities outsourcing in Lahore. Recruited, deployed and managed against a written service level.",
  url: "https://crestonbiz.com",
  footerLine: "Managed office operations, workforce and facilities for organisations across Punjab.",
  locale: "en_PK",
} as const;

export const contact = {
  email: "hasanghazanfar1987@gmail.com",
  phoneDisplay: "+92 332 8118425",
  phoneHref: "tel:+923328118425",
  linkedin: "https://www.linkedin.com/in/HasanGhazanfar",
  addressLines: [
    "NASTP (National Aerospace Science and Technology Park)",
    "Delta-4, Office 4030, Abid Majeed Road",
    "Lahore Cantt, Pakistan",
  ],
  city: "Lahore",
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "How we work", href: "#stack" },
  { label: "Process", href: "#process" },
  { label: "Industries", href: "#industries" },
  { label: "Leadership", href: "#leadership" },
] as const;

export const primaryCta = { label: "Book a consultation", href: "#contact" } as const;
export const secondaryCta = { label: "See how it works", href: "#stack" } as const;
