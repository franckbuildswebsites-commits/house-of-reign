import { useRef } from "react";
import Blob from "./Blob";
import { usePauseOffscreen } from "../lib/offscreen";

const services = [
  "Web Design", "Website Redesigns", "Online Ordering", "Booking Setup", "Google Business Profile", "Logos & Branding",
  "Social Media Posts", "Menus & Signage", "Flyers & Posters", "Business Cards", "Site Care",
];

// Everything we do, drifting up the right side (wide screens only; the Services section is right
// below). The list is doubled so the loop is seamless, and an edge mask softens the top and bottom.
function ServiceSlider() {
  return (
    <div aria-hidden="true" className="slider absolute inset-y-[6%] right-0 hidden w-56 overflow-hidden lg:block">
      <ul className="ticker flex flex-col items-end">
        {[...services, ...services].map((s, i) => (
          <li key={i} className="pb-2">
            <span className="block rounded-full border border-line px-3 py-1 text-[0.8125rem] leading-snug tracking-[-0.008em]">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// One screen: the liquid glass drop in the middle, the services drifting up the right side, and a
// huge two-tone statement in front of it with a small line under it, left-aligned. The floating pills
// carry the actions. The text rises once with CSS on first paint.
export default function Hero() {
  const ref = useRef(null);
  usePauseOffscreen(ref);
  return (
    <section ref={ref} id="top" className="site-wrap">
      <div className="relative flex h-svh max-h-[60rem] min-h-[34rem] flex-col gap-2 pb-20 pt-[var(--nav-h)] lg:gap-4 xl:pb-8">
        <div className="blob-stage relative min-h-0 flex-1">
          <Blob />
          <ServiceSlider />
        </div>

        <div className="relative">
          <h1 className="rise t-hero">
            <span className="block">Look like you</span>
            <span className="block text-caption">run the place.</span>
          </h1>
          <p className="rise mt-3 text-balance text-sm leading-[1.15] tracking-normal text-dim" style={{ "--d": "80ms" }}>
            Websites, branding, and everything in between for local businesses.
          </p>
        </div>

        <a href="#services" className="scroll-cue label absolute bottom-6 right-0 flex items-center gap-1.5">
          Scroll
          <span aria-hidden="true" className="scroll-cue-line" />
        </a>
      </div>
    </section>
  );
}
