# House of Reign: portfolio site

Vite + React + Tailwind (v4). Single page, deploys to Vercel as-is. Project status and open items: see `PROGRESS.md`.

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
| Case studies ("Recent work") | `src/data/projects.js` |
| Case-study screenshots (WebP, including before/after images) | `public/portfolio/` |
| Design services ("More than websites": cards, text, illustrations) | `src/components/DesignServices.jsx` |
| Hero animation (the three fictional businesses, timing) | `src/components/BuildScene.jsx` |
| Services & pricing ("Perfect for" lines) | `src/data/services.js` |
| Process steps (you / me / timing) | `src/data/process.js` |
| FAQ | `src/data/faq.js` |
| Testimonials (hidden while empty) | `src/data/testimonials.js` |
| Your photo (hero chip, "A note from me", CTA) | `public/me.jpg` (the crown mark shows until it exists) |
| Social share image | `public/og-image.jpg` (1200 × 630) |
| Favicon | `public/favicon.svg` |

The page title, description and Open Graph tags in `index.html` are generated from `src/config.js` at build time. Restart `npm run dev` after editing the config to see those changes.

## Add a case study

1. Save two screenshots to `public/portfolio/` as WebP: desktop at 1440 × 900 and phone at 390 × 844, e.g. `sunset-events-desktop.webp` and `sunset-events-mobile.webp`.
2. Add an entry to the `projects` array in `src/data/projects.js`:

```js
{
  id: "sunset-events",
  name: "Sunset Events",
  description: "One line about the project.",
  tag: "Client",                                   // "Client" | "Concept" | "Product"
  url: "https://sunsetevents.com",                 // "" = no "Visit site" button
  address: "concept preview",                      // only used when there's no url
  desktop: "/portfolio/sunset-events-desktop.webp",
  mobile: "/portfolio/sunset-events-mobile.webp",
  before: "/portfolio/sunset-events-before.png",   // optional: adds a before/after slider
  bullets: ["What you built", "Another thing", "A third thing"],
  published: true,                                 // false = hidden
},
```

Order in the file is the order on the page; rows alternate sides automatically.

## Hide or show a case study

In `src/data/projects.js`, set `published: false` to hide it or `true` to show it.

## How the build works

`npm run build` builds the site, then renders every section to plain HTML (`scripts/prerender.js`). The deployed page shows all of its content before any JavaScript runs, so search engines, link previews and slow phones see everything. Scroll animations only hide content that's still below the screen after the page loads, and never when the visitor prefers reduced motion.

## Deploy to Vercel

Push the folder to a GitHub repo and import it at vercel.com/new (it auto-detects Vite), or run `npx vercel` from this folder. Then set `SITE_URL` in `src/config.js` to the live domain and redeploy so the canonical and Open Graph URLs are absolute.
