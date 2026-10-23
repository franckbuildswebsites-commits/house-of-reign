import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Testimonial } from "./Testimonials";
import { BrowserFrame, PhoneFrame, hostname } from "./Screens";
import { ArrowUpRight } from "./Icons";
import { categories, projects } from "../data/projects";
import { testimonials } from "../data/testimonials";

const groups = categories
  .map((c) => ({ ...c, items: projects.filter((p) => p.published && p.category === c.id) }))
  .filter((g) => g.items.length);

function Tag({ tag }) {
  const live = tag !== "Concept";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        live ? "bg-ink text-paper" : "border border-ink/25 text-ink"
      }`}
    >
      {tag}
    </span>
  );
}

// Desktop screenshot with the phone screenshot overlapping its corner.
// With an old-site screenshot, a toggle swaps the desktop view to the old site.
function Shots({ p, showOld }) {
  return (
    <div className="relative pb-6 pr-8 sm:pb-8 sm:pr-12">
      <BrowserFrame
        src={showOld ? p.before : p.desktop}
        alt={showOld ? `${p.name}'s old website` : `${p.name} website on a laptop`}
        address={p.url ? hostname(p.url) : "concept preview"}
      />
      {!showOld && (
        <PhoneFrame
          src={p.mobile}
          alt={`${p.name} website on a phone`}
          className="absolute bottom-0 right-0 w-[21%] max-w-[150px]"
        />
      )}
    </div>
  );
}

function Details({ p, showOld, setShowOld, large }) {
  return (
    <div>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
        <Tag tag={p.tag} />
        {p.kind}
      </p>
      <h4
        className={`mt-3 font-display font-semibold leading-tight tracking-[-0.005em] ${
          large ? "text-[clamp(1.75rem,3vw,2.25rem)]" : "text-[1.625rem]"
        }`}
      >
        {p.name}
      </h4>
      <p className="mt-3 text-muted">{p.description}</p>
      <ul className="mt-5 space-y-2 border-t border-line pt-5">
        {p.facts.map((f) => (
          <li key={f} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-brand" />
            {f}
          </li>
        ))}
      </ul>
      {(p.url || p.before) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1 text-brand-ink">
              {p.tag === "Concept" ? "View the concept" : `Visit ${hostname(p.url)}`}
              <ArrowUpRight className="h-4 w-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {p.before && (
            <button type="button" aria-pressed={showOld} onClick={() => setShowOld((v) => !v)} className="text-link text-ink">
              {showOld ? "Back to the new site" : "See the old site"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// `wide` lays screenshots and text side by side (featured project, or alone in its category).
function Project({ p, wide }) {
  const [showOld, setShowOld] = useState(false);
  const quote = p.featured && testimonials.find((t) => t.project === p.id);

  return (
    <Reveal as="article">
      <div className={wide ? "grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:items-center lg:gap-14" : "flex flex-col gap-8"}>
        <div className={wide ? "lg:col-span-7" : ""}>
          <Shots p={p} showOld={showOld} />
        </div>
        <div className={wide ? "lg:col-span-5" : ""}>
          <Details p={p} showOld={showOld} setShowOld={setShowOld} large={wide} />
        </div>
      </div>
      {quote && <Testimonial t={quote} dark className="mt-12 rounded-2xl bg-ink p-7 text-paper sm:mt-16 sm:p-12" />}
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Work" title="Sites I've designed and built.">
          Live sites are linked so you can try them on your phone. Concepts are redesigns I made for real businesses.
        </SectionHeading>

        <Reveal as="nav" aria-label="Work by industry" className="mt-8 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#work-${g.id}`}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
            >
              {g.name}
            </a>
          ))}
        </Reveal>

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {groups.map((g) => {
            const wide = g.items.length === 1;
            return (
              <div key={g.id} id={`work-${g.id}`}>
                <div className="flex flex-col gap-1 border-t-2 border-ink pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="font-display text-xl font-semibold tracking-normal sm:text-2xl">{g.name}</h3>
                  <p className="text-muted">{g.blurb}</p>
                </div>
                <div className={`mt-10 sm:mt-12 ${wide ? "" : "grid gap-x-12 gap-y-20 md:grid-cols-2"}`}>
                  {g.items.map((p) => (
                    <Project key={p.id} p={p} wide={wide || p.featured} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
