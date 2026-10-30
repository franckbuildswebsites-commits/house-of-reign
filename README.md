# House of Reign: portfolio site

Vite + React + Tailwind (v4) + Framer Motion (`motion`). Single page, dark theme. Deploys to Cloudflare (Workers static assets, see `wrangler.jsonc`). Design/motion reference notes: `REFERENCE.md`. Project status and open items: see `PROGRESS.md`.

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build into /dist (prerendered HTML, see below)
npm run preview  # serve the production build locally
```

## Where things live

| What | File |
| --- | --- |
| Name, email, phone, Instagram (hidden while empty), form key, site URL | `src/config.js` |
| Colors, fonts, type scale, motion helpers | `src/index.css` (fonts self-hosted in `public/fonts/`) |
| Hero (headline, wall of our screenshots) | `src/components/Hero.jsx`, `src/components/HeroWall.jsx` |
| Hero wall images (one pre-composed strip per column, 400px + 200px "-sm") | `public/portfolio/wall/` |
| "A note from me" (scroll-lit statement) | `src/components/About.jsx` |
| Numbered service cards ("More than websites") and their mini mockups | `src/components/ServiceStack.jsx`, `src/components/Mockups.jsx` |
| Project cards and filter tabs ("Recent work"), featured case study | `src/data/projects.js` |
| Screenshots (full-page WebP for the cards, Go Digital Hero shots) | `public/portfolio/` |
| Pricing plans | `src/data/services.js` (shown by `src/components/Pricing.jsx`) |
| Process steps (you / me / timing) | `src/data/process.js` |
| FAQ | `src/data/faq.js` |
| Testimonials (hidden while empty) | `src/data/testimonials.js` |
| Closing "Text me" block | `src/components/TextMe.jsx` |
| Your photo (hero, "A note from me") | `public/me.jpg` (the crown mark shows until it exists) |
| Social share image | `public/og-image.jpg` (1200 × 630) |
| Favicon | `public/favicon.svg` |

The page title, description and Open Graph tags in `index.html` are generated from `src/config.js` at build time. Restart `npm run dev` after editing the config to see those changes.

## Add a project card

1. Take a full-page screenshot of the site at 1440px wide (desktop), resize it to 720px wide and save it as WebP: `public/portfolio/sunset-events-full.webp`. Note its height in pixels.
2. Add an entry to the `projects` array in `src/data/projects.js`:

```js
{
  id: "sunset-events",
  name: "Sunset Events",
  category: "professional",                         // id from `categories` (filter tabs)
  tag: "Client",                                     // "Concept" shows a Concept tag on the card
  url: "https://sunsetevents.com",                   // the card opens this in a new tab
  full: full("sunset-events", 3200),                 // screenshot height at 720px wide
  published: true,
},
```

On hover (desktop) or when it's on screen (phones), the card scrolls through the whole screenshot. To add a filter tab, add a category to `categories` in the same file.

## Hide or show a case study

In `src/data/projects.js`, set `published: false` to hide it or `true` to show it.

## How the build works

`npm run build` builds the site, then renders every section to plain HTML (`scripts/prerender.js`). The deployed page shows all of its content before any JavaScript runs, so search engines, link previews and slow phones see everything. The hero headline animates with CSS alone; scroll animations only hide content that's still below the screen after the page loads; Framer Motion's animation engine loads in a separate chunk after the page is up. Nothing moves when the visitor prefers reduced motion.

## Deploy to Vercel

Push the folder to a GitHub repo and import it at vercel.com/new (it auto-detects Vite), or run `npx vercel` from this folder. Then set `SITE_URL` in `src/config.js` to the live domain and redeploy so the canonical and Open Graph URLs are absolute.
