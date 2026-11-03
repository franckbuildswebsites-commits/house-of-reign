# Notes

## Where we left off (2026-11-03)

**Live state**
- Production (`main`): https://house-of-reign.franckbuildswebsites.workers.dev. Pushes to `main` deploy in about a minute.
- Preview (`redesign-v2`): https://redesign-v2-house-of-reign.franckbuildswebsites.workers.dev, uploaded by hand with `npm run build && npx wrangler versions upload --preview-alias redesign-v2`.
- `redesign-v2` was merged into `main` at the end of the day, so both match.

**What shipped today**
- Monthly plans section after the website plans, also in the menu: Presence ($750/mo) and Growth ($1,200/mo, the dark card), with the new copy, taglines and one-liners.
- Website bundle deal:
  - Presence takes 50% off a new site. Growth includes a Launch Page or Business Site, and a Custom Build drops to $1,200 ($1,300 off).
  - Plans with a site run 6 months, without a site 3 months.
  - It shows on the plan cards, in a banner over the website plans, in the Get started summary and in the lead email.
- Site Care is one small line under the website plans ("Just need site upkeep? Site Care is $125/month."), no longer a card.
- Services are grouped into "Build" (Websites card plus seven one-time services) and "Grow, every month" (content shoots, social media management, Google Business Profile, website upkeep) with a "See monthly plans" link. Every card opens Get started with its answer picked. The hero slider lists both groups.
- Get started replaced the contact form (same `#contact` anchor, same Web3Forms key):
  - One question per screen, then a package builder: one website, one monthly plan, any add-ons, preselected from the recommendation rules.
  - A live summary with counting totals, pinned to the bottom on phones and beside the choices on desktop.
  - Contact details come last, then a confirmation with every answer.
  - Plan buttons across the site open it on the recommendation with that plan picked. Both "Message us" pills now lead to it.
- How it works is a plain-scroll timeline with new copy. An indigo line fills the rail as you scroll, and each step darkens and rises once when the line reaches it. This is the one fade the user asked for, so don't add fades elsewhere.
- "Message us" pill: the icon leaves through the pill's right edge, the text slides right and a copy comes in from the left, then reverses on leave. Shared component `IconPill`.
- 3 FAQ entries for monthly plans (Instagram access, DMs, website first). They sit behind "More questions".
- Still in from before: Recent Work grid removed, Go Digital Hero featured case study kept, one scroll offset for every jump target.

**Pending**
- Connect takereign.com, with www as main and the root redirecting. It currently serves a different site, "Reign - Booking Software", so first confirm who controls the domain. Canonical, sitemap and share URLs already point to takereign.com.
- Swap in the blob logo where placeholders remain: the crown is still the fallback in the founder avatar (`Photo.jsx`), shown because `public/me.jpg` is missing. Add the photo or use the blob mark.
- Real Google reviews or testimonials, if there are any. Only the Go Digital Hero quote is on the site.
- Calendly: set `CALENDLY_URL` in `src/config.js`. Until then "Book a quick call" after a submission says "Call us" and dials the phone.
- Decide whether Launch Page and Business Site should read "from" in the package builder. The Pricing section says "starting at" for all three, but the builder treats only Custom Build as a from-price, as requested.
- Confirm the Growth + Custom Build deal: it's built as $1,300 off (Custom drops to $1,200), as specified. If the intent was "the Business Site's value comes off", it should be $1,200 off.

**Broken or half-done**
- **The Get started email is unconfirmed for the final build.** Two real submissions from the preview arrived earlier today. After that, Web3Forms started rejecting every request from this Mac with 403 "Use our API in client side… Pro plan is required", most likely after repeated automated test sends. It was still blocked at the end of the day, so send one real test from a phone on mobile data and check the inbox. If that fails too, it's a Web3Forms account issue.
- "Get a text" in the closing section has still never been tested for real.
- Nothing has been tested on a physical phone: the flow's pinned summary, the timeline scroll and the pill animation were only checked in emulated Chrome and Safari.
- The footer's link list doesn't include Monthly plans yet (the menu does).
- The closing section's fan still shows Wicked Bread and Past Present Future screenshots (decorative, no links).
- The header logo sits at 60px while page content uses a 120px margin (requested, but uneven).
- `src/components/Parallax 2.jsx` is an untracked stray copy, not committed. Safe to delete.
