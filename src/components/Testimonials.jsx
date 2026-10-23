import { useState } from "react";

// One client quote, with a "View original" toggle when it was translated. `dark` = light text for a dark card.
export function Testimonial({ t, dark = false, className = "" }) {
  const muted = dark ? "text-paper/70" : "text-muted";
  const [showOriginal, setShowOriginal] = useState(false);
  const original = showOriginal && t.original;

  return (
    <figure className={className}>
      <blockquote
        lang={original ? t.originalLangCode : undefined}
        className="font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium leading-[1.3] tracking-normal"
      >
        “{original ? t.original : t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
        <span className="font-semibold">{t.name}</span>
        <span className={muted}>
          {t.role}
          {t.role && t.business && ", "}
          {t.business}
        </span>
        {t.original && (
          <span className={`text-sm sm:ml-auto ${muted}`}>
            Translated from {t.originalLang} ·{" "}
            <button
              type="button"
              onClick={() => setShowOriginal((v) => !v)}
              aria-pressed={showOriginal}
              className={`text-link ${dark ? "text-paper" : "text-ink"}`}
            >
              {showOriginal ? "View translation" : "View original"}
            </button>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
