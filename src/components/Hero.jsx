import { useRef } from "react";
import HeroWall from "./HeroWall";
import { usePauseOffscreen } from "../lib/offscreen";
import Words from "./Words";
import { SITE_DESCRIPTION } from "../config";

// Every service we do, drifting up the right side of the hero (desktop).
const tags = ["Web design", "Redesigns", "Google Business Profile", "Menus & signage", "Social posts", "Logos & flyers", "Online ordering", "Site care"];

// Full-screen opener, laid out like the reference: a tilted wall of our work across the top,
// services ticking up on the right, the intro line and a two-tone headline bottom-left.
// The headline rises word by word with CSS on first paint (no waiting for JavaScript).
export default function Hero() {
  const ref = useRef(null);
  usePauseOffscreen(ref);
  return (
    <section ref={ref} id="top" className="px-section relative flex h-[min(100svh,900px)] min-h-[700px] flex-col overflow-hidden pb-24 sm:pb-20 lg:min-h-[760px] lg:pb-14">
      <HeroWall className="absolute inset-x-0 top-[5.5rem] h-[52%] sm:h-[55%] lg:right-[16%] lg:top-[6.5rem] lg:h-[58%]" />

      <div
        aria-hidden="true"
        className="absolute right-[3.75rem] top-[26%] hidden h-[34%] w-[13rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_25%,#000_75%,transparent)] lg:block"
      >
        <ul className="ticker flex flex-col items-end gap-2.5">
          {[...tags, ...tags].map((t, i) => (
            <li key={i} className="rounded-[10px] border border-line px-3.5 py-2 text-sm text-cream/70">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mt-auto w-full max-w-[100rem]">
        <p className="fade-in t-small max-w-[20rem]" style={{ "--d": "500ms" }}>
          {SITE_DESCRIPTION}
        </p>
        <div className="mt-6 flex items-end justify-between gap-8">
          <h1 className="words-in t-h1">
            <span className="block">
              <Words text="Websites that get you" />
            </span>
            <span className="block text-brand">
              <Words text="more clients." start={4} />
            </span>
          </h1>
          <a href="#services" className="label fade-in mb-2 hidden shrink-0 transition-colors hover:text-cream sm:block" style={{ "--d": "900ms" }}>
            Scroll down
          </a>
        </div>
      </div>
    </section>
  );
}
