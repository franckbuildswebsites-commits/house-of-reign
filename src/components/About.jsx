import Reveal from "./Reveal";
import { Avatar } from "./Photo";
import { STUDIO_NAME } from "../config";
import { firstName } from "../lib/utils";

// "A note from me": the founder speaking, in first person. One short statement, signed.
// Keeps the #about anchor.
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="site-wrap grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] md:gap-0">
        <Reveal as="p" className="label md:border-r md:border-line md:py-2 md:pr-10">
          <span id="about-title">A note from me</span>
        </Reveal>

        <div className="md:py-2 md:pl-12">
          <Reveal as="p" className="t-h3 max-w-[24ch]">
            Small businesses don't need a giant agency. They need someone who picks up the phone and builds something that
            brings in customers.
          </Reveal>
          <Reveal delay={80} className="mt-8 flex items-center gap-4">
            <Avatar className="h-11 w-11" />
            <div>
              <p className="font-hand text-[2rem] font-semibold leading-none">{firstName}</p>
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
