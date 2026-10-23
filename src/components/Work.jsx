import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import ContactCTA from "./ContactCTA";
import FeaturedCaseStudy from "./FeaturedCaseStudy";
import { BrowserFrame } from "./Devices";
import { ArrowUpRight } from "./Icons";
import { categories, projects } from "../data/projects";

const visible = projects.filter((p) => p.published);
const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));

// "All" plus every category that has at least one published project.
const tabs = [
  { id: "all", label: "All" },
  ...categories.filter((c) => visible.some((p) => p.category === c.id)),
];
const inTab = (tab) => (p) => tab === "all" || p.category === tab;

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

// The frame shows the top 16:10 of the page; scrolling to the bottom moves the image up by
// everything below that, as a share of the image's own height.
const FRAME_RATIO = 10 / 16;
const scrollTo = ({ width, height }) => `-${Math.max(0, (1 - (width * FRAME_RATIO) / height) * 100).toFixed(2)}%`;

function FilterTabs({ active, onChange }) {
  return (
    <div role="group" aria-label="Filter projects by industry" className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          aria-pressed={active === t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            active === t.id ? "bg-ink text-white" : "bg-white text-ink shadow-soft hover:bg-sand"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// One project: a mini browser window with the full-page screenshot. Desktop: hovering scrolls
// the page inside the frame (CSS, see .shot in index.css). Touch screens: it scrolls while the
// card is mostly on screen. Reduced motion: always static.
function ProjectCard({ project, cardRef }) {
  const { name, url, tag, category, full } = project;
  const shotRef = useRef(null);

  useEffect(() => {
    const shot = shotRef.current;
    if (!shot || reducedMotion() || !matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(([e]) => shot.classList.toggle("is-scrolling", e.isIntersecting), {
      threshold: 0.6,
    });
    io.observe(shot);
    return () => io.disconnect();
  }, []);

  return (
    <li ref={cardRef} className="work-card">
      <a href={url} target="_blank" rel="noopener noreferrer" className="group block rounded-[14px]">
        <div className="transition-transform duration-500 ease-[var(--ease-spring)] motion-safe:group-hover:-translate-y-1">
          <BrowserFrame url={url} className="shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
            <div ref={shotRef} className="shot relative aspect-[16/10] overflow-hidden bg-sand" style={{ "--scroll-to": scrollTo(full) }}>
              <img
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
            <h3 className="truncate font-display text-xl font-semibold tracking-tight">{name}</h3>
            <p className="mt-0.5 flex items-center gap-2 text-sm text-muted">
              {categoryLabel[category]}
              {tag === "Concept" && (
                <span className="rounded-full bg-sand px-2 py-0.5 text-xs font-semibold text-ink">Concept</span>
              )}
            </p>
          </div>
          <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-ink" />
        </div>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </li>
  );
}

export default function Work() {
  const [tab, setTab] = useState("all"); // highlighted tab (updates on click)
  const [active, setActive] = useState("all"); // filter applied to the grid (after cards fade out)
  const shown = visible.filter(inTab(active));

  const gridRef = useRef(null);
  const cardEls = useRef(new Map());
  const flip = useRef(null); // positions before a filter change: { first: Map(id → rect), entering: Set(id) }
  const busy = useRef(false);

  const refFor = (id) => (el) => (el ? cardEls.current.set(id, el) : cardEls.current.delete(id));

  // Filtering: cards that don't match fade/scale out, then the rest slide to their new spots (FLIP)
  // and newly matching cards fade/scale in.
  async function choose(next) {
    if (next === tab || busy.current) return;
    setTab(next);
    if (reducedMotion()) return setActive(next);

    busy.current = true;
    const nextShown = visible.filter(inTab(next));
    const leaving = shown.filter((p) => !nextShown.includes(p));
    await Promise.all(
      leaving.map(
        (p) =>
          cardEls.current
            .get(p.id)
            ?.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(0.94)" }], {
              duration: 180,
              easing: "ease-in",
              fill: "forwards",
            }).finished
      )
    );
    flip.current = {
      first: new Map(
        shown.filter((p) => nextShown.includes(p)).map((p) => [p.id, cardEls.current.get(p.id).getBoundingClientRect()])
      ),
      entering: new Set(nextShown.filter((p) => !shown.includes(p)).map((p) => p.id)),
    };
    setActive(next);
  }

  useLayoutEffect(() => {
    const f = flip.current;
    if (!f) return;
    flip.current = null;
    const anims = [];
    for (const p of shown) {
      const el = cardEls.current.get(p.id);
      if (!el) continue;
      if (f.first.has(p.id)) {
        const a = f.first.get(p.id);
        const b = el.getBoundingClientRect();
        const dx = a.left - b.left;
        const dy = a.top - b.top;
        if (dx || dy)
          anims.push(el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 450, easing: EASE }));
      } else if (f.entering.has(p.id)) {
        anims.push(
          el.animate([{ opacity: 0, transform: "scale(0.94)" }, { opacity: 1, transform: "none" }], {
            duration: 350,
            delay: 100,
            easing: EASE,
            fill: "backwards",
          })
        );
      }
    }
    Promise.all(anims.map((a) => a.finished)).finally(() => (busy.current = false));
  }, [active]);

  // First time the grid scrolls into view, cards fade up in a quick stagger. The prerendered HTML
  // shows them; they're only hidden (data-armed) if the grid is still below the screen after load.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion() || !("IntersectionObserver" in window)) return;
    if (grid.getBoundingClientRect().top < window.innerHeight) return;
    grid.dataset.armed = "";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        [...grid.children].forEach((el, i) =>
          el.animate([{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "none" }], {
            duration: 500,
            delay: i * 70,
            easing: EASE,
            fill: "backwards",
          })
        );
        delete grid.dataset.armed;
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="bg-peach px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Work" title="Recent work.">
          Custom sites for local shops — built fast, built to sell.
        </SectionHeading>

        <div className="mt-14 sm:mt-20">
          <FeaturedCaseStudy />
        </div>

        <div className="mt-20 sm:mt-28">
          <FilterTabs active={tab} onChange={choose} />
        </div>

        <ul ref={gridRef} className="work-grid mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {shown.map((p) => (
            <ProjectCard key={p.id} project={p} cardRef={refFor(p.id)} />
          ))}
        </ul>

        <ContactCTA title="Want one for your business?" className="mt-20 sm:mt-24" />
      </div>
    </section>
  );
}
