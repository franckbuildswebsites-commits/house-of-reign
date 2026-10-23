import { Fragment } from "react";
import Reveal from "./Reveal";
import { PhoneFrame } from "./Screens";
import { OWNER, PHOTO, STUDIO_NAME } from "../config";
import { isPlaceholder } from "../lib/utils";
import { projects } from "../data/projects";

// Until there's a photo, the hero shows three real sites on phones.
const heroPhones = ["go-digital-hero", "wicked-bread", "token-forge"].map((id) => projects.find((p) => p.id === id));

function Phones() {
  return (
    <figure>
      <div className="flex items-start justify-center gap-3 sm:gap-5">
        {heroPhones.map((p, i) => (
          <PhoneFrame
            key={p.id}
            src={p.mobile}
            alt={`${p.name} website on a phone`}
            eager
            className={`w-[31%] max-w-[190px] ${i === 1 ? "" : "mt-10 sm:mt-14"}`}
          />
        ))}
      </div>
      <figcaption className="mt-5 text-center text-sm text-muted">
        {heroPhones.map((p, i) => (
          <Fragment key={p.id}>
            {i > 0 && " · "}
            <span className="whitespace-nowrap">
              {p.name}
              {p.tag === "Concept" && " (concept)"}
            </span>
          </Fragment>
        ))}
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section id="top" className="px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-40">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Web design by {OWNER}</p>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4.125rem)] font-semibold leading-[1.05] tracking-[-0.012em]">
            Websites for local businesses that want to look as good online as they do in person.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl sm:leading-relaxed">
            I design and build every site myself, in English or Spanish. You see your finished site before you pay
            anything.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#work" className="btn btn-primary">
              See my work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get a quote
            </a>
          </div>
        </div>

        <Reveal delay={100} className="lg:col-span-5">
          {isPlaceholder(PHOTO) ? (
            <Phones />
          ) : (
            <img
              src={PHOTO}
              alt={`${OWNER}, founder of ${STUDIO_NAME}`}
              width="800"
              height="1000"
              className="mx-auto aspect-[4/5] w-full max-w-md rounded-2xl object-cover"
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}
