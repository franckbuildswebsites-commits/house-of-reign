# Progress

How-to and file map: see `README.md`.

## Stack

Vite + React 19 + Tailwind v4, single page. `npm run build` prerenders the page to static HTML (`scripts/prerender.js`) and hydrates it. Deploys to Vercel / Cloudflare.

## Page order

Hero → Work → Pricing → How it works → About → Contact → Footer.

## Done

- 2026-10-22 redesign: cut the filler (animated fake-bakery hero, trust strip, marquee, design-service cards, FAQ, extra CTA band, custom cursor, floating button, giant footer wordmark). Real work is the centerpiece.
- Work grouped by industry: Professional Services (Go Digital Hero, featured, with Jason's quote and "View original"), Food & Drink (Wicked Bread Co., concept), Retail & Hobby (Token Forge; Past Present Future Comics, concept), Events & Nonprofits (MM Casino Party, Champions4Character). PPF and C4C have a "See the old site" toggle.
- Screenshots retaken from the live sites with Playwright on 2026-10-22.
- Payment model on the site: build first, client sees a private preview, pays in full, one revision list, launch. No deposit.
- House of Reign's own copy is location-neutral (open to businesses anywhere); owner shown as "Francisco" only. Client locations in their projects are fine.

## Open items

- `public/me.jpg` + `PHOTO` in `src/config.js` (hero shows three real sites until then).
- `public/og-image.jpg` (1200×630 share image), `SITE_URL` in `src/config.js` after deploying.
