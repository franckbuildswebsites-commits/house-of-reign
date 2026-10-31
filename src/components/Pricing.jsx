import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Check } from "./Icons";
import { services, HOURLY_RATE, REVISION_NOTE } from "../data/services";
import { selectProject } from "../lib/utils";

const promises = ["Free mockup before you pay", "You own your site and domain", "Replies within 24 hours", "You work with us directly"];

// Four plans side by side, then one quiet row with the fine print.
export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-y">
      <div className="site-wrap">
        <SectionHeading id="pricing-title" label="Pricing" title="Simple pricing." dim="No surprises." />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 50} className="flex flex-col rounded-[24px] border border-line p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="t-h4">{s.name}</h3>
                <span className="text-sm text-caption">{s.timeline}</span>
              </div>
              <p className="t-h2 mt-6">
                {s.price}
                {s.unit && <span className="ml-1 text-[0.9375rem] font-normal tracking-normal text-caption">{s.unit}</span>}
              </p>
              <p className="mt-0.5 text-sm text-caption">{s.priceLabel === "Monthly" ? "per month" : "starting at"}</p>
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
                <a href="#contact" onClick={s.project ? () => selectProject(s.project) : undefined} className="btn btn-primary">
                  {s.cta ?? "Get a free mockup"}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 grid gap-x-8 gap-y-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <p className="t-small">
            {REVISION_NOTE}. Extra changes {HOURLY_RATE}. Pay in full, or 50% to start and 50% at launch.
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
