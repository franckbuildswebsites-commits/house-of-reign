import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Wordmark } from "./Logo";
import { SPRING_SOFT } from "./Press";
import { STUDIO_NAME, EMAIL, PHONE } from "../config";
import { smsHref } from "../lib/utils";

const links = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Pricing", "#pricing"],
  ["Process", "#process"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

const cycle = ["business.", "café.", "shop.", "salon.", "brand."];

// The last word of the footer headline swaps every couple of seconds (it slides, never fades).
function CyclingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % cycle.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative block overflow-hidden">
      <span className="invisible">business.</span>
      <AnimatePresence initial={false}>
        <m.span
          key={cycle[i]}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={SPRING_SOFT}
          className="absolute left-0 top-0 text-dim"
        >
          {cycle[i]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

// Local time where we are based, ticking (shown once the page is running).
function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || " "}</span>;
}

export default function Footer() {
  return (
    <footer id="site-footer">
      <div className="site-wrap pb-10 pt-24 lg:pb-12 lg:pt-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)_auto] lg:gap-12">
          <p className="t-h2">
            Long
            <br />
            live
            <br />
            your
            <CyclingWord />
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:pt-3">
            <div className="text-sm text-dim">
              <p className="t-h4 text-ink">Based in South Florida</p>
              <p className="mt-1.5">
                Local time <LocalTime />
              </p>
              <p className="mt-0.5" lang="es">
                Hablamos español
              </p>
            </div>
            <div className="text-sm text-dim">
              <p className="t-h4 text-ink">Text or call</p>
              <a href={smsHref} className="inline-flex min-h-8 items-center text-accent hover:underline focus-visible:underline [@media(pointer:coarse)]:min-h-11">
                {PHONE}
              </a>
              <p>Replies within 24 hours</p>
            </div>
          </div>

          <ul className="grid grid-cols-2 text-sm sm:grid-cols-3 lg:flex lg:flex-col lg:pt-3">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-8 min-w-11 items-center text-dim transition-colors hover:text-ink focus-visible:text-ink [@media(pointer:coarse)]:min-h-11">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-6 lg:mt-24 lg:flex-row lg:items-center lg:justify-between">
          <Wordmark className="text-[1.3125rem]" />
          <div>
            <span className="label mr-2">Email us</span>
            <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center break-all text-sm text-accent hover:underline focus-visible:underline">
              {EMAIL}
            </a>
          </div>
          <p className="text-xs text-caption lg:text-right" suppressHydrationWarning>
            © {new Date().getFullYear()} {STUDIO_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
