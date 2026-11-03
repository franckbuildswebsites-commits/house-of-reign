import { Calendar, MapPin, Shield, Spark, Grid, MenuBoard, Flyer, IdCard } from "../components/Icons";

// Every build includes one revision round; extra changes are billed hourly.
export const HOURLY_RATE = "$75/hr";
export const REVISION_NOTE = "Every build includes 1 revision round (up to 2 hours)";

// `id` lets a plan button open the Get started flow with that plan picked (lib/utils selectPlan).
export const services = [
  {
    id: "launch",
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
    id: "business",
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
    id: "custom",
    name: "Custom Build",
    perfectFor: "Ordering, payments, memberships or 5+ pages.",
    priceLabel: "Starting at",
    price: "$2,500",
    unit: "",
    features: ["Everything in the other plans", "Custom features", "Third-party setup", "Priority timeline"],
    timeline: "Priority",
    style: "accent",
    cta: "Request a quote",
  },
];

// Site upkeep on its own: shown as one small line under the website plans, not a card.
export const SITE_CARE = "$125/month";

// Monthly plans (MonthlyPlans.jsx). `featured` gets the dark card. `project` pre-selects the plan
// in the Get started flow.
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
    id: "presence",
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
    id: "growth",
  },
];

export const MONTHLY_NOTE =
  "3-month minimum · Billed monthly · You own your accounts and content · Limited spots so every client gets real attention.";

// Smaller services (Services.jsx), grouped. Branding and Print also feed the Get started
// recommendation, so the from-prices live here once.
export const serviceGroups = [
  {
    label: "Online",
    items: [
      { name: "Online ordering & booking", line: "Orders and bookings in a few taps.", price: "From $150", Icon: Calendar },
      { name: "Google Business Profile", line: "Get found by locals on Google Maps.", price: "From $150", Icon: MapPin },
      { name: "Site care", line: "Hosting, updates and changes.", price: "$125/mo", Icon: Shield, href: "#pricing" },
    ],
  },
  {
    label: "Brand",
    items: [
      { name: "Logos & branding", line: "A simple mark that works everywhere.", price: "From $150", Icon: Spark },
      { name: "Social media posts", line: "On-brand templates, ready to post.", price: "5 templates from $100", Icon: Grid },
    ],
  },
  {
    label: "Print",
    items: [
      { name: "Menus & signage", line: "Print-ready boards and signs.", price: "From $100", Icon: MenuBoard },
      { name: "Flyers & posters", line: "Print that matches your brand.", price: "From $50", Icon: Flyer },
      { name: "Business cards", line: "Cards that match your logo.", price: "From $60, printing extra", Icon: IdCard },
    ],
  },
];
