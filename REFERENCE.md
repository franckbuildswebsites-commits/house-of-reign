# Design reference: averlo.co (studied 2026-10-29)

The bar for `redesign-v2`. We borrow **techniques** only: no text, logo, images or exact layouts.
Screenshots were taken with Playwright at 1440×900 and 390×844 (full page plus one frame per scroll step).

## Stack they use

- Next.js, **GSAP + ScrollTrigger** for scroll-linked motion, **Lenis** for smooth scrolling.
- One typeface (SF Pro, 400–700). All hierarchy comes from size, weight, tracking and opacity, not from font changes.
- Light theme (white, ink `#191B25`). Saturated gradient panels (orange, teal, red) for services; dark navy footer.

## Typography scale

| Role | Desktop | Mobile | Notes |
| --- | --- | --- | --- |
| H1 / section headlines | 80px / 1.0 | 40–48px | weight 500–600, tracking −0.04em, two lines |
| Service panel title | 55px | ~44px | tracking −0.04em |
| Big numerals ("01") | 100px+ | ~80px | weight 600, the loudest thing on the panel |
| Card titles | 40px | ~28px | |
| Body / labels | 14px and 22px | 14–18px | small labels are tiny and quiet; lead text is 22px medium |

- **Two-tone headlines**: line 1 full ink, line 2 at ~35% opacity. It reads as a pair without needing color.
- Text-wrap balance on headlines, tight leading (1.0), negative tracking at large sizes only.
- Lead paragraphs use a **first-line indent** instead of a margin, which looks editorial.

## Layout and section rhythm

- **Editorial grid with hairlines**: many sections split into a narrow left column (tiny label: "How it works", "FAQs")
  and a wide right column (big headline), divided by 1px rules that run off the edge of the page.
- **Bridge sections** (~300px tall) introduce each block: label left, two-line headline right. They give the page a beat
  between dense blocks.
- Full-bleed blocks alternate with contained ones. Generous vertical space (hero ≈ 100svh, service panels = 100svh).
- Fixed header: logo left, a **floating pill menu centered**, a solid pill CTA right. A **floating "Message us" pill**
  is pinned bottom-center the whole time.

## Section by section

1. **Hero**: a 3D-tilted wall of their own project screenshots fading into the background via a gradient mask, small
   tags floating on the right, the headline bottom-left, tiny "Scroll down" cue. On mobile the wall sits on top and
   the headline below.
2. **Service panels (numbered)**: each service is a full-viewport, **sticky, stacked panel** with a saturated
   gradient. As the next panel slides over, the previous one **tilts back in 3D and shrinks** (perspective transform
   tied to scroll). Each panel: title left, giant numeral right, two hairline-boxed bullets, a pill button, then a
   **live UI mockup** of the service (browser windows, a Google-style search with a typing caret, ad creatives).
3. **Scroll-scrubbed text**: inside the lead sentences, part of the text starts at ~50% opacity and brightens as you
   scroll.
4. **Work**: two rows of large rounded cards (≈500×300) drifting horizontally like a marquee, in opposite directions;
   hover dims the art slightly and reveals the name.
5. **Process**: a sticky stage. Left: a vertical list of steps (active one becomes a pill with a colored square) and
   a giant numeral ("01" to "05") that swaps with scroll. Center: a media card per step. Right: step title + one
   sentence.
6. **FAQ**: left label, right two-line headline, then **full-width hairline rows** with a thin "+" that turns into "−".
   The answer opens with a height animation; one open at a time.
7. **Closing CTA**: big two-line headline over a fanned 3D collage, then a split block: "Text us directly" (phone
   input + big "Get a text") on dark, "Book a demo" on white.
8. **Footer**: dark, huge stacked headline ("Let's / build / ... / together") whose words un-blur one by one,
   offices, nav, social circles.

## Motion inventory

| Technique | How it behaves | Our version |
| --- | --- | --- |
| Headline reveal | Lines/words rise and un-blur, staggered ~60–80ms | Word-by-word mask rise in the hero (CSS, runs before JS) |
| Scroll reveals | Blocks fade up ~24px as they enter | `Reveal` (IntersectionObserver + CSS), never hides above-the-fold content |
| Sticky stacked panels | Pinned panels; previous one scales/tilts back as the next covers it | Sticky service cards; scale + dim via CSS scroll-driven animation (no JS) |
| Scroll-scrubbed text | Words go from dim to full as you scroll | Statement paragraph, per-word opacity tied to scroll (Framer Motion `useScroll`) |
| Marquee | Infinite horizontal/vertical drift | Hero wall of our screenshots drifting vertically (CSS, transform only) |
| Hover states | 0.24s `cubic-bezier(0.2,0.8,0.2,1)` on color/bg/border; cards lift, images scale slightly | Same curve; cards lift, screenshot scrolls inside its frame |
| Accordion | Height + icon rotation, one open | Framer Motion `AnimatePresence` height animation |
| Filter/state changes | Pills with a sliding active background | Sliding active pill (`layoutId`) + animated grid reflow (`layout`) |
| Footer words | Words un-blur sequentially when in view | Closing "Text me" headline reveal |

Easing is consistent everywhere (`cubic-bezier(0.2, 0.8, 0.2, 1)`), durations are short for hovers (0.16–0.24s) and
long for scroll pieces (0.6–1s). Nothing bounces.

## What we deliberately don't copy

- Their text, logo, project images, gradients-per-service palette, light theme and their exact hero/footer layouts.
- Lenis smooth scrolling and GSAP: heavy for a small local-business site and a risk to the mobile Lighthouse ≥ 90
  goal. We get the same feel with CSS, scroll-driven animations and Framer Motion loaded lazily.
- Their marquee work rows: our brief needs a **filterable** grid with scrolling previews, so the work section keeps that.
