import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import SectionHeading from "./SectionHeading";
import { ArrowRight } from "./Icons";
import { WebsiteMockup, GoogleMockup, MenuMockup, SocialMockup, BrandMockup, BookingMockup } from "./Mockups";
import { smsHref } from "../lib/utils";

// "More than websites": one full-screen panel per service. Panels pin to the top; the next one
// slides up over the last, which tilts back in 3D and fades a little (scroll-linked).
// Each panel: title + big number, two hairline boxes (label + lead line with a quieter tail),
// a pill button, then a live mockup of the service filling the rest of the screen.
const services = [
  {
    title: ["Websites", "& landing pages"],
    boxes: [
      ["Custom design, mobile-first", "Fast sites built to", "bring in customers, not just look nice."],
      ["Contact & booking built in", "Every page points somewhere useful:", "a call, a booking, an order."],
    ],
    Mock: WebsiteMockup,
    cta: ["Start a project", "#contact"],
    tone: "orange",
  },
  {
    title: ["Google Business", "Profile"],
    boxes: [
      ["Photos, hours & links", "Set up and polish your Google listing", "so locals find you on Maps."],
      ["Matches your site", "Same photos, same hours, same voice", "everywhere people look you up."],
    ],
    Mock: GoogleMockup,
    tone: "rust",
  },
  {
    title: ["Menus", "& signage"],
    boxes: [
      ["Print-ready", "Menus, price boards and signs", "for your space."],
      ["Matches your brand", "The same look as your site and socials,", "so it all feels like one place."],
    ],
    Mock: MenuMockup,
    tone: "cream",
  },
  {
    title: ["Social", "posts"],
    boxes: [
      ["Specials & events", "On-brand post templates", "for your feeds."],
      ["Ready to post", "Grand openings, weekly specials, holidays:", "designed and ready to go."],
    ],
    Mock: SocialMockup,
    tone: "orange",
  },
  {
    title: ["Logos, flyers", "& cards"],
    boxes: [
      ["Logo", "A simple, memorable mark", "that works everywhere."],
      ["Flyers & business cards", "Flyers for sales and grand openings,", "and cards that match your logo."],
    ],
    Mock: BrandMockup,
    tone: "ink",
  },
  {
    title: ["Online ordering", "& booking"],
    boxes: [
      ["Keep the tools you use", "Connect DoorDash, Square, Calendly", "or your booking app to your site."],
      ["Set up for you", "Customers order or book in a few taps,", "right from your site."],
    ],
    Mock: BookingMockup,
    tone: "paper",
  },
];

// Fixed palettes (they don't flip with the light/dark theme, like colored print).
const tones = {
  orange: { bg: "bg-[linear-gradient(135deg,#f47a3a,#e8622c_45%,#c4401a)] text-ink", line: "border-ink/20", tail: "text-ink/55", stage: "bg-white/15 ring-1 ring-white/25", pill: "bg-paper text-ink" },
  rust: { bg: "bg-[linear-gradient(135deg,#1a120e,#3a2216_55%,#8a3a17)] text-paper", line: "border-paper/20", tail: "text-paper/50", stage: "bg-white/[0.07] ring-1 ring-white/15", pill: "bg-paper text-ink" },
  cream: { bg: "bg-[linear-gradient(135deg,#f6efe3,#efdfc8_55%,#ebbf96)] text-ink", line: "border-ink/15", tail: "text-ink/50", stage: "bg-ink/[0.05] ring-1 ring-ink/10", pill: "bg-ink text-paper" },
  ink: { bg: "bg-[linear-gradient(135deg,#0b0807,#21160f_55%,#4a2414)] text-paper", line: "border-paper/20", tail: "text-paper/50", stage: "bg-white/[0.07] ring-1 ring-white/15", pill: "bg-paper text-ink" },
  paper: { bg: "bg-[linear-gradient(135deg,#fbf4e8,#f2e3cd_55%,#f0c39b)] text-ink", line: "border-ink/15", tail: "text-ink/50", stage: "bg-ink/[0.05] ring-1 ring-ink/10", pill: "bg-ink text-paper" },
};

function Panel({ s, i, n, progress }) {
  const t = tones[s.tone];
  const last = i === n - 1;
  // Panel i tilts while panel i+1 slides over it. The last panel never tilts (keep its range inside 0–1).
  const range = last ? [0, 1] : [i / (n - 1), (i + 1) / (n - 1)];
  const rotateX = useTransform(progress, range, [0, last ? 0 : 24]);
  const opacity = useTransform(progress, range, [1, last ? 1 : 0.55]);
  const { Mock } = s;
  const [ctaLabel, ctaHref] = s.cta ?? ["Text me about it", smsHref];

  return (
    <div className="sticky top-0 h-svh [perspective:1800px]">
      <m.article
        style={{ rotateX, opacity }}
        className={`panel-tilt group h-full origin-bottom overflow-hidden ${t.bg} [transform-style:preserve-3d]`}
      >
        <div className="px-section mx-auto flex h-full max-w-[100rem] flex-col pb-6 pt-24 lg:pt-32">
          <div className="flex items-start justify-between gap-6">
            <h3 className="font-display text-[clamp(2.2rem,3.9vw,3.5rem)] font-medium leading-[1] tracking-[-0.045em]">
              {s.title[0]}
              <br />
              {s.title[1]}
            </h3>
            <span className="font-display text-[clamp(3.25rem,7vw,6.5rem)] font-semibold leading-[0.85] tracking-[-0.04em]" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          <div className={`mt-6 grid border-x border-t lg:mt-10 lg:grid-cols-2 ${t.line}`}>
            {s.boxes.map(([label, lead, tail], b) => (
              <div key={label} className={`px-4 pb-4 pt-4 lg:px-6 lg:pb-8 lg:pt-6 ${b ? `border-t lg:border-l lg:border-t-0 ${t.line}` : ""}`}>
                <p className="flex items-center gap-2.5 text-[0.85rem] font-medium">
                  <span className="h-2 w-2 rounded-[2px] bg-current" />
                  {label}
                </p>
                <p className="mt-3 text-[clamp(1.05rem,1.55vw,1.4rem)] font-medium leading-[1.15] tracking-[-0.01em] [text-indent:1.5em] lg:mt-5">
                  {lead} <span className={t.tail}>{tail}</span>
                </p>
              </div>
            ))}
          </div>

          <a
            href={ctaHref}
            className={`group/cta mx-auto mt-4 inline-flex lg:-mt-5 items-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-semibold shadow-[var(--shadow-deep)] transition-transform duration-300 hover:scale-[1.04] ${t.pill}`}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </a>

          <div aria-hidden="true" className={`@container relative mt-5 min-h-0 flex-1 overflow-hidden rounded-[24px] p-[3%] lg:mt-8 lg:rounded-[32px] ${t.stage}`}>
            <Mock />
          </div>
        </div>
      </m.article>
    </div>
  );
}

export default function ServicePanels() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="services" aria-labelledby="services-title">
      <div className="px-section mx-auto max-w-[100rem]">
        <SectionHeading id="services-title" label="Services" title="More than websites." dim="Everything matches.">
          Design for local businesses: your site, your Google listing, your menu and your feed, all in one look.
          Graphics are priced per job.
        </SectionHeading>
      </div>
      <div ref={ref}>
        {services.map((s, i) => (
          <Panel key={s.title.join(" ")} s={s} i={i} n={services.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
