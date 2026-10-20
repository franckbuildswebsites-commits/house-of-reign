import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { testimonials } from "../data/testimonials";

function Testimonial({ t, i }) {
  const [showOriginal, setShowOriginal] = useState(false);
  const original = showOriginal && t.original;
  const business = t.url ? (
    <a href={t.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
      {t.business}
    </a>
  ) : (
    t.business
  );

  return (
    <Reveal as="figure" delay={(i % 3) * 80} className="flex flex-col rounded-card bg-white p-7 shadow-soft sm:p-8">
      <blockquote lang={original ? t.originalLangCode : undefined} className="text-lg leading-relaxed">
        “{original ? t.original : t.quote}”
      </blockquote>
      {t.original && (
        <p className="mt-4 text-sm text-muted">
          Translated from {t.originalLang} ·{" "}
          <button
            type="button"
            onClick={() => setShowOriginal((v) => !v)}
            aria-pressed={showOriginal}
            className="font-semibold text-ink underline underline-offset-4"
          >
            {showOriginal ? "View translation" : "View original"}
          </button>
        </p>
      )}
      <figcaption className="mt-auto pt-8">
        <span className="block font-display text-lg font-semibold">{t.name}</span>
        {(t.role || t.business) && (
          <span className="text-sm text-muted">
            {t.role}
            {t.role && t.business && ", "}
            {business}
          </span>
        )}
      </figcaption>
    </Reveal>
  );
}

// Hidden entirely until there's at least one real testimonial.
export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Kind words" title="What clients say." />
        <div
          className={`mt-12 grid gap-5 sm:mt-16 sm:gap-6 ${
            testimonials.length === 1 ? "max-w-3xl" : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {testimonials.map((t, i) => (
            <Testimonial key={`${t.name}-${i}`} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
