# Creston Biz website

Marketing site for Creston Biz (Creston Business Services (Private) Limited).
Facilities management, office operations and administration, and events management in Lahore.

## Stack

- Next.js 16 (App Router, React 19, TypeScript strict)
- Tailwind CSS v4 (all tokens live in `src/app/globals.css`)
- `motion` for animation, `lenis` for inertial scrolling, `zod` for form validation, `lucide-react` icons
- Font: Plus Jakarta Sans, self-hosted via `next/font`

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

Screenshots of any section at any viewport (dev server must be running):

```bash
SHOT_BASE=http://localhost:3000/ node scripts/shot.mjs "#services" .shots/services.png 1440 900
SHOT_BASE=http://localhost:3000/ node scripts/shot.mjs walk .shots/walk.png 390 844     # whole page, frame by frame
SHOT_BASE=http://localhost:3000/ node scripts/scrub.mjs "#stack" .shots/stack 1440 900  # pinned exploded view
```

UI regression checks against a running local server (checks responsive layouts, service expansion, menu keyboard navigation, and invalid-form focus):

```bash
UI_BASE_URL=http://localhost:3000 node scripts/check-ui.mjs
```

## Content

Every word on the page comes from `src/lib/content.ts` and `src/lib/site.ts`. Edit copy there;
components are presentational. House style: no italics, no dashes used as punctuation.

## Digital business cards

Open `/cards` for the three leadership cards. Profiles reuse the website content; stable
slugs, structured names and available personal social links live in `src/lib/business-cards.ts`.
Phone and email are labeled as shared Creston Biz office details. Confirm personal details
before replacing them. The founder's card uses the website name, Syed Hasan Ghazanfar.

Each card offers a `.vcf` contact download, a website QR, and a contact-only QR. Website QRs
use `site.url` and require these routes to be deployed there. Contact-only QRs encode basic
contact details directly and work offline; photos and biographies are available in the digital
card and full contact file. There is no third-party QR service or expiry timer.

```bash
npm run cards:export  # Export PNG/SVG QRs, VCFs and printable HTML to artifacts/business-cards
npm run cards:check   # Check local routes, contact files and decode all six PNG QRs
```

Re-export after editing names, roles, contact details or `site.url`. Downloads from the website
are generated from current content. `printable-visiting-cards.html` contains self-contained
90 × 55 mm front/back proofs, not an aligned duplex sheet. Print at 100% with backgrounds.

## Media

- `public/video/hero-poster.jpg`: hero background still (Pexels 5716999, free licence).
- `public/video/tile-*.mp4`: 7-second muted loops for the service tiles (Pexels 6325845, 7643614, 34382325).
- `public/images/tiles/*.jpg`: stills from the same clips.
- `public/images/founder-*.jpg`: founder portrait crops. A higher-resolution original would sharpen retina rendering.

## Contact form

The inquiry form posts to a server action (`src/app/actions/inquiry.ts`) that validates input with
zod. Set `INQUIRY_WEBHOOK_URL` (see `.env.example`) to forward inquiries as JSON to n8n, Zapier,
Make or any HTTPS endpoint. When unset, inquiries are logged to the server console.

## Design

The visual system and per-section briefs are documented in `DESIGN.md`.
