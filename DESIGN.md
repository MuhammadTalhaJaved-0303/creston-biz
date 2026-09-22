# Creston Biz. Design system and section briefs (v2)

Read fully before writing a component. The hero (`src/components/sections/hero/*`) and the shared
UI kit (`src/components/ui/*`) are the exemplars: match their quality and conventions exactly.

## 1. Concept

A bright, modern, premium services site in the register of the best light SaaS and agency landing
pages: white and cool-grey grounds, navy ink, a blue-to-cyan gradient accent, rounded cards with
soft shadows, real photography and video, product-like UI cards, and a bento grid. It must feel
alive and visual, not like a text document. Every section carries at least one strong visual
element (photo, video loop, animated diagram, illustrated card) and its own layout idea.

Brand: **Creston Biz** (wordmark "CRESTON BIZ"). Legal name Creston Business Services (Private)
Limited appears only in the footer. There is no group, no parent company, no "S2S" anywhere.

## 2. Hard rules from the client

- Light theme only.
- NO italic type anywhere. NO em dashes or en dashes in any copy or component text (use commas,
  full stops, "to", or colons). Copy in `src/lib/content.ts` already follows this; do not add any.
- No content repeated across sections. Stats live only in the hero. Service names appear once as
  headings (services bento) and otherwise only in nav and footer links.
- Fewer, richer sections: Hero, Services (bento), Stack (exploded view), Process (with pricing),
  Industries, Leadership, Contact, Footer. Do not add sections.

## 3. Tokens (Tailwind v4, `src/app/globals.css`)

Colours: `bg` #f6f8fc (page), `surface` #fff, `surface-2` #eef2f9, `surface-3` #e6ecf6, `ink`
#0b1c33 (text), `ink-2` #3f4d63 (secondary), `ink-3` #6b7a90 (muted), `navy` #0a2647, `navy-2`
#123a6b, `blue` #2e6bff, `blue-2` #1f55d6, `cyan` #2bc4ec, `violet` #7c6bff, `gold` #f2b84b (rare),
`green` #17b26a (success), `line` #e4e9f2, `line-2` #d3dae6.

Font: Plus Jakarta Sans only (`font-sans`, default). Weights 400 body, 500 nav, 600 labels,
700 h3/h4, 800 h1/h2.

Type utilities: `text-h1` (hero only), `text-h2`, `text-h3`, `text-h4`, `text-lede`, `text-body`,
`text-small`, `text-caption`, `text-figure` (big numbers), `text-gradient` (gradient text for the
phrase that carries a heading, at most one phrase per section).

Surfaces: `card` (white, border, radius 24, soft shadow), `card-hover` (lift on hover), `glass`
(frosted), `ring-gradient` (gradient hairline border), `bg-mesh`, `bg-mesh-soft`, `bg-dots`,
`input-box`. Radii: `rounded-[var(--radius-card)]` 24px for cards, `rounded-[var(--radius-tile)]`
20px for inner tiles and images, `rounded-full` for pills and buttons. Shadows via the utilities
only.

Spacing: sections `py-[var(--spacing-section)]`; gutters come from `<Container>`; grid
`grid grid-cols-12 gap-x-6` (or `gap-6` for bento).

Icons: `lucide-react` (import named icons). Size 18 to 24px, `strokeWidth={1.75}`. Icon chips:
`grid size-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)] text-white`
or the navy variant `bg-navy text-white`, or soft `bg-surface-2 text-blue`.

Images: `next/image` with `fill` inside a `relative` box with `aspect-*` or fixed height,
`sizes` set, `className="object-cover"`. Tile images live in `public/images/tiles/`:
open-plan.jpg (1400x788 landscape), cleaning.jpg (1400x738),
facade.jpg (788x1400 portrait),
atrium.jpg (738x1400 portrait). Founder: `/images/founder-portrait.jpg` (352x440),
`/images/founder-wide.jpg` (627x428). Tile video loops (7s, muted): `/video/tile-open-plan.mp4`,
`/video/tile-events.mp4`, `/video/tile-facade.mp4` (use with `autoPlay muted loop playsInline`,
poster = the matching still, paused under reduced motion, only on `lg` and above).

## 4. Shared components

`Container`, `ButtonLink`/`Button` (variants primary, secondary, ghost; `size="lg"`; `arrow`),
`Pill`, `SectionHeader` (label, title, lede, align, tone), `Reveal`/`RevealItem` (one-time
entrance; wrap a block in `<Reveal staggered>` and each child in `<RevealItem>`), `Logo`.
Content only from `@/lib/content` and `@/lib/site`. Motion constants from `@/lib/motion`.

## 5. Motion

`motion/react` v13. Every animated leaf branches on `useReducedMotion()` (never on `initial`
markup, only on `transition`/values) so server and client markup match. Entrances: `Reveal`.
Scroll-linked: `useScroll` + `useTransform` (transform/opacity only). Hover: lift, glow, image
scale 1.03, arrow nudge. Keep client components small and leaf-level.

