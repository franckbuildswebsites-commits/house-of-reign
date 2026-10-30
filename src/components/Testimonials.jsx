import { useState } from "react";
import Reveal from "./Reveal";
import { testimonials } from "../data/testimonials";

// One big pull quote per client, with a toggle to read it in its original language.
function Quote({ t }) {
  const [showOriginal, setShowOriginal] = useState(false);
  const original = showOriginal && t.original;
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <figure className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-10">
      <Reveal className="flex items-start md:justify-start">
        <span aria-hidden="true" className="h-display text-[clamp(6rem,14vw,12rem)] leading-[0.7] text-brand">
          “
        </span>
      </Reveal>
      <div>
        <Reveal delay={80} as="blockquote" lang={original ? t.originalLangCode : undefined}>
          <p className="h-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            {original ? t.original : t.quote}
          </p>
        </Reveal>
        <Reveal delay={160} className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
          <figcaption className="flex items-center gap-4">
            <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-brand font-display font-semibold text-night">
              {initials}
            </span>
            <span>
              <span className="block font-display text-lg font-semibold">{t.name}</span>
              <span className="text-sm text-dim">
                {t.role}
                {t.role && t.business && ", "}
                {t.business}
              </span>
            </span>
          </figcaption>
          {t.original && (
            <p className="text-sm text-dim">
              Translated from {t.originalLang} ·{" "}
              <button
                type="button"
                onClick={() => setShowOriginal((v) => !v)}
                aria-pressed={showOriginal}
                className="link-sweep font-semibold text-cream"
              >
                {showOriginal ? "View translation" : "View original"}
              </button>
            </p>
          )}
        </Reveal>
      </div>
    </figure>
  );
}

export default function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section aria-label="What clients say" className="px-5 pb-28 sm:px-8 sm:pb-36">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-24">
        {testimonials.map((t) => (
          <Quote key={t.name} t={t} />
        ))}
      </div>
    </section>
  );
}
