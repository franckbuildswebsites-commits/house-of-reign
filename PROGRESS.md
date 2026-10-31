# Progress

How-to and file map: see `README.md`. Design reference and the Averlo checklist: `REFERENCE.md`.

## Branch `redesign-v2`

Not merged into `main`; the live site is unchanged.

- **Round 1 (2026-10-29):** dark redesign modeled on averlo.co's techniques with our content.
- **Round 2 (2026-10-29):** rebrand to **Reign** / **Reign Studio** (takereign.com), and a much closer match to
  Averlo's structure: Menu pill + full-screen menu, light/dark toggle, full-screen tilting service panels, work
  marquee, pinned process stage, FAQ with hairline column, fanned closing section with "Get a text", footer with
  cycling word, Lenis smooth scrolling, custom cursor.
- **Round 3 (2026-10-30):** polish + speed. Wordmark "Reign"; type scale and spacing measured against Averlo and
  applied site-wide; visible copy cut 39% (list in `REFERENCE.md`); two-step contact form; FAQ shows 6 of 11;
  transform/opacity-only motion; AVIF images; offscreen animations pause; lighter effects on phones/low-power
  devices; 44px tap targets; no sideways scroll at any width; anchor jumps land under the header; styled 404 page.
- **Round 4 (2026-10-30):** "skinny and airy". Clash Display + DM Sans → **Inter Tight** (closest free match to
  Averlo's SF Pro), weights down to 500/400, hairline-only cards, lighter shadows, more space between and inside
  blocks, narrower text. Measurements in `REFERENCE.md`. Contrast checked in both themes (0 violations).
- **Round 5 (2026-10-31):** Apple-style pass. Light by default, white / `#f5f5f7` / `#1d1d1f`, indigo `#4338CA`
  accent, dark mode follows the device with a switch in the header. System font first, Inter for Windows and Android.
  Thin pills, text links with ">", frosted 48px header, hairline cards, no gradients. One 1200px container with
  120px / 24px side margins on every section. Nothing fades on scroll. Custom cursor removed. Site copy moved from
  I/me to we/us (About stays in the founder's voice). "From $X" prices on the service cards. Measurements and results
  in `REFERENCE.md`.
- **Round 6 (2026-10-31):** always opens light, even on devices set to dark; dark only from the header switch (saved
  in localStorage). Less gray: white sections with hairline dividers, `#f5f5f7` only behind the closing section, white
  hairline cards, secondary text `#424245`, gray `#6e6e73` only for small captions and labels.
- **Round 7 (2026-10-31):** new hero (ring of client app-icon tiles, huge two-tone statement), minimal nav (logo, Menu +
  theme pill, Start a project) that thins after the hero, full-screen menu on every size. Services rebuilt to scan in
  seconds: one Websites card, then Online / Brand / Print groups of small cards with prices. Spring motion site-wide
  (`Press.jsx`, `--spring`), scroll parallax on images, all transform only. Screenshot wall and pinned service panels removed.
- **Round 8 (2026-10-31):** hero ring replaced by a floating cluster of four liquid glass tiles (Go Digital Hero, Token
  Forge, Champions4Character, Reign), each opening its site with a name label on hover. Top bar removed: logo floats
  left, black Menu + theme pill center, black "Get Started" right (in the menu on phones); pills invert in dark mode.
- **Round 9 (2026-10-31):** hero buttons removed; the "Get Started" and "Message us" pills are the only hero actions.
  Headline scaled up and lifted clear of the "Message us" pill.
- Lighthouse (mobile, local build, 3 runs): Performance 100, Accessibility 100, Best Practices 100, SEO 100, CLS 0, LCP 0.9s.
- Throttled phone scroll test (4× CPU, whole page, headless): steady 16.7ms frames, 0 long tasks.

## Decisions (confirmed)

- Pricing: Launch Page $750, Business Site $1,200, Site Care $125/mo, Custom Build from $2,500, plus $75/hr.
- Services from: logo $150, flyer/poster $50, social templates (set of 5) $100, business cards $60 (printing extra),
  menu & signage $100, Google Business Profile setup $150, ordering/booking setup $150.
- Voice: "we/us" everywhere; only the About note is first person. No claims about team size or staff.
- Service mockups use placeholders ("Your Café", "4.9 ★"); they're illustrations and hidden from screen readers.
- Jason's quote is its own section.

## Open items ([CONFIRM])

- **Merge `redesign-v2` into `main`** when you're happy with the preview (this also switches Cloudflare to the 404 page).
- **Connect takereign.com** to the Cloudflare Worker (custom domain) after the merge; canonical/OG URLs and the sitemap already point there.
- **Test the contact form and "Get a text"** with a real submission (both send to Web3Forms; not tested by me on purpose).
- Automatic Cloudflare preview builds for branches still fail (log not readable with the current login); previews are uploaded by hand (README → Deploy).
- **Two project links are dead:** Wicked Bread (`wicked-bread-co.pages.dev` no longer resolves) and Past Present Future
  (`ppf-comics.franckbuildswebsites.workers.dev` returns 404; that Worker no longer exists). Both Work cards still link to
  them from the grid and marquee. Redeploy the sites or update `url` in `src/data/projects.js`.
- Champions4Character has no logo mark; its tile is a "C4C" monogram made from its wordmark's font and purple. Swap in a
  real mark if they have one (`public/portfolio/tiles/`). Its tile links to the Netlify address; update `Cluster.jsx`
  and `src/data/projects.js` if they get a real domain.
- Spanish version, footer social icons (add Instagram to `src/config.js`), privacy page, `public/me.jpg` (your photo).
