import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Press from "./Press";
import Parallax from "./Parallax";
import { WebsiteMockup } from "./Mockups";
import { Calendar, MapPin, Shield, Spark, Grid, MenuBoard, Flyer, IdCard } from "./Icons";
import { HOURLY_RATE } from "../data/services";

// Built to be scanned: websites first in one big card, then everything else in three labeled groups
// of small cards (icon, name, one short line, starting price). Website plans live in Pricing.jsx.
const groups = [
  {
    label: "Online",
    items: [
      { name: "Online ordering & booking", line: "Orders and bookings in a few taps.", price: "From $150", Icon: Calendar },
      { name: "Google Business Profile", line: "Get found by locals on Google Maps.", price: "From $150", Icon: MapPin },
      { name: "Site care", line: "Hosting, updates and changes.", price: "$125/mo", Icon: Shield, href: "#pricing" },
    ],
  },
  {
    label: "Brand",
    items: [
      { name: "Logos & branding", line: "A simple mark that works everywhere.", price: "From $150", Icon: Spark },
      { name: "Social media posts", line: "On-brand templates, ready to post.", price: "5 templates from $100", Icon: Grid },
    ],
  },
  {
    label: "Print",
    items: [
      { name: "Menus & signage", line: "Print-ready boards and signs.", price: "From $100", Icon: MenuBoard },
      { name: "Flyers & posters", line: "Print that matches your brand.", price: "From $50", Icon: Flyer },
      { name: "Business cards", line: "Cards that match your logo.", price: "From $60, printing extra", Icon: IdCard },
    ],
  },
];

function Card({ item: { name, line, price, Icon, href = "#contact" }, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Press href={href} lift={3} className="flex h-full flex-col rounded-[20px] border border-line p-4 sm:p-5">
        <Icon className="h-6 w-6 text-accent" />
        <h3 className="mt-3 text-[0.9375rem] font-semibold leading-snug tracking-[-0.012em] sm:text-[1.0625rem]">{name}</h3>
        <p className="mt-1 text-sm leading-snug text-dim">{line}</p>
        <p className="mt-auto pt-3 text-sm leading-snug text-caption">{price}</p>
      </Press>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="site-wrap">
        <SectionHeading id="services-title" label="Services" title="More than websites." dim="Everything matches." />

        <Reveal>
          <div className="grid items-center gap-6 overflow-hidden rounded-[28px] border border-line p-6 sm:p-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10">
            <div>
              <h3 className="label">Websites</h3>
              <p className="t-h3 mt-2 max-w-[17ch]">Fast, mobile-first sites that bring in customers.</p>
              <p className="mt-3 text-caption">From $750</p>
              <a href="#pricing" className="link-more">
                See plans
              </a>
            </div>
            <Parallax>
              <div aria-hidden="true" className="@container relative aspect-[16/10]">
                <WebsiteMockup />
              </div>
            </Parallax>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8 md:mt-12 md:gap-10">
          {groups.map(({ label, items }) => (
            <div key={label} className="grid gap-3 md:grid-cols-[6.5rem_minmax(0,1fr)] md:gap-6">
              <Reveal as="h3" className="t-h4 md:pt-4">{label}</Reveal>
              <div className={`group-cards grid grid-cols-2 gap-3 ${items.length === 3 ? "md:grid-cols-3" : ""}`}>
                {items.map((item, i) => (
                  <Card key={item.name} item={item} delay={i * 50} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal as="p" className="t-small mt-8 !max-w-none text-center md:mt-10">
          Final price depends on the job. Extra work is {HOURLY_RATE}.
        </Reveal>
      </div>
    </section>
  );
}
