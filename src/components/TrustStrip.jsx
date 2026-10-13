import Reveal from "./Reveal";
import { Chat, Clock, Key, Layout } from "./Icons";

const items = [
  { Icon: Layout, label: "Free mockup before you pay" },
  { Icon: Key, label: "You own your site & domain" },
  { Icon: Clock, label: "Reply within 24 hours" },
  { Icon: Chat, label: "You work directly with me" },
];

export default function TrustStrip() {
  return (
    <section aria-label="What you can count on" className="px-5 pb-16 sm:px-8 sm:pb-20">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map(({ Icon, label }, i) => (
          <Reveal
            as="li"
            key={label}
            delay={i * 60}
            className="flex flex-col items-start gap-3 rounded-card bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:gap-4 sm:p-5"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-peach text-brand-ink">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[0.95rem] font-semibold leading-snug sm:text-base">{label}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
