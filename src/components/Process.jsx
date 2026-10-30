import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { steps } from "../data/process";

const EASE = [0.2, 0.8, 0.2, 1];

function Role({ who, text, accent }) {
  return (
    <div className="border-t border-line pt-4">
      <p className="label flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${accent ? "bg-brand" : "bg-cream"}`} />
        {who}
      </p>
      <p className="mt-2 text-lg leading-relaxed text-cream/85">{text}</p>
    </div>
  );
}

// Desktop: a sticky stage on the left (giant step number + step list) follows the steps on the
// right; whichever step is mid-screen is active. Phones: the steps simply stack.
export default function Process() {
  const [active, setActive] = useState(0);
  const stepEls = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepEls.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading n="05" label="Process" title="How it works." dim="Four steps, no guesswork.">
          You always know what's next, and who's doing it.
        </SectionHeading>

        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          <div className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-10">
              <div className="relative h-[clamp(9rem,15vw,14rem)] overflow-hidden" aria-hidden="true">
                <AnimatePresence initial={false} mode="popLayout">
                  <m.span
                    key={active}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="h-display absolute left-0 top-0 block text-[clamp(9rem,15vw,14rem)] leading-[1] text-brand"
                  >
                    {steps[active].n}
                  </m.span>
                </AnimatePresence>
              </div>
              <ol className="flex flex-col gap-1">
                {steps.map((s, i) => (
                  <li key={s.n}>
                    <a
                      href={`#step-${s.n}`}
                      className={`inline-flex items-center gap-3 rounded-full px-4 py-2 font-medium transition-colors duration-300 ${
                        i === active ? "bg-cream text-night" : "text-dim hover:text-cream"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-[2px] ${i === active ? "bg-brand" : "bg-cream/25"}`} />
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ol className="flex flex-col">
            {steps.map((s, i) => (
              <li
                key={s.n}
                id={`step-${s.n}`}
                data-i={i}
                ref={(el) => (stepEls.current[i] = el)}
                className="border-t border-line py-10 first:border-t-0 first:pt-0 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-12"
              >
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="h-display text-5xl text-brand lg:hidden">{s.n}</span>
                    <h3 className="h-display text-[clamp(2.4rem,4.4vw,4rem)]">{s.title}</h3>
                  </div>
                  <p className="mt-4 inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-cream/80">{s.timing}</p>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <Role who="You" text={s.you} />
                    <Role who="Me" text={s.me} accent />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
