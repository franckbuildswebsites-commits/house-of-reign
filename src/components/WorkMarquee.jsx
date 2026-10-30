import { useRef } from "react";
import Photo from "./Photo";
import { ArrowUpRight } from "./Icons";
import { usePauseOffscreen } from "../lib/offscreen";
import { categories, projects, featured } from "../data/projects";

// Two rows of project cards drifting in opposite directions (CSS, transform only). Hovering or
// focusing a row pauses it; each card opens the project. Images: /public/portfolio/cards/.
const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
const label = Object.fromEntries(categories.map((c) => [c.id, c.label]));

const card = (id, shot) => {
  if (id === featured.id) return { key: `${id}-${shot}`, name: featured.name, sub: "Featured project", href: "#featured", img: `gdh-${shot}` };
  const p = byId[id];
  return { key: `${id}-${shot}`, name: p.name, sub: label[p.category], href: p.url, external: true, img: `${id}-${shot}` };
};

const rows = [
  { dur: "70s", items: [card("wicked-bread", "a"), card("ppf-comics", "a"), card(featured.id, "home"), card("token-forge", "a"), card("champions4character", "a"), card("mm-casino-party", "a")] },
  { dur: "80s", reverse: true, items: [card(featured.id, "event"), card("token-forge", "b"), card("wicked-bread", "b"), card("mm-casino-party", "b"), card(featured.id, "volunteer"), card("ppf-comics", "b"), card("champions4character", "b")] },
];

function Card({ c, copy }) {
  return (
    <li className="w-[min(72vw,30rem)] shrink-0 pr-3 sm:pr-4" aria-hidden={copy || undefined}>
      <a
        href={c.href}
        tabIndex={copy ? -1 : undefined}
        {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
        className="group relative block aspect-[16/10] overflow-hidden rounded-[18px] bg-ember ring-1 ring-line"
      >
        <Photo
          src={`/portfolio/cards/${c.img}.webp`}
          alt={copy ? "" : `${c.name} website`}
          width="600"
          height="375"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium text-paper backdrop-blur-sm [@media(hover:hover)]:hidden">
          {c.name}
        </span>
        <span className="absolute inset-x-5 bottom-4 flex translate-y-3 items-end justify-between gap-3 text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <span>
            <span className="t-card block">{c.name}</span>
            <span className="text-sm text-paper/75">{c.sub}</span>
          </span>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-ink">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
        {c.external && !copy && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </li>
  );
}

export default function WorkMarquee() {
  const ref = useRef(null);
  usePauseOffscreen(ref);
  return (
    <div ref={ref} className="flex flex-col gap-3 overflow-hidden py-2 sm:gap-4">
      {rows.map((row, r) => (
        <div key={r} className="marquee-row">
          <ul className={`marquee flex w-max ${row.reverse ? "reverse" : ""}`} style={{ "--dur": row.dur }}>
            {row.items.map((c) => (
              <Card key={c.key} c={c} />
            ))}
            {row.items.map((c) => (
              <Card key={`${c.key}-copy`} c={c} copy />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
