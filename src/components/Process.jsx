import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Clock } from "./Icons";
import { steps } from "../data/process";

function Role({ who, text, dot }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {who}
      </p>
      <p className="mt-1.5 leading-relaxed">{text}</p>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="bg-peach px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Process" title="From call to live in four steps.">
          You always know what's next, and who's doing it.
        </SectionHeading>

        <ol className="mt-12 flex flex-col gap-4 sm:mt-16 sm:gap-5">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 60}
              className="group grid gap-6 rounded-card bg-white p-6 shadow-soft sm:p-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
            >
              <div className="flex items-start gap-5">
                <span className="inline-block font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-brand transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">{s.title}</h3>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-peach px-3 py-1 text-sm font-medium">
                    <Clock className="h-4 w-4 shrink-0 text-brand-ink" />
                    {s.timing}
                  </p>
                </div>
              </div>
              <Role who="You" text={s.you} dot="bg-ink" />
              <Role who="Me" text={s.me} dot="bg-brand" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
