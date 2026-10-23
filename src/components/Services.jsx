import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Check } from "./Icons";
import { plans, care, terms } from "../data/services";
import { selectProject } from "../lib/utils";

function QuoteLink({ project, children, className = "" }) {
  return (
    <a href="#contact" onClick={() => selectProject(project)} className={`btn btn-secondary ${className}`}>
      {children}
    </a>
  );
}

export default function Services() {
  return (
    <section id="pricing" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Pricing" title="What it costs.">
          Starting prices. You get an exact quote before I start, and you don't pay until you've seen your finished site.
        </SectionHeading>

        <Reveal className="mt-14 grid overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-3">
          {plans.map((p, i) => (
            <div key={p.name} className={`flex flex-col p-7 sm:p-8 ${i ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
              <h3 className="font-display text-xl font-semibold tracking-normal">{p.name}</h3>
              <p className="mt-2 text-muted md:min-h-[5em]">{p.for}</p>
              <p className="mt-6 text-sm text-muted">Starting at</p>
              <p className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.008em]">{p.price}</p>
              <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-[0.3em] h-4 w-4 shrink-0 text-brand-ink" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <QuoteLink project={p.project} className="w-full">
                  {p.cta}
                </QuoteLink>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-4 flex flex-col gap-6 rounded-2xl border border-line bg-white p-7 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h3 className="font-display text-xl font-semibold tracking-normal">
              {care.name}{" "}
              <span className="whitespace-nowrap">
                · {care.price}
                <span className="text-base font-medium text-muted">{care.unit}</span>
              </span>
            </h3>
            <p className="mt-2 text-muted">{care.text}</p>
          </div>
          <QuoteLink project={care.project} className="shrink-0">
            Ask about Site Care
          </QuoteLink>
        </Reveal>

        <Reveal as="p" className="mt-6 max-w-3xl text-muted">
          {terms}
        </Reveal>
      </div>
    </section>
  );
}
