import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import Reveal from "./Reveal";
import Press from "./Press";
import SectionHeading from "./SectionHeading";
import {
  ArrowLeft, ArrowUpRight, Award, Bolt, Briefcase, Calendar, Camera, Chat, Check, Clock, Compass, Cup, Dots,
  Dumbbell, Layout, MapPin, Phone, Question, Refresh, Repeat, Rocket, Scissors, Spark, Sprout, Store, Ticket, Users,
} from "./Icons";
import { STUDIO_NAME, EMAIL, PHONE, WEB3FORMS_KEY, CALENDLY_URL } from "../config";
import { services, monthlyPlans, serviceGroups, SITE_CARE } from "../data/services";
import { isPlaceholder, showInstagram, instagramHandle, instagramUrl, smsHref, telHref, PLAN_EVENT, SERVICE_EVENT } from "../lib/utils";
import { scrollToHash } from "../lib/scroll";

// "Get started": a short consultation instead of a form. One question per screen, tap to answer,
// then a plan recommendation, then contact details last. Everything goes to Web3Forms as one email.
// Plan buttons elsewhere on the site (selectPlan in lib/utils) open it on the recommendation step.

// ── Questions ────────────────────────────────────────────────────────────────────────────────
const HELP = [
  { id: "website", title: "Website", line: "A site that makes you look like the best in town", Icon: Layout },
  { id: "content", title: "Monthly content", line: "Photos, Reels, and posts handled every month", Icon: Camera },
  { id: "google", title: "Google & visibility", line: "Get found when people search near you", Icon: MapPin },
  { id: "branding", title: "Branding & print", line: "Logo, menus, flyers, cards", Icon: Spark },
  { id: "unsure", title: "Not sure yet", line: "Tell us about your business and we'll recommend", Icon: Question },
];
const BUSINESS = [
  { id: "restaurant", title: "Restaurant / Cafe", Icon: Cup, phrase: "your restaurant" },
  { id: "retail", title: "Retail / Shop", Icon: Store, phrase: "your shop" },
  { id: "salon", title: "Salon / Beauty", Icon: Scissors, phrase: "your salon" },
  { id: "fitness", title: "Fitness", Icon: Dumbbell, phrase: "your fitness business" },
  { id: "events", title: "Events", Icon: Ticket, phrase: "your events business" },
  { id: "services", title: "Services", Icon: Briefcase, phrase: "your business" },
  { id: "other", title: "Other", Icon: Dots, phrase: "your business" },
];
const GOALS = [
  { id: "customers", title: "More customers walking in", Icon: Users },
  { id: "professional", title: "Looking more professional than competitors", Icon: Award },
  { id: "consistent", title: "Showing up consistently online", Icon: Repeat },
  { id: "launch", title: "Launching something new", Icon: Rocket },
];
const TODAY = [
  { id: "nosite", title: "No website yet", Icon: Layout },
  { id: "outdated", title: "Have a site, but it's outdated", Icon: Refresh },
  { id: "social", title: "Post on social when we can", Icon: Phone },
  { id: "scratch", title: "Starting from scratch", Icon: Sprout },
];
const TIMELINE = [
  { id: "asap", title: "ASAP", Icon: Bolt },
  { id: "month", title: "This month", Icon: Calendar },
  { id: "later", title: "Next 1–3 months", Icon: Clock },
  { id: "exploring", title: "Just exploring", Icon: Compass },
];
const REACH = ["Text", "Call", "Email"];

const STEPS = ["help", "business", "goal", "today", "plan", "timeline", "contact"];
const PLAN_STEP = STEPS.indexOf("plan");
const DONE = STEPS.length;

// ── The package: one website, one monthly plan, any add-ons. Prices come from the same data as
// the Pricing, Monthly plans and Services sections. `from` marks a starting price.
const dollars = (price) => Number(String(price).replace(/[^\d]/g, "").slice(0, 6)) || 0;
const fmt = (n) => `$${n.toLocaleString("en-US")}`;
const site = (id) => services.find((s) => s.id === id);
const monthlyPlan = (id) => monthlyPlans.find((p) => p.id === id);
const serviceItem = (name) => serviceGroups.flatMap((g) => g.items).find((it) => it.name === name);

const SITES = [
  { id: "launch", name: "Launch Page", amount: dollars(site("launch").price), line: site("launch").perfectFor },
  { id: "business", name: "Business Site", amount: dollars(site("business").price), line: site("business").perfectFor },
  { id: "custom", name: "Custom Build", amount: dollars(site("custom").price), from: true, line: site("custom").perfectFor },
  { id: "have", name: "I already have a site" },
];
const MONTHLY = [
  { id: "presence", name: "Presence", amount: dollars(monthlyPlan("presence").price), line: monthlyPlan("presence").tagline, upkeep: true },
  { id: "growth", name: "Growth", amount: dollars(monthlyPlan("growth").price), line: monthlyPlan("growth").tagline, upkeep: true },
  { id: "sitecare", name: "Site Care only", amount: dollars(SITE_CARE), line: "Hosting, updates and changes." },
  { id: "none", name: "Not right now" },
];
const ADDONS = [
  ["logo", "Logo", "Logos & branding"],
  ["menus", "Menus/signage", "Menus & signage"],
  ["flyers", "Flyers", "Flyers & posters"],
  ["cards", "Business cards", "Business cards"],
  ["ordering", "Ordering/booking setup", "Online ordering & booking"],
].map(([id, name, source]) => ({ id, name, amount: dollars(serviceItem(source).price), from: true }));

