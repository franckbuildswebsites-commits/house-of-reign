import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.008em]">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg text-muted">{children}</p>}
    </Reveal>
  );
}
