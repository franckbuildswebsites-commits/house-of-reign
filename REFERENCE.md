# Design reference: averlo.co (studied 2026-10-29)

The bar for `redesign-v2` (Reign Studio). Second study pass on 2026-10-29: menu, panel transitions, process, closing section, footer. We borrow **techniques** only: no text, logo, images or exact layouts.
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
| Sticky stacked panels | Pinned panels; previous one scales/tilts back as the next covers it | Full-screen pinned panels; rotateX + fade via Framer Motion `useScroll` |
| Scroll-scrubbed text | Words go from dim to full as you scroll | Statement paragraph, per-word opacity tied to scroll (Framer Motion `useScroll`) |
| Marquee | Infinite horizontal/vertical drift | Hero wall drifting vertically; two work rows drifting horizontally (CSS, transform only) |
| Hover states | 0.24s `cubic-bezier(0.2,0.8,0.2,1)` on color/bg/border; cards lift, images scale slightly | Same curve; cards lift, screenshot scrolls inside its frame |
| Accordion | Height + icon rotation, one open | Framer Motion `AnimatePresence` height animation |
| Filter/state changes | Pills with a sliding active background | Sliding active pill (`layoutId`) + animated grid reflow (`layout`) |
| Footer words | Words un-blur sequentially when in view | Closing "Text me" headline reveal |

Easing is consistent everywhere (`cubic-bezier(0.2, 0.8, 0.2, 1)`), durations are short for hovers (0.16–0.24s) and
long for scroll pieces (0.6–1s). Nothing bounces.

## What we deliberately don't copy

- Their text, logo, project images, light-first theme and gradient colors. Our panels use our own orange / rust / cream / ink palette.
- GSAP: we get the same scroll-linked motion from Framer Motion (`useScroll`) and CSS, which keeps mobile Lighthouse ≥ 90.

## Checklist: Averlo → Reign

Status: ✅ done · ◐ partly · ✗ not done (reason given)

### Site-wide

| Averlo | Reign version | Status |
| --- | --- | --- |
| Fixed header: logo left, floating centered pill, solid CTA right | Crown + REIGN wordmark, centered pill, "Start a project" | ✅ |
| "Menu" in the pill opens a full-screen menu | Full-screen sheet wipes down, big centered links rise in, glow background, "Text me" pill, email | ✅ |
| Light/dark toggle in the pill | Sun/moon toggle; choice saved and applied before first paint | ✅ |
| Language picker (flags) in the pill | Not built: the site would need full Spanish copy you've approved | ✗ |
| Search icon in the menu | Not built: one-page site, nothing to search | ✗ |
| Page preloader (spinning logo) | Not built on purpose: it delays the first paint and would cost the Lighthouse ≥ 90 target | ✗ |
| Smooth scrolling (Lenis) | Lenis on desktop; native scrolling on touch screens and with reduced motion | ✅ |
| Custom cursor | Trailing dot (difference blend) that swells over links and buttons; real cursor stays | ✅ |
| Floating "Message us" pill, bottom-center | "Text me" pill, bottom-center; steps aside over the contact form and closing section | ✅ |
| 60px / 20px side gutters, 80px headlines, −0.04em tracking, line 2 dimmed | Same scale and spacing in Clash Display | ✅ |

### Hero

| Averlo | Reign version | Status |
| --- | --- | --- |
| Tilted 3D wall of their own projects across the top | Tilted wall of our screenshots, columns drifting up/down | ✅ |
| Service tags stacked on the right, fading out | Our 10 services ticking upward on the right (desktop) | ✅ |
| Small intro line above the headline | "Reign Studio designs and builds… across South Florida." | ✅ |
| Two-line headline bottom-left, line 2 dimmed | "Websites that get you / more clients.", rises word by word; line 2 orange (brand) instead of grey | ✅ |
| "Scroll down" cue bottom-right | Same | ✅ |

### Services

