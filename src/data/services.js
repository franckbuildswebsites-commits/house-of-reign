// Pricing. Every build includes one revision round; extra work is billed hourly.
// `project` pre-selects "What do you need help with?" in the contact form.
export const HOURLY_RATE = "$75/hr";

export const plans = [
  {
    name: "Launch Page",
    for: "One page for a new business or a single offer.",
    price: "$750",
    features: ["One-page site", "Contact form", "Built for phones first", "About 1 week"],
    cta: "Get a quote",
  },
  {
    name: "Business Site",
    for: "Up to 5 pages for a business that takes bookings or donations.",
    price: "$1,200",
    features: ["Up to 5 pages", "Booking or donation links", "Basic SEO", "About 2 weeks"],
    cta: "Get a quote",
  },
  {
    name: "Custom Build",
    for: "More than 5 pages, online ordering, booking or payment systems, memberships, or connecting other tools.",
    price: "$2,500",
    features: ["Everything in Business Site", "Custom features", "Third-party setup", "Priority timeline"],
    cta: "Request a quote",
  },
].map((p) => ({ ...p, project: p.name }));

export const care = {
  name: "Site Care",
  price: "$125",
  unit: "/mo",
  text: "I keep your site running and up to date: hosting oversight and up to 2 rounds of updates a month (events, photos, text).",
  project: "Site Care",
};

export const terms = `Every build includes 1 revision round (one list of changes, up to 2 hours). Extra work after that is ${HOURLY_RATE}. Your site and domain are in your name.`;
