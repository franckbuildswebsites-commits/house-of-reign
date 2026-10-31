import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Press from "./Press";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, Chat, Check } from "./Icons";
import { STUDIO_NAME, EMAIL, PHONE, WEB3FORMS_KEY } from "../config";
import { isPlaceholder, showInstagram, instagramHandle, instagramUrl, smsHref, PROJECT_EVENT } from "../lib/utils";

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
  "tap flex min-h-11 items-center gap-2 rounded-full border border-field px-4 py-2 text-[0.9375rem] transition-colors hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/25";

function Field({ label, id, optional, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.9375rem] font-semibold">
        {label} {optional && <span className="font-normal text-caption">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function Group({ legend, hint, children }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="text-[0.9375rem] font-semibold">
        {legend} {hint && <span className="font-normal text-caption">({hint})</span>}
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
              className="grid h-4 w-4 place-items-center rounded border border-field [label:has(:checked)_&]:border-accent [label:has(:checked)_&]:bg-accent"
            >
              <Check className="hidden h-3 w-3 text-on-accent [label:has(:checked)_&]:block" />
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
          className="tap flex min-h-14 items-center gap-3 rounded-[18px] border border-field px-5 py-3 text-base transition-colors hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/25"
        >
          <input
            type="radio"
            name="need"
            value={o}
            required
            checked={value === o}
            onChange={() => onChange(o)}
            className="sr-only"
          />
          <span
            aria-hidden="true"
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-field [label:has(:checked)_&]:border-accent"
          >
            <span className="hidden h-2.5 w-2.5 rounded-full bg-accent [label:has(:checked)_&]:block" />
          </span>
          {o}
        </label>
      ))}
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
  // Two short steps instead of one long form: 1 = about you, 2 = your project.
  const [step, setStep] = useState(1);
  const stepOne = useRef(null);
  const stepTwo = useRef(null);

  function next() {
    const fields = [...stepOne.current.querySelectorAll("input")];
    if (!fields.every((f) => f.reportValidity())) return;
    setStep(2);
    requestAnimationFrame(() => stepTwo.current?.querySelector("input")?.focus());
  }

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
    setStep(1);
    setReach("Text");
    setNeed("");
    setHasSite("");
    setBusinessType("");
    setBudget("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (step === 1) return next(); // Enter on step 1 moves on
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    if (data.botcheck) return; // honeypot

    if (isPlaceholder(WEB3FORMS_KEY)) {
      setStatus("error");
      setError("The contact form isn't connected yet.");
      return;
    }

    const goals = formData.getAll("goals");
    const site = hasSite === "Yes" ? `Yes: ${or(data.siteUrl, "(no link given)")}` : or(hasSite);
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
    <section id="contact" aria-labelledby="contact-title" className="section-y">
      <div className="site-wrap">
        <SectionHeading id="contact-title" label="Contact" title="Start a project." dim="No commitment.">
          We reply within 24 hours.
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.6fr)_minmax(0,1fr)] lg:gap-12">
          <Reveal className="rounded-[28px] border border-line p-6 sm:p-10">
            {status === "success" ? (
              <div role="status" className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-on-accent">
                  <Check className="h-6 w-6" />
                </span>
                <h3 className="t-h3 mt-6">Got it!</h3>
                <p className="t-lead mt-2 max-w-md">We'll {replyVerb} you within 24 hours.</p>
                <button type="button" onClick={() => setStatus("idle")} className="link-more mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-x-5 gap-y-8 sm:grid-cols-2">
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <p className="label sm:col-span-2" aria-live="polite">
                  Step {step} of 2 · {step === 1 ? "About you" : "Your project"}
                </p>

                {/* Step 1: contact details */}
                <div ref={stepOne} className={step === 1 ? "contents" : "hidden"}>
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

                  <div className="sm:col-span-2">
                    <Press as="button" type="button" onClick={next} className="btn btn-primary w-full sm:w-auto">
                      Next: your project
                    </Press>
                  </div>
                </div>

                {/* Step 2: the project */}
                <div ref={stepTwo} className={step === 2 ? "contents" : "hidden"}>
                  {/* What they need */}
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
                    <Pills
                      name="businessType"
                      options={BUSINESS_TYPES}
                      required
                      value={businessType}
                      onChange={setBusinessType}
                    />
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
                    <div role="alert" className="rounded-[14px] border border-line px-4 py-3 text-base sm:col-span-2">
                      <strong className="font-semibold">Couldn't send your message.</strong> {error} You can email us directly at{" "}
                      <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-2">
                        {EMAIL}
                      </a>
                      .
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                    <button type="button" onClick={() => setStep(1)} className="min-h-11 text-[0.9375rem] text-accent hover:underline">
                      Back
                    </button>
                    <Press
                      as="button"
                      type="submit"
                      disabled={status === "sending"}
                      className="btn btn-primary grow disabled:opacity-60 sm:grow-0"
                    >
                      {status === "sending" ? "Sending…" : "Send message"}
                    </Press>
                  </div>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal delay={80} as="aside" className="@container flex flex-col gap-7">
            <ContactLink label="Message us" href={smsHref}>
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
            <p className="t-small" lang="es">
              Hablamos español.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
