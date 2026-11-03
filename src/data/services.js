// Every build includes one revision round; extra changes are billed hourly.
export const HOURLY_RATE = "$75/hr";
export const REVISION_NOTE = "Every build includes 1 revision round (up to 2 hours)";

// `project` pre-selects "What do you need help with?" in the contact form.
export const services = [
  {
    name: "Launch Page",
    perfectFor: "New businesses and single offers.",
    priceLabel: "Starting at",
    price: "$750",
    unit: "",
    features: ["One-page site", "Mobile-ready", "Contact form"],
    timeline: "~1 week",
    style: "light",
  },
  {
    name: "Business Site",
    perfectFor: "Businesses that take bookings or donations.",
    priceLabel: "Starting at",
    price: "$1,200",
    unit: "",
    features: ["Up to 5 pages", "Booking or donation links", "Basic SEO"],
    timeline: "~2 weeks",
    style: "dark",
  },
  {
    name: "Custom Build",
    perfectFor: "Ordering, payments, memberships or 5+ pages.",
    priceLabel: "Starting at",
    price: "$2,500",
    unit: "",
    features: ["Everything in the other plans", "Custom features", "Third-party setup", "Priority timeline"],
    timeline: "Priority",
    style: "accent",
    cta: "Request a quote",
    project: "Custom Build",
  },
];

// Site upkeep on its own: shown as one small line under the website plans, not a card.
export const SITE_CARE = "$125/month";

// Monthly plans (MonthlyPlans.jsx). `featured` gets the dark card. `project` pre-selects the plan
// in the contact form.
export const monthlyPlans = [
  {
    name: "Presence",
    tagline: "Look the part, every week.",
    line: "For businesses ready to stop posting when they remember and start showing up like the best spot in town.",
    price: "$750",
    features: [
      "1 on-site content shoot per month",
      "8 posts + 4 Reels, edited and scheduled",
      "Google Business Profile posts + review replies",
      "Website upkeep included",
      "Monthly recap of your results",
    ],
    project: "Presence",
  },
  {
    name: "Growth",
    tagline: "Become the place people talk about.",
    line: "Twice the content, a monthly strategy call, and a plan for what's next. For businesses ready to grow.",
    price: "$1,200",
    features: [
      "2 on-site content shoots per month",
      "12 posts + 8 Reels, edited and scheduled",
      "Google Business Profile posts + review replies",
      "Website upkeep included",
      "Monthly recap + strategy call",
    ],
    featured: true,
    project: "Growth",
  },
];

export const MONTHLY_NOTE =
  "3-month minimum · Billed monthly · You own your accounts and content · Limited spots so every client gets real attention.";
