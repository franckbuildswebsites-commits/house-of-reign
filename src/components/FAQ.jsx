import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { faq } from "../data/faq";

// Full-width hairline rows; the "+" turns into "−" and the answer opens with a height animation.
// Answers stay in the HTML (closed rows are inert), so search engines still read them.
export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading n="06" label="FAQ" title="Good questions." dim="Straight answers." />

        <Reveal as="ul" className="mt-14 border-b border-line sm:mt-20 md:ml-[calc((100%-2.5rem)/3.4+2.5rem)]">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-t border-line">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium transition-colors duration-300 sm:py-7 sm:text-xl ${
                      isOpen ? "text-cream" : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    <span className="transition-transform duration-500 ease-[var(--ease-out-soft)] motion-safe:group-hover:translate-x-1.5">{item.q}</span>
                    <span className={`plus transition-colors duration-300 ${isOpen ? "text-brand" : ""}`} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="acc" data-open={isOpen}>
                  <div inert={!isOpen || undefined}>
                    <p className="max-w-2xl pb-7 text-lg leading-relaxed text-dim">{item.a}</p>
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
