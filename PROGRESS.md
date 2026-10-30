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
- Palette: near-black `#0C0907`, cream `#F4ECDF`, Reign orange `#E8622C` (orange buttons use dark text, 5.6:1).
  Light theme swaps the background and text tokens.
- Lighthouse (mobile, local build): Performance 97, Accessibility 100, Best Practices 100, SEO 100, CLS 0.
- Throttled phone scroll test (4× CPU, touch gestures, whole page): 0 frames over 34ms, 0 long tasks.

## Decisions (confirmed)

- Pricing: Launch Page $750, Business Site $1,200, Site Care $125/mo, Custom Build from $2,500, plus $75/hr.
- Service mockups use placeholders ("Your Café", "4.9 ★"); they're illustrations and hidden from screen readers.
- Jason's quote is its own section.

## Open items ([CONFIRM])

- **Merge `redesign-v2` into `main`** when you're happy with the preview (this also switches Cloudflare to the 404 page).
- **Connect takereign.com** to the Cloudflare Worker (custom domain) after the merge; canonical/OG URLs and the sitemap already point there.
- **Test the contact form and "Get a text"** with a real submission (both send to Web3Forms; not tested by me on purpose).
- Automatic Cloudflare preview builds for branches still fail (log not readable with the current login); previews are uploaded by hand (README → Deploy).
- Spanish version, footer social icons (add Instagram to `src/config.js`), privacy page, `public/me.jpg` (your photo).
