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
      ["Mobile-first", "Fast sites built to", "bring in customers."],
      ["Contact & booking built in", "Every button leads to", "a call, a booking or an order."],
    ],
    Mock: WebsiteMockup,
    cta: ["Start a project", "#contact"],
    tone: "orange",
  },
  {
    title: ["Google Business", "Profile"],
    boxes: [
      ["Photos, hours & links", "Get found by locals", "on Google Maps."],
      ["Matches your site", "The same look and info", "everywhere people search."],
    ],
    Mock: GoogleMockup,
    tone: "rust",
  },
  {
    title: ["Menus", "& signage"],
    boxes: [
      ["Print-ready", "Menus, price boards", "and signs for your space."],
      ["Matches your brand", "One look from", "your site to your counter."],
    ],
    Mock: MenuMockup,
    tone: "cream",
  },
  {
    title: ["Social", "posts"],
    boxes: [
      ["Specials & events", "On-brand templates", "for your feeds."],
      ["Ready to post", "Openings, specials, holidays:", "ready to go."],
    ],
    Mock: SocialMockup,
    tone: "orange",
  },
  {
    title: ["Logos, flyers", "& cards"],
    boxes: [
      ["Logo", "A simple mark", "that works everywhere."],
      ["Flyers & business cards", "Print that matches", "your logo."],
    ],
    Mock: BrandMockup,
    tone: "ink",
  },
  {
    title: ["Online ordering", "& booking"],
    boxes: [
      ["Keep your tools", "DoorDash, Square, Calendly,", "connected to your site."],
      ["Set up for you", "Customers order or book", "in a few taps."],
    ],
    Mock: BookingMockup,
    tone: "paper",
  },
];

// Fixed palettes (they don't flip with the light/dark theme, like colored print).
const tones = {
  orange: { bg: "bg-[linear-gradient(135deg,#f47a3a,#e8622c_45%,#c4401a)] text-ink", line: "border-ink/20", tail: "font-normal", stage: "bg-white/15 ring-1 ring-white/25", pill: "btn-paper" },
  rust: { bg: "bg-[linear-gradient(135deg,#1a120e,#3a2216_55%,#8a3a17)] text-paper", line: "border-paper/20", tail: "font-normal text-paper/60", stage: "bg-white/[0.07] ring-1 ring-white/15", pill: "btn-paper" },
  cream: { bg: "bg-[linear-gradient(135deg,#f6efe3,#efdfc8_55%,#ebbf96)] text-ink", line: "border-ink/15", tail: "font-normal text-ink/65", stage: "bg-ink/[0.05] ring-1 ring-ink/10", pill: "btn-night" },
  ink: { bg: "bg-[linear-gradient(135deg,#0b0807,#21160f_55%,#4a2414)] text-paper", line: "border-paper/20", tail: "font-normal text-paper/60", stage: "bg-white/[0.07] ring-1 ring-white/15", pill: "btn-paper" },
  paper: { bg: "bg-[linear-gradient(135deg,#fbf4e8,#f2e3cd_55%,#f0c39b)] text-ink", line: "border-ink/15", tail: "font-normal text-ink/65", stage: "bg-ink/[0.05] ring-1 ring-ink/10", pill: "btn-night" },
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
            <h3 className="t-h3">
              {s.title[0]}
              <br />
              {s.title[1]}
            </h3>
            <span className="font-display text-[clamp(3.5rem,7vw,6.25rem)] font-semibold leading-[0.85] tracking-[-0.04em]" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          <div className={`mt-6 grid border-x border-t lg:mt-10 lg:grid-cols-2 ${t.line}`}>
            {s.boxes.map(([label, lead, tail], b) => (
              <div key={label} className={`px-4 pb-5 pt-4 lg:px-7 lg:pb-10 lg:pt-7 ${b ? `border-t lg:border-l lg:border-t-0 ${t.line}` : ""}`}>
                <p className="flex items-center gap-2.5 text-sm font-medium">
                  <span className="h-2 w-2 rounded-[2px] bg-current" />
                  {label}
                </p>
                <p className="t-lead mt-3 !font-medium [text-indent:1.5em] lg:mt-5">
                  {lead} <span className={t.tail}>{tail}</span>
                </p>
              </div>
            ))}
          </div>

          <a href={ctaHref} className={`btn group/cta mx-auto mt-4 shadow-[var(--shadow-deep)] lg:-mt-5 ${t.pill}`}>
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
          One look, everywhere. Graphics priced per job.
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
