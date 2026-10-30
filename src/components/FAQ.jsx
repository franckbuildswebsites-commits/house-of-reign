import { useState } from "react";
import Reveal from "./Reveal";
import Words from "./Words";
import { faq } from "../data/faq";

// After the reference: a narrow label column with a vertical hairline running the full height,
// the headline and full-width hairline rows on the right. "+" turns into "−"; one answer open at
// a time, opening with a height animation. Answers stay in the HTML for search engines.
export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-y border-line">
      <div className="mx-auto grid max-w-[100rem] md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
        <div className="px-section pt-14 md:border-r md:border-line md:py-20 md:pr-10">
          <Reveal as="p" className="label">FAQs</Reveal>
        </div>
        <div>
          <Reveal as="h2" id="faq-title" className="reveal-words px-section pb-12 pt-6 font-display text-[clamp(2.6rem,5.6vw,5rem)] font-medium leading-[1] tracking-[-0.045em] md:!pl-14 md:pb-16 md:pt-20">
            <span className="block">
              <Words text="Good questions." />
            </span>
            <span className="block text-cream/40">
              <Words text="Straight answers." start={2} />
            </span>
          </Reveal>
          <ul>
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
                      className="px-section group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.05rem] font-medium transition-colors duration-300 hover:bg-cream/[0.03] sm:py-7 sm:text-lg md:!pl-14"
                    >
                      <span className="transition-transform duration-500 ease-[var(--ease-out-soft)] motion-safe:group-hover:translate-x-1.5">{item.q}</span>
                      <span className={`plus h-5 w-5 transition-colors duration-300 ${isOpen ? "text-brand" : ""}`} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="acc" data-open={isOpen}>
                    <div inert={!isOpen || undefined}>
                      <p className="px-section max-w-3xl pb-8 text-[1.02rem] leading-relaxed text-dim md:!pl-14">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
