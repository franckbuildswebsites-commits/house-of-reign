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
    <figure className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] md:gap-12">
      <Reveal className="flex items-start md:justify-start">
        <span aria-hidden="true" className="text-[clamp(3.5rem,6vw,5rem)] font-semibold leading-[0.8] text-accent">
          “
        </span>
      </Reveal>
      <div>
        <Reveal delay={80} as="blockquote" lang={original ? t.originalLangCode : undefined}>
          <p className="t-card max-w-[38rem] !font-normal !leading-[1.3]">
            {original ? t.original : t.quote}
          </p>
        </Reveal>
        <Reveal delay={160} className="mt-10 flex max-w-[38rem] flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
          <figcaption className="flex items-center gap-4">
            <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full border border-line text-[0.9375rem] font-semibold">
              {initials}
            </span>
            <span>
              <span className="block font-semibold">{t.name}</span>
              <span className="text-sm text-caption">
                {t.role}
                {t.role && t.business && ", "}
                {t.business}
              </span>
            </span>
          </figcaption>
          {t.original && (
            <p className="text-sm text-caption">
              Translated from {t.originalLang} ·{" "}
              <button
                type="button"
                onClick={() => setShowOriginal((v) => !v)}
                aria-pressed={showOriginal}
                className="inline-flex min-h-11 items-center text-accent hover:underline"
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
    <section aria-label="What clients say" className="section-y">
      <div className="site-wrap flex flex-col gap-24">
        {testimonials.map((t) => (
          <Quote key={t.name} t={t} />
        ))}
      </div>
    </section>
  );
}
