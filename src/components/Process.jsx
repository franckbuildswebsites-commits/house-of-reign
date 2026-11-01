import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import SectionHeading from "./SectionHeading";
import { CallMock, BuildMock, LaunchMock, CareMock } from "./StepMockups";
import { steps } from "../data/process";

const media = [CallMock, BuildMock, LaunchMock, CareMock];

// Where step i sits while step `active` is showing (index.css, .step-slide).
const place = (i, active) => (i === active ? "now" : i < active ? "past" : "next");

// How quickly the smoothed position catches up with the page, and how far past a step boundary it
// must travel to change step, so resting right on a boundary can't flicker between two steps.
const FOLLOW = 9;
const DEAD_ZONE = 0.12;

// A pinned stage, after the reference: step list on the left, the step's illustration in the middle,
// the step's text top-right and the step number bottom-left. Scrolling moves through the steps: the
// scroll position is eased in an animation frame, and CSS carries each change with one easing.
// Every step is stacked in place, so nothing shifts and no frame is ever blank.
export default function Process() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const motion = useRef({ raf: 0, last: 0, eased: 0, step: 0 });

  useEffect(() => {
    const m = motion.current;
    return () => cancelAnimationFrame(m.raf);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", () => {
    const m = motion.current;
    if (m.raf) return;
    m.last = performance.now();
    const tick = (now) => {
      const goal = scrollYProgress.get() * steps.length;
      const dt = Math.min((now - m.last) / 1000, 0.05);
      m.last = now;
      m.eased += (goal - m.eased) * (1 - Math.exp(-FOLLOW * dt));
      const next = Math.max(0, Math.min(steps.length - 1, Math.floor(m.eased)));
      const clearOfBoundary = next > m.step ? m.eased >= next + DEAD_ZONE || next === steps.length - 1 : m.eased < next + 1 - DEAD_ZONE;
      if (next !== m.step && clearOfBoundary) {
        m.step = next;
        setActive(next);
      }
      if (Math.abs(goal - m.eased) < 0.001) {
        m.eased = goal;
        m.raf = 0;
        return;
      }
      m.raf = requestAnimationFrame(tick);
    };
    m.raf = requestAnimationFrame(tick);
  });

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
              <li key={st.n} className="flex items-center gap-2.5 text-sm text-caption">
                {/* The lit dot and the dark title are layers on top, so changing step only moves opacity. */}
                <span className="relative h-1.5 w-1.5 rounded-full bg-line">
                  <span data-on={i <= active || undefined} className="step-glow absolute inset-0 rounded-full bg-accent" />
                </span>
                <span className="relative hidden lg:inline">
                  {st.title}
                  <span data-on={i === active || undefined} className="step-glow absolute inset-0 text-ink">{st.title}</span>
                </span>
              </li>
            ))}
          </ol>

          {/* step text */}
          <div className="relative row-start-1 grid overflow-hidden lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-center">
            {steps.map((st, i) => (
              <div key={st.n} data-step={place(i, active)} className="step-slide col-start-1 row-start-1">
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
                <div key={i} data-step={place(i, active)} className="step-slide step-card absolute inset-0">
                  <Media />
                </div>
              ))}
            </div>
          </div>

          {/* step number */}
          <div className="step-number relative col-start-1 row-start-3 overflow-hidden lg:row-start-2">
            {steps.map((st, i) => (
              <p key={st.n} data-step={place(i, active)} className="step-slide t-h2 absolute left-0 top-0 tabular-nums text-caption">
                {st.n}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
