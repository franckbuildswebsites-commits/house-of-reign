import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import Logo from "./Logo";
import { PHONE } from "../config";
import { smsHref } from "../lib/utils";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const EASE = [0.2, 0.8, 0.2, 1];

// Logo left, a floating pill of links in the middle, the main call to action on the right.
// Phones get a "Menu" pill that opens a full-screen sheet with big staggered links.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-night via-night/75 to-transparent transition-opacity duration-500 ${
          scrolled && !open ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav aria-label="Main" className="relative mx-auto flex h-20 max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-24">
        <Logo onClick={close} className="relative z-10" />

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-coal/70 p-1.5 backdrop-blur-md lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block rounded-full px-4 py-2 text-[0.95rem] font-medium text-cream/80 transition-colors duration-200 hover:bg-cream/10 hover:text-cream"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative z-10 flex items-center gap-2">
          <a href="#contact" className="btn btn-primary hidden sm:inline-flex">
            Start a project
          </a>
          <button
            type="button"
            className="btn btn-ghost min-h-11 bg-coal/70 px-5 backdrop-blur-md lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" className="relative h-2.5 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`} />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-night px-5 pb-10 pt-28 sm:px-8 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-line">
                  <m.a
                    href={l.href}
                    onClick={close}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.05 + i * 0.06 }}
                    className="flex items-baseline justify-between py-4 font-display text-5xl font-semibold tracking-[-0.03em]"
                  >
                    {l.label}
                    <span className="text-sm font-medium tracking-normal text-dim">0{i + 1}</span>
                  </m.a>
                </li>
              ))}
            </ul>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              className="mt-auto flex flex-col gap-3 pt-10"
            >
              <a href="#contact" onClick={close} className="btn btn-primary w-full">
                Start a project
              </a>
              <a href={smsHref} className="btn btn-ghost w-full">
                Text me · {PHONE}
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