const ITEMS = Object.fromEntries([
  ...SITES.map((o) => [o.id, { ...o, kind: "one-time" }]),
  ...MONTHLY.map((o) => [o.id, { ...o, kind: "monthly" }]),
  ...ADDONS.map((o) => [o.id, { ...o, kind: "one-time" }]),
]);
const PRICED = (id) => ITEMS[id]?.amount > 0;
const priceText = (o, monthly) => `${o.from ? "from " : ""}${fmt(o.amount)}${monthly ? "/mo" : ""}`;
// "Business Site: $1,200 (one-time)" for the email and confirmation.
const itemLine = (id, deal) => {
  const o = ITEMS[id];
  if (deal && deal.site.id === id)
    return `${o.name}: ${priceText(o)} → ${deal.included ? "included" : `${deal.site.from ? "from " : ""}${fmt(deal.price)}`} with the bundle (one-time)`;
  return `${o.name}: ${priceText(o, o.kind === "monthly")}${o.kind === "monthly" ? "" : " (one-time)"}`;
};

// Totals for a package: one-time and monthly, each flagged when a from-price is in it.
// Website bundle deal: with Presence the site is 50% off; with Growth a Launch Page or Business
// Site is free and a Custom Build costs what a Business Site would. Either way the monthly plan
// runs 6 months.
const BUSINESS_PRICE = dollars(site("business").price);
function bundleDeal(siteId, monthly) {
  const s = ITEMS[siteId];
  if (!s?.amount || s.kind !== "one-time" || !SITES.some((o) => o.id === siteId) || !ITEMS[monthly]?.upkeep) return null;
  if (monthly === "presence") {
    const discount = Math.round(s.amount / 2);
    return { site: s, discount, price: s.amount - discount, label: "50% off", line: `${s.name} 50% off with Presence` };
  }
  // Growth: Launch Page and Business Site are free; a Custom Build comes down to the Business Site
  // price ($2,500 → $1,200, so $1,300 off).
  const discount = siteId === "custom" ? s.amount - BUSINESS_PRICE : s.amount;
  const included = discount === s.amount;
  return { site: s, discount, price: s.amount - discount, included, label: included ? "Included" : `${fmt(discount)} off`, line: `${s.name} ${included ? "included free" : `${fmt(discount)} off`} with Growth` };
}

function totals({ site: siteId, monthly, addons }) {
  const oneTime = [siteId, ...addons].filter(PRICED).map((id) => ITEMS[id]);
  const month = PRICED(monthly) ? ITEMS[monthly] : null;
  const deal = bundleDeal(siteId, monthly);
  return {
    items: [siteId, monthly, ...addons].filter(PRICED),
    oneTime: oneTime.reduce((n, o) => n + o.amount, 0) - (deal?.discount ?? 0),
    oneTimeFrom: oneTime.some((o) => o.from && !(deal?.included && o.id === siteId)),
    monthly: month?.amount ?? 0,
    deal,
    term: ITEMS[monthly]?.upkeep ? (deal ? "6-month plan (website bundle)" : "3-month minimum") : null,
  };
}
const totalText = (n, from, monthly) => `${from ? "from " : ""}${fmt(n)}${monthly ? "/mo" : ""}`;

const titleOf = (list, id) => list.find((o) => o.id === id)?.title;

// The recommendation rules, turned into a preselected package. `pick` is a plan chosen from a
// button elsewhere on the site.
function recommend({ help, business, goal }, pick) {
  const siteId = goal === "launch" || business === "restaurant" || business === "retail" ? "custom" : "business";
  if (pick) return monthlyPlan(pick) ? { site: "", monthly: pick, addons: [] } : { site: pick, monthly: "", addons: [] };
  const has = (x) => help.includes(x);
  if (has("unsure")) return { site: siteId, monthly: "presence", addons: [] };
  const monthly = has("content") || has("google") || goal === "consistent" || goal === "customers";
  return { site: has("website") ? siteId : "", monthly: monthly ? "growth" : "", addons: has("branding") ? ["logo"] : [] };
}

// Counts to a new number instead of jumping (skipped with reduced motion).
function useTween(value, ms = 450) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = value;
      setShown(value);
      return;
    }
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - k, 4);
      const n = Math.round(start + (value - start) * eased);
      from.current = n;
      setShown(n);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return shown;
}

