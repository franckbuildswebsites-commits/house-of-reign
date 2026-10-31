import Reveal from "./Reveal";

// Editorial "bridge" between sections, after the reference: hairlines, a small quiet label and a
// big two-tone headline (second line in gray).
//   split   label (+ one short line) in a narrow left column, a vertical hairline, headline right
//   reverse headline on the left, the short line bottom-right, a hairline under the right half
//   end     label on the left, headline pushed to the right half
export default function SectionHeading({ label, title, dim, children, id, variant = "split" }) {
  const heading = (
    <Reveal as="h2" id={id} className="t-h2">
      <span className="block">{title}</span>
      {dim && <span className="block text-dim">{dim}</span>}
    </Reveal>
  );
  const line = children && (
    <Reveal as="p" delay={80} className="t-small mt-2 max-w-[17rem]">
      {children}
    </Reveal>
  );

  if (variant === "reverse") {
    return (
      <header className="relative mb-12 grid gap-6 pb-10 md:mb-16 md:grid-cols-2 md:items-end md:pb-12">
        {heading}
        <div className="md:justify-self-end md:text-right [&>p]:md:ml-auto">
          {label && <Reveal as="p" className="label">{label}</Reveal>}
          {line}
        </div>
        <span aria-hidden="true" className="absolute bottom-0 right-0 hidden h-px w-1/2 bg-line md:block" />
      </header>
    );
  }

  if (variant === "end") {
    return (
      <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-2">
        <div>
          <Reveal as="p" className="label">{label}</Reveal>
          {line}
        </div>
        {heading}
      </header>
    );
  }

  return (
    <header className="mb-12 grid md:mb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)]">
      <div className="pb-4 md:border-r md:border-line md:py-2 md:pr-10">
        <Reveal as="p" className="label">{label}</Reveal>
        {line}
      </div>
      <div className="md:py-2 md:pl-12">{heading}</div>
    </header>
  );
}