| Averlo | Reign version | Status |
| --- | --- | --- |
| Bridge: label left, vertical hairline, big two-line heading right | "More than websites. / Everything matches." | ✅ |
| One full-screen, pinned panel per service with a gradient | 6 panels: Websites, Google Business Profile, Menus & signage, Social posts, Logos/flyers/cards, Ordering & booking | ✅ |
| Covered panel tilts back in 3D (rotateX ≈ 24°, bottom origin) and fades | Same, scroll-linked | ✅ |
| Title left, giant number right | Same | ✅ |
| Two hairline boxes: bullet label + indented lead with a quieter tail | Same, our copy | ✅ |
| Lead tail brightens as you scroll | Tail is static two-tone in panels; the scroll-lit effect is used on the About statement | ◐ |
| Centered pill button ("Explore in detail") | "Start a project" / "Text me about it" | ✅ |
| Live UI mockup filling the rest of the panel | HTML mockups: website + phone, Google listing, menu board, Instagram post, flyer/logo/cards, booking widget | ✅ |

### Work

| Averlo | Reign version | Status |
| --- | --- | --- |
| Bridge: heading left, small text bottom-right, hairline under the right half | "Recent work. / Built to sell." | ✅ |
| Two rows of large rounded cards drifting in opposite directions | Same with our projects; pause on hover, name + arrow on hover, opens the site | ✅ |
| (not on Averlo) | Go Digital Hero case study and the filterable grid with scrolling previews (your brief) | ✅ |

### Process

| Averlo | Reign version | Status |
| --- | --- | --- |
| Bridge: label left, heading right | "How it works" · "Mockup to launch. / Four simple steps." | ✅ |
| Pinned stage driven by scroll | Same, 4 steps | ✅ |
| Step list on the left; active step becomes a pill, done steps colored | Same (orange squares) | ✅ |
| Giant step number bottom-left, swapping | Same, slides up | ✅ |
| Media card in the middle that flies out and the next flies in | HTML illustrations per step (call, build checklist, "Live.", care chat) | ✅ |
| Step title + text top-right | Title, timing, You / Me | ✅ |

### FAQ

| Averlo | Reign version | Status |
| --- | --- | --- |
| Narrow label column with a full-height vertical hairline | Same | ✅ |
| Two-line heading, then full-width hairline rows | "Good questions. / Straight answers." + our 11 questions | ✅ |
| Thin "+" that turns into "−", height animation, one open at a time | Same | ✅ |

### Closing call to action

| Averlo | Reign version | Status |
| --- | --- | --- |
| Meta row: team, services, domain, founding year | Reign Studio, 4 services, takereign.com, "Hablamos español" (no founding year to show) | ✅ |
| Fanned 3D arc of project screenshots | 20 of our screenshots fanning out when the section scrolls in | ✅ |
| Big two-line headline bottom-left | "Your next customer / is looking right now." | ✅ |
| Split block: "Text us directly" phone field + big "Get a text" | Same: sends the number to you via Web3Forms; also shows (754) 277-6110 | ✅ |
| Other half: alternative action ("Book a demo") | "or call me." (754) 277-6110 | ✅ |

### Footer

| Averlo | Reign version | Status |
| --- | --- | --- |
| Dark, with a large blurred glowing shape | Dark with drifting orange glow | ✅ |
| Huge stacked headline, one word changing with a blur | "Long / live / your / business." — last word cycles café, shop, salon, brand | ✅ |
| Office blocks with clock icons | "South Florida" with live local time; "Text or call" | ✅ |
| Uppercase nav list | Same | ✅ |
| "Contact us" + big underlined email | "Email me" + email | ✅ |
| Social icons | Not built: no social accounts in `src/config.js` yet (add your Instagram and it can go here) | ✗ |
| "Privacy and cookies" link | Not built: there's no privacy page yet | ✗ |

### Motion and hover details

| Averlo | Reign version | Status |
| --- | --- | --- |
| Headlines rise/reveal word by word | Hero on first paint (CSS); every section heading on scroll | ✅ |
| Blocks fade up on scroll | `Reveal` | ✅ |
| Buttons: 0.24s color/background ease, `cubic-bezier(0.2,0.8,0.2,1)` | Same curve everywhere; pills also scale slightly | ✅ |
| Card hovers | Marquee cards zoom + reveal name; grid cards lift and scroll the screenshot | ✅ |
| Reduced motion | Everything still: no smooth scroll, wall, tilt, marquee, ticker, fan animation or word cycling | ✅ (ours) |

