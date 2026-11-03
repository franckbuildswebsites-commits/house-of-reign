import { useLayoutEffect, useRef, useState } from "react";
import { m, useScroll } from "motion/react";
import SectionHeading from "./SectionHeading";
import { steps } from "../data/process";

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// One step: its number on the rail, its text beside it. The first time it comes into view the number
// darkens and the text rises 16px into place (CSS, .tl-step in index.css). The prerendered HTML shows
// everything as finished; only steps still below the fold after hydration wait for their entrance,
// and the space they take never changes.
function Step({ step }) {
  const ref = useRef(null);
  const [state, setState] = useState("seen");

  useLayoutEffect(() => {
    const el = ref.current?.querySelector(".tl-number"); // the number meets the rail's tip
    if (!el || reduced() || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top + el.offsetHeight / 2 < window.innerHeight * 0.7) return;
    setState("waiting");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("seen");
        io.disconnect();
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0.5 }, // its middle at 70% of the screen, where the rail fills to
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li ref={ref} data-state={state} className="tl-step grid grid-cols-[var(--tl-col)_minmax(0,1fr)] gap-x-5 pb-14 last:pb-0 sm:gap-x-8 lg:pb-20">
      {/* The number sits on the page color so the rail shows only between numbers. */}
      <p aria-hidden="true" className="tl-number relative z-10 justify-self-center bg-page py-2 tabular-nums">
        {step.n}
      </p>
      <div className="tl-body max-w-[36rem] pt-2 lg:pt-3.5">
        <h3 className="t-h4 font-semibold">
          <span className="sr-only">Step {step.n}: </span>
          {step.title}
        </h3>
        <p className="mt-2 text-dim">{step.body}</p>
      </div>
    </li>
  );
}

// A vertical timeline with plain page scrolling (nothing pinned). A hairline runs down between the
// step numbers and an indigo line fills it as you scroll: scroll-linked scaleY from the top, a
// transform only. With reduced motion the line is simply full and every step is already in place.
export default function Process() {
  const list = useRef(null);
  const rail = useRef(null);
  const [span, setSpan] = useState(null); // where the rail starts and ends, measured from the numbers
  const { scrollYProgress } = useScroll({ target: rail, offset: ["start 70%", "end 70%"] });

  // The rail runs from the middle of 01 to the middle of 04, whatever the text wraps to.
  useLayoutEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const measure = () => {
      const nums = ol.querySelectorAll(".tl-number");
      const first = nums[0];
      const last = nums[nums.length - 1];
      const top = first.offsetTop + first.offsetHeight / 2;
      const bottom = last.offsetTop + last.offsetHeight / 2;
      setSpan((s) => (s && s.top === top && s.height === bottom - top ? s : { top, height: bottom - top }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="process" aria-labelledby="process-title" className="section-y">
      <div className="site-wrap">
        <SectionHeading id="process-title" label="How it works" title="From first message" dim="to looking the part.">
          Simple, fast, and you see everything before you pay for the rest.
        </SectionHeading>

        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)]">
          <div aria-hidden="true" className="hidden md:block" />
          <div className="md:pl-12">
            <ol ref={list} className="relative">
              <div
                ref={rail}
                aria-hidden="true"
                className="pointer-events-none absolute left-[calc(var(--tl-col)/2)] w-px -translate-x-1/2 bg-line"
                style={span ? { top: span.top, height: span.height } : { top: "2rem", bottom: "2rem" }}
              >
                {/* Reduced motion: CSS overrides the scroll link and shows the line full. */}
                <m.div className="absolute inset-0 origin-top bg-accent motion-reduce:!transform-none" style={{ scaleY: scrollYProgress }} />
              </div>
              {steps.map((st) => (
                <Step key={st.n} step={st} />
              ))}
            </ol>

            <div className="mt-12 grid grid-cols-[var(--tl-col)_minmax(0,1fr)] gap-x-5 sm:gap-x-8 lg:mt-16">
              <span />
              <a href="#contact" className="link-more !mt-0 justify-self-start">
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
