import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowRight, Check } from "./Icons";
import { services, HOURLY_RATE, REVISION_NOTE } from "../data/services";
import { selectProject } from "../lib/utils";

const promises = ["Free mockup before you pay", "You own your site and domain", "Replies within 24 hours", "You work with me directly"];

// Four plans side by side (Custom Build in orange), then one quiet row with the fine print.
export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="px-section section-gap">
      <div className="mx-auto max-w-[100rem]">
        <SectionHeading id="pricing-title" label="Pricing" title="Simple pricing." dim="No surprises." />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => {
            const accent = s.style === "accent";
            return (
              <Reveal
                key={s.name}
                delay={i * 80}
                className={`group flex flex-col rounded-[24px] p-7 transition-transform duration-500 ease-[var(--ease-out-soft)] motion-safe:hover:-translate-y-1.5 sm:p-9 ${
                  accent ? "bg-brand text-ink" : "ring-1 ring-line"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="t-h4">{s.name}</h3>
                  <span className={`text-sm ${accent ? "text-ink/80" : "text-dim"}`}>{s.timeline}</span>
                </div>
                <p className="t-h2 mt-8 !text-[clamp(3rem,4.4vw,4.25rem)]">
                  {s.price}
                  {s.unit && <span className={`ml-1 font-sans text-base font-medium tracking-normal ${accent ? "text-ink/80" : "text-dim"}`}>{s.unit}</span>}
                </p>
                <p className={`mt-1 text-sm ${accent ? "text-ink/80" : "text-dim"}`}>{s.priceLabel === "Monthly" ? "per month" : "starting at"}</p>
                <p className={`mt-6 text-[0.9375rem] leading-snug ${accent ? "text-ink/85" : "text-cream/85"}`}>{s.perfectFor}</p>
                <ul className={`mt-6 flex flex-col gap-2.5 border-t pt-6 text-[0.9375rem] ${accent ? "border-ink/20" : "border-line"}`}>
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check className={`h-4 w-4 shrink-0 ${accent ? "text-ink" : "text-brand"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <a
                    href="#contact"
                    onClick={s.project ? () => selectProject(s.project) : undefined}
                    className={`btn group/btn w-full ${accent ? "btn-night" : "btn-ghost"}`}
                  >
                    {s.cta ?? "Get a free mockup"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-4 grid gap-x-8 gap-y-4 px-1 py-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
          <p className="t-small">
            {REVISION_NOTE}. Extra changes {HOURLY_RATE}. Pay in full, or 50% to start and 50% at launch.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80 lg:justify-end">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