## Type scale and density: measured (2026-10-30)

Computed styles from Playwright at 1440px / 390px (median of each role; desktop / phone).
"Before" is commit `f1341f4`, "after" is this polish pass.

| Role | Averlo | Reign before | Reign after |
| --- | --- | --- | --- |
| Hero headline (h1) | 80 / 40px · 600 · lh 1.0 · −0.04em | 89 / 43px · 600 · lh 0.95 | **80 / 40px** · 600 · lh 1.0 · −0.045em |
| Section headings (h2) | 80 / 48px · 500 · lh 1.0 | 80 / 41.6px · 500 | **80 / 44px** · 600 (bolder) · lh 1.0 |
| Panel / card titles (h3) | 55 and 40px · 500 | 17–84px, median 24 / 20px | **55 / 36px** panels, 40 / 28px cards, 28 / 22px small cards |
| Lead text | 22px · 500 · lh 1.0 | 17px · 400 · lh 1.65 | **22 / 18px** · 500 · lh 1.2 |
| Body | 14–22px | 17px · lh 1.65 | **16px** · lh 1.55 |
| Labels, small text | 14px · 400 | 11–14px, uppercase, tracked | **14px** · 500, sentence case |
| Buttons | 14px, pill | 14–16px, 48px tall | **15px**, pill, **44px** min height |
| Headline max width | 740px | 874px | 783px |
| Bridge (section intro) padding | ≈ 78px / 48px | 64px | **80px / 48px** |
| Gap after each section | — | 112–144px, uneven | **128px / 80px**, same everywhere |
| Visible copy, whole page* | 478 words | 1,360 words | **834 words (−39%)** |

\* Readable text a visitor sees: excludes decorative mockups, screen-reader-only text, collapsed answers and
duplicated marquee cards. Averlo's figure includes 244 words of repeated project names in its work rows.

Visible words per section, before → after: services 209 → 164 · work 199 → 157 · about 65 → 33 ·
pricing + promises 225 → 149 · FAQ 355 → 43 (answers collapsed, 6 of 11 shown) · contact 141 → 134 (step 1 of 2) ·
closing 48 → 36.

Clash Display is wider than Averlo's SF Pro, so on phones our h2 (44px) and panel titles (36px) sit slightly
under Averlo's pixel sizes to take up the same visual width.

## Copy cut in the polish pass

- **Hero:** service tags 10 → 8 (dropped "Business cards", "Booking setup"; "Website redesign" → "Redesigns").
- **Services intro:** "Design for local businesses: your site, your Google listing, your menu and your feed, all in one
  look. Graphics are priced per job." → "One look, everywhere. Graphics priced per job."
- **Service panels:** each line trimmed to label + one short phrase, e.g. "Fast sites built to bring in customers, not just
  look nice." → "Fast sites built to bring in customers."; "Set up and polish your Google listing so locals find
  you on Maps." → "Get found by locals on Google Maps."; "Connect DoorDash, Square, Calendly or your booking app to
  your site." → "DoorDash, Square, Calendly, connected to your site."
- **Work intro:** "Custom sites for local shops, restaurants and brands. Hover a card to pause, click to visit." →
  "Real sites for local businesses."
- **Go Digital Hero:** description shortened to "One bilingual site for three brands: a VA agency, an event planner and
  a volunteer group."; five long highlights → four chips; dropped "Booking and newsletter kept working through the
  client's existing tools".
