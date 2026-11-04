import Reveal from "./Reveal";
import Press from "./Press";
import SectionHeading from "./SectionHeading";
import { Check, Layout } from "./Icons";
import { services, HOURLY_RATE, REVISION_NOTE, SITE_CARE, BUNDLE_BANNER } from "../data/services";

const promises = ["Free mockup before you pay", "You own your site and domain", "Replies within 24 hours", "You work with us directly"];

// Three website plans side by side, then one quiet row with the fine print.
export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-y">
      <div className="site-wrap">
        <SectionHeading id="pricing-title" label="Pricing" title="Simple pricing." dim="No surprises." />

        <Reveal className="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-[18px] border border-line px-5 py-3.5">
          <p className="flex items-center gap-2.5 text-[0.9375rem] font-medium text-accent">
            <Layout className="h-4 w-4 shrink-0" />
            {BUNDLE_BANNER}
          </p>
          <a href="/pricing" data-section="monthly" className="link-more !mt-0 text-[0.9375rem]">
            See monthly plans
          </a>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:[&>:last-child]:col-span-2 lg:[&>:last-child]:col-span-1">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 50} className="h-full">
              <Press as="div" lift={3} press={0.99} className="flex h-full flex-col rounded-[24px] border border-line p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="t-h4">{s.name}</h3>
                <span className="text-sm text-caption">{s.timeline}</span>
              </div>
              <p className="t-h2 mt-6">
                {s.price}
                {s.unit && <span className="ml-1 text-[0.9375rem] font-normal tracking-normal text-caption">{s.unit}</span>}
              </p>
              <p className="mt-0.5 text-sm text-caption">starting at</p>
              <p className="mt-5 text-[0.9375rem] leading-snug">{s.perfectFor}</p>
              <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5 text-[0.9375rem] leading-snug">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <Press href={`/contact?plan=${s.id}`} className="btn btn-primary">
                  {s.cta ?? "Get a free mockup"}
                </Press>
              </div>
              </Press>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 grid gap-x-8 gap-y-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <p className="t-small">
            {REVISION_NOTE}. Extra changes {HOURLY_RATE}. Pay in full, or 50% to start and 50% at launch.
            <span className="mt-2 block">Just need site upkeep? Site Care is {SITE_CARE}.</span>
          </p>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
