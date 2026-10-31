import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import SectionHeading from "./SectionHeading";
import { CallMock, BuildMock, LaunchMock, CareMock } from "./StepMockups";
import { steps } from "../data/process";

const media = [CallMock, BuildMock, LaunchMock, CareMock];

// Where step i sits while step `active` is showing. Text slides out both ways in its clipped box.
const textY = (i, active) => (i === active ? "translateY(0)" : i < active ? "translateY(-110%)" : "translateY(110%)");
// Illustrations are opaque cards: each new one slides up and covers the last.
const cardY = (i, active) => (i <= active ? "translateY(0)" : "translateY(110%)");

// A pinned stage, after the reference: step list on the left, the step's illustration in the middle,
// the step's text top-right and the step number bottom-left. Scrolling moves through the steps.
// Every step is stacked in place and slides on transforms, so nothing ever fades.
export default function Process() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(steps.length - 1, Math.floor(p * steps.length))));

  return (
    <section id="process" aria-labelledby="process-title" className="pt-22 lg:pt-28">
      <div className="site-wrap">
        <SectionHeading id="process-title" variant="end" label="How it works" title="Mockup to launch." dim="Four simple steps." />
      </div>

      {/* The stage below is visual only; this list carries every step for search engines and screen readers. */}
      <ol className="sr-only">
        {steps.map((st) => (
          <li key={st.n}>
            <h3>
              Step {st.n}: {st.title} ({st.timing})
            </h3>
            <p>You: {st.you}</p>
            <p>Us: {st.us}</p>
          </li>
        ))}
      </ol>

      <div ref={ref} className="relative -mt-10 lg:-mt-24" style={{ height: `${steps.length * 85 + 15}svh` }}>
        <div
          aria-hidden="true"
          className="site-wrap sticky top-0 grid h-svh grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-x-10 gap-y-5 overflow-hidden pb-20 pt-24 lg:grid-cols-[10rem_minmax(0,1fr)_17rem] lg:grid-rows-[minmax(0,1fr)_auto] lg:pb-10 lg:pt-[7.5rem]"
        >
          {/* step list */}
          <ol className="col-start-1 row-start-3 flex items-center gap-1.5 self-end justify-self-end pb-2 lg:row-span-1 lg:row-start-1 lg:flex-col lg:items-start lg:gap-3 lg:self-center lg:justify-self-auto lg:pb-0">
            {steps.map((st, i) => (
              <li key={st.n} className={`flex items-center gap-2.5 text-sm transition-colors duration-300 ${i === active ? "text-ink" : "text-caption"}`}>
                <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${i <= active ? "bg-accent" : "bg-line"}`} />
                <span className="hidden lg:inline">{st.title}</span>
              </li>
            ))}
          </ol>

          {/* step text */}
          <div className="relative row-start-1 grid overflow-hidden lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-center">
            {steps.map((st, i) => (
              <div key={st.n} className="step-slide col-start-1 row-start-1" style={{ transform: textY(i, active) }}>
                <p className="t-h3">{st.title}</p>
                <p className="t-small mt-1">{st.timing}</p>
                <dl className="mt-4 grid grid-cols-2 gap-4 text-[0.9375rem] leading-snug lg:grid-cols-1">
                  <div>
                    <dt className="label">You</dt>
                    <dd className="mt-0.5">{st.you}</dd>
                  </div>
                  <div>
                    <dt className="label !text-accent">Us</dt>
                    <dd className="mt-0.5">{st.us}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          {/* illustration */}
          <div className="relative row-start-2 grid min-h-0 place-items-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="@container relative aspect-[4/4.4] max-h-full w-[min(100%,20rem)] overflow-hidden rounded-[24px] border border-line bg-page lg:w-[min(100%,24rem)]">
              {media.map((Media, i) => (
                <div key={i} className="step-slide absolute inset-0" style={{ transform: cardY(i, active) }}>
                  <Media />
                </div>
              ))}
            </div>
          </div>

          {/* step number */}
          <div className="relative col-start-1 row-start-3 h-12 overflow-hidden lg:row-start-2">
            {steps.map((st, i) => (
              <p key={st.n} className="step-slide t-h2 absolute left-0 top-0 tabular-nums text-caption" style={{ transform: textY(i, active) }}>
                {st.n}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
