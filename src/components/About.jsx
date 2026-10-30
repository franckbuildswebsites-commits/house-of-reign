import Reveal from "./Reveal";
import ScrubText from "./ScrubText";
import { Avatar } from "./Photo";
import { STUDIO_NAME } from "../config";
import { firstName } from "../lib/utils";

// "A note from me": a big statement that lights up word by word as you scroll, then the rest
// of the note in a quieter column. Keeps the #about anchor.
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-section py-28 sm:py-40">
      <div className="mx-auto grid max-w-[100rem] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-10">
        <Reveal as="p" className="label flex items-center gap-3 self-start">
          <span id="about-title">A note from me</span>
        </Reveal>

        <div>
          <ScrubText
            className="h-display text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.02] tracking-[-0.035em]"
            text="Most small businesses don't need a giant agency. They need someone who picks up the phone, gets what they do, and builds them something that actually brings in customers."
          />

          <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:mt-20 md:grid-cols-2">
            <Reveal as="p" className="text-lg leading-relaxed text-cream/80 sm:text-xl">
              That's me. I speak English and Spanish, and when you work with {STUDIO_NAME} you talk to the person
              building your site — no account managers, no runaround.
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14" />
                <div>
                  <p className="font-hand text-[2.6rem] font-semibold leading-none text-brand">{firstName}</p>
                  <p className="text-sm text-dim">Founder, {STUDIO_NAME}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
