import { useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ContactCTA from "./ContactCTA";
import FeaturedCaseStudy from "./FeaturedCaseStudy";
import Photo from "./Photo";
import { BrowserFrame, PhoneFrame } from "./Devices";
import { ArrowUpRight, Check } from "./Icons";
import { projects } from "../data/projects";

const visible = projects.filter((p) => p.published);

const tagStyles = {
  Client: "bg-white text-ink",
  Concept: "bg-sand text-ink",
  Product: "bg-ink text-white",
};

const lift = "transition-transform duration-500 ease-[var(--ease-spring)]";

// Drag (or use arrow keys) to compare the old site with the new one.
function BeforeAfter({ before, after, name }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  // Pointer events drive dragging (mouse, touch and pen alike); the hidden range input handles the keyboard.
  const moveTo = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos(Math.round(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))));
  };
  return (
    <div
      className="relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden bg-sand [&_img]:pointer-events-none"
      onDragStart={(e) => e.preventDefault()}
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e);
      }}
      onPointerMove={(e) => dragging.current && moveTo(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Photo
        src={after}
        alt={`${name}'s new site`}
        loading="lazy"
        decoding="async"
        width="1440"
        height="900"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo
          src={before}
          alt={`${name}'s old site`}
          loading="lazy"
          decoding="async"
          width="1440"
          height="900"
          className="absolute inset-0 h-full w-full object-cover object-top"
          fallback={<div className="absolute inset-0 bg-[#E9E3DA]" />}
        />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-xs font-semibold text-white">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink">After</span>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare ${name}'s old site (left) with the new one (right)`}
        className="peer pointer-events-none absolute inset-0 z-10 h-full w-full opacity-0"
      />
      {/* Divider + handle, moved with a transform */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 peer-focus-visible:[&_.handle]:ring-4 peer-focus-visible:[&_.handle]:ring-brand-ink"
        style={{ transform: `translateX(${pos - 50}%)` }}
      >
        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgb(43_29_20/0.35)]" />
        <span className="handle absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lift">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}

// Desktop screenshot in a browser window, with the phone screenshot overlapping a bottom corner.
function Screens({ project, flip }) {
  const { name, url, address, desktop, mobile, before } = project;
  return (
    <div className="group relative pb-[9%]">
      <div className={`${lift} motion-safe:group-hover:-translate-y-1.5`}>
        <BrowserFrame url={url} label={address} className="shadow-lift">
          {before ? (
            <BeforeAfter before={before} after={desktop} name={name} />
          ) : (
            <div className="relative aspect-[16/10] bg-sand">
              <Photo
                src={desktop}
                alt={`${name} website on a laptop screen`}
                loading="lazy"
                decoding="async"
                width="1440"
                height="900"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          )}
        </BrowserFrame>
      </div>
      <div
        className={`absolute bottom-0 z-20 w-[23%] ${lift} motion-safe:group-hover:-translate-y-3 right-[-1%] ${
          flip ? "lg:left-[-4%] lg:right-auto" : "lg:right-[-4%]"
        }`}
      >
        <PhoneFrame src={mobile} alt={`${name} website on a phone`} />
      </div>
    </div>
  );
}

function CaseStudy({ project, index }) {
  const flip = index % 2 === 1;
  const { name, description, tag, url, bullets } = project;
  return (
    <Reveal
      as="article"
      className={`grid items-center gap-10 lg:gap-16 ${
        flip ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]" : "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
      }`}
    >
      <div className={flip ? "lg:order-2" : ""}>
        <Screens project={project} flip={flip} />
      </div>
      <div className={flip ? "lg:order-1" : ""}>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold shadow-soft ${tagStyles[tag] ?? tagStyles.Client}`}>{tag}</span>
        <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em]">{name}</h3>
        <p className="mt-3 text-lg text-muted">{description}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <Check className="mt-1 h-5 w-5 shrink-0 text-brand-ink" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary group/visit mt-8">
            Visit site
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5" />
            <span className="sr-only">{`${name} (opens in a new tab)`}</span>
          </a>
        )}
      </div>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="bg-peach px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Work" title="Recent work.">
          Custom sites for local shops — built fast, built to sell.
        </SectionHeading>

        <div className="mt-14 sm:mt-20">
          <FeaturedCaseStudy />
        </div>

        <div className="mt-20 flex flex-col gap-20 sm:mt-28 sm:gap-28">
          {visible.map((p, i) => (
            <CaseStudy key={p.id} project={p} index={i} />
          ))}
        </div>

        <ContactCTA title="Want one for your business?" className="mt-24 sm:mt-28" />
      </div>
    </section>
  );
}
