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
    name: "Site Care",
    perfectFor: "If you'd rather not touch your site.",
    priceLabel: "Monthly",
    price: "$125",
    unit: "/month",
    features: ["Hosting oversight", "Monthly updates", "Up to 2 update rounds a month"],
    timeline: "Ongoing",
    style: "light",
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
