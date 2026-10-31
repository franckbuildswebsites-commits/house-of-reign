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
    <li className="w-[min(72vw,26rem)] shrink-0 pr-3" aria-hidden={copy || undefined}>
      <a
        href={c.href}
        tabIndex={copy ? -1 : undefined}
        {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
        className="group relative block aspect-[16/10] overflow-hidden rounded-[18px] bg-page ring-1 ring-line"
      >
        <Photo
          src={`/portfolio/cards/${c.img}.webp`}
          alt={copy ? "" : `${c.name} website`}
          width="600"
          height="375"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
        />
        <span className="frost absolute left-3 top-3 rounded-full px-3 py-1 text-xs [@media(hover:hover)]:hidden">{c.name}</span>
        <span className="frost absolute inset-x-3 bottom-3 flex translate-y-20 items-center justify-between gap-3 rounded-[14px] px-4 py-3 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <span className="min-w-0">
            <span className="t-h4 block truncate">{c.name}</span>
            <span className="text-sm text-caption">{c.sub}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
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
    <div ref={ref} className="flex flex-col gap-3 overflow-hidden rounded-[18px]">
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
