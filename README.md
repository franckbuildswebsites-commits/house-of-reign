# Reign Studio: website (takereign.com)

Vite + React + Tailwind (v4) + Framer Motion (`motion`) + Lenis. Single page, light for everyone (whatever the device is
set to); dark only turns on from the small switch in the header, and the choice is remembered.
Deploys to Cloudflare (Workers static assets, see `wrangler.jsonc`). Design/motion reference and the
Averlo checklist: `REFERENCE.md`. Project status: `PROGRESS.md`.

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build into /dist (prerendered HTML, see below)
npm run preview  # serve the production build locally
```

## Where things live

| What | File |
| --- | --- |
| Brand ("Reign"), full name ("Reign Studio"), email, phone, Instagram, form key, site URL | `src/config.js` |
| Colors (light + dark theme), fonts, type scale, the one page container (`.site-wrap`), motion helpers | `src/index.css` (system font first; Inter + Caveat self-hosted in `public/fonts/`) |
| Logo / "Reign" wordmark (indigo crown + 600 weight text) | `src/components/Logo.jsx` |
| Floating logo and pills, full-screen menu, theme switch | `src/components/Nav.jsx`, `src/components/ThemeToggle.jsx` |
| Hero (liquid glass drop, services slider, headline) | `src/components/Hero.jsx`, `src/components/Blob.jsx` |
| The drop: shaders, colors, morph speed, render loop | `src/lib/blob-engine.js` (WebGL via OGL, loaded after the page is up) |
| The drop's static fallback (exported from the shader at `START_TIME`; re-export if the shader changes) | `public/blob/` |
| Services: Websites card, grouped small cards with prices | `src/components/Services.jsx` (mockup in `src/components/Mockups.jsx`) |
| Hover / tap / menu springs (`SPRING`, `SPRING_SOFT`, `<Press>`) | `src/components/Press.jsx` (`--spring` in `src/index.css` is the CSS version) |
| Scroll parallax on images | `src/components/Parallax.jsx` |
| Work: marquee rows, featured case study, filterable grid | `src/components/WorkMarquee.jsx`, `src/components/Work.jsx`, `src/data/projects.js` |
| Marquee / closing-section card images (600×375 crops) | `public/portfolio/cards/` |
| Image formats | every `.webp` in `public/portfolio/` has a smaller `.avif` twin; add both when you add an image |
| Full-page screenshots (grid) and Go Digital Hero shots | `public/portfolio/` |
| Testimonial | `src/data/testimonials.js` |
| "A note from me" | `src/components/About.jsx` |
| Pricing plans | `src/data/services.js` (shown by `src/components/Pricing.jsx`) |
| Process steps and their illustrations | `src/data/process.js`, `src/components/StepMockups.jsx` |
| FAQ | `src/data/faq.js` |
| Closing section ("Get a text", call) | `src/components/ClosingCTA.jsx` |
| Footer (cycling word, local time) | `src/components/Footer.jsx` |
| Smooth scrolling | `src/lib/scroll.js` |
| Your photo ("A note from me") | `public/me.jpg` (the crown mark shows until it exists) |
| Social share image, favicon, home-screen icon | `public/og-image.jpg` (1200 × 630), `public/favicon.svg`, `public/apple-touch-icon.png` |
| Sitemap / robots / 404 page | `public/sitemap.xml`, `public/robots.txt`, `public/404.html` |
| Share-image source | `scripts/og-image.html` (open at 1200×630, screenshot to `public/og-image.jpg`) |
| Type scale, spacing tokens | `.t-h1` … `.t-small`, `.label`, `.btn`, `.link-more`, `.section-y` in `src/index.css` |

The page title, description, canonical URL, Open Graph tags and schema in `index.html` are generated from
`src/config.js` at build time. Restart `npm run dev` after editing the config to see those changes.

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

`npm run build` builds the site, then renders every section to plain HTML (`scripts/prerender.js`). The deployed
page shows all of its content before any JavaScript runs, so search engines, link previews and slow phones see
everything. The hero rises in with CSS alone; Framer Motion's animation engine loads in a separate chunk after the page
is up. Everything animates transform only, so text stays at full strength while scrolling. The hero drop paints as an image first, then WebGL
takes over when the browser is idle. Looping animations and the drop pause when off screen
(`src/lib/offscreen.js`), phones and low-power devices skip scroll parallax (`html.lite`, set in `index.html`), Save-Data
keeps the drop as a static image, and with reduced motion nothing moves at all.

## Deploy

Cloudflare Workers Builds is connected to the GitHub repo: pushing `main` builds and deploys production.
To publish a preview of another branch by hand:

```bash
npm run build
npx wrangler versions upload --preview-alias <branch-name>
```

That prints a preview URL like `https://<branch-name>-house-of-reign.franckbuildswebsites.workers.dev` and doesn't
touch production. (`house-of-reign` is the Cloudflare Worker's internal name; it isn't shown on the site.)
