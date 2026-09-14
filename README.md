# Creston Biz website

Marketing site for Creston Biz (Creston Business Services (Private) Limited).
Office operations, workforce and facilities outsourcing in Lahore.

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

## Content

Every word on the page comes from `src/lib/content.ts` and `src/lib/site.ts`. Edit copy there;
components are presentational. House style: no italics, no dashes used as punctuation.

## Media

- `public/video/hero.mp4` / `hero.webm` / `hero-poster.jpg`: hero background (Pexels 5716999, free licence).
- `public/video/tile-*.mp4`: 7-second muted loops for the service tiles (Pexels 6325845, 7643614, 34382325).
- `public/images/tiles/*.jpg`: stills from the same clips.
- `public/images/founder-*.jpg`: founder portrait crops. A higher-resolution original would sharpen retina rendering.

## Contact form

The inquiry form posts to a server action (`src/app/actions/inquiry.ts`) that validates input with
zod. Set `INQUIRY_WEBHOOK_URL` (see `.env.example`) to forward inquiries as JSON to n8n, Zapier,
Make or any HTTPS endpoint. When unset, inquiries are logged to the server console.

## Design

The visual system and per-section briefs are documented in `DESIGN.md`.
