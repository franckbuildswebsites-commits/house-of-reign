import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import SectionHeading from "./SectionHeading";
import { ArrowRight } from "./Icons";
import { WebsiteMockup, GoogleMockup, MenuMockup, SocialMockup, BrandMockup, BookingMockup } from "./Mockups";
import { smsHref } from "../lib/utils";

// "More than websites": numbered cards. On desktop they pin and stack as you scroll; each earlier card
// shrinks and darkens a little as the next one slides over it (scroll-linked, transform/opacity only).
// Phones get a plain stack: a pinned card taller than the screen would hide its own bottom half.
const services = [
  {
    title: "Websites",
    text: "Fast, mobile-first sites built to bring in customers.",
    points: ["Mobile-first", "Contact & booking built in"],
    Mock: WebsiteMockup,
    theme: "brand",
  },
  {
    title: "Google Business Profile",
    text: "Set up and polish your Google listing so locals find you on Maps.",
    points: ["Photos, hours & links", "Show up on Maps"],
    Mock: GoogleMockup,
    theme: "coal",
  },
  {
    title: "Menus & signage",
    text: "Menus, price boards and signs for your space.",
    points: ["Print-ready", "Matches your brand"],
    Mock: MenuMockup,
    theme: "cream",
  },
  {
    title: "Social posts",
    text: "On-brand post templates for your feeds.",
    points: ["Specials & events", "Ready to post"],
    Mock: SocialMockup,
    theme: "brand",
  },
  {
    title: "Logos, flyers & cards",
    text: "A simple, memorable mark that works everywhere, plus flyers and business cards that match it.",
    points: ["Logo", "Flyers & posters", "Business cards"],
    Mock: BrandMockup,
    theme: "coal",
  },
  {
    title: "Online ordering & booking",
    text: "Connect DoorDash, Square, Calendly, or your booking app to your site.",
    points: ["Keep the tools you use", "Set up for you"],
    Mock: BookingMockup,
    theme: "cream",
  },
];

const themes = {
  brand: { card: "bg-[linear-gradient(140deg,#f07238,#e8622c_45%,#c94f1e)] text-night", sub: "text-night/75", line: "border-night/20", stage: "bg-night/10", chip: "border-night/25" },
  coal: { card: "bg-coal text-cream ring-1 ring-line", sub: "text-dim", line: "border-line", stage: "bg-cream/[0.04]", chip: "border-line" },
  cream: { card: "bg-cream text-night", sub: "text-night/70", line: "border-night/15", stage: "bg-night/[0.06]", chip: "border-night/20" },
};

function Card({ s, i, n, progress }) {
  const t = themes[s.theme];
  const last = i === n - 1;
  const scale = useTransform(progress, [i / n, 1], [1, last ? 1 : 1 - (n - 1 - i) * 0.03]);
  const shade = useTransform(progress, [(i + 1) / n, 1], [0, last ? 0 : 0.5]);
  const { Mock } = s;

  return (
    <li className="mb-5 sm:mb-8 lg:sticky lg:mb-10" style={{ top: `calc(5.5rem + ${i * 12}px)` }}>
      <m.article
        style={{ "--stack-scale": scale }}
        className={`group relative grid origin-top overflow-hidden lg:[transform:scale(var(--stack-scale))] rounded-[28px] p-6 sm:p-10 lg:min-h-[min(76vh,700px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12 lg:p-12 ${t.card}`}
      >
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-6">
            <h3 className="h-display max-w-[12ch] text-[clamp(2.1rem,4vw,3.6rem)] leading-[0.95]">{s.title}</h3>
            <span className="h-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.8]" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <p className={`mt-6 max-w-md text-lg sm:text-xl ${t.sub}`}>{s.text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.points.map((p) => (
              <li key={p} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${t.chip}`}>
                {p}
              </li>
            ))}
          </ul>
          <a
            href={i === 0 ? "#contact" : smsHref}
            className={`group/cta mt-8 inline-flex items-center gap-2 self-start border-b pb-1 font-semibold lg:mt-auto ${t.line}`}
          >
            {i === 0 ? "Start a project" : "Text me about it"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </a>
        </div>

        <div aria-hidden="true" className={`@container relative mt-8 aspect-square overflow-hidden rounded-[20px] p-[4%] sm:aspect-[4/3] lg:mt-0 lg:aspect-auto ${t.stage}`}>
          <Mock />
        </div>

        <m.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 hidden bg-night lg:block" />
      </m.article>
    </li>
  );
}

export default function ServiceStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="services" className="px-5 pb-20 pt-10 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading n="02" label="Services" title="More than websites." dim="Everything matches.">
          Design for local businesses: your site, your Google listing, your menu and your feed, all in one look.
          Graphics are priced per job.
        </SectionHeading>

        <ol ref={ref} className="mt-14 sm:mt-20">
          {services.map((s, i) => (
            <Card key={s.title} s={s} i={i} n={services.length} progress={scrollYProgress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
