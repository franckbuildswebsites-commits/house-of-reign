// ─────────────────────────────────────────────────────────────
//  Case studies shown in "Recent work", in this order.
//
//  Fields:
//    id           unique, lowercase-with-dashes
//    name         client / project name
//    description  one line
//    tag          "Client" | "Concept" | "Product"
//    url          live site ("" = no "Visit site" button)
//    address      text for the browser bar when there's no url
//    desktop      1440×900 screenshot in /public/portfolio/ (WebP)
//    mobile       390×844 screenshot in /public/portfolio/ (WebP)
//    before       optional old-site screenshot → adds a before/after slider
//    bullets      3 short lines: what I built
//    published    false = hidden
//  Anything in [CONFIRM: …] is a placeholder for Francisco to fill in.
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    id: "ppf-comics",
    name: "Past Present Future Comics",
    description: "A concept site for a two-location comic shop.",
    tag: "Concept",
    url: "",
    address: "concept preview",
    desktop: "/portfolio/ppf-comics-desktop.webp",
    before: "/portfolio/ppf-before.webp",
    mobile: "/portfolio/ppf-comics-mobile.webp",
    bullets: [
      "Comic-era timeline hero with an animated UFO mascot",
      "“Wall Books” grails showcase the owner updates from their phone",
      "Events with one-tap Google & Apple Calendar buttons",
    ],
    published: true,
  },
  {
    id: "token-forge",
    name: "Token Forge",
    description: "Trading card shop — a mobile-first rebuild of their old site-builder page.",
    tag: "Client",
    url: "https://www.tokenforgecgc.com",
    desktop: "/portfolio/token-forge-desktop.webp",
    mobile: "/portfolio/token-forge-mobile.webp",
    bullets: [
      "Events calendar they update from a Google Sheet",
      "Mobile-first redesign replacing a GoDaddy builder site",
      "Contact form that goes straight to their inbox",
    ],
    published: true,
  },
  {
    id: "champions4character",
    name: "Champions4Character",
    description: "Nonprofit youth sports camps site, rebuilt to drive donations & sponsorships.",
    tag: "Client",
    url: "https://champions4character.org",
    desktop: "/portfolio/c4c-after.webp",
    before: "/portfolio/c4c-before.webp",
    mobile: "/portfolio/c4c-after-mobile.webp",
    bullets: [
      "Full website build: design, development and launch",
      "Donate and sponsor buttons on every page",
      "Camps, programs and family pages that read well on a phone",
    ],
    published: true,
  },
  {
    id: "mm-casino-party",
    name: "MM Casino Party",
    description: "Website for a casino night entertainment company.",
    tag: "Client",
    url: "https://mmcasinoparty.com",
    desktop: "/portfolio/mm-casino-party-desktop.webp",
    mobile: "/portfolio/mm-casino-party-mobile.webp",
    bullets: [
      "Full website build: design, development and launch",
      "Quote requests and tap-to-call front and center",
      "Games, gallery and how-it-works pages that sell the night",
    ],
    published: true,
  },
  {
    id: "reign",
    name: "Reign",
    description: "My own booking software for event vendors.",
    tag: "Product",
    url: "https://takereign.com",
    desktop: "/portfolio/reign-desktop.webp",
    mobile: "/portfolio/reign-mobile.webp",
    bullets: [
      "Full software build: design, front end and back end",
      "Quote-to-deposit booking flow for event vendors",
      "Every booking tracked from inquiry to contract to deposit",
    ],
    published: true,
  },
];

// Flagship case study shown above everything else in "Recent work".
//   url        live site; "" hides the "View live site" button
//   address    text for the browser bar
//   screens    desktop: 1440×900, mobile: 390×844 (WebP in /public/portfolio/)
//   Its testimonial lives in testimonials.js with project: "go-digital-hero".
export const featured = {
  id: "go-digital-hero",
  name: "Go Digital Hero",
  description:
    "One website for three brands: a virtual assistant agency, an event planning company, and a volunteer organization. Fully bilingual.",
  url: "",
  address: "godigitalhero.com",
  screens: {
    desktop: { src: "/portfolio/gdh-home-desktop.webp", alt: "Go Digital Hero home page" },
    mobile: { src: "/portfolio/gdh-home-mobile.webp", alt: "Go Digital Hero home page on a phone" },
    mobileAlt: { src: "/portfolio/gdh-es-mobile.webp", alt: "Go Digital Hero home page in Spanish on a phone" },
    pages: [
      { src: "/portfolio/gdh-event-desktop.webp", label: "Event Hero", alt: "Event Hero page" },
      { src: "/portfolio/gdh-volunteer-desktop.webp", label: "Volunteer Hero", alt: "Volunteer Hero page" },
    ],
  },
  highlights: [
    "3 brands, 1 site: each division gets its own page and color theme",
    "Full English + Spanish with a language toggle",
    "Smart contact form that routes each inquiry to the right division",
    "Booking and newsletter kept working through the client's existing tools",
    "Built from scratch, mobile-first",
  ],
  published: true,
};
