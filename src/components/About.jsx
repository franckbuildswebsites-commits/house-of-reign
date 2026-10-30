import Reveal from "./Reveal";
import ScrubText from "./ScrubText";
import { Avatar } from "./Photo";
import { STUDIO_NAME } from "../config";
import { firstName } from "../lib/utils";

// "A note from me": one big statement that lights up word by word as you scroll, signed.
// Keeps the #about anchor.
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-section section-gap">
      <div className="mx-auto grid max-w-[100rem] gap-8 border-t border-line pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-0 md:pt-0">
        <Reveal as="p" className="label self-start md:border-r md:border-line md:py-20 md:pr-10 md:self-stretch">
          <span id="about-title">A note from me</span>
        </Reveal>

        <div className="md:py-20 md:pl-14">
          <ScrubText
            className="t-h2 max-w-[22ch] !text-[clamp(1.625rem,4vw,3.5rem)] !leading-[1.1]"
            text="Small businesses don't need a giant agency. They need someone who picks up the phone and builds something that brings in customers."
          />
          <Reveal className="mt-10 flex items-center gap-4">
            <Avatar className="h-12 w-12" />
            <div>
              <p className="font-hand text-[2.25rem] font-semibold leading-none text-brand">{firstName}</p>
              <p className="t-small">
                Founder, {STUDIO_NAME} · <span lang="es">Hablamos español</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
