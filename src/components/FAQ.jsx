import { useState } from "react";
import { LayoutGroup, m } from "motion/react";
import Reveal from "./Reveal";
import { SPRING_SOFT } from "./Press";
import { faq } from "../data/faq";

const FIRST = 6; // shown before "More questions"

// After the reference: a narrow label column with a full-height hairline, the headline and
// hairline rows on the right. One answer open at a time. Motion is transform only, on a spring:
// the answer settles into place and the rows below glide to theirs (Framer "position" layout,
// which moves them with transforms). Every answer stays in the HTML for search engines.
export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [all, setAll] = useState(false);
  const shown = all ? faq : faq.slice(0, FIRST);

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y">
      <div className="site-wrap grid md:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)]">
        <div className="pb-4 md:border-r md:border-line md:pr-10">
          <Reveal as="p" className="label md:pt-2">FAQs</Reveal>
        </div>
        <div className="md:pl-12">
          <Reveal as="h2" id="faq-title" className="t-h2 pb-10 md:pb-12 md:pt-2">
            <span className="block">Good questions.</span>
            <span className="block text-dim">Straight answers.</span>
          </Reveal>
          <LayoutGroup>
            <ul>
              {shown.map((item, i) => {
                const isOpen = open === i;
                return (
                  <m.li key={item.q} layout="position" transition={SPRING_SOFT} className="border-t border-line">
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left"
                      >
                        {item.q}
                        <span className={`plus transition-colors duration-300 ${isOpen ? "text-accent" : ""}`} aria-hidden="true" />
                      </button>
                    </h3>
                    <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                      <m.p initial={false} animate={{ y: isOpen ? 0 : -10 }} transition={SPRING_SOFT} className="max-w-[34rem] pb-6 text-dim">
                        {item.a}
                      </m.p>
                    </div>
                  </m.li>
                );
              })}
            </ul>
            {!all && (
              <m.div layout="position" transition={SPRING_SOFT} className="border-t border-line">
                <button type="button" onClick={() => setAll(true)} className="link-more mt-2">
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
