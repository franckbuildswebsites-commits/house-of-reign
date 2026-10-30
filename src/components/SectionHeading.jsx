import Reveal from "./Reveal";
import Words from "./Words";

// Editorial "bridge" between sections, after the reference: hairlines, a small quiet label and a
// big two-tone headline (second line dimmed) whose words rise in when it scrolls into view.
//   split   label/lead in a narrow left column, a vertical hairline, headline on the right
//   reverse headline on the left, the lead text bottom-right, a hairline under the right half
//   end     label on the left, headline pushed to the right half
export default function SectionHeading({ label, title, dim, children, id, variant = "split" }) {
  const titleWords = title.split(" ").length;
  const heading = (
    <Reveal as="h2" id={id} className="reveal-words font-display text-[clamp(2.6rem,5.6vw,5rem)] font-medium leading-[1] tracking-[-0.045em]">
      <span className="block">
        <Words text={title} />
      </span>
      {dim && (
        <span className="block text-cream/40">
          <Words text={dim} start={titleWords} />
        </span>
      )}
    </Reveal>
  );

  if (variant === "reverse") {
    return (
      <header className="relative grid gap-8 py-16 md:grid-cols-2 md:items-end md:py-24">
        {heading}
        <div className="md:justify-self-end md:text-right">
          {label && <Reveal as="p" className="label">{label}</Reveal>}
          {children && (
            <Reveal delay={150} className="mt-3 max-w-xs text-[0.95rem] leading-snug text-dim md:ml-auto">
              {children}
            </Reveal>
          )}
        </div>
        <span aria-hidden="true" className="absolute bottom-0 right-[-3.75rem] hidden h-px w-[calc(50%+3.75rem)] bg-line md:block" />
      </header>
    );
  }

  if (variant === "end") {
    return (
      <header className="grid gap-8 py-16 md:grid-cols-2 md:py-28">
        <div>
          <Reveal as="p" className="label">{label}</Reveal>
          {children && (
            <Reveal delay={150} className="mt-3 max-w-xs text-[0.95rem] leading-snug text-dim">
              {children}
            </Reveal>
          )}
        </div>
        {heading}
      </header>
    );
  }

  return (
    <header className="relative grid border-t border-line md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
      <div className="py-8 md:border-r md:border-line md:py-16 md:pr-10">
        <Reveal as="p" className="label">{label}</Reveal>
        {children && (
          <Reveal delay={150} className="mt-3 max-w-xs text-[0.95rem] leading-snug text-dim">
            {children}
          </Reveal>
        )}
      </div>
      <div className="pb-12 md:py-16 md:pl-14">{heading}</div>
    </header>
  );
}
