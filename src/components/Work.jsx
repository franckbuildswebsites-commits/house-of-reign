import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import SectionHeading from "./SectionHeading";
import FeaturedCaseStudy from "./FeaturedCaseStudy";
import WorkMarquee from "./WorkMarquee";
import Reveal from "./Reveal";
import Press, { SPRING, SPRING_SOFT } from "./Press";
import Parallax from "./Parallax";
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

// The frame shows the top 16:10 of the page; scrolling to the bottom moves the image up by
// everything below that, as a share of the image's own height.
const FRAME_RATIO = 10 / 16;
const scrollTo = ({ width, height }) => `-${Math.max(0, (1 - (width * FRAME_RATIO) / height) * 100).toFixed(2)}%`;

// Pills with a highlight that slides to the chosen one.
function FilterTabs({ active, onChange }) {
  return (
    <div role="group" aria-label="Filter projects by industry" className="flex flex-wrap gap-0.5 rounded-[20px] border border-line p-1 sm:inline-flex sm:rounded-full">
      {tabs.map((t) => {
        const on = active === t.id;
        return (
          <m.button
            key={t.id}
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
            aria-pressed={on}
            onClick={() => onChange(t.id)}
            className={`relative min-h-9 rounded-full px-3.5 text-sm transition-colors duration-300 [@media(pointer:coarse)]:min-h-11 ${
              on ? "text-accent" : "text-dim hover:text-ink focus-visible:text-ink"
            }`}
          >
            {on && (
              <m.span
                layoutId="work-tab"
                transition={SPRING}
                className="absolute inset-0 rounded-full bg-accent/10"
              />
            )}
            <span className="relative">
              {t.label} <span className={on ? "" : "text-caption"}>{countFor(t.id)}</span>
            </span>
          </m.button>
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
    <Press href={url} target="_blank" rel="noopener noreferrer" lift={4} press={0.985} className="group block rounded-[18px]">
      <Parallax>
        <BrowserFrame url={url}>
          <div ref={shotRef} className="shot relative aspect-[16/10] overflow-hidden bg-page" style={{ "--scroll-to": scrollTo(full) }}>
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
      </Parallax>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="t-h4 truncate">{name}</h3>
          <p className="mt-0.5 flex items-center gap-2 text-sm text-caption">
            {categoryLabel[category]}
            {tag === "Concept" && <span className="rounded-full border border-line px-2 py-0.5 text-xs">Concept</span>}
          </p>
        </div>
        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <span className="sr-only">(opens in a new tab)</span>
    </Press>
  );
}

export default function Work() {
  const [tab, setTab] = useState("all");
  const shown = visible.filter((p) => tab === "all" || p.category === tab);

  return (
    <section id="work" aria-labelledby="work-title" className="section-y">
      <div className="site-wrap">
        <SectionHeading id="work-title" variant="reverse" title="Recent work." dim="Built to sell.">
          Real sites for local businesses.
        </SectionHeading>

        <WorkMarquee />

        <div id="featured" className="mt-16 sm:mt-24">
          <FeaturedCaseStudy />
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">All projects</p>
          <LayoutGroup>
            <FilterTabs active={tab} onChange={setTab} />
          </LayoutGroup>
        </div>

        {/* Filtering: cards that leave spring down to nothing, the rest glide to their new spots. */}
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-12 sm:mt-12 [&>li]:w-full sm:[&>li]:w-[calc((100%-1.5rem)/2)] lg:[&>li]:w-[calc((100%-3rem)/3)]">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((p, i) => (
              <m.li
                key={p.id}
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={SPRING_SOFT}
              >
                <Reveal delay={(i % 3) * 60}>
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
