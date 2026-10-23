import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, Check, ChevronDown } from "./Icons";
import { STUDIO_NAME, EMAIL, PHONE, WEB3FORMS_KEY } from "../config";
import {
  isPlaceholder,
  showInstagram,
  instagramHandle,
  instagramUrl,
  telHref,
  PROJECT_EVENT,
} from "../lib/utils";

const CUSTOM = "Custom Build";
const NEEDS = ["Launch Page", "Business Site", CUSTOM, "Site Care", "Not sure yet"];
const BUDGETS = ["Under $1k", "$1–2k", "$2k+"];

// Extra questions shown only for a Custom Build.
const CUSTOM_PAGES = ["6–10", "11–20", "20+", "Not sure yet"];
const CUSTOM_FEATURES = ["Online ordering", "Booking", "Payments", "Memberships", "Other"];
const CUSTOM_BUDGETS = ["$2,500–$5k", "$5k–$10k", "$10k+", "Not sure yet"];
const CUSTOM_TIMELINES = ["As soon as possible", "Within 1 month", "1–3 months", "Flexible"];

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

function Select({ id, name, options, required, value, onChange }) {
  const valueProps = value === undefined ? { defaultValue: "" } : { value, onChange };
  return (
    <div className="relative">
      <select id={id} name={name} required={required} {...valueProps} className="field appearance-none pr-11">
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

function ContactLink({ label, href, external, children }) {
  return (
    <div className="border-t border-line pt-4">
      <p className="text-sm text-muted">{label}</p>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="text-link mt-1 inline-flex max-w-full items-center gap-1.5 break-all text-lg text-ink"
      >
        {children}
      </a>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");
  const [need, setNeed] = useState("");
  const custom = need === CUSTOM;

  // Pricing cards (e.g. "Request a quote" on Custom Build) pre-select the project type.
  useEffect(() => {
    const onSelect = (e) => setNeed(e.detail);
    window.addEventListener(PROJECT_EVENT, onSelect);
    return () => window.removeEventListener(PROJECT_EVENT, onSelect);
  }, []);

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

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New project inquiry from ${data.name}`,
          from_name: `${STUDIO_NAME} website`,
          name: data.name,
          email: data.email,
          "Business name": data.business || "(not provided)",
          "What do you need help with": data.need,
          Budget: data.budget || "(not provided)",
          ...(custom && {
            "Number of pages": data.pages || "(not provided)",
            "Features needed": formData.getAll("features").join(", ") || "(not provided)",
            Timeline: data.timeline || "(not provided)",
          }),
          message: data.message,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || "Something went wrong sending your message.");
      setStatus("success");
      form.reset();
      setNeed("");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong sending your message.");
    }
  }

  return (
    <section id="contact" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Contact" title="Get a quote.">
            Tell me about your business. I reply within 24 hours, in English or Spanish.
          </SectionHeading>
          <Reveal as="aside" delay={80} className="mt-10 flex flex-col gap-5">
            <ContactLink label="Call or text" href={telHref}>
              {PHONE}
            </ContactLink>
            <ContactLink label="Email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </ContactLink>
            {showInstagram && (
              <ContactLink label="Instagram" href={instagramUrl} external>
                @{instagramHandle}
                <ArrowUpRight className="h-4 w-4 shrink-0" />
                <span className="sr-only">(opens in a new tab)</span>
              </ContactLink>
            )}
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal className="rounded-2xl border border-line bg-white p-6 sm:p-10">
            {status === "success" ? (
              <div role="status" className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-strong text-white">
                  <Check className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.008em]">Got it, thank you.</h3>
                <p className="mt-3 max-w-md text-lg text-muted">I'll get back to you within 24 hours.</p>
                <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary mt-10">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <Field label="Your name" id="name">
                  <input id="name" name="name" required autoComplete="name" className="field" />
                </Field>
                <Field label="Your email" id="email">
                  <input id="email" name="email" type="email" required autoComplete="email" className="field" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="What's your business called?" id="business" optional>
                    <input id="business" name="business" autoComplete="organization" className="field" />
                  </Field>
                </div>
                <Field label="What do you need help with?" id="need">
                  <Select id="need" name="need" options={NEEDS} required value={need} onChange={(e) => setNeed(e.target.value)} />
                </Field>
                <Field label={custom ? "Budget range" : "Rough budget"} id="budget" optional>
                  <Select key={custom} id="budget" name="budget" options={custom ? CUSTOM_BUDGETS : BUDGETS} />
                </Field>
                {custom && (
                  <>
                    <Field label="How many pages?" id="pages" optional>
                      <Select id="pages" name="pages" options={CUSTOM_PAGES} />
                    </Field>
                    <Field label="Timeline" id="timeline" optional>
                      <Select id="timeline" name="timeline" options={CUSTOM_TIMELINES} />
                    </Field>
                    <fieldset className="sm:col-span-2">
                      <legend className="text-[0.95rem] font-semibold">
                        Features needed <span className="font-normal text-muted">(optional)</span>
                      </legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {CUSTOM_FEATURES.map((f) => (
                          <label
                            key={f}
                            className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2 transition-colors hover:border-ink has-[:checked]:border-brand has-[:checked]:bg-sand"
                          >
                            <input type="checkbox" name="features" value={f} className="h-4 w-4 accent-brand" />
                            {f}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </>
                )}
                <div className="sm:col-span-2">
                  <Field label="Tell me about your project" id="message">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="What does your business do, and what should your new site help with?"
                      className="field resize-y"
                    />
                  </Field>
                </div>

                {status === "error" && (
                  <div role="alert" className="rounded-xl bg-sand px-4 py-3 text-base sm:col-span-2">
                    <strong className="font-semibold">Couldn't send your message.</strong> {error} You can email me
                    directly at{" "}
                    <a href={`mailto:${EMAIL}`} className="font-semibold text-brand-ink underline underline-offset-2">
                      {EMAIL}
                    </a>
                    .
                  </div>
                )}

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary w-full disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  <p className="text-base text-muted">I'll reply within 24 hours.</p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
