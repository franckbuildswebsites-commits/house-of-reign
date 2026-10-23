import Reveal from "./Reveal";
import { Avatar } from "./Photo";
import BuildScene from "./BuildScene";
import { ArrowRight, Wave } from "./Icons";
import { SITE_DESCRIPTION } from "../config";
import { firstName } from "../lib/utils";

function FounderChip() {
  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 shadow-soft">
      <Avatar className="h-11 w-11 text-sm" />
      <p className="text-[0.95rem] leading-snug">
        <span className="font-semibold">Hi, I'm {firstName}.</span> I build every site myself.
      </p>
      <Wave className="h-5 w-5 shrink-0 origin-[70%_90%] animate-wave text-brand-ink" />
    </div>
  );
}

// Desktop: text on the left, the building-a-website scene on the right.
// Mobile: headline, then the scene, then the rest of the text.
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:pt-40">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-8">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold shadow-soft">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span lang="es">Hablamos español</span>
            </span>
          </Reveal>

          <Reveal
            as="h1"
            delay={80}
            className="mt-6 max-w-[13ch] font-display text-[clamp(2.75rem,11.5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em] lg:text-[clamp(3.5rem,5.6vw,5.75rem)]"
          >
            Websites that get you{" "}
            <span className="relative inline-block whitespace-nowrap text-brand">
              more clients.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                className="absolute -bottom-[0.14em] left-0 h-[0.2em] w-full text-brand/35"
              >
                <path d="M4 16C70 6 140 4 200 9s70 9 96 3" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </Reveal>
        </div>

        <div className="mx-auto w-full max-w-[560px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center">
          <BuildScene />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <Reveal delay={140}>
            <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{SITE_DESCRIPTION}</p>
          </Reveal>

          <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-secondary grow sm:grow-0">
              See the work
            </a>
            <a href="#contact" className="btn btn-primary group grow sm:grow-0">
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={260} className="mt-8">
            <FounderChip />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
