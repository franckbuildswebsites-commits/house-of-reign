import Reveal from "./Reveal";
import Words from "./Words";

// Editorial header: a hairline across the page, a small numbered label on the left and a
// two-tone headline on the right (second line dimmed). Words rise in when it scrolls into view.
export default function SectionHeading({ n, label, title, dim, children, id }) {
  const titleWords = title.split(" ").length;
  return (
    <header className="grid gap-6 border-t border-line pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-10 md:pt-10">
      <Reveal as="p" className="label flex items-center gap-3 self-start">
        <span className="text-brand">({n})</span>
        {label}
      </Reveal>
      <div>
        <Reveal as="h2" id={id} className="reveal-words h-display text-[clamp(2.6rem,6.4vw,6rem)]">
          <span className="block">
            <Words text={title} />
          </span>
          {dim && (
            <span className="block text-cream/40">
              <Words text={dim} start={titleWords} />
            </span>
          )}
        </Reveal>
        {children && (
          <Reveal delay={150} className="mt-6 max-w-xl text-lg text-dim sm:text-xl">
            {children}
          </Reveal>
        )}
      </div>
    </header>
  );
}
