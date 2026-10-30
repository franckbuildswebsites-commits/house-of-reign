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
