import { useRef } from "react";
import Deck from "./Deck";
import { usePauseOffscreen } from "../lib/offscreen";

const services = [
  "Web Design", "Website Redesigns", "Online Ordering", "Booking Setup", "Google Business Profile", "Logos & Branding",
  "Social Media Posts", "Menus & Signage", "Flyers & Posters", "Business Cards", "Site Care",
];

// Everything we do, drifting up the right side (wide screens only; the Services section is right
// below). The list is doubled so the loop is seamless, and an edge mask softens the top and bottom.
function ServiceSlider() {
  return (
    <div aria-hidden="true" className="slider absolute inset-y-[6%] right-0 hidden w-56 overflow-hidden xl:block">
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

// One screen: a fan of client cards with a quiet line under it, the services drifting up the right
// side, then a huge two-tone statement, left-aligned. The floating pills carry the actions. The text
// rises once with CSS on first paint.
export default function Hero() {
  const ref = useRef(null);
  usePauseOffscreen(ref);
  return (
    <section ref={ref} id="top" className="site-wrap">
      <div className="relative flex h-svh max-h-[60rem] min-h-[34rem] flex-col gap-2 pb-20 pt-[var(--nav-h)] lg:gap-4 lg:pb-24">
        <div className="deck-stage relative min-h-0 flex-1">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
            <Deck />
            <p className="rise text-center text-[0.9375rem] leading-snug tracking-[-0.01em] text-dim" style={{ "--d": "260ms" }}>
              Websites that bring in customers.
            </p>
          </div>
          <ServiceSlider />
        </div>

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