## 6. Layout and accessibility

12-column grid, left-aligned copy, generous whitespace, one h2 per section via `SectionHeader`,
h3 inside. Excellent at 390, 768, 1024, 1440. No horizontal overflow. Contrast AA (use `ink-2`
not `ink-3` for anything under 16px on white). Decorative images `alt=""`; meaningful ones get
alt text from content. Focus visible (inherited). Interactive elements are real `<a>`/`<button>`.

## 7. Code conventions

TypeScript strict, named exports matching file names, immutable data, files under 250 lines,
`"use client"` only on leaves with hooks. Verify: `npx tsc --noEmit && npx eslint <your folder>`,
then `node scripts/shot.mjs "#<id>" .shots/<name>.png 1440 900` and `... 390 844`, Read the PNGs,
critique like a design lead, fix, repeat at least twice. Dev server runs at
http://localhost:3210 (never start another, never run `next build`).

---

## 8. Section briefs

### 8.1 Services bento. `id="services"`, export `Services`, folder `sections/services/`
Ground: page `bg`. `SectionHeader label="Services" title=<>Everything your office needs, <span className="text-gradient">under one contract.</span></> lede="Three managed functions, each backed by the same reporting and service-level standard."` (left aligned).
Bento (desktop 12 cols, `gap-6`, `auto-rows` ~ 15rem):
```
| Office Operations (cols 1-7, rows 1-2): photo top-left region (reception.jpg,   | Workforce (cols 8-12, rows 1-2): |
|  video loop on hover) filling the top 55%, gradient fade to white at the bottom,|  portrait photo team.jpg on the  |
|  then kind pill, h3 name, promise, 4 scope chips, "Explore scope" ghost link    |  right 45%, text on the left     |
| Facilities (cols 1-5, rows 3-4): facade.jpg portrait left 45%, text right       | 4 highlight tiles (cols 6-12, rows 3-4, 2x2 grid): icon chip, h4 title, small body |
```
Each service tile is a `card card-hover overflow-hidden`; images use `next/image fill`. The scope
list shows the first 4 items as rounded chips (`bg-surface-2 text-small font-medium px-3 py-1.5`),
and a details `<details>`-free approach: a "See full scope" button that expands the remaining
items inline (AnimatePresence height animation, `aria-expanded`). Highlights come from
`highlights` with icons mapped by name from lucide (`FileCheck2`, `RefreshCcw`, `Receipt`,
`LayoutDashboard`). Tablet: 2 columns; phone: single column, images at 16:10 above text.
Files: `Services.tsx` (server), `ServiceTile.tsx` (client: hover video + expand), `HighlightTile.tsx`, `ScopeChips.tsx`.

### 8.2 Process and pricing. `id="process"`, export `Process`, folder `sections/process/`
Ground: `bg-surface` with `border-y border-line`, faint `bg-dots` masked to the middle.
`SectionHeader label="Process" title="From first call to monthly report in six steps." lede="The same stages apply whether you outsource one role or the whole office. Each stage closes with a document you can hold."`
Stepper (desktop): a horizontal rail with a gradient line that draws left to right on scroll
(`useScroll` on the section, `scaleX` 0 to 1), six numbered nodes (`size-10 rounded-full bg-navy
text-white font-bold`, the active one gets the gradient), each with `h4` title, `text-small` body
and a "Closes with: Signed scope sheet" chip (`bg-surface-2`). Tablet: 3 columns x 2 rows; phone:
vertical timeline with the line on the left.
Pricing block beneath (same section, `mt-20`): a `card ring-gradient` panel, 2 columns on lg:
left `h3 {pricing.heading}` + lede + the formula rendered as rounded chips joined by "+" glyphs
(`text-ink-3`) with the final chip `= {pricing.result}` in navy with white text; right column the
`pricing.note` and `ButtonLink href="#contact" arrow>{pricing.cta}`. Chips reveal one by one with
`Reveal staggered`.
Files: `Process.tsx`, `Stepper.tsx` (client), `PricingPanel.tsx`.

### 8.3 Industries. `id="industries"`, export `Industries`, folder `sections/industries/`
Ground: page `bg` with `bg-mesh-soft`.
`SectionHeader label="Industries" title="Built for teams that outgrew informal support." align="center"`.
Grid 3x2 on lg (2 columns tablet, 1 phone) of `card card-hover p-7` tiles: icon chip (lucide by
name: Building2, HeartHandshake, Landmark, Cpu, Factory, GraduationCap), `h3 text-h4` name,
`text-body text-ink-2` need, and a priority chip top-right: "Priority focus" = gradient chip with
white text, "Active" = `bg-surface-2 text-ink-2`, "Selective" = outlined. Wrap in
`Reveal staggered`. Under the grid, one centred line `text-small text-ink-3`: "Priority focus
marks where new engagements start first."
Files: `Industries.tsx`, `IndustryCard.tsx`, `icons.ts` (name to component map).

