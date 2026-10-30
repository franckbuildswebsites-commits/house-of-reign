import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Crown } from "./Logo";
import { ArrowRight, Check } from "./Icons";
import { services, HOURLY_RATE } from "../data/services";
import { selectProject } from "../lib/utils";

// Plans side by side in a hairline grid; Custom Build is the orange one.
export default function Pricing() {
  return (
    <section id="pricing" className="px-section pb-28 sm:pb-36">
      <div className="mx-auto max-w-[100rem]">
        <SectionHeading n="04" label="Pricing" title="Simple, upfront pricing." dim="No surprises.">
          Pick a starting point. We'll shape the details together.
        </SectionHeading>

        <div className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => {
            const accent = s.style === "accent";
            return (
              <Reveal
                key={s.name}
                delay={i * 90}
                className={`group flex flex-col rounded-[24px] p-7 transition-[transform,background-color] duration-500 ease-[var(--ease-out-soft)] motion-safe:hover:-translate-y-1.5 sm:p-8 ${
                  accent ? "bg-brand text-ink" : "bg-coal ring-1 ring-line hover:bg-ember"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{s.name}</h3>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${accent ? "border-ink/25" : "border-line text-dim"}`}>
                    {s.timeline}
                  </span>
                </div>
                <p className={`mt-3 min-h-[3.2em] text-[0.98rem] leading-snug ${accent ? "text-ink/75" : "text-dim"}`}>{s.perfectFor}</p>

                <div className={`mt-8 border-t pt-6 ${accent ? "border-ink/20" : "border-line"}`}>
                  <p className={`label ${accent ? "!text-ink/70" : ""}`}>{s.priceLabel}</p>
                  <p className="h-display mt-2 text-[clamp(3rem,4.4vw,4.25rem)]">
                    {s.price}
                    {s.unit && <span className={`ml-1 font-sans text-lg font-medium tracking-normal ${accent ? "text-ink/70" : "text-dim"}`}>{s.unit}</span>}
                  </p>
                </div>

                <ul className="mt-8 flex flex-col gap-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.98rem] leading-snug">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accent ? "text-ink" : "text-brand"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
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

        <Reveal className="mt-4 grid gap-px overflow-hidden rounded-[24px] bg-line ring-1 ring-line md:grid-cols-3">
          <div className="bg-night p-7 sm:p-8">
            <p className="label">Extra changes</p>
            <p className="h-display mt-3 text-5xl">{HOURLY_RATE}</p>
            <p className="mt-2 text-dim">After your included revision round.</p>
          </div>
          <div className="bg-night p-7 sm:p-8 md:col-span-2">
            <p className="label">How payment works</p>
            <p className="mt-3 text-lg leading-relaxed text-cream/85 sm:text-xl">
              Love the mockup as-is? Pay in full and we move to revisions and launch. Rather split it? 50% to start,
              50% before launch. No hidden fees.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex items-center justify-center gap-2 text-center text-lg font-medium">
          <Crown className="h-4 w-4 shrink-0 text-brand" />
          Every project starts with a free mockup call.
        </Reveal>
      </div>
    </section>
  );
}
