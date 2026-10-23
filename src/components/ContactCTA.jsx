import Reveal from "./Reveal";
import { ArrowRight, Chat } from "./Icons";
import { telHref, smsHref } from "../lib/utils";

// Dark call-to-action card with call / text / contact-form buttons.
export default function ContactCTA({ title, text, className = "" }) {
  return (
    <Reveal className={`flex flex-col gap-6 rounded-card bg-ink p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between ${className}`}>
      <div>
        <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">{title}</h3>
        {text && <p className="mt-2 text-white/75">{text}</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        <a href="#contact" className="btn btn-primary group grow sm:grow-0">
          Fill out the form
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        <a href={smsHref} className="btn btn-secondary grow sm:grow-0">
          <Chat className="h-5 w-5" />
          Text me
        </a>
        <a href={telHref} className="btn btn-secondary grow sm:grow-0">
          Call
        </a>
      </div>
    </Reveal>
  );
}
