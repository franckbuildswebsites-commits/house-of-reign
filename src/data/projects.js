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
    id: "token-forge",
    name: "Token Forge",
    description: "Trading card shop — a mobile-first rebuild of their old site-builder page.",
    tag: "Client",
    url: "https://www.tokenforgecgc.com",
    desktop: "/portfolio/token-forge-desktop.webp",
    mobile: "/portfolio/token-forge-mobile.webp",
    before: "/portfolio/tokenforge-before.png",
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
    desktop: "/portfolio/champions4character-desktop.webp",
    mobile: "/portfolio/champions4character-mobile.webp",
    bullets: ["[CONFIRM: what you built #1]", "[CONFIRM: what you built #2]", "[CONFIRM: what you built #3]"],
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
    bullets: ["[CONFIRM: what you built #1]", "[CONFIRM: what you built #2]", "[CONFIRM: what you built #3]"],
    published: true,
  },
  {
    id: "ppf-comics",
    name: "Past Present Future Comics",
    description: "A concept site for a two-location comic shop.",
    tag: "Concept",
    url: "",
    address: "concept preview",
    desktop: "/portfolio/ppf-comics-desktop.webp",
    mobile: "/portfolio/ppf-comics-mobile.webp",
    bullets: [
      "Comic-era timeline hero with an animated UFO mascot",
      "“Wall Books” grails showcase the owner updates from their phone",
      "Events with one-tap Google & Apple Calendar buttons",
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
    bullets: ["Quote-to-deposit booking flow for event vendors", "[CONFIRM: what you built #2]", "[CONFIRM: what you built #3]"],
    published: true,
  },
];
