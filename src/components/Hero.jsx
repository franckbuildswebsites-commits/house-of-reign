import { useRef } from "react";
import HeroWall from "./HeroWall";
import { usePauseOffscreen } from "../lib/offscreen";
import { SITE_DESCRIPTION } from "../config";

// Every service we do, drifting up the right side of the hero (desktop).
const tags = ["Web design", "Redesigns", "Google Business Profile", "Menus & signage", "Social posts", "Logos & flyers", "Online ordering", "Site care"];

// Full-screen opener, laid out like the reference: a tilted wall of our work across the top,
// services ticking up on the right, the intro line and a two-tone headline bottom-left.
// The text rises once with CSS on first paint (no waiting for JavaScript).
export default function Hero() {
  const ref = useRef(null);
  usePauseOffscreen(ref);
  return (
    <section ref={ref} id="top" className="site-wrap relative">
      <div className="flex h-[min(100svh,860px)] min-h-[680px] flex-col gap-8 pb-20 pt-[calc(var(--nav-h)+1.5rem)] lg:gap-10 lg:pb-14">
        <div className="relative min-h-0 flex-1">
          <HeroWall className="absolute inset-0 rounded-[28px] lg:right-[15rem]" />

          <div
            aria-hidden="true"
            className="absolute inset-y-[8%] right-0 hidden w-[13rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)] lg:block"
          >
            <ul className="ticker flex flex-col items-end gap-2">
              {[...tags, ...tags].map((t, i) => (
                <li key={i} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-dim">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="rise t-small max-w-[24rem]" style={{ "--d": "120ms" }}>
            {SITE_DESCRIPTION}
          </p>
          <h1 className="rise t-h1 mt-4">
            <span className="block">Websites that get you</span>
            <span className="block text-dim">more clients.</span>
          </h1>
          <div className="rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-1" style={{ "--d": "200ms" }}>
            <a href="#contact" className="btn btn-primary">
              Start a project
            </a>
            <a href="#work" className="link-more">
              See our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
