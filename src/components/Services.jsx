import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Crown } from "./Logo";
import { ArrowRight, Check } from "./Icons";
import { services, HOURLY_RATE } from "../data/services";
import { selectProject } from "../lib/utils";

export default function Services() {
  return (
    <section id="services" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Services" title="Simple, upfront pricing.">
          Pick a starting point. We'll shape the details together.
        </SectionHeading>

        {/* On desktop each card is a 4-row subgrid, so titles, prices, feature lists and buttons
            line up across the row. The premium (accent) card spans the full width below it. */}
        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-3">
          {services.map((s, i) => {
            const dark = s.style === "dark";
            const accent = s.style === "accent";
            const sub = dark ? "text-white/70" : "text-muted";
            return (
              <Reveal
                key={s.name}
                delay={i * 80}
                className={`flex flex-col rounded-card p-7 shadow-soft transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-1.5 sm:p-8 lg:grid ${
                  accent
                    ? "lg:col-span-3 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:p-10"
                    : "lg:row-span-4 lg:grid-rows-subgrid lg:gap-0"
                } ${dark ? "bg-ink text-white" : accent ? "bg-white ring-2 ring-brand" : "bg-white"}`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{s.name}</h3>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
                        dark ? "bg-white/10" : accent ? "bg-peach text-brand-ink" : "bg-sand"
                      }`}
                    >
                      {s.timeline}
                    </span>
                  </div>
                  <p className={`mt-3 ${sub}`}>
                    <span className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>Perfect for:</span> {s.perfectFor}
                  </p>
                </div>

                <div className={`mt-8 ${accent ? "lg:self-end" : ""}`}>
                  <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${sub}`}>{s.priceLabel}</p>
                  <p className="mt-1 font-display text-6xl font-semibold tracking-[-0.03em]">
                    {s.price}
                    {s.unit && <span className={`ml-1 text-xl font-medium ${sub}`}>{s.unit}</span>}
                  </p>
                </div>

                <ul
                  className={`mt-8 flex flex-col gap-3 border-t pt-6 ${dark ? "border-white/15" : "border-sand"} ${
                    accent ? "lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:border-t-0 lg:pt-0" : ""
                  }`}
                >
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-brand" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className={`mt-auto pt-10 ${accent ? "lg:self-end" : ""}`}>
                  <a
                    href="#contact"
                    onClick={s.project ? () => selectProject(s.project) : undefined}
                    className={`btn group w-full ${dark || accent ? "btn-primary" : "btn-secondary"}`}
                  >
                    {s.cta ?? "Get a free mockup"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6 flex flex-col gap-5 rounded-card bg-white p-6 shadow-soft sm:mt-8 sm:p-8 md:flex-row md:items-center md:gap-8">
          <div aria-hidden="true" className="flex h-14 w-full shrink-0 overflow-hidden rounded-full font-display text-xl font-bold md:w-56">
            <span className="flex flex-1 items-center justify-center bg-brand text-white">50%</span>
            <span className="flex flex-1 items-center justify-center bg-ink text-paper">50%</span>
          </div>
          <p className="text-lg">
            <span className="font-semibold">How payment works:</span> 50% to start after you approve the mockup, 50%
            when your site goes live. No hidden fees. Extra changes after your revision round are {HOURLY_RATE}.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex items-center justify-center gap-2 text-center text-lg font-medium">
          <Crown className="h-4 w-4 shrink-0 text-brand" />
          Every project starts with a free mockup call.
        </Reveal>
      </div>
    </section>
  );
}
