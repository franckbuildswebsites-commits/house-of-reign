import Reveal from "./Reveal";
import Words from "./Words";
import { ArrowUpRight, Chat } from "./Icons";
import { PHONE } from "../config";
import { smsHref, telHref } from "../lib/utils";

// Closing block: full-bleed orange, a huge headline and the phone number as the call to action.
export default function TextMe() {
  return (
    <section id="text-me" aria-labelledby="text-me-title" className="relative overflow-hidden bg-brand px-5 py-24 text-night sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[90rem]">
        <Reveal as="p" className="label flex items-center gap-3 !text-night/70">
          <span className="h-1.5 w-1.5 rounded-full bg-night" />
          Rather just talk?
        </Reveal>

        <Reveal as="h2" id="text-me-title" className="reveal-words h-display mt-6 text-[clamp(4rem,15vw,15rem)] leading-[0.85]">
          <Words text="Text me." />
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-night/20 pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <a href={smsHref} className="group inline-flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="h-display text-[clamp(2.4rem,7vw,6.5rem)] leading-none tracking-[-0.04em]">
                <span className="link-sweep">{PHONE}</span>
              </span>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-night text-cream transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-45 sm:h-20 sm:w-20">
                <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            <p className="max-w-md text-lg sm:text-xl">
              Tell me what you need. I reply within 24 hours, in English or <span lang="es">español</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={smsHref} className="btn btn-night grow sm:grow-0">
                <Chat className="h-5 w-5" />
                Text me
              </a>
              <a href={telHref} className="btn grow border border-night/30 hover:bg-night/10 sm:grow-0">
                Call
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
