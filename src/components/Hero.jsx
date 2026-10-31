import { useRef } from "react";
import Cluster from "./Cluster";
import { usePauseOffscreen } from "../lib/offscreen";

// One screen: a loose cluster of client tiles around a short center line, then a huge two-tone
// statement, left-aligned. The floating pills carry the actions. The text rises once with CSS on first paint.
export default function Hero() {
  const ref = useRef(null);
  usePauseOffscreen(ref);
  return (
    <section ref={ref} id="top" className="site-wrap">
      <div className="relative flex h-svh max-h-[60rem] min-h-[34rem] flex-col gap-2 pb-20 pt-[var(--nav-h)] lg:gap-4 lg:pb-24">
        <Cluster className="min-h-0 flex-1">
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <p className="rise max-w-[11rem] text-center text-[0.9375rem] leading-snug tracking-[-0.01em] text-dim lg:max-w-[14rem] lg:text-[1.0625rem]">
              Websites for South Florida businesses.
            </p>
          </div>
        </Cluster>

        <h1 className="rise t-hero">
          <span className="block">Websites that get you</span>
          <span className="block text-caption">more clients.</span>
        </h1>

        <a href="#services" className="scroll-cue label absolute bottom-6 right-0 flex items-center gap-1.5">
          Scroll
          <span aria-hidden="true" className="scroll-cue-line" />
        </a>
      </div>
    </section>
  );
}
