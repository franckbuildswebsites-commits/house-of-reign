import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
      <div>
        <Reveal as="p" className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </Reveal>
        <Reveal
          as="h2"
          delay={60}
          className="font-display text-[clamp(2.5rem,7.5vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
        >
          {title}
        </Reveal>
      </div>
      {children && (
        <Reveal delay={120} className="max-w-sm text-lg text-muted md:text-right">
          {children}
        </Reveal>
      )}
    </div>
  );
}
