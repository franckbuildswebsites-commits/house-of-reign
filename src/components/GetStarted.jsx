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
import { services, monthlyPlans, serviceGroups } from "../data/services";
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

// ── Plans, from the same data as the Pricing and Monthly plans sections ─────────────────────
const brandingItems = serviceGroups.flatMap((g) => g.items).filter((it) => it.help === "branding");
const PLANS = Object.fromEntries([
  ...services.map((s) => [s.id, { id: s.id, name: s.name, price: s.price, unit: "starting at", features: s.features }]),
  ...monthlyPlans.map((p) => [p.id, { id: p.id, name: p.name, price: p.price, unit: "per month", features: p.features, featured: p.featured, monthly: true }]),
  ["branding", { id: "branding", name: "Branding & print", items: brandingItems }],
]);
const planLabel = (id) => {
  const p = PLANS[id];
  if (!p.price) return p.name;
  return `${p.name} (${p.price}${p.monthly ? "/month" : ", starting at"})`;
};

const titleOf = (list, id) => list.find((o) => o.id === id)?.title;

// The recommendation rules. `pick` is a plan chosen from a button elsewhere on the site.
function recommend({ help, business, goal }, pick) {
  const site = goal === "launch" || business === "restaurant" || business === "retail" ? "custom" : "business";
  if (pick) return PLANS[pick].monthly ? { cards: ["growth", "presence"] } : { cards: [pick], pair: pick };
  const has = (x) => help.includes(x);
  if (has("unsure")) return { cards: [site, "presence"], bundle: site };
  if (help.length === 1 && has("branding")) return { cards: ["branding"], mention: true };

  const cards = [];
  if (has("website")) cards.push(site);
  const monthly = has("content") || has("google") || goal === "consistent" || goal === "customers";
  if (monthly) cards.push("growth", "presence");
  if (has("branding")) cards.push("branding");
  return { cards, pair: has("website") && !monthly ? site : null };
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

function PlanCard({ plan, picked, wide, onChoose }) {
  const dark = plan.featured;
  const soft = dark ? "text-on-pill/65" : "text-caption";
  return (
    <div
      className={`flex h-full flex-col rounded-[24px] border p-6 ${wide ? "sm:col-span-2" : ""} ${dark ? "border-pill bg-pill text-on-pill" : "border-line"} ${picked ? "ring-2 ring-accent ring-offset-2 ring-offset-page" : ""}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="t-h4">{plan.name}</h4>
        {picked && <span className={`text-sm ${soft}`}>Your pick</span>}
      </div>
      {plan.price && (
        <>
          <p className="t-h3 mt-4">{plan.price}</p>
          <p className={`mt-0.5 text-sm ${soft}`}>{plan.unit}</p>
        </>
      )}
      <ul className={`mt-4 flex flex-col gap-2 border-t pt-4 text-[0.9375rem] leading-snug ${dark ? "border-on-pill/20" : "border-line"} ${wide && plan.items ? "sm:grid sm:grid-cols-2 sm:gap-x-6" : ""}`}>
        {plan.features?.map((f) => (
          <li key={f} className="flex gap-2">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-on-pill" : "text-accent"}`} />
            {f}
          </li>
        ))}
        {plan.items?.map((it) => (
          <li key={it.name} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              {it.name} <span className="text-caption">· {it.price}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <Press
          as="button"
          type="button"
          onClick={onChoose}
          aria-label={`Choose this: ${plan.name}`}
          className={`btn ${dark ? "bg-on-pill text-pill" : "bg-pill text-on-pill"}`}
        >
          Choose this
        </Press>
      </div>
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
  "Chosen plan": "Your plan",
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
  const [chosen, setChosen] = useState(""); // what they chose on the recommendation step
  const [timeline, setTimeline] = useState("");
  const [contact, setContact] = useState(blankContact);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [sent, setSent] = useState(null); // summary shown on the confirmation
  const card = useRef(null);
  const moved = useRef(false);
  const busy = useRef(false);
  const timer = useRef(0);

  const rec = recommend({ help, business, goal }, pick);
  const phrase = BUSINESS.find((b) => b.id === business)?.phrase ?? "your business";

  function goTo(next, { back = false } = {}) {
    moved.current = true;
    setDir(back ? -1 : 1);
    if (!back) setTrail((t) => [...t, step]);
    setStep(next);
  }
  const forward = () => goTo(step + 1);
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
      if (!PLANS[e.detail]) return;
      clearTimeout(timer.current);
      busy.current = false;
      setPick(e.detail);
      setChosen("");
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
  const choose = (label) => {
    setChosen(label);
    forward();
  };

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

    const plan = chosen || (pick ? planLabel(pick) : "Help me decide on a call");
    const summary = {
      "Chosen plan": plan,
      "What they need help with": help.length ? help.map((id) => titleOf(HELP, id)).join(", ") : "(skipped)",
      "Type of business": or(titleOf(BUSINESS, business), "(skipped)"),
      "What matters most": or(titleOf(GOALS, goal), "(skipped)"),
      "Where they are today": or(titleOf(TODAY, today), "(skipped)"),
      "When they want to start": or(titleOf(TIMELINE, timeline), "(skipped)"),
    };

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New lead: ${contact.business.trim()} · ${plan}`,
          from_name: `${STUDIO_NAME} website`,
          ...(contact.email.trim() && { replyto: contact.email.trim() }),
          ...summary,
          "We recommended": rec.cards.map(planLabel).join(" · "),
          "Came from": pick ? `The "${PLANS[pick].name}" button` : "The questions",
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
    setChosen("");
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
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {rec.cards.map((id) => {
            const plan = PLANS[id];
            const wide = !plan.monthly && rec.cards.length % 2 === 1;
            return <PlanCard key={id} plan={plan} wide={wide} picked={pick === id} onChoose={() => choose(planLabel(id))} />;
          })}
        </div>
        {rec.pair && (
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Pair it with Presence to keep it looking sharp every month.</span>
            <button type="button" onClick={() => choose(`${planLabel(rec.pair)} + ${planLabel("presence")}`)} className="link-more">
              Add Presence
            </button>
          </p>
        )}
        {rec.bundle && (
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              Or take both: {PLANS[rec.bundle].name} + Presence.
            </span>
            <button type="button" onClick={() => choose(`${planLabel(rec.bundle)} + ${planLabel("presence")}`)} className="link-more">
              Choose both
            </button>
          </p>
        )}
        {rec.mention && (
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-dim">Want it showing up every month too? Presence is $750/month.</span>
            <button type="button" onClick={() => choose(`${planLabel("branding")} + ${planLabel("presence")}`)} className="link-more">
              Add Presence
            </button>
          </p>
        )}
        <div className="mt-6 flex flex-col gap-2 border-t border-line pt-5">
          <button type="button" onClick={() => choose("Help me decide on a call")} className="link-more self-start text-left">
            Not sure? We'll help you decide on a quick call.
          </button>
          <p className="t-small !max-w-none">No pressure: we'll confirm everything on a quick call before anything is billed.</p>
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
        {(chosen || pick) && <p className="mt-1.5 text-sm text-caption">Your plan: {chosen || planLabel(pick)}</p>}
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
            <dd className={`sm:py-1.5 ${k === "Chosen plan" ? "font-semibold" : ""}`}>{v}</dd>
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
            <div id="flow" ref={card} className="scroll-mt-24 overflow-hidden rounded-[28px] border border-line lg:scroll-mt-30">
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
