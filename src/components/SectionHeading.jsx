import Reveal from "./Reveal";
import Words from "./Words";

// Editorial "bridge" between sections, after the reference: hairlines, a small quiet label and a
// big two-tone headline (second line dimmed) whose words rise in when it scrolls into view.
// Same spacing everywhere: 48px above/below on phones, 80px on desktop.
//   split   label (+ one short line) in a narrow left column, a vertical hairline, headline right
//   reverse headline on the left, the short line bottom-right, a hairline under the right half
//   end     label on the left, headline pushed to the right half
export default function SectionHeading({ label, title, dim, children, id, variant = "split" }) {
  const titleWords = title.split(" ").length;
  const heading = (
    <Reveal as="h2" id={id} className="reveal-words t-h2">
      <span className="block">
        <Words text={title} />
      </span>
      {dim && (
        <span className="block text-quiet">
          <Words text={dim} start={titleWords} />
        </span>
      )}
    </Reveal>
  );
  const line = children && (
    <Reveal as="p" delay={150} className="t-small mt-2 max-w-[17rem]">
      {children}
    </Reveal>
  );

  if (variant === "reverse") {
    return (
      <header className="relative mb-12 grid gap-6 py-16 md:mb-16 md:grid-cols-2 md:items-end md:py-20">
        {heading}
        <div className="md:justify-self-end md:text-right [&>p]:md:ml-auto">
          {label && <Reveal as="p" className="label">{label}</Reveal>}
          {line}
        </div>
        <span aria-hidden="true" className="absolute bottom-0 right-[-1.25rem] hidden h-px w-[calc(50%+1.25rem)] bg-line md:block lg:right-[-3.75rem] lg:w-[calc(50%+3.75rem)]" />
      </header>
    );
  }

  if (variant === "end") {
    return (
      <header className="grid gap-6 py-16 md:grid-cols-2 md:py-20">
        <div>
          <Reveal as="p" className="label">{label}</Reveal>
          {line}
        </div>
        {heading}
      </header>
    );
  }

  return (
    <header className="relative mb-14 grid border-t border-line md:mb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
      <div className="pb-5 pt-16 md:border-r md:border-line md:py-20 md:pr-10">
        <Reveal as="p" className="label">{label}</Reveal>
        {line}
      </div>
      <div className="pb-0 md:py-20 md:pl-14">{heading}</div>
    </header>
  );
}
