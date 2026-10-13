import Reveal from "./Reveal";
import Photo from "./Photo";
import { Crown } from "./Logo";
import { STUDIO_NAME, OWNER } from "../config";
import { firstName } from "../lib/utils";
import { projects } from "../data/projects";

const reign = projects.find((p) => p.id === "reign");

// "A note from me": the About section (keeps the #about anchor used by the nav).
export default function Note() {
  return (
    <section id="about" className="bg-peach px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[5fr_7fr] md:gap-16 lg:gap-24">
        <Reveal className="mx-auto w-full max-w-[22rem] md:max-w-none">
          <figure className="relative -rotate-2 rounded-[10px] bg-white p-3 pb-16 shadow-lift sm:p-4 sm:pb-[4.5rem]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-brand">
              <Photo
                src="/me.jpg"
                alt={`${OWNER}, founder of ${STUDIO_NAME}`}
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                fallback={
                  <div aria-hidden="true" className="absolute inset-0 grid place-items-center text-white">
                    <Crown className="h-1/3 w-1/3" />
                  </div>
                }
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-4 text-center font-hand text-[1.7rem] font-semibold leading-none sm:bottom-5">
              {firstName} · Founder
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal as="p" className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            About
          </Reveal>
          <Reveal
            as="h2"
            delay={60}
            className="font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
          >
            A note from me.
          </Reveal>

          <Reveal delay={120} className="mt-8 rounded-card bg-white p-7 shadow-soft sm:p-10">
            <div className="space-y-5 text-lg leading-[1.75] sm:text-[1.2rem]">
              <p>
                Most small businesses don't need a giant agency. They need someone who picks up the phone, gets what
                they do, and builds them something that actually brings in customers.
              </p>
              <p>
                That's me. I speak English and Spanish, and when you work with {STUDIO_NAME}{" "}
                you talk to the person building your site — no account managers, no runaround.
              </p>
            </div>

            <div className="mt-8">
              <p className="font-hand text-[3.25rem] font-semibold leading-none text-brand-ink">{firstName}</p>
              <p className="mt-2 text-sm font-medium text-muted">Founder, {STUDIO_NAME}</p>
            </div>

            {reign && (
              <p className="mt-8 border-t border-sand pt-6 text-base text-muted">
                <span className="font-semibold text-ink">P.S.</span> We also built{" "}
                <a href={reign.url} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-brand-ink">
                  Reign
                </a>
                , our own booking platform for event vendors, so we know what makes a site actually bring in clients.
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
