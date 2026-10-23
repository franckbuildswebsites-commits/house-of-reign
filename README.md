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
| Name, email, phone, photo, Instagram (hidden while empty), form key, site URL | `src/config.js` |
| Work: projects, industry categories, featured case study | `src/data/projects.js` |
| Screenshots (WebP, including "old site" images) | `public/portfolio/` |
| Client quotes (shown inside the featured case study) | `src/data/testimonials.js` |
| Pricing, Site Care, revision terms | `src/data/services.js` |
| How it works (4 steps) | `src/data/process.js` |
| Social share image | `public/og-image.jpg` (1200 × 630) |
| Favicon | `public/favicon.svg` |

Page order: Hero → Work (grouped by industry, Go Digital Hero featured with Jason's quote) → Pricing → How it works → About → Contact.

The page title, description and Open Graph tags in `index.html` are generated from `src/config.js` at build time. Restart `npm run dev` after editing the config to see those changes.

## Add your photo

Save it to `public/me.jpg` (portrait, at least 1200px tall) and set `PHOTO = "/me.jpg"` in `src/config.js`. It replaces the three phone screenshots in the hero and appears next to "Hi, I'm Francisco." in About.

## Add a project

1. Save two screenshots to `public/portfolio/` as WebP: desktop at 1440 × 900 and phone at 390 × 844 (2× is fine), e.g. `sunset-events-desktop.webp` and `sunset-events-mobile.webp`. Take them from the live site.
2. Add an entry to the `projects` array in `src/data/projects.js` (the field list is at the top of that file). Set `category` to one of the ids in `categories`; a project alone in its category is shown wide.

Set `published: false` to hide a project. Tag concepts as `"Concept"` so they're labeled on the page.

## How the build works

`npm run build` builds the site, then renders every section to plain HTML (`scripts/prerender.js`). The deployed page shows all of its content before any JavaScript runs, so search engines, link previews and slow phones see everything. Scroll animations only hide content that's still below the screen after the page loads, and never when the visitor prefers reduced motion.

## Deploy to Vercel

Push the folder to a GitHub repo and import it at vercel.com/new (it auto-detects Vite), or run `npx vercel` from this folder. Then set `SITE_URL` in `src/config.js` to the live domain and redeploy so the canonical and Open Graph URLs are absolute.
