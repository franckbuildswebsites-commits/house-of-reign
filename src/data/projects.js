// The featured case study.
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
