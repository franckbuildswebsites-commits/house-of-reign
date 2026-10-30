// ─────────────────────────────────────────────────────────────
//  Project cards in "Recent work" (the grid under the featured case study), in this order.
//
//  Fields:
//    id           unique, lowercase-with-dashes
//    name         client / project name
//    category     id from `categories` below (drives the filter tabs)
//    tag          "Client" | "Concept" | "Product" (only "Concept" is shown on the card)
//    url          live site; the whole card opens it in a new tab
//    full         full-page desktop screenshot, 720px wide WebP in /public/portfolio/,
//                 with its pixel size (the card scrolls through it on hover)
//    published    false = hidden
//  To refresh screenshots: capture the page at 1440px wide (full page), resize to 720px wide.
// ─────────────────────────────────────────────────────────────

// Filter tabs above the project grid, in this order ("All" is added automatically).
// Add a category here, then set `category` on its projects. Tabs with no projects are hidden.
export const categories = [
  { id: "food", label: "Food & Drink" },
  { id: "retail", label: "Retail & Hobby" },
  { id: "professional", label: "Professional Services" },
];

const full = (id, height) => ({ src: `/portfolio/${id}-full.webp`, width: 720, height });

export const projects = [
  {
    id: "wicked-bread",
    name: "Wicked Bread Co.",
    category: "food",
    tag: "Concept",
    url: "https://wicked-bread-co.pages.dev",
    full: full("wicked-bread", 2595),
    published: true,
  },
  {
    id: "ppf-comics",
    name: "Past Present Future Comics",
    category: "retail",
    tag: "Concept",
    url: "https://ppf-comics.franckbuildswebsites.workers.dev",
    full: full("ppf-comics", 3873),
    published: true,
  },
  {
    id: "token-forge",
    name: "Token Forge",
    category: "retail",
    tag: "Client",
    url: "https://www.tokenforgecgc.com",
    full: full("token-forge", 3198),
    published: true,
  },
  {
    id: "champions4character",
    name: "Champions4Character",
    category: "professional",
    tag: "Client",
    url: "https://celebrated-dasik-06c87b.netlify.app",
    full: full("champions4character", 5732),
    published: true,
  },
  {
    id: "mm-casino-party",
    name: "MM Casino Party",
    category: "professional",
    tag: "Client",
    url: "https://mmcasinoparty.com",
    full: full("mm-casino-party", 4443),
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
  description: "One bilingual site for three brands: a VA agency, an event planner and a volunteer group.",
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
  highlights: ["3 brands, 1 site", "English + Spanish", "Smart contact routing", "Built mobile-first"],
  published: true,
};
