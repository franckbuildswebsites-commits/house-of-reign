import HeroWall from "./HeroWall";
import Words from "./Words";
import { Avatar } from "./Photo";
import { ArrowRight } from "./Icons";
import { SITE_DESCRIPTION } from "../config";
import { firstName } from "../lib/utils";

// Full-screen opener. The headline rises word by word with CSS on first paint (no waiting for
// JavaScript); the rest fades up right after. Our work drifts behind it.
export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-10 sm:px-8 lg:min-h-[max(100svh,760px)]">
      <HeroWall />

      <div className="relative mx-auto mt-auto w-full max-w-[90rem] pt-[47svh] sm:pt-[40svh] lg:pt-40">
        <p className="fade-in label flex items-center gap-3" style={{ "--d": "60ms" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Web design studio · <span lang="es" className="normal-case tracking-normal">Hablamos español</span>
        </p>

        <h1 className="words-in h-display mt-5 max-w-[11ch] text-[clamp(3.1rem,8.6vw,8.75rem)] sm:max-w-none">
          <span className="block">
            <Words text="Websites that get you" />
          </span>
          <span className="block text-brand">
            <Words text="more clients." start={4} />
          </span>
        </h1>

        <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="fade-in max-w-xl text-lg leading-relaxed text-cream/75 sm:text-xl" style={{ "--d": "650ms" }}>
            {SITE_DESCRIPTION}
          </p>

          <div className="fade-in flex flex-wrap items-center gap-3" style={{ "--d": "780ms" }}>
            <a href="#contact" className="btn btn-primary group grow sm:grow-0">
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#work" className="btn btn-ghost grow backdrop-blur-sm sm:grow-0">
              See the work
            </a>
          </div>
        </div>

        <div className="fade-in mt-10 flex items-center justify-between gap-6 border-t border-line pt-6" style={{ "--d": "900ms" }}>
          <p className="flex items-center gap-3 text-[0.95rem] text-cream/80">
            <Avatar className="h-9 w-9" />
            <span>
              <span className="font-semibold text-cream">Hi, I'm {firstName}.</span> I build every site myself.
            </span>
          </p>
          <a href="#about" className="label hidden items-center gap-2 transition-colors hover:text-cream sm:flex">
            Scroll
            <span aria-hidden="true" className="inline-block h-6 w-px origin-top animate-pulse bg-dim" />
          </a>
        </div>
      </div>
    </section>
  );
}
