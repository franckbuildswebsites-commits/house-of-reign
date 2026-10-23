// ─────────────────────────────────────────────────────────────
//  "Work": projects grouped by industry, so a visitor finds work
//  in their own field. Categories show in this order; a category
//  with no published projects is hidden.
//
//  Project fields:
//    id           unique, lowercase-with-dashes
//    category     id from `categories` below
//    name         client / project name
//    kind         what the business is, e.g. "Cinnamon bread bakery"
//    description  one line about the project
//    tag          "Live site" | "Concept"
//    url          link for the button ("" = no button)
//    desktop      1440×900 screenshot in /public/portfolio/ (WebP)
//    mobile       390×844 screenshot (saved at 2×, 780×1688)
//    before       optional old-site screenshot → adds an "Old site" toggle
//    facts        2–4 short lines: what I built
//    featured     true = the large case study, with its testimonial
//                 (testimonials.js, project: <id>)
//    published    false = hidden
//  Screenshots are taken from the live sites with Playwright.
// ─────────────────────────────────────────────────────────────

export const categories = [
  { id: "professional", name: "Professional Services", blurb: "Consultants, agencies and service businesses." },
  { id: "food", name: "Food & Drink", blurb: "Bakeries, cafés and restaurants." },
  { id: "retail", name: "Retail & Hobby", blurb: "Shops with a counter, a calendar and regulars." },
  { id: "events", name: "Events & Nonprofits", blurb: "Event companies and community organizations." },
];

export const projects = [
  {
    id: "go-digital-hero",
    category: "professional",
    name: "Go Digital Hero",
    kind: "Operations support, event planning and volunteers",
    description:
      "One website for three businesses: a virtual assistant agency, an event planning company and a volunteer organization.",
    tag: "Live site",
    url: "https://godigitalhero.com",
    desktop: "/portfolio/gdh-desktop.webp",
    mobile: "/portfolio/gdh-mobile.webp",
    facts: [
      "Three brands on one site, each with its own page and colors",
      "Every page in English and Spanish, with a language switch",
      "One contact form that sends each inquiry to the right brand",
      "Booking and newsletter kept on the client's existing tools",
    ],
    featured: true,
    published: true,
  },
  {
    id: "wicked-bread",
    category: "food",
    name: "Wicked Bread Co.",
    kind: "Cinnamon bread bakery",
    description: "A site with the shop's witchy personality, built around ordering.",
    tag: "Concept",
    url: "https://wicked-bread-co.pages.dev",
    desktop: "/portfolio/wicked-bread-desktop.webp",
    mobile: "/portfolio/wicked-bread-mobile.webp",
    facts: [
      "DoorDash and Uber Eats buttons up top, plus an Order / Call bar on phones",
      "Full menu with prices, written in the shop's own voice",
      "Open or closed right now, from the shop's real hours",
    ],
    published: true,
  },
  {
    id: "token-forge",
    category: "retail",
    name: "Token Forge",
    kind: "Trading card and game shop",
    description: "A mobile-first rebuild of their old GoDaddy builder page.",
    tag: "Live site",
    url: "https://www.tokenforgecgc.com",
    desktop: "/portfolio/token-forge-desktop.webp",
    mobile: "/portfolio/token-forge-mobile.webp",
    facts: [
      "Events calendar the owners update from a Google Sheet",
      "Today's hours and events on the home page",
      "Contact form that goes straight to their inbox",
    ],
    published: true,
  },
  {
    id: "ppf-comics",
    category: "retail",
    name: "Past Present Future Comics",
    kind: "Comic shop with two locations",
    description: "A redesign for a comic shop that has been open for over 40 years.",
    tag: "Concept",
    url: "",
    desktop: "/portfolio/ppf-comics-desktop.webp",
    mobile: "/portfolio/ppf-comics-mobile.webp",
    before: "/portfolio/ppf-before.webp",
    facts: [
      "Comic-era timeline across the top of the home page",
      "“Wall Books” showcase the owner updates from their phone",
      "Events with one-tap Google and Apple Calendar buttons",
    ],
    published: true,
  },
  {
    id: "mm-casino-party",
    category: "events",
    name: "MM Casino Party",
    kind: "Casino night entertainment",
    description: "Designed and built from scratch around getting quote requests.",
    tag: "Live site",
    url: "https://mmcasinoparty.com",
    desktop: "/portfolio/mm-casino-party-desktop.webp",
    mobile: "/portfolio/mm-casino-party-mobile.webp",
    facts: [
      "Quote requests and tap-to-call on every screen",
      "Games, gallery and how-it-works pages that sell the night",
    ],
    published: true,
  },
  {
    id: "champions4character",
    category: "events",
    name: "Champions4Character",
    kind: "Nonprofit youth sports camps",
    description: "Rebuilt to bring in donations and sponsorships.",
    tag: "Live site",
    url: "https://champions4character.org",
    desktop: "/portfolio/c4c-desktop.webp",
    mobile: "/portfolio/c4c-mobile.webp",
    before: "/portfolio/c4c-before.webp",
    facts: [
      "Donate and sponsor buttons on every page",
      "Camps, programs and family pages that read well on a phone",
    ],
    published: true,
  },
];
