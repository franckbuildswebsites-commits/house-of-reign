# Progress

How-to and file map: see `README.md`. Design and motion reference: `REFERENCE.md`.

## Branch `redesign-v2` (2026-10-29)

Full redesign modeled on the techniques in `REFERENCE.md` (averlo.co), with House of Reign's own identity and content.
Not merged into `main`; the live site is unchanged.

- Dark theme: near-black `#0C0907`, cream text `#F4ECDF`, House of Reign orange `#E8622C` (orange buttons use dark text, 5.6:1).
- Clash Display + DM Sans + Caveat, self-hosted and preloaded.
- Page order: Hero → Trust strip → A note from me → Services (numbered cards) → Work (Go Digital Hero + filterable grid)
  → Testimonial → Pricing → Process → FAQ → Contact → "Text me" → Footer.
- Motion: word-by-word hero headline (CSS), drifting wall of our screenshots, scroll-lit statement, pinned stacking
  service cards (desktop), sliding filter pill + animated grid reflow, sticky process stepper, height-animated FAQ.
  Framer Motion (`motion`) via `LazyMotion`; everything respects reduced motion.
- Lighthouse (mobile, local build): Performance 93–94, Accessibility 100, Best Practices 100, SEO 100.

## Open items ([CONFIRM])

- Pricing shows all four plans from `src/data/services.js` (Launch Page, Business Site, Site Care, Custom Build) plus $75/hr.
- Service card mockups use placeholder names ("Your Café", "Your Business") and sample numbers; they're illustrations.
- Still needed from earlier: `public/me.jpg` (your photo), `public/og-image.jpg` (1200×630 share image), `SITE_URL` in `src/config.js`.
