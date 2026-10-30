import Reveal from "./Reveal";

const items = [
  ["Free mockup", "before you pay anything"],
  ["You own it", "your site and your domain"],
  ["24-hour replies", "by text, call or email"],
  ["Just me", "no account managers"],
];

// Four promises in a hairline grid right under the hero.
export default function TrustStrip() {
  return (
    <section aria-label="What you can count on" className="px-section">
      <ul className="mx-auto grid max-w-[100rem] grid-cols-2 border-y border-line lg:grid-cols-4">
        {items.map(([title, text], i) => (
          <Reveal
            as="li"
            key={title}
            delay={i * 70}
            className={`flex flex-col gap-1 py-6 sm:py-8 ${i % 2 ? "pl-5 sm:pl-8" : "pr-5 sm:pr-8"} ${
              i % 2 ? "border-l border-line" : ""
            } ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
          >
            <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</span>
            <span className="text-[0.95rem] text-dim">{text}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