- **About:** removed the second paragraph ("That's me. I speak English and Spanish, and when you work with Reign Studio
  you talk to the person building your site — no account managers, no runaround."); "Hablamos español" moved into
  the signature line. Statement shortened by 6 words.
- **Pricing:** headline "Simple, upfront pricing." → "Simple pricing."; removed "Pick a starting point. We'll shape
  the details together." and "Every project starts with a free mockup call."; the revision-round note now appears once
  instead of in 3 cards; plan lines shortened (Custom Build: "Businesses that need more than 5 pages, online
  ordering, booking or payment systems, memberships, or connecting third-party tools." → "Ordering, payments,
  memberships or 5+ pages."); payment paragraph → "Pay in full, or 50% to start and 50% at launch."; the separate
  four-promise section merged into one row under the plans.
- **Process:** removed "You always know what's next, and who's doing it."; each step's You/Me line shortened; dropped
  "Pay any remaining balance" (covered in Pricing).
- **FAQ:** every answer shortened (≈ 45% fewer words); first 6 questions shown, the other 5 behind "More questions".
- **Contact:** intro "Tell me a bit about your business. I'll reply within 24 hours to set up your free mockup call."
  → "I reply within 24 hours."; removed "No commitment. I'll text or email you within 24 hours." and "Calls, texts,
  and feedback in English or Spanish."; the form is split into two steps (no questions removed).
- **Closing:** "Or text me yourself at (754) 277-6110. I reply within 24 hours." → "Or text (754) 277-6110";
  removed "English or español."

## Weight, typeface and spacing: measured (2026-10-30, "skinny and airy" pass)

Playwright, computed styles on every visible text element at 1440px and 390px. "Before" = Clash Display +
DM Sans version, "after" = this pass.

### Typefaces and weights

| Role | Averlo | Reign before | Reign after |
| --- | --- | --- | --- |
| Typeface | **SF Pro** (self-hosted "sfPro"), one family for everything | Clash Display (headings) + DM Sans (text) | **Inter Tight** (closest free match to SF Pro), one variable file for everything |
| Hero headline | 600 · −0.04em · lh 1.0 | 600 · −0.045em · lh 1.0 | **560** · −0.035em · lh 0.98 |
| Section headings | 500 · −0.04em · lh 1.0 | 600 · −0.045em | **500** · −0.035em · lh 1.0 |
| Panel / card titles | 500 · −0.04em | 600 · −0.035em | **500** · −0.025 to −0.032em |
| Lead text (22px) | 500 · lh 1.0 | 500 · DM Sans | **500 lead / 400 tail** · lh 1.2 |
| Small text, labels (14px) | 400 · lh 1.0–1.25 | 400–600 · lh 1.43–1.55 | **400** (500 for UI) · lh 1.3–1.4 |
| Buttons | 400–500 · 14px | 600 · 15px | **500** · 15px |
| Big step / panel numbers | 600 | 600 | 600 (unchanged, like Averlo) |
| Wordmark | — | Clash Display 600 | Inter Tight 600, −0.045em |

Inter Tight already has tighter default spacing than SF Pro, so −0.035em on our headings looks like Averlo's −0.04em.

### Lines, cards, spacing, text widths

| Measure | Averlo | Reign before | Reign after |
| --- | --- | --- | --- |
| Borders / dividers | 1px, 25–35% opacity | 1px, 12% opacity | 1px, 12% opacity (unchanged) |
| Shadows | none (transparent) | big soft shadow on mockups, pills, menu (0 30px 80px, 80%) | lighter (0 24px 60px, 55%) |
| Cards | image cards, no padding; one 25px panel | filled dark cards (pricing, case study, form), 24–56px padding | **no fill, hairline only**, 28–64px padding |
| Form fields | — | filled dark inputs, 1.5px borders | near-transparent, **1px** borders |
| Gaps between items | 8 / 10 / 15px | 8 / 10 / 12px | 8 / 10 / 12px (pricing cards 12 → 16px) |
| Space after each section | — | 128 / 80px | **160 / 104px** |
| Section intro padding | ≈ 78 / 48px | 80 / 48px | 80 / **64px** |
| Lead text width | max 640px | max 904px | **max 640px** |
| Small text width | max 360px | max 775px | **max 448px** (34ch rule) |
| Testimonial line width | — | ~900px, 41px text | **≤ 640px**, 36px (20px on phones) |
| Whitespace in each section, desktop | 85–89% | 66–92% | **74–93%** |
| Whitespace in each section, phone | 73–83% | 50–87% | **65–88%** |

### Contrast

All text passes WCAG AA in both themes at both widths (axe-core, 0 violations). Two changes to keep it so:
- **Orange panels:** the quieter half of each lead line is set in a lighter weight instead of a fainter colour (a fade light enough to show fails contrast on orange).
- **Light theme:** orange *text* switches to `#B4471A`, and the faded heading lines use 50% instead of 42%.
