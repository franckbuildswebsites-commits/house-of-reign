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
        <span aria-hidden="true" className="h-display text-[clamp(4.5rem,9vw,8rem)] leading-[0.7] text-brand">
          “
        </span>
      </Reveal>
      <div>
        <Reveal delay={80} as="blockquote" lang={original ? t.originalLangCode : undefined}>
          <p className="max-w-[40rem] font-display text-[clamp(1.2rem,2.6vw,2.25rem)] font-normal leading-[1.22] tracking-[-0.025em]">
            {original ? t.original : t.quote}
          </p>
        </Reveal>
        <Reveal delay={160} className="mt-12 flex max-w-[40rem] flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
          <figcaption className="flex items-center gap-4">
            <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-brand font-display font-medium text-ink">
              {initials}
            </span>
            <span>
              <span className="block font-display text-lg font-medium">{t.name}</span>
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
                className="link-sweep inline-flex min-h-11 items-center font-medium text-cream"
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
    <section aria-label="What clients say" className="px-section section-gap">
      <div className="mx-auto flex max-w-[100rem] flex-col gap-24">
        {testimonials.map((t) => (
          <Quote key={t.name} t={t} />
        ))}
      </div>
    </section>
  );
}