### 8.4 Leadership. `id="leadership"`, export `Leadership`, folder `sections/leadership/`
Ground: `bg-navy` band, white text, with the footer-style mesh (`bg-[radial-gradient(...)]` in
blue/cyan at low alpha) and a subtle `bg-dots` in white at 6%.
`SectionHeader tone="dark" label="Leadership" title="Led by someone who has run the function, not just sold it."`
Layout 5/7 on lg: left, the portrait (`founder.photo.portrait`, `next/image` 352x440) inside a
`rounded-[var(--radius-card)]` frame with `ring-gradient` and a soft glow shadow, slightly
rotated (-2deg) with a white-on-navy caption card overlapping its bottom-right: name (`text-h4`),
role (`text-small text-cyan`), the two education lines (`text-caption text-white/60`).
Right: two bio paragraphs (`text-body text-white/75`), then "Has worked directly with" as three
rows of chips (donors, government, organisations) with a small `text-caption uppercase tracking`
row label in `text-white/45`; then `founder.teamNote` in `text-caption text-white/50` (not italic).
Files: `Leadership.tsx`, `FounderCard.tsx`.

### 8.5 Contact. `id="contact"`, export `Contact`, folder `sections/contact/` + `src/app/actions/inquiry.ts` + `src/lib/inquiry-schema.ts`
Ground: page `bg` with `bg-mesh`.
Layout 5/7 on lg: left `SectionHeader label={contactCopy.label} title={contactCopy.heading} lede={contactCopy.lede}` then contact details as three `card p-4` rows with icon chips (Mail, Phone, MapPin) and a LinkedIn link. Right: the form in a `card p-7 md:p-9`.
Form fields (`input-box`, labels `text-small font-semibold` above; two-column rows on md): Full
name*, Company*, Email*, Phone, Service interest (native select styled `input-box`, options
`contactCopy.interests`, placeholder option "Choose a service"), "What are you managing in-house
today?" textarea 4 rows. Honeypot `name="website"` visually hidden, `tabIndex={-1}`,
`autoComplete="off"`. Submit `Button size="lg" arrow className="w-full"` = `contactCopy.submit`,
while pending `contactCopy.pending`. Under it `text-caption text-ink-3` "We reply within one working day."
Server action `submitInquiry(prev, formData)` for `useActionState`: validate with zod (name 2 to 80,
company 2 to 120, email, phone optional up to 30, interest in list, message up to 2000, honeypot
empty). Invalid: `{ status: "error", errors, message }`. Valid: if `process.env.INQUIRY_WEBHOOK_URL`
is set, POST JSON `{ ...fields, receivedAt }` with an 8s timeout, non-2xx = failure; else
`console.info("[inquiry]", payload)`. Return `{ status: "success" }` or `{ status: "error",
message: contactCopy.error }`. Never throw to the client. Success replaces the form with a
centred panel: green check chip, `h3 {contactCopy.success.heading}`, body, and a "Send another"
ghost button. Field errors under the field in `text-caption text-[#d92d20]` with
`aria-describedby`/`aria-invalid`. `noValidate` on the form.
Files: `Contact.tsx`, `ContactDetails.tsx`, `InquiryForm.tsx` (client), `FormField.tsx`, `InquirySuccess.tsx`.

## 12. v2.1 additions (2026-09-22): colour, motion, Lottie, founding members

- Grounds: sections no longer sit on plain white. `bg-ground-services`, `bg-ground-stack`,
  `bg-ground-process` and `bg-ground-industries` are single-gradient tinted washes; `bg-band` is
  the navy-to-cyan gradient used by the value ribbon under the services bento. `<Orbs>` drops
  blurred colour orbs (`orb` utility) behind a section; keep two or three per section.
- Interaction: `useSpotlight()` plus the `spotlight` utility give a card a cursor-tracking
  highlight and a 3 degree tilt (mouse only, off under reduced motion). Used on service tiles
  and industry cards; do not stack it with `card-hover`.
- Motion: `<WordReveal>` (via `<SectionHeader>`) rises heading words in one after another;
  headings are tokenised on the server by `headingTokens()` so the client hydrates identically.
  `<ScrollProgress>` draws the gradient reading line at the top of the viewport. The hero
  backdrop parallaxes with scroll. `<Reveal amount>` lowers the visibility threshold for tall
  blocks.
- Lottie: `scripts/make-lottie.mjs` generates the brand-coloured icons in `src/lottie/`
  (six process steps, one success mark). `<LottieIcon>` plays them once when asked and again on
  hover, through `lottie-react`'s light SVG engine, client-only. Regenerate rather than hand-edit.
- Leadership: `<FoundingMembers>` lists `foundingMembers` from `content.ts` under the founder.
  Portraits live in `public/images/founders/` as 720x900 JPGs.
