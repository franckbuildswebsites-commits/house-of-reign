import { useRef } from "react";
import Orbit from "./Orbit";
import Press from "./Press";
import { usePauseOffscreen } from "../lib/offscreen";

// One screen: the ring of client tiles with a short line in its center, then a huge two-tone
// statement, left-aligned, with the two actions. The text rises once with CSS on first paint.
export default function Hero() {
  const ref = useRef(null);
  usePauseOffscreen(ref);
  return (
    <section ref={ref} id="top" className="site-wrap">
      <div className="relative flex h-svh max-h-[60rem] min-h-[34rem] flex-col gap-2 pb-20 pt-[var(--nav-h)] lg:gap-4 lg:pb-12">
        <Orbit className="min-h-0 flex-1">
          <div className="absolute inset-0 grid place-items-center">
            <p className="rise max-w-[11rem] text-center text-[0.9375rem] leading-snug tracking-[-0.01em] text-dim lg:max-w-[14rem] lg:text-[1.0625rem]">
              Websites for South Florida businesses.
            </p>
          </div>
        </Orbit>

        <div>
          <h1 className="rise t-hero">
            <span className="block">Websites that get you</span>
            <span className="block text-caption">more clients.</span>
          </h1>
          <div className="rise mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 lg:mt-6" style={{ "--d": "80ms" }}>
            <Press href="#contact" className="btn btn-primary">
              Start a project
            </Press>
            <a href="#work" className="link-more">
              See our work
            </a>
          </div>
        </div>

        <a href="#services" className="scroll-cue label absolute bottom-6 right-0 flex items-center gap-1.5 lg:bottom-12">
          Scroll
          <span aria-hidden="true" className="scroll-cue-line" />
        </a>
      </div>
    </section>
  );
}
