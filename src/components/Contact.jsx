import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowRight, ArrowUpRight, Chat, Check } from "./Icons";
import { STUDIO_NAME, EMAIL, PHONE, WEB3FORMS_KEY } from "../config";
import {
  firstName,
  isPlaceholder,
  showInstagram,
  instagramHandle,
  instagramUrl,
  smsHref,
  PROJECT_EVENT,
} from "../lib/utils";

// Questions are built for people who aren't sure what they need: short choices, few required typing fields.
const REACH = ["Text", "Call", "Email"];
const CUSTOM = "Bigger custom build";
const NEEDS = ["New website", "Redo my current website", "Changes to my site", CUSTOM, "Not sure yet"];
const HAS_SITE = ["Yes", "No", "Just Facebook or Instagram"];
const BUSINESS_TYPES = [
  "Restaurant or café",
  "Shop or retail",
  "Beauty or salon",
  "Home services",
  "Professional services",
  "Other",
];
const GOALS = [
  "Get more calls",
  "Show my menu or services",
  "Online orders or booking",
  "Show my work or photos",
  "Look more professional",
];
const BUDGETS = ["Under $750", "$750–$1,500", "$1,500–$2,500", "$2,500+", "Not sure"];
const CUSTOM_BUDGET = "$2,500+";
const TIMELINES = ["ASAP", "Within a month", "Just exploring"];

// Pricing cards send their plan name; map it to the matching "What do you need?" card.
const PROJECT_TO_NEED = { "Custom Build": CUSTOM };

// Tap targets are at least 44px tall. The real input stays in the DOM (visually hidden) for keyboard and form data.
const pill =
  "flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-[1.5px] border-line bg-white px-4 py-2 text-[0.95rem] transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-peach has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/25";

function Field({ label, id, optional, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.95rem] font-semibold">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function Group({ legend, hint, children }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="text-[0.95rem] font-semibold">
        {legend} {hint && <span className="font-normal text-muted">({hint})</span>}
      </legend>
      <div className="mt-3">{children}</div>
    </fieldset>
  );
}

// Single choice (radio) or multi choice (checkbox) shown as pills.
function Pills({ name, options, type = "radio", required, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o} className={pill}>
          <input
            type={type}
            name={name}
            value={o}
            required={required}
            className="sr-only"
            {...(value !== undefined && { checked: value === o, onChange: () => onChange(o) })}
          />
          {type === "checkbox" && (
            <span
              aria-hidden="true"
              className="grid h-4 w-4 place-items-center rounded border-[1.5px] border-muted/60 [label:has(:checked)_&]:border-brand [label:has(:checked)_&]:bg-brand"
            >
              <Check className="hidden h-3 w-3 text-white [label:has(:checked)_&]:block" />
            </span>
          )}
          {o}
        </label>
      ))}
    </div>
  );
}

// "What do you need?" as large single-choice cards.
function NeedCards({ value, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {NEEDS.map((o) => (
        <label
          key={o}
          className="flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border-[1.5px] border-line bg-white px-5 py-4 text-base font-semibold transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-peach has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/25"
        >
          <input type="radio" name="need" value={o} required checked={value === o} onChange={() => onChange(o)} className="sr-only" />
          <span
            aria-hidden="true"
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-[1.5px] border-muted/60 [label:has(:checked)_&]:border-brand"
          >
            <span className="hidden h-2.5 w-2.5 rounded-full bg-brand [label:has(:checked)_&]:block" />
          </span>
          {o}
        </label>
      ))}
    </div>
  );
}

function ContactLink({ label, href, external, size = "text-2xl sm:text-3xl", children }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={`group mt-2 inline-flex max-w-full items-center gap-2 break-all font-display font-semibold tracking-tight text-brand-ink ${size}`}
      >
        {children}
      </a>
    </div>
  );
}

