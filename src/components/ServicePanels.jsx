import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { WebsiteMockup, GoogleMockup, MenuMockup, SocialMockup, BrandMockup, BookingMockup } from "./Mockups";
import { HOURLY_RATE } from "../data/services";
import { smsHref } from "../lib/utils";

// "More than websites": one card per service. Cards pin under the header and hold for a moment;
// the next one slides up over the last, which settles back a little (scroll-linked, scale only:
// nothing fades).
// Each card: title and number, two short points, a quiet starting price, the links, and a live
// mockup of the service. Website pricing lives in the plans below (Pricing.jsx).
const services = [
  {
    title: ["Websites", "& landing pages"],
    boxes: [
      ["Mobile-first", "Fast sites built to bring in customers."],
      ["Contact & booking built in", "Every button leads to a call, a booking or an order."],
    ],
    Mock: WebsiteMockup,
    more: ["See plans", "#pricing"],
  },
  {
    title: ["Google Business", "Profile"],
    boxes: [
      ["Photos, hours & links", "Get found by locals on Google Maps."],
      ["Matches your site", "The same look and info everywhere people search."],
    ],
    prices: ["Setup from $150"],
    Mock: GoogleMockup,
  },
  {
    title: ["Menus", "& signage"],
    boxes: [
      ["Print-ready", "Menus, price boards and signs for your space."],
      ["Matches your brand", "One look from your site to your counter."],
    ],
    prices: ["From $100"],
    Mock: MenuMockup,
  },
  {
    title: ["Social", "posts"],
    boxes: [
      ["Specials & events", "On-brand templates for your feeds."],
      ["Ready to post", "Openings, specials, holidays: ready to go."],
    ],
    prices: ["Templates (set of 5) from $100"],
    Mock: SocialMockup,
  },
  {
    title: ["Logos, flyers", "& cards"],
    boxes: [
      ["Logo", "A simple mark that works everywhere."],
      ["Flyers & business cards", "Print that matches your logo."],
    ],
    prices: ["Logo from $150", "Flyer or poster from $50", "Business cards from $60 (printing extra)"],
    Mock: BrandMockup,
  },
  {
    title: ["Online ordering", "& booking"],
    boxes: [
      ["Keep your tools", "DoorDash, Square, Calendly, connected to your site."],
      ["Set up for you", "Customers order or book in a few taps."],
    ],
    prices: ["Setup from $150"],
    Mock: BookingMockup,
  },
];

function Panel({ s, i, n, progress }) {
  const last = i === n - 1;
  // Panel i settles back while panel i+1 slides over it. The last panel never moves.
  const range = last ? [0, 1] : [i / (n - 1), (i + 1) / (n - 1)];
  const scale = useTransform(progress, range, [1, last ? 1 : 0.95]);
  const { Mock } = s;
  const [moreLabel, moreHref] = s.more ?? ["Message us", smsHref];

  return (
    <div className={`sticky top-[calc(var(--nav-h)+0.75rem)] pb-3 ${last ? "" : "mb-[16svh]"}`}>
      <m.article
        style={{ scale }}
        className="panel-scale group grid h-[calc(100svh-var(--nav-h)-1.5rem)] origin-top grid-rows-[auto_minmax(0,1fr)] gap-4 overflow-hidden rounded-[28px] border border-line bg-page p-5 sm:p-8 lg:max-h-[46rem] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-1 lg:gap-10 lg:p-10"
      >
        <div className="flex min-h-0 flex-col">
          <div className="flex items-start justify-between gap-6">
            <h3 className="t-h3">
              {s.title[0]}
              <br />
              {s.title[1]}
            </h3>
            <span className="label pt-1.5 tabular-nums" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          <dl className="mt-4 flex flex-col gap-2.5 lg:mt-8 lg:gap-5">
            {s.boxes.map(([label, text]) => (
              <div key={label}>
                <dt className="text-[0.9375rem] font-semibold leading-snug lg:text-[1.0625rem]">{label}</dt>
                <dd className="text-[0.9375rem] leading-snug text-dim lg:mt-0.5 lg:text-[1.0625rem]">{text}</dd>
              </div>
            ))}
          </dl>

          {s.prices && (
            <ul className="t-small mt-3 !max-w-none lg:mt-6">
              {s.prices.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-5 lg:mt-auto lg:pt-6">
            <a href="#contact" className="btn btn-primary">
              Start a project
            </a>
            <a href={moreHref} className="link-more">
              {moreLabel}
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="@container relative min-h-0 overflow-hidden rounded-[20px] bg-alt p-[4%]">
          <Mock />
        </div>
      </m.article>
    </div>
  );
}

export default function ServicePanels() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="services" aria-labelledby="services-title" className="section-y bg-alt">
      <div className="site-wrap">
        <SectionHeading id="services-title" label="Services" title="More than websites." dim="Everything matches.">
          One look, everywhere.
        </SectionHeading>
        <div ref={ref}>
          {services.map((s, i) => (
            <Panel key={s.title.join(" ")} s={s} i={i} n={services.length} progress={scrollYProgress} />
          ))}
        </div>
        <Reveal as="p" className="t-small mt-8 !max-w-none text-center">
          Final price depends on the job. Extra work is {HOURLY_RATE}.
        </Reveal>
      </div>
    </section>
  );
}
