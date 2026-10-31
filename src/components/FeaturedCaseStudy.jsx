import Reveal from "./Reveal";
import Photo from "./Photo";
import { BrowserFrame, PhoneFrame } from "./Devices";
import { featured } from "../data/projects";

const lift = "transition-transform duration-700 ease-[var(--ease-out-soft)]";

function Shot({ src, alt }) {
  return (
    <div className="relative aspect-[16/10] bg-alt">
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
        <div aria-hidden="true" className={`absolute left-[1%] top-0 hidden w-[42%] -rotate-3 md:block ${lift} motion-safe:group-hover:-translate-y-3 motion-safe:group-hover:-rotate-[5deg]`}>
          <BrowserFrame label={left.label}>
            <Shot src={left.src} alt="" />
          </BrowserFrame>
        </div>
        <div aria-hidden="true" className={`absolute right-[1%] top-0 hidden w-[42%] rotate-3 md:block ${lift} motion-safe:group-hover:-translate-y-3 motion-safe:group-hover:rotate-[5deg]`}>
          <BrowserFrame label={right.label}>
            <Shot src={right.src} alt="" />
          </BrowserFrame>
        </div>

        <div className={`relative z-10 md:mx-auto md:w-[80%] ${lift} motion-safe:group-hover:-translate-y-1.5`}>
          <BrowserFrame label={address} className="shadow-[var(--shadow-soft)]">
            <Shot src={screens.desktop.src} alt={screens.desktop.alt} />
          </BrowserFrame>
        </div>

        <div className={`absolute bottom-0 left-[-1%] z-20 w-[22%] md:left-[3%] md:w-[15%] ${lift} motion-safe:group-hover:-translate-y-4`}>
          <PhoneFrame src={screens.mobileAlt.src} alt={screens.mobileAlt.alt} />
        </div>
        <div className={`absolute bottom-0 right-[-1%] z-20 w-[24%] md:right-[3%] md:w-[17%] ${lift} motion-safe:group-hover:-translate-y-4`}>
          <PhoneFrame src={screens.mobile.src} alt={screens.mobile.alt} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:hidden">
        {screens.pages.map((p) => (
          <figure key={p.src}>
            <BrowserFrame label={p.label}>
              <Shot src={p.src} alt={`${name}: ${p.alt}`} />
            </BrowserFrame>
            <figcaption className="mt-2 text-center text-sm text-dim">{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

export default function FeaturedCaseStudy() {
  const project = featured;
  if (!project?.published) return null;
  const { name, description, url, highlights } = project;

  return (
    <Reveal as="article" className="overflow-hidden rounded-[28px] bg-alt p-6 sm:p-12">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
        <div>
          <p className="label">Featured project</p>
          <h3 className="t-h3 mt-2">{name}</h3>
          <p className="t-small mt-3 max-w-md">{description}</p>
        </div>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="link-more justify-self-start">
            View live site
            <span className="sr-only">{`${name} (opens in a new tab)`}</span>
          </a>
        )}
      </div>

      <div className="mt-10 sm:mt-14">
        <Composition project={project} />
      </div>

      <ul className="mt-10 flex flex-wrap gap-2 sm:mt-14">
        {highlights.map((h) => (
          <li key={h} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-dim">
            {h}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
