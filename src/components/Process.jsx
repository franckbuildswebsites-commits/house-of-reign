import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { steps } from "../data/process";

export default function Process() {
  return (
    <section id="process" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="How it works" title="Four steps, start to launch." />

        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="border-t-2 border-ink pt-5">
              <p className="font-display text-sm font-semibold text-brand-ink">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-normal">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
              {s.note && <p className="mt-3 text-sm font-medium">{s.note}</p>}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