// ── Pieces ───────────────────────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1];
const slide = {
  enter: (dir) => ({ x: dir * 28, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: EASE } },
  exit: (dir) => ({ x: dir * -20, opacity: 0, transition: { duration: 0.18, ease: EASE } }),
};

// A tap-to-answer card. A button with aria-pressed rather than a radio, so arrow keys never
// trigger the auto-advance; Tab moves between cards, Enter or Space picks one.
function Option({ Icon, title, line, selected, multi, onClick }) {
  return (
    <Press
      as="button"
      type="button"
      lift={0}
      press={0.98}
      aria-pressed={selected}
      onClick={onClick}
      className="flex min-h-16 w-full items-center gap-4 rounded-[18px] border border-line px-4 py-3.5 text-left transition-[border-color,background-color] duration-200 hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent/[0.06] sm:px-5"
    >
      <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-snug tracking-[-0.012em]">{title}</span>
        {line && <span className="mt-0.5 block text-sm leading-snug text-dim">{line}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`grid h-5 w-5 shrink-0 place-items-center border transition-colors duration-200 ${multi ? "rounded-md" : "rounded-full"} ${selected ? "border-accent bg-accent text-on-accent" : "border-field"}`}
      >
        {selected && <Check className="h-3.5 w-3.5" />}
      </span>
    </Press>
  );
}

