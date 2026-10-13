import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Plus } from "./Icons";
import { faq } from "../data/faq";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" title="Good questions." />
        </div>

        <Reveal as="ul" delay={120} className="flex flex-col gap-3">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="rounded-card bg-white shadow-soft">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-xl font-semibold tracking-tight sm:px-7 sm:text-2xl"
                  >
                    {item.q}
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-[rotate,background-color,color] duration-300 ${
                        isOpen ? "rotate-45 bg-brand text-white" : "bg-peach group-hover:bg-brand group-hover:text-white"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-spring)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden" inert={!isOpen || undefined}>
                    <p className="max-w-2xl px-6 pb-6 text-lg leading-relaxed text-muted sm:px-7">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
