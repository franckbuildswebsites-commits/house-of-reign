import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import SectionHeading from "./SectionHeading";
import FeaturedCaseStudy from "./FeaturedCaseStudy";
import WorkMarquee from "./WorkMarquee";
import Reveal from "./Reveal";
import { BrowserFrame } from "./Devices";
import Photo from "./Photo";
import { ArrowUpRight } from "./Icons";
import { categories, projects } from "../data/projects";

const visible = projects.filter((p) => p.published);
const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));

// "All" plus every category that has at least one published project.
const tabs = [
  { id: "all", label: "All" },
  ...categories.filter((c) => visible.some((p) => p.category === c.id)),
];
const countFor = (id) => (id === "all" ? visible.length : visible.filter((p) => p.category === id).length);

const EASE = [0.2, 0.8, 0.2, 1];

// The frame shows the top 16:10 of the page; scrolling to the bottom moves the image up by
// everything below that, as a share of the image's own height.
const FRAME_RATIO = 10 / 16;
const scrollTo = ({ width, height }) => `-${Math.max(0, (1 - (width * FRAME_RATIO) / height) * 100).toFixed(2)}%`;

// Pills with a highlight that slides to the chosen one.
function FilterTabs({ active, onChange }) {
  return (
    <div role="group" aria-label="Filter projects by industry" className="flex flex-wrap gap-1 rounded-full border border-line p-1.5 sm:inline-flex">
      {tabs.map((t) => {
        const on = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(t.id)}
            className={`relative min-h-11 rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
              on ? "text-night" : "text-cream/75 hover:text-cream focus-visible:text-cream"
            }`}
          >
            {on && (
              <m.span
                layoutId="work-tab"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                className="absolute inset-0 rounded-full bg-cream"
              />
            )}
            <span className="relative">
              {t.label} <span className={on ? "text-night/55" : "text-dim"}>{countFor(t.id)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

// One project: a browser window with the full-page screenshot. Desktop: hovering scrolls the page
// inside the frame (CSS, .shot in index.css). Touch screens: it scrolls while the card is on screen.
function ProjectCard({ project }) {
  const { name, url, tag, category, full } = project;
  const shotRef = useRef(null);

  useEffect(() => {
    const shot = shotRef.current;
    if (!shot || matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(([e]) => shot.classList.toggle("is-scrolling", e.isIntersecting), { threshold: 0.6 });
    io.observe(shot);
    return () => io.disconnect();
  }, []);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group block rounded-[14px]">
      <div className="transition-transform duration-500 ease-[var(--ease-out-soft)] motion-safe:group-hover:-translate-y-1.5">
        <BrowserFrame url={url} className="transition-[box-shadow] duration-500 group-hover:shadow-[0_30px_60px_-30px_rgb(232_98_44/0.45)]">
          <div ref={shotRef} className="shot relative aspect-[16/10] overflow-hidden bg-night" style={{ "--scroll-to": scrollTo(full) }}>
            <Photo
              src={full.src}
              alt={`${name} website, full page`}
              width={full.width}
              height={full.height}
              loading="lazy"
              decoding="async"
              className="shot-img absolute inset-x-0 top-0 h-auto w-full"
            />
          </div>
        </BrowserFrame>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="t-h4 truncate">{name}</h3>
          <p className="mt-0.5 flex items-center gap-2 text-sm text-dim">
            {categoryLabel[category]}
            {tag === "Concept" && <span className="rounded-full border border-line px-2 py-0.5 text-xs font-medium text-cream/80">Concept</span>}
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-ink">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export default function Work() {
  const [tab, setTab] = useState("all");
  const shown = visible.filter((p) => tab === "all" || p.category === tab);

  return (
    <section id="work" aria-labelledby="work-title" className="section-gap">
      <div className="px-section mx-auto max-w-[100rem]">
        <SectionHeading id="work-title" variant="reverse" title="Recent work." dim="Built to sell.">
          Real sites for local businesses.
        </SectionHeading>
      </div>

      <div>
        <WorkMarquee />
      </div>

      <div className="px-section mx-auto max-w-[100rem]">
        <div id="featured" className="mt-16 sm:mt-24">
          <FeaturedCaseStudy />
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">All projects</p>
          <LayoutGroup>
            <FilterTabs active={tab} onChange={setTab} />
          </LayoutGroup>
        </div>

        {/* Filtering: cards that leave fade and shrink out, the rest glide to their new spots. */}
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-12 sm:mt-12 lg:gap-x-8 [&>li]:w-full sm:[&>li]:w-[calc((100%-1.5rem)/2)] lg:[&>li]:w-[calc((100%-4rem)/3)]">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((p, i) => (
              <m.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2, ease: "easeIn" } }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <Reveal delay={(i % 3) * 90}>
                  <ProjectCard project={p} />
                </Reveal>
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