function Ask({ id, title, hint, children }) {
  return (
    <div>
      <h3 id={id} tabIndex={-1} className="t-card outline-none">
        {title}
      </h3>
      {hint && <p className="mt-1.5 text-sm text-caption">{hint}</p>}
      <div role="group" aria-labelledby={id} className="mt-6 grid gap-3 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

const Tag = ({ children }) => (
  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.75rem] font-medium leading-snug text-accent">{children}</span>
);

// One choice in a package group: single-select, and tapping the selected one clears it.
function PackOption({ option, monthly, selected, tag, onClick }) {
  return (
    <Press
      as="button"
      type="button"
      lift={0}
      press={0.98}
      aria-pressed={selected}
      onClick={onClick}
      className="flex min-h-14 w-full items-start gap-3 rounded-[18px] border border-line px-4 py-3.5 text-left transition-[border-color,background-color] duration-200 hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent/[0.06]"
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${selected ? "border-accent bg-accent text-on-accent" : "border-field"}`}
      >
        {selected && <Check className="h-3.5 w-3.5" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <span className="font-semibold leading-snug tracking-[-0.012em]">{option.name}</span>
          {option.amount > 0 && <span className="text-[0.9375rem] text-dim">{priceText(option, monthly)}</span>}
        </span>
        {option.line && <span className="mt-0.5 block text-sm leading-snug text-dim">{option.line}</span>}
        {option.upkeep && (
          <span className="mt-1 flex items-center gap-1.5 text-sm text-accent">
            <Check className="h-3.5 w-3.5" />
            Includes website upkeep
          </span>
        )}
        {tag && <span className="mt-2 block"><Tag>{tag}</Tag></span>}
      </span>
    </Press>
  );
}

// The bundle deal as it applies to the site they picked:
//   Presence + any site     ~$1,200~ $600   50% off
//   Growth + Business Site  $1,200 → Included
//   Growth + Custom Build   $1,300 off
//   Growth + Launch Page    Included
function DealRow({ deal }) {
  const { site: s } = deal;
  const full = priceText(s);
  let shown;
  if (deal.label === "50% off")
    shown = (
      <>
        <s className="text-caption">
          <span className="sr-only">was </span>
          {full}
        </s>
        <span>{`${s.from ? "from " : ""}${fmt(deal.price)}`}</span>
      </>
    );
  else if (deal.included && s.id === "business") shown = <span>{full} <span aria-hidden="true">→</span><span className="sr-only">,</span> Included</span>;
  else shown = <span>{deal.label}</span>;
  return (
    <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm tabular-nums lg:text-[0.9375rem]">
      <span className="text-dim">{s.name}:</span>
      {shown}
      <span className="rounded-full bg-accent/10 px-2 py-px text-[0.75rem] font-medium text-accent">{deal.label === "50% off" ? "50% off" : "Bundle deal"}</span>
    </p>
  );
}

// The live package summary: sticky at the bottom of the screen on phones, beside the choices on
// wide screens. Totals count to their new value.
function Summary({ pack, onContinue }) {
  const t = totals(pack);
  const oneTime = useTween(t.oneTime);
  const monthly = useTween(t.monthly);
  const names = t.items.map((id) => ITEMS[id].name);
  return (
    <div className="rounded-[20px] border border-line bg-page p-3.5 shadow-soft lg:p-5 lg:shadow-none">
      <p className="label max-lg:hidden">Your plan</p>
      <p className="line-clamp-2 font-semibold leading-snug tracking-[-0.012em] lg:mt-1" aria-live="polite">
        <span className="lg:hidden">Your plan: </span>
        {names.length ? names.join(" + ") : "Nothing picked yet"}
      </p>
      {t.deal && <DealRow deal={t.deal} />}
      <p className="mt-1 flex flex-col text-sm tabular-nums text-dim lg:mt-1.5 lg:text-[0.9375rem]">
        <span>One-time: {t.oneTime || oneTime ? totalText(oneTime, t.oneTimeFrom) : "none"}</span>
        <span className="flex flex-wrap items-center gap-x-1.5">
          Monthly: {t.monthly || monthly ? totalText(monthly, false, true) : "none"}
          {t.deal && <span className="rounded-full border border-line px-1.5 py-px text-[0.75rem]">6-month plan</span>}
        </span>
      </p>
      <Press
        as="button"
        type="button"
        onClick={onContinue}
        disabled={!t.items.length}
        className="btn mt-2.5 w-full bg-pill text-on-pill disabled:opacity-40 lg:mt-4"
      >
        Continue with this plan
      </Press>
      <p className="mt-2 text-[0.75rem] leading-snug text-caption lg:mt-2.5 lg:text-[0.8125rem]">Final pricing confirmed on a quick call before anything is billed.</p>
    </div>
  );
}

function ContactLink({ label, href, external, size = "text-[1.3125rem]", children }) {
  return (
    <div>
      <p className="label">{label}</p>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={`group mt-1 inline-flex min-h-11 max-w-full items-center gap-2 break-all tracking-[-0.014em] text-accent ${size}`}
      >
        {children}
      </a>
    </div>
  );
}

// Calendly's popup, loaded only when someone asks for it.
function openCalendly(prefill) {
  const open = () => window.Calendly?.initPopupWidget({ url: CALENDLY_URL, prefill });
  if (window.Calendly) return open();
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://assets.calendly.com/assets/external/widget.css";
  document.head.append(css);
  const js = document.createElement("script");
  js.src = "https://assets.calendly.com/assets/external/widget.js";
  js.onload = open;
  document.head.append(js);
}

// The confirmation shows the email's answers with labels written for the customer.
const SHOWN_AS = {
  "Your plan": "Your plan",
  "One-time total": "One-time",
  "Monthly total": "Monthly",
  "Website deal": "Website deal",
  "Monthly plan term": "Plan term",
  "What they need help with": "Help with",
  "Type of business": "Business",
  "What matters most": "Top priority",
  "Where they are today": "Where you are today",
  "When they want to start": "Start",
};

const or = (v, fallback = "(not provided)") => (v && String(v).trim()) || fallback;
const blankContact = { name: "", business: "", phone: "", email: "", reach: "Text", botcheck: "" };

// ── The flow ─────────────────────────────────────────────────────────────────────────────────
export default function GetStarted() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [trail, setTrail] = useState([]); // steps visited, for Back
  const [help, setHelp] = useState([]);
  const [business, setBusiness] = useState("");
  const [goal, setGoal] = useState("");
  const [today, setToday] = useState("");
  const [pick, setPick] = useState(""); // plan from a button elsewhere on the site
  const [pack, setPack] = useState({ site: "", monthly: "", addons: [] }); // the package they build
  const [recPack, setRecPack] = useState(null); // what we preselected, for the tags and the email
  const [upkeepNote, setUpkeepNote] = useState(false);
  const [decideOnCall, setDecideOnCall] = useState(false); // "Not sure? We'll help you decide"
  const [timeline, setTimeline] = useState("");
  const [contact, setContact] = useState(blankContact);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [sent, setSent] = useState(null); // summary shown on the confirmation
  const card = useRef(null);
  const moved = useRef(false);
  const busy = useRef(false);
  const timer = useRef(0);

  const phrase = BUSINESS.find((b) => b.id === business)?.phrase ?? "your business";

  function goTo(next, { back = false } = {}) {
    moved.current = true;
    setDir(back ? -1 : 1);
    if (!back) setTrail((t) => [...t, step]);
    setStep(next);
  }
  // Arriving at the recommendation from the questions preselects what we'd recommend.
  function preselect(rec) {
    setPack(rec);
    setRecPack(rec);
    setUpkeepNote(false);
    setDecideOnCall(false);
  }
  const forward = () => {
    if (step + 1 === PLAN_STEP) preselect(recommend({ help, business, goal }, pick));
    goTo(step + 1);
  };
  function back() {
    const prev = trail.at(-1) ?? 0;
    setTrail((t) => t.slice(0, -1));
    goTo(prev, { back: true });
  }
  // Single-choice taps: show the selection for a beat, then move on.
  function answer(set, value) {
    if (busy.current) return;
    set(value);
    busy.current = true;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      busy.current = false;
      forward();
    }, 240);
  }
  useEffect(() => () => clearTimeout(timer.current), []);

  // After every move, once the new step is on screen (the old one leaves first): keep the card's
  // top in view (long steps on phones) and put focus on the new question for keyboard and screen
  // reader users. Never on first load.
  function settle() {
    if (!moved.current) return;
    const el = card.current;
    if (el && el.getBoundingClientRect().top < 0) scrollToHash("#flow");
    el?.querySelector("h3[tabindex]")?.focus({ preventScroll: true });
  }

  // Plan buttons elsewhere: open on the recommendation with that plan picked.
  useEffect(() => {
    const onPlan = (e) => {
      if (!site(e.detail) && !monthlyPlan(e.detail)) return;
      clearTimeout(timer.current);
      busy.current = false;
      setPick(e.detail);
      preselect(recommend({ help: [] }, e.detail));
      setTrail([0]);
      setDir(1);
      moved.current = true;
      setStep(PLAN_STEP);
    };
    // Service cards: back to the first question with that answer picked (added to any others).
    const onService = (e) => {
      if (!HELP.some((h) => h.id === e.detail)) return;
      clearTimeout(timer.current);
      busy.current = false;
      setPick("");
      setHelp((h) => (h.includes(e.detail) ? h : [...h.filter((x) => x !== "unsure"), e.detail]));
      setTrail([]);
      setDir(-1);
      moved.current = true;
      setStep(0);
    };
    window.addEventListener(PLAN_EVENT, onPlan);
    window.addEventListener(SERVICE_EVENT, onService);
    return () => {
      window.removeEventListener(PLAN_EVENT, onPlan);
      window.removeEventListener(SERVICE_EVENT, onService);
    };
  }, []);

  const toggleHelp = (id) =>
    setHelp((h) => {
      if (id === "unsure") return h.includes("unsure") ? [] : ["unsure"];
      const rest = h.filter((x) => x !== "unsure");
      return rest.includes(id) ? rest.filter((x) => x !== id) : [...rest, id];
    });
  // Single-select inside each group; tapping the selected one clears it. Presence and Growth
  // include upkeep, so they and Site Care replace each other (with a note when that happens).
  const pickSite = (id) => setPack((p) => ({ ...p, site: p.site === id ? "" : id }));
  const pickMonthly = (id) =>
    setPack((p) => {
      const next = p.monthly === id ? "" : id;
      const swapsUpkeep = (p.monthly === "sitecare" && ITEMS[next]?.upkeep) || (ITEMS[p.monthly]?.upkeep && next === "sitecare");
      if (swapsUpkeep) setUpkeepNote(true);
      return { ...p, monthly: next };
    });
  const toggleAddon = (id) =>
    setPack((p) => ({ ...p, addons: p.addons.includes(id) ? p.addons.filter((x) => x !== id) : [...p.addons, id] }));
  const continueWithPlan = () => {
    setDecideOnCall(false);
    forward();
  };
  const decideLater = () => {
    setDecideOnCall(true);
    forward();
  };
  const tagFor = (group, id) => {
    if (!recPack || !id || recPack[group] !== id && !(group === "addons" && recPack.addons.includes(id))) return null;
    return pick === id ? "Your pick" : "Recommended for you";
  };
  const t = totals(pack);
  const planName = decideOnCall ? "Help me decide on a call" : t.items.map((id) => ITEMS[id].name).join(" + ") || "Help me decide on a call";

  const setField = (k) => (e) => {
    setContact((c) => ({ ...c, [k]: e.target.value }));
    if (errors[k] || errors.reach) setErrors((er) => ({ ...er, [k]: undefined, ...(k === "phone" || k === "email" ? { reach: undefined } : {}) }));
  };

  function validate() {
    const c = contact;
    const er = {};
    if (!c.name.trim()) er.name = "Please add your name.";
    if (!c.business.trim()) er.business = "Please add your business name.";
    const phoneOk = c.phone.replace(/\D/g, "").length >= 7;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim());
    if (c.email.trim() && !emailOk) er.email = "That email doesn't look right.";
    if (c.phone.trim() && !phoneOk) er.phone = "That number looks too short.";
    if (!c.phone.trim() && !c.email.trim()) er.reach = "Add a phone number or an email so we can reach you.";
    else if (c.reach === "Email" && !c.email.trim()) er.email = "Add an email, or pick Text or Call.";
    else if (c.reach !== "Email" && !c.phone.trim()) er.phone = `Add a phone number, or pick Email.`;
    setErrors(er);
    return er;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    const er = validate();
    const first = Object.keys(er)[0];
    if (first) {
      document.getElementById(`gs-${first === "reach" ? "phone" : first}`)?.focus();
      return;
    }
    if (contact.botcheck) return; // honeypot
    if (isPlaceholder(WEB3FORMS_KEY)) {
      setStatus("error");
      return;
    }

    const packageLines = decideOnCall ? [] : t.items.map((id) => itemLine(id, t.deal));
    const summary = {
      "Your plan": decideOnCall ? "Help me decide on a call" : packageLines.join("\n") || "(nothing picked)",
      "One-time total": decideOnCall || !t.oneTime ? "(none)" : totalText(t.oneTime, t.oneTimeFrom),
      "Monthly total": decideOnCall || !t.monthly ? "(none)" : totalText(t.monthly, false, true),
      ...(!decideOnCall && t.deal && { "Website deal": `${t.deal.line}: ${fmt(t.deal.discount)} off` }),
      ...(!decideOnCall && t.term && { "Monthly plan term": t.term }),
      "What they need help with": help.length ? help.map((id) => titleOf(HELP, id)).join(", ") : "(skipped)",
      "Type of business": or(titleOf(BUSINESS, business), "(skipped)"),
      "What matters most": or(titleOf(GOALS, goal), "(skipped)"),
      "Where they are today": or(titleOf(TODAY, today), "(skipped)"),
      "When they want to start": or(titleOf(TIMELINE, timeline), "(skipped)"),
    };
    const extra = [pack.site === "have" && "Already has a site", pack.monthly === "none" && "No monthly plan for now"].filter(Boolean);
    const recommended = recPack ? totals(recPack).items.map((id) => ITEMS[id].name).join(" + ") : "";

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New lead: ${contact.business.trim()} · ${planName}`,
          from_name: `${STUDIO_NAME} website`,
          ...(contact.email.trim() && { replyto: contact.email.trim() }),
          ...summary,
          ...(extra.length && { "Also noted": extra.join(", ") }),
          "We recommended": or(recommended, "(nothing preselected)"),
          "Came from": pick ? `The "${ITEMS[pick].name}" button` : "The questions",
          Name: contact.name.trim(),
          "Business name": contact.business.trim(),
          Phone: or(contact.phone),
          Email: or(contact.email),
          "Preferred contact": contact.reach,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error("rejected");
      setSent({ name: contact.name.trim().split(/\s+/)[0], email: contact.email.trim(), fullName: contact.name.trim(), summary, reach: contact.reach });
      setStatus("idle");
      goTo(DONE);
    } catch {
      setStatus("error");
    }
  }

  function startOver() {
    setHelp([]);
    setBusiness("");
    setGoal("");
    setToday("");
    setPick("");
    setPack({ site: "", monthly: "", addons: [] });
    setRecPack(null);
    setDecideOnCall(false);
    setTimeline("");
    setContact(blankContact);
    setErrors({});
    setSent(null);
    setTrail([]);
    goTo(0, { back: true });
  }

  const progress = Math.min(step + 1, STEPS.length) / STEPS.length;
  const fieldError = (k) => errors[k] && <p id={`gs-${k}-error`} className="mt-1.5 text-sm text-[#b42318] [html[data-theme=dark]_&]:text-[#fda29b]">{errors[k]}</p>;
  const describedBy = (k) => (errors[k] ? `gs-${k}-error` : errors.reach && (k === "phone" || k === "email") ? "gs-reach-error" : undefined);

  const screens = {
    help: (
      <div>
        <Ask id="gs-q" title="What can we help with?" hint="Pick all that apply.">
          {HELP.map((o) => (
            <Option key={o.id} {...o} multi selected={help.includes(o.id)} onClick={() => toggleHelp(o.id)} />
          ))}
        </Ask>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Press as="button" type="button" onClick={forward} disabled={!help.length} className="btn bg-pill text-on-pill disabled:opacity-40">
            Continue
          </Press>
          <p className="text-sm text-caption" aria-live="polite">
            {help.length ? `${help.length} selected` : "Pick at least one"}
          </p>
        </div>
      </div>
    ),
    business: (
      <Ask id="gs-q" title="What kind of business?">
        {BUSINESS.map((o) => (
          <Option key={o.id} {...o} selected={business === o.id} onClick={() => answer(setBusiness, o.id)} />
        ))}
      </Ask>
    ),
    goal: (
      <Ask id="gs-q" title="What matters most right now?">
        {GOALS.map((o) => (
          <Option key={o.id} {...o} selected={goal === o.id} onClick={() => answer(setGoal, o.id)} />
        ))}
      </Ask>
    ),
    today: (
      <Ask id="gs-q" title="Where are you today?">
        {TODAY.map((o) => (
          <Option key={o.id} {...o} selected={today === o.id} onClick={() => answer(setToday, o.id)} />
        ))}
      </Ask>
    ),
    plan: (
      <div>
        <p className="label">Your recommendation</p>
        <h3 id="gs-q" tabIndex={-1} className="t-card mt-1.5 outline-none">
          Here's what we'd do for {phrase}.
        </h3>
        <p className="mt-1.5 text-sm text-caption">We've picked what we'd recommend. Change anything you like.</p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_15.5rem] lg:gap-6">
          <div className="flex flex-col gap-7">
            <div role="group" aria-labelledby="gs-site">
              <div className="flex items-baseline justify-between gap-3">
                <h4 id="gs-site" className="t-h4">Your website</h4>
                <span className="text-sm text-caption">One-time</span>
              </div>
              <div className="mt-3 grid gap-2.5">
                {SITES.map((o) => (
                  <PackOption key={o.id} option={o} selected={pack.site === o.id} tag={tagFor("site", o.id)} onClick={() => pickSite(o.id)} />
                ))}
              </div>
            </div>

            <div role="group" aria-labelledby="gs-monthly">
              <div className="flex items-baseline justify-between gap-3">
                <h4 id="gs-monthly" className="t-h4">Every month</h4>
                <span className="text-sm text-caption">Monthly</span>
              </div>
              <div className="mt-3 grid gap-2.5">
                {MONTHLY.map((o) => (
                  <PackOption key={o.id} option={o} monthly selected={pack.monthly === o.id} tag={tagFor("monthly", o.id)} onClick={() => pickMonthly(o.id)} />
                ))}
              </div>
              <p className="mt-2.5 min-h-5 text-sm text-accent" aria-live="polite">
                {upkeepNote && "Website upkeep is included in Presence and Growth."}
              </p>
            </div>

            <div role="group" aria-labelledby="gs-addons">
              <div className="flex items-baseline justify-between gap-3">
                <h4 id="gs-addons" className="t-h4">Add-ons</h4>
                <span className="text-sm text-caption">One-time · optional</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {ADDONS.map((o) => {
                  const on = pack.addons.includes(o.id);
                  const tag = tagFor("addons", o.id);
                  return (
                    <Press
                      key={o.id}
                      as="button"
                      type="button"
                      lift={0}
                      press={0.96}
                      aria-pressed={on}
                      onClick={() => toggleAddon(o.id)}
                      aria-label={`${o.name}, ${priceText(o)}${tag ? `, ${tag.toLowerCase()}` : ""}`}
                      className="flex min-h-11 items-center gap-2 rounded-full border border-field px-4 py-2 text-[0.9375rem] transition-colors duration-200 hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent/10"
                    >
                      <span aria-hidden="true" className={`grid h-4 w-4 place-items-center rounded border ${on ? "border-accent bg-accent text-on-accent" : "border-field"}`}>
                        {on && <Check className="h-3 w-3" />}
                      </span>
                      {o.name}
                      <span className="text-caption">{priceText(o)}</span>
                      {tag && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </Press>
                  );
                })}
              </div>
              {pack.addons.some((id) => recPack?.addons.includes(id)) && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-caption">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" /> Recommended for you
                </p>
              )}
            </div>

            <button type="button" onClick={decideLater} className="link-more self-start text-left">
              Not sure? We'll help you decide on a quick call.
            </button>
          </div>

          <div className="sticky bottom-3 z-10 -mx-2 self-end lg:top-28 lg:bottom-auto lg:mx-0 lg:self-start">
            <Summary pack={pack} onContinue={continueWithPlan} />
          </div>
        </div>
      </div>
    ),
    timeline: (
      <Ask id="gs-q" title="When do you want to start?">
        {TIMELINE.map((o) => (
          <Option key={o.id} {...o} selected={timeline === o.id} onClick={() => answer(setTimeline, o.id)} />
        ))}
      </Ask>
    ),
    contact: (
      <form onSubmit={onSubmit} noValidate>
        <h3 id="gs-q" tabIndex={-1} className="t-card outline-none">
          Where should we send your plan?
        </h3>
        <p className="mt-1.5 text-sm text-caption">Your plan: {planName}</p>
        <input
          type="text"
          name="botcheck"
          value={contact.botcheck}
          onChange={setField("botcheck")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
          {[
            ["name", "Your name", { autoComplete: "name" }],
            ["business", "Business name", { autoComplete: "organization" }],
            ["phone", "Phone", { type: "tel", autoComplete: "tel", inputMode: "tel" }],
            ["email", "Email", { type: "email", autoComplete: "email" }],
          ].map(([k, label, attrs]) => (
            <div key={k}>
              <label htmlFor={`gs-${k}`} className="text-[0.9375rem] font-semibold">
                {label}
              </label>
              <input
                id={`gs-${k}`}
                value={contact[k]}
                onChange={setField(k)}
                aria-invalid={!!errors[k] || (errors.reach && (k === "phone" || k === "email")) || undefined}
                aria-describedby={describedBy(k)}
                aria-required={k === "name" || k === "business" || undefined}
                className="field mt-2"
                {...attrs}
              />
              {fieldError(k)}
            </div>
          ))}
          {errors.reach ? (
            <p id="gs-reach-error" className="-mt-2 text-sm text-[#b42318] sm:col-span-2 [html[data-theme=dark]_&]:text-[#fda29b]">
              {errors.reach}
            </p>
          ) : (
            <p className="-mt-2 text-sm text-caption sm:col-span-2">Phone or email, whichever you prefer.</p>
          )}
          <fieldset className="sm:col-span-2">
            <legend className="text-[0.9375rem] font-semibold">Best way to reach you</legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {REACH.map((r) => (
                <label
                  key={r}
                  className="tap flex min-h-11 items-center rounded-full border border-field px-4 py-2 text-[0.9375rem] transition-colors hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/25"
                >
                  <input type="radio" name="reach" value={r} checked={contact.reach === r} onChange={setField("reach")} className="sr-only" />
                  {r}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {status === "error" && (
          <div role="alert" className="mt-6 rounded-[14px] border border-line px-4 py-3">
            <strong className="font-semibold">That didn't go through.</strong> Your answers are saved, so try again in a moment, or text us at{" "}
            <a href={smsHref} className="text-accent underline underline-offset-2">
              {PHONE}
            </a>{" "}
            and we'll take it from there.
          </div>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Press as="button" type="submit" disabled={status === "sending"} className="btn bg-pill text-on-pill disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Send my plan"}
          </Press>
          <p className="text-sm text-caption">
            We reply within 24 hours. <span lang="es">Hablamos español.</span>
          </p>
        </div>
      </form>
    ),
  };

  const done = sent && (
    <div role="status">
      <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-accent text-on-accent">
        <Check className="h-6 w-6" />
      </span>
      <h3 id="gs-q" tabIndex={-1} className="t-card mt-5 outline-none">
        You're in, {sent.name}.
      </h3>
      <p className="t-lead mt-1.5 text-dim">We'll reach out within 24 hours with your plan.</p>
      <div className="mt-6">
        {CALENDLY_URL ? (
          <Press as="button" type="button" onClick={() => openCalendly({ name: sent.fullName, email: sent.email })} className="btn bg-pill text-on-pill">
            Want to skip the wait? Book a quick call
          </Press>
        ) : (
          <Press href={telHref} className="btn bg-pill text-on-pill">
            Want to skip the wait? Call us
          </Press>
        )}
      </div>
      <dl className="mt-8 grid gap-x-6 border-t border-line pt-5 text-[0.9375rem] sm:grid-cols-[auto_minmax(0,1fr)]">
        {Object.entries(sent.summary).map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="pt-2.5 text-caption sm:py-1.5">{SHOWN_AS[k]}</dt>
            <dd className={`whitespace-pre-line sm:py-1.5 ${k === "Your plan" ? "font-semibold" : ""}`}>{v}</dd>
          </div>
        ))}
      </dl>
      <button type="button" onClick={startOver} className="link-more mt-6">
        Start over
      </button>
    </div>
  );

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y">
      <div className="site-wrap">
        <SectionHeading id="contact-title" label="Get started" title="Let's find the right fit for your business.">
          Answer a few quick questions and we'll show you exactly what we'd do. Takes under a minute.
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.6fr)_minmax(0,1fr)] lg:gap-12">
          <Reveal>
            <div id="flow" ref={card} className="scroll-mt-24 overflow-clip rounded-[28px] border border-line lg:scroll-mt-30">
              {/* Progress */}
              <div
                role="progressbar"
                aria-label="Progress"
                aria-valuemin={1}
                aria-valuemax={STEPS.length}
                aria-valuenow={Math.min(step + 1, STEPS.length)}
                aria-valuetext={step >= DONE ? "Done" : `Step ${step + 1} of ${STEPS.length}`}
                className="h-[3px] bg-line/60"
              >
                <div
                  className="h-full origin-left bg-accent transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>

              <div className="p-6 sm:p-10">
                <div className="mb-6 flex min-h-11 items-center justify-between gap-4">
                  {step > 0 && step < DONE ? (
                    <button type="button" onClick={back} className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-[0.9375rem] text-accent hover:underline">
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <p className="label" aria-hidden="true">
                    {step < DONE ? `${step + 1} of ${STEPS.length}` : "Sent"}
                  </p>
                </div>

                <AnimatePresence mode="wait" initial={false} custom={dir} onExitComplete={() => requestAnimationFrame(settle)}>
                  <m.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
                    {step >= DONE ? done : screens[STEPS[step]]}
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} as="aside" className="@container flex flex-col gap-7">
            <p className="t-small">Rather talk it through? Reach us directly.</p>
            <ContactLink label="Text us" href={smsHref}>
              <span className="link-sweep">{PHONE}</span>
              <Chat className="h-5 w-5 shrink-0" />
            </ContactLink>
            <ContactLink label="Email" href={`mailto:${EMAIL}`} size="text-[clamp(0.875rem,6cqw,1.0625rem)]">
              <span className="link-sweep">{EMAIL}</span>
            </ContactLink>
            {showInstagram && (
              <ContactLink label="Instagram" href={instagramUrl} external>
                <span className="link-sweep">@{instagramHandle}</span>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </ContactLink>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
