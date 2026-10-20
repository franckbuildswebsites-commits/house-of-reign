import Reveal from "./Reveal";
import Photo from "./Photo";
import { BrowserFrame, PhoneFrame } from "./Devices";
import { Testimonial } from "./Testimonials";
import { ArrowUpRight, Check } from "./Icons";
import { featured } from "../data/projects";
import { testimonials } from "../data/testimonials";

const lift = "transition-transform duration-500 ease-[var(--ease-spring)]";

function Shot({ src, alt }) {
  return (
    <div className="relative aspect-[16/10] bg-sand">
      <Photo
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width="1440"
        height="900"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}

// Home page in front, the division pages fanned out behind it, phones (English + Spanish) on the corners.
// Below md the division pages drop into a row underneath instead.
function Composition({ project }) {
  const { name, address, screens } = project;
  const [left, right] = screens.pages;
  return (
    <>
      <div className="group relative pb-[12%] md:pb-[8%] md:pt-[9%]">
        <div aria-hidden="true" className={`absolute left-[1%] top-0 hidden w-[42%] -rotate-3 md:block ${lift} motion-safe:group-hover:-translate-y-2`}>
          <BrowserFrame label={left.label} className="shadow-soft">
            <Shot src={left.src} alt="" />
          </BrowserFrame>
        </div>
        <div aria-hidden="true" className={`absolute right-[1%] top-0 hidden w-[42%] rotate-3 md:block ${lift} motion-safe:group-hover:-translate-y-2`}>
          <BrowserFrame label={right.label} className="shadow-soft">
            <Shot src={right.src} alt="" />
          </BrowserFrame>
        </div>

        <div className={`relative z-10 md:mx-auto md:w-[80%] ${lift} motion-safe:group-hover:-translate-y-1.5`}>
          <BrowserFrame label={address} className="shadow-lift">
            <Shot src={screens.desktop.src} alt={screens.desktop.alt} />
          </BrowserFrame>
        </div>

        <div className={`absolute bottom-0 left-[-1%] z-20 w-[22%] md:left-[3%] md:w-[15%] ${lift} motion-safe:group-hover:-translate-y-3`}>
          <PhoneFrame src={screens.mobileAlt.src} alt={screens.mobileAlt.alt} />
        </div>
        <div className={`absolute bottom-0 right-[-1%] z-20 w-[24%] md:right-[3%] md:w-[17%] ${lift} motion-safe:group-hover:-translate-y-3`}>
          <PhoneFrame src={screens.mobile.src} alt={screens.mobile.alt} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:hidden">
        {screens.pages.map((p) => (
          <figure key={p.src}>
            <BrowserFrame label={p.label} className="shadow-soft">
              <Shot src={p.src} alt={`${name}: ${p.alt}`} />
            </BrowserFrame>
            <figcaption className="mt-2 text-center text-sm font-semibold text-muted">{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

export default function FeaturedCaseStudy() {
  const project = featured;
  if (!project?.published) return null;
  const { id, name, description, url, highlights } = project;
  const quote = testimonials.find((t) => t.project === id);

  return (
    <Reveal as="article" className="rounded-[28px] bg-paper p-5 shadow-soft sm:p-10 lg:p-14">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Featured project
          </p>
          <h3 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">{name}</h3>
          <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">{description}</p>
        </div>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary group/visit justify-self-start">
            View live site
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5" />
            <span className="sr-only">{`${name} (opens in a new tab)`}</span>
          </a>
        )}
      </div>

      <div className="mt-10 sm:mt-14">
        <Composition project={project} />
      </div>

      <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
        <ul className="space-y-4">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3 text-lg">
              <Check className="mt-1 h-5 w-5 shrink-0 text-brand-ink" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        {quote && <Testimonial t={quote} />}
      </div>
    </Reveal>
  );
}
