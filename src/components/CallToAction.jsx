import Reveal from "./Reveal";
import { Avatar } from "./Photo";
import { ArrowRight, Chat } from "./Icons";
import { PHONE } from "../config";
import { smsHref } from "../lib/utils";

export default function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="bg-peach px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <Avatar className="h-16 w-16 text-lg ring-4 ring-white" />
        </Reveal>
        <Reveal
          as="h2"
          id="cta-title"
          delay={60}
          className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
        >
          Let's build something you're proud of.
        </Reveal>
        <Reveal as="p" delay={120} className="mt-6 max-w-xl text-lg sm:text-xl">
          Tell me about your business — I'll send you a free mockup idea within 48 hours.
        </Reveal>
        <Reveal delay={180} className="mt-9 flex flex-col items-center gap-5">
          <a href="#contact" className="btn btn-primary group px-8 py-4">
            Get my free mockup
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href={smsHref} className="group inline-flex items-center gap-2 font-medium">
            <Chat className="h-5 w-5 text-brand-ink" />
            <span className="link-underline font-semibold text-brand-ink">Or text me at {PHONE}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
