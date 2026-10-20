// Every build includes one revision round; extra changes are billed hourly.
export const HOURLY_RATE = "$75/hr";
export const REVISION_NOTE = "1 revision round included (one list of changes, up to 2 hours)";

// `project` pre-selects "What do you need help with?" in the contact form.
export const services = [
  {
    name: "Launch Page",
    perfectFor: "New businesses & single offers.",
    priceLabel: "Starting at",
    price: "$750",
    unit: "",
    features: ["One-page site", "Mobile-ready", "Contact form", REVISION_NOTE],
    timeline: "~1 week",
    style: "light",
  },
  {
    name: "Business Site",
    perfectFor: "Established businesses that need bookings or donations.",
    priceLabel: "Starting at",
    price: "$1,200",
    unit: "",
    features: ["Up to 5 sections/pages", "Booking or donation links", "Basic SEO", REVISION_NOTE],
    timeline: "~2 weeks",
    style: "dark",
  },
  {
    name: "Site Care",
    perfectFor: "Anyone who'd rather not touch their website.",
    priceLabel: "Monthly",
    price: "$125",
    unit: "/month",
    features: ["Hosting oversight", "Monthly updates (events, photos, text)", "Up to 2 update rounds per month"],
    timeline: "Ongoing",
    style: "light",
  },
  {
    name: "Custom Build",
    perfectFor:
      "Businesses that need more than 5 pages, online ordering, booking or payment systems, memberships, or connecting third-party tools.",
    priceLabel: "Starting at",
    price: "$2,500",
    unit: "",
    features: [
      "Everything in the other plans",
      "Custom features",
      "Third-party setup",
      "Priority timeline",
      REVISION_NOTE,
    ],
    timeline: "Priority",
    style: "accent",
    cta: "Request a quote",
    project: "Custom Build",
  },
];
