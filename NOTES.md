# Notes

## Where we left off (2026-11-01)

**Live state**
- Production (`main`, `90776c8`): https://house-of-reign.franckbuildswebsites.workers.dev
- Preview (`redesign-v2`): https://redesign-v2-house-of-reign.franckbuildswebsites.workers.dev
- `redesign-v2` is ahead of `main` by the two fixes below, plus these notes.

**What changed this session**
- Apple-style redesign, new hero with a WebGL liquid glass drop and services slider, grouped services, spring motion.
- Floating black-pill nav and hero type matched to averlo.co's measurements (`REFERENCE.md`).
- Final Reign Studios logo, favicons, app icons and share image (`public/brand/`).
- Copy moved to we/us and location-neutral, with "Based in South Florida" once, in the footer.
- Recent Work section removed, Go Digital Hero case study kept, merged to `main` and live.
- On `redesign-v2` only, not in production yet:
  - One scroll offset for every jump target (`10a01de`).
  - How it works smoothness and number cutoff fix (`296b3e5`).

**Pending**
- Try the two fixes on a real phone, then merge `redesign-v2` to `main` (a push to `main` deploys production).
- Connect takereign.com, with www as main and the root redirecting. It currently serves a different site, "Reign - Booking Software", so first confirm who controls it. Canonical, sitemap and share URLs already point to takereign.com.
- Send a real test through the contact form and "Get a text".

**Broken or half-done**
- `public/me.jpg` (founder photo) is missing: it returns 404 and the About avatar shows a fallback crown.
- The jump-offset bug was never reproduced in testing, so confirm it on the device where it was seen.
- Nothing has been tested on a physical phone.
- The closing section's fan still shows Wicked Bread and Past Present Future screenshots (decorative, no links).
- Crown artwork remains in the founder avatar fallback and a process illustration.
- The header logo sits at 60px while page content uses a 120px margin (requested, but uneven).
- `src/components/Parallax 2.jsx` is an untracked stray copy, not committed. Safe to delete.
