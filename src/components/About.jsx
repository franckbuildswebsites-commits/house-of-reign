import Reveal from "./Reveal";
import { OWNER, PHOTO, STUDIO_NAME } from "../config";
import { isPlaceholder } from "../lib/utils";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">About</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.008em]">
            Hi, I'm {OWNER}.
          </h2>
          {!isPlaceholder(PHOTO) && (
            <img
              src={PHOTO}
              alt={`${OWNER}, founder of ${STUDIO_NAME}`}
              width="400"
              height="400"
              loading="lazy"
              className="mt-8 aspect-square w-40 rounded-2xl object-cover"
            />
          )}
        </Reveal>
        <Reveal delay={80} className="space-y-5 text-lg sm:text-xl sm:leading-relaxed lg:col-span-7 lg:col-start-6">
          <p>
            {STUDIO_NAME} is me. The person you talk to is the person who designs and builds your site, from the first
            conversation to launch day.
          </p>
          <p>
            I work in English and Spanish, so calls, texts and feedback happen in whichever is easier for you.{" "}
            <span lang="es" className="text-muted">
              Hablamos español.
            </span>
          </p>
          <p>
            I also built{" "}
            <a href="https://takereign.com" target="_blank" rel="noopener noreferrer" className="text-link text-brand-ink">
              Reign<span className="sr-only"> (opens in a new tab)</span>
            </a>
            , booking and deposit software for event vendors, and I run it alongside client work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
