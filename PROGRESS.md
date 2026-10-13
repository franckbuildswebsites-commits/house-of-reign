# Progress

How-to and file map: see `README.md`.

## Stack

Vite + React 19 + Tailwind v4, single page. `npm run build` prerenders the page to static HTML (`scripts/prerender.js`) and hydrates it. Animations use CSS and the Web Animations API (transform/opacity only) and respect reduced motion. Deploys to Vercel.

## Page order

Hero (animated "website being built" scene) → Trust strip → Marquee → A note from me (About) → Services & pricing → **Recent work** → **More than websites** (design services) → Process → FAQ → CTA → Contact → Footer.

## Done

- Warm palette (cream, peach, espresso, burnt orange), contrast checked (WCAG AA).
- Hero headline "Websites that get you more clients." with the animated build scene.
- **Recent work** (order: Past Present Future, Token Forge, Champions4Character, MM Casino Party, Reign): five case studies, alternating sides on desktop, stacked on mobile. Each has a desktop screenshot with an overlapping phone screenshot, tag, three bullets and "Visit site" for live sites. Past Present Future Comics and Champions4Character have before/after sliders (drag with mouse or touch, arrow keys). CTA under the list: "Want one for your business?" (form, text, call).
- Screenshots captured from the live sites at 1440×900 and 390×844 as WebP in `public/portfolio/` (Past Present Future Comics from its workers.dev preview).
- **More than websites**: six design-service cards with inline SVG illustrations (no image files), hover lift/tilt on desktop, CTA "Need graphics?".
- Location kept off the site; owner shown as "Francisco" only.

## Open items ([CONFIRM])

- Still needed from earlier: `public/me.jpg` (your photo), `public/og-image.jpg` (1200×630 share image), `SITE_URL` in `src/config.js` after deploying.
