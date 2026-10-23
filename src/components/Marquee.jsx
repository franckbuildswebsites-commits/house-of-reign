import { Crown } from "./Logo";

const items = ["Web Design", "Landing Pages", "Booking Flows", "Brand Refresh", "Site Care", "Event Businesses", "Nonprofits"];

export default function Marquee() {
  return (
    <section aria-label="What I do" className="overflow-hidden bg-ink py-5 text-paper sm:py-7">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={item} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-display text-2xl font-medium uppercase tracking-tight sm:px-10 sm:text-4xl">
                  {item}
                </span>
                <Crown className="h-4 w-4 text-brand sm:h-5 sm:w-5" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