const or = (v, fallback = "(not provided)") => (v && String(v).trim()) || fallback;

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");
  const [reach, setReach] = useState("Text");
  const [need, setNeed] = useState("");
  const [hasSite, setHasSite] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [budget, setBudget] = useState("");
  const [replyBy, setReplyBy] = useState("Text");

  const chooseNeed = (n) => {
    setNeed(n);
    if (n === CUSTOM) setBudget(CUSTOM_BUDGET);
  };

  // Pricing cards (e.g. "Request a quote" on Custom Build) pre-select what they need.
  useEffect(() => {
    const onSelect = (e) => PROJECT_TO_NEED[e.detail] && chooseNeed(PROJECT_TO_NEED[e.detail]);
    window.addEventListener(PROJECT_EVENT, onSelect);
    return () => window.removeEventListener(PROJECT_EVENT, onSelect);
  }, []);

  function resetChoices() {
    setReach("Text");
    setNeed("");
    setHasSite("");
    setBusinessType("");
    setBudget("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    if (data.botcheck) return; // honeypot

    if (isPlaceholder(WEB3FORMS_KEY)) {
      setStatus("error");
      setError("The contact form isn't connected yet.");
      return;
    }

    const goals = formData.getAll("goals");
    const site =
      hasSite === "Yes" ? `Yes: ${or(data.siteUrl, "(no link given)")}` : or(hasSite);
    const type = businessType === "Other" ? `Other: ${or(data.businessOther, "(not described)")}` : or(businessType);

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New project inquiry from ${data.name} (${need})`,
          from_name: `${STUDIO_NAME} website`,
          ...(data.email && { replyto: data.email }),
          Name: data.name,
          Phone: data.phone,
          Email: or(data.email),
          "Best way to reach them": reach,
          "What they need": need,
          "Current website": site,
          "Type of business": type,
          "Site should help with": goals.length ? goals.join(", ") : "(none picked)",
          Budget: or(budget),
          Timeline: or(data.timeline),
          "Anything else": or(data.message, "(nothing added)"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || "Something went wrong sending your message.");
      setReplyBy(reach);
      setStatus("success");
      form.reset();
      resetChoices();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong sending your message.");
    }
  }

  const replyVerb = { Text: "text", Call: "call", Email: "email" }[replyBy];

  return (
    <section id="contact" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Contact" title="Start a project.">
          Tell me a bit about your business. I'll reply within 24 hours to set up your free mockup call.
        </SectionHeading>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[7fr_4fr] lg:gap-14">
          <Reveal className="rounded-card bg-white p-6 shadow-soft sm:p-10">
            {status === "success" ? (
              <div role="status" className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-4xl font-semibold tracking-tight">Got it!</h3>
                <p className="mt-3 max-w-md text-xl">I'll {replyVerb} you within 24 hours.</p>
                <p className="mt-3 font-hand text-4xl font-semibold leading-none text-brand-ink">— {firstName}</p>
                <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary mt-10">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-x-5 gap-y-8 sm:grid-cols-2">
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                {/* 1. Contact details */}
                <div className="sm:col-span-2">
                  <Field label="Your name" id="name">
                    <input id="name" name="name" required autoComplete="name" className="field" />
                  </Field>
                </div>
                <Field label="Phone" id="phone">
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className="field" />
                </Field>
                <Field label="Email" id="email" optional={reach !== "Email"}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required={reach === "Email"}
                    autoComplete="email"
                    className="field"
                  />
                </Field>
                <Group legend="Best way to reach you">
                  <Pills name="reach" options={REACH} required value={reach} onChange={setReach} />
                </Group>

                {/* 2. What they need */}
                <Group legend="What do you need?">
                  <NeedCards value={need} onChange={chooseNeed} />
                </Group>

                {/* 3. Current website */}
                <Group legend="Do you have a website now?">
                  <Pills name="hasSite" options={HAS_SITE} required value={hasSite} onChange={setHasSite} />
                  {hasSite === "Yes" && (
                    <div className="mt-4">
                      <Field label="Its address" id="siteUrl" optional>
                        <input
                          id="siteUrl"
                          name="siteUrl"
                          type="text"
                          inputMode="url"
                          autoComplete="url"
                          placeholder="yourbusiness.com"
                          className="field"
                        />
                      </Field>
                    </div>
                  )}
                </Group>

                {/* 4. Business type */}
                <Group legend="Type of business">
                  <Pills name="businessType" options={BUSINESS_TYPES} required value={businessType} onChange={setBusinessType} />
                  {businessType === "Other" && (
                    <div className="mt-4">
                      <Field label="What kind of business?" id="businessOther">
                        <input id="businessOther" name="businessOther" required className="field" />
                      </Field>
                    </div>
                  )}
                </Group>

                {/* 5. Goals */}
                <Group legend="What should your site help with?" hint="pick any">
                  <Pills name="goals" type="checkbox" options={GOALS} />
                </Group>

                {/* 6. Budget */}
                <Group legend="Budget" hint="optional">
                  <Pills name="budget" options={BUDGETS} value={budget} onChange={setBudget} />
                </Group>

                {/* 7. Timeline */}
                <Group legend="Timeline">
                  <Pills name="timeline" options={TIMELINES} required />
                </Group>

                {/* 8. Anything else */}
                <div className="sm:col-span-2">
                  <Field label="Anything else?" id="message" optional>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Links you like, questions, anything that helps."
                      className="field resize-y"
                    />
                  </Field>
                </div>

                {status === "error" && (
                  <div role="alert" className="rounded-xl bg-peach px-4 py-3 text-base sm:col-span-2">
                    <strong className="font-semibold">Couldn't send your message.</strong> {error} You can email me
                    directly at{" "}
                    <a href={`mailto:${EMAIL}`} className="font-semibold text-brand-ink underline underline-offset-2">
                      {EMAIL}
                    </a>
                    .
                  </div>
                )}

                <div className="flex flex-col gap-4 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary group w-full disabled:opacity-60 sm:w-auto sm:self-start"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    {status !== "sending" && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </button>
                  <p className="text-base text-muted">No commitment. I'll text or email you within 24 hours.</p>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal delay={120} as="aside" className="@container flex flex-col gap-8">
            <ContactLink label="Text me" href={smsHref}>
              <span className="link-underline">{PHONE}</span>
              <Chat className="h-6 w-6 shrink-0 text-brand-ink" />
            </ContactLink>
            <ContactLink label="Email" href={`mailto:${EMAIL}`} size="text-[clamp(1rem,6cqw,1.5rem)]">
              <span className="link-underline">{EMAIL}</span>
            </ContactLink>
            {showInstagram && (
              <ContactLink label="Instagram" href={instagramUrl} external>
                <span className="link-underline">@{instagramHandle}</span>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </ContactLink>
            )}
            <div className="rounded-card bg-peach p-6">
              <p className="font-semibold">
                <span lang="es">Hablamos español.</span>
              </p>
              <p className="mt-1 text-muted">Calls, texts, and feedback in English or Spanish.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
