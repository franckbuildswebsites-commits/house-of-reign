import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Wordmark } from "./Logo";
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

// The last word of the footer headline swaps every couple of seconds with a soft blur.
function CyclingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % cycle.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative block">
      <span className="invisible">business.</span>
      <AnimatePresence initial={false}>
        <m.span
          key={cycle[i]}
          initial={{ opacity: 0, filter: "blur(12px)", y: "0.15em" }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(12px)", y: "-0.15em" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute left-0 top-0 text-brand"
        >
          {cycle[i]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

// Local time in South Florida, ticking (shown once the page is running).
function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || " "}</span>;
}

const Clock = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6.5V12l3.5 2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0806] text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="glow absolute bottom-[-30%] left-[30%] h-[70vmax] w-[70vmax] rounded-full bg-[#e8622c]/20 blur-[140px]" />
        <div className="glow absolute right-[-15%] top-[-20%] h-[45vmax] w-[45vmax] rounded-full bg-[#c94f1e]/15 blur-[140px] [animation-delay:-7s]" />
      </div>

      <div className="px-section relative mx-auto max-w-[100rem] pb-10 pt-28 lg:pb-14 lg:pt-36">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto] lg:gap-12">
          <p className="font-display text-[clamp(3.2rem,6.4vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            Long
            <br />
            live
            <br />
            your
            <CyclingWord />
          </p>

          <div className="grid gap-12 self-center sm:grid-cols-2">
            <div className="text-paper/70">
              <span className="text-paper/80">
                <Clock />
              </span>
              <p className="mt-6 font-display text-2xl font-medium tracking-[-0.03em] text-paper">South Florida</p>
              <p className="mt-2 text-sm">
                Local time <LocalTime />
              </p>
              <p className="mt-1 text-sm" lang="es">
                Hablamos español
              </p>
            </div>
            <div className="text-paper/70">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-paper/80" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.6a8.5 8.5 0 1 1 15.6-4.4z" />
              </svg>
              <p className="mt-6 font-display text-2xl font-medium tracking-[-0.03em] text-paper">Text or call</p>
              <a href={smsHref} className="link-sweep mt-2 inline-block text-sm">
                {PHONE}
              </a>
              <p className="mt-1 text-sm">Replies within 24 hours</p>
            </div>
          </div>

          <ul className="flex flex-col gap-2.5 text-[0.95rem] uppercase lg:pt-3">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="link-sweep text-paper/85 transition-colors hover:text-paper">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 flex flex-col gap-8 lg:mt-32 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase text-paper/70">Email me</p>
            <a href={`mailto:${EMAIL}`} className="mt-1 inline-block break-all font-display text-[clamp(1.25rem,2.2vw,1.9rem)] font-medium tracking-[-0.03em] underline decoration-1 underline-offset-[6px] transition-colors hover:text-brand">
              {EMAIL}
            </a>
          </div>
          <Wordmark className="text-[2rem]" />
          <p className="text-sm text-paper/60 lg:text-right" suppressHydrationWarning>
            © {new Date().getFullYear()} {STUDIO_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
