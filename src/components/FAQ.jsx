import { useState } from "react";
import { LayoutGroup, m } from "motion/react";
import Reveal from "./Reveal";
import Words from "./Words";
import { faq } from "../data/faq";

const FIRST = 6; // shown before "More questions"
const EASE = [0.2, 0.8, 0.2, 1];

// After the reference: a narrow label column with a full-height hairline, the headline and
// full-width rows on the right. One answer open at a time. Motion is transform/opacity only:
// the answer fades up, and the rows below glide to their new place (Framer "position" layout,
// which moves them with transforms). Every answer stays in the HTML for search engines.
export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [all, setAll] = useState(false);
  const shown = all ? faq : faq.slice(0, FIRST);

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-y border-line">
      <div className="mx-auto grid max-w-[100rem] md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
        <div className="px-section pt-12 md:border-r md:border-line md:py-20 md:pr-10">
          <Reveal as="p" className="label">FAQs</Reveal>
        </div>
        <div>
          <Reveal as="h2" id="faq-title" className="reveal-words t-h2 px-section pb-12 pt-4 md:!pl-14 md:pb-16 md:pt-20">
            <span className="block">
              <Words text="Good questions." />
            </span>
            <span className="block text-cream/40">
              <Words text="Straight answers." start={2} />
            </span>
          </Reveal>
          <LayoutGroup>
            <ul>
              {shown.map((item, i) => {
                const isOpen = open === i;
                return (
                  <m.li key={item.q} layout="position" transition={{ duration: 0.45, ease: EASE }} className="border-t border-line">
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="px-section group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium transition-colors duration-300 hover:bg-cream/[0.03] sm:text-lg md:!pl-14"
                      >
                        <span className="transition-transform duration-500 ease-[var(--ease-out-soft)] motion-safe:group-hover:translate-x-1.5">{item.q}</span>
                        <span className={`plus h-5 w-5 transition-colors duration-300 ${isOpen ? "text-brand" : ""}`} aria-hidden="true" />
                      </button>
                    </h3>
                    <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                      <p className="fade-in px-section max-w-2xl pb-7 text-[0.9375rem] leading-relaxed text-dim md:!pl-14">{item.a}</p>
                    </div>
                  </m.li>
                );
              })}
            </ul>
            {!all && (
              <m.div layout="position" className="border-t border-line">
                <button
                  type="button"
                  onClick={() => setAll(true)}
                  className="px-section flex min-h-16 w-full items-center gap-2 text-left text-sm font-semibold text-dim transition-colors hover:text-cream md:!pl-14"
                >
                  More questions ({faq.length - FIRST})
                </button>
              </m.div>
            )}
          </LayoutGroup>
          {/* The rest stays in the page source for search engines until it's shown. */}
          {!all && (
            <div hidden>
              {faq.slice(FIRST).map((item) => (
                <div key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
