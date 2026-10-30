import { useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import SectionHeading from "./SectionHeading";
import { CallMock, BuildMock, LaunchMock, CareMock } from "./StepMockups";
import { steps } from "../data/process";

const EASE = [0.2, 0.8, 0.2, 1];
const media = [CallMock, BuildMock, LaunchMock, CareMock];

// A pinned stage, after the reference: step list on the left, the step's illustration in the
// middle (the old one flies out up-left, the new one comes in from the bottom-right), the step's
// text top-right and a giant step number bottom-left. Scrolling moves through the steps.
export default function Process() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(steps.length - 1, Math.floor(p * steps.length))));

  const s = steps[active];
  const Media = media[active];

  return (
    <section id="process" aria-labelledby="process-title">
      <div className="px-section mx-auto max-w-[100rem]">
        <SectionHeading id="process-title" variant="end" label="How it works" title="Mockup to launch." dim="Four simple steps.">
          You always know what's next, and who's doing it.
        </SectionHeading>
      </div>

      {/* The stage below is visual only; this list carries every step for search engines and screen readers. */}
      <ol className="sr-only">
        {steps.map((st) => (
          <li key={st.n}>
            <h3>
              Step {st.n}: {st.title} ({st.timing})
            </h3>
            <p>You: {st.you}</p>
            <p>Me: {st.me}</p>
          </li>
        ))}
      </ol>

      <div ref={ref} className="relative border-t border-line" style={{ height: `${steps.length * 85 + 15}svh` }}>
        <div aria-hidden="true" className="px-section sticky top-0 mx-auto grid h-svh max-w-[100rem] grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-x-6 gap-y-4 overflow-hidden pb-8 pt-24 lg:grid-cols-[14rem_minmax(0,1fr)_22rem] lg:grid-rows-[minmax(0,1fr)_auto] lg:pt-32">
          {/* step list */}
          <ol className="col-start-1 row-start-3 flex items-center self-end justify-self-end pb-3 lg:row-span-1 lg:row-start-1 lg:block lg:self-center lg:justify-self-auto lg:pb-0">
            {steps.map((st, i) => (
              <li key={st.n}>
                <span
                  className={`my-1 inline-flex items-center gap-2.5 rounded-full py-1.5 text-[0.95rem] transition-all duration-500 ${
                    i === active ? "bg-cream/10 px-3.5 text-cream" : "px-2 text-dim"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-[2px] transition-colors duration-500 ${i <= active ? "bg-brand" : "bg-cream/20"}`} />
                  {i === active && <span>{st.title}</span>}
                </span>
              </li>
            ))}
          </ol>

          {/* step text */}
          <div className="row-start-1 lg:col-start-3 lg:row-start-1 lg:self-start">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="font-display text-[clamp(1.6rem,2.2vw,2rem)] font-medium tracking-[-0.03em]">{s.title}</p>
                <p className="mt-1 text-sm text-dim">{s.timing}</p>
                <dl className="mt-4 grid grid-cols-2 gap-4 text-[0.95rem] leading-snug lg:grid-cols-1">
                  <div>
                    <dt className="label">You</dt>
                    <dd className="mt-1 text-cream/85">{s.you}</dd>
                  </div>
                  <div>
                    <dt className="label !text-brand">Me</dt>
                    <dd className="mt-1 text-cream/85">{s.me}</dd>
                  </div>
                </dl>
              </m.div>
            </AnimatePresence>
          </div>

          {/* illustration */}
          <div className="relative row-start-2 grid min-h-0 place-items-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <AnimatePresence initial={false} mode="popLayout">
              <m.div
                key={active}
                initial={{ opacity: 0, x: "45%", y: "55%", scale: 0.55 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: "-55%", y: "-60%", scale: 0.5 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="@container aspect-[4/4.4] max-h-full w-[min(100%,22rem)] overflow-hidden rounded-[18px] shadow-[var(--shadow-deep)] ring-1 ring-line lg:w-[min(100%,26rem)]"
              >
                <Media />
              </m.div>
            </AnimatePresence>
          </div>

          {/* giant number */}
          <div className="col-start-1 row-start-3 h-[clamp(5rem,13vw,11rem)] overflow-hidden lg:row-start-2">
            <AnimatePresence initial={false} mode="popLayout">
              <m.p
                key={active}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="font-display text-[clamp(5rem,13vw,11rem)] font-semibold leading-none tracking-[-0.05em]"
              >
                {s.n}
              </m.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
