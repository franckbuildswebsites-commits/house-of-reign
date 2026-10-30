import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Chat } from "./Icons";
import { EMAIL } from "../config";
import { smsHref } from "../lib/utils";
import { pauseScroll, resumeScroll } from "../lib/scroll";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.2, 0.8, 0.2, 1];

// Logo left, a floating pill in the middle ("Menu" + theme switch), the call to action right.
// "Menu" opens a full-screen sheet with big centered links on a slow glow, on every screen size.
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    pauseScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      resumeScroll();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav aria-label="Main" className="px-section relative mx-auto flex h-20 max-w-[100rem] items-center justify-between gap-4 lg:h-[7.25rem]">
        <Logo onClick={close} className="relative z-10" />

        <div className="relative z-10 flex items-center gap-1 rounded-full sm:absolute sm:left-1/2 sm:-translate-x-1/2 border border-line bg-coal/80 p-1 shadow-[var(--shadow-deep)] backdrop-blur-md">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 items-center gap-2.5 rounded-full px-4 text-[0.95rem] font-medium transition-colors duration-300 hover:bg-cream/10"
          >
            <span aria-hidden="true" className="relative h-2.5 w-3.5">
              <span className={`absolute left-0 h-[1.5px] w-3.5 bg-current transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-3.5 bg-current transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`} />
            </span>
            {open ? "Close" : "Menu"}
          </button>
          <ThemeToggle />
        </div>

        <a href="#contact" onClick={close} className="btn btn-primary relative z-10 hidden min-h-11 sm:inline-flex">
          Start a project
        </a>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="site-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.5, ease: EASE, delay: 0.1 } }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 -z-10 flex flex-col items-center overflow-y-auto bg-night px-5 pb-10 pt-28"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="glow absolute bottom-[-20%] left-[20%] h-[60vmax] w-[60vmax] rounded-full bg-brand/25 blur-[120px]" />
              <div className="glow absolute right-[-10%] top-[10%] h-[40vmax] w-[40vmax] rounded-full bg-brand-deep/20 blur-[120px] [animation-delay:-6s]" />
            </div>

            <ul className="relative my-auto flex flex-col items-center gap-1 py-8 text-center">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <m.a
                    href={l.href}
                    onClick={close}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "105%", transition: { duration: 0.3, ease: EASE } }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                    className="block font-display text-[clamp(2.75rem,7vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-colors duration-300 hover:text-brand"
                  >
                    {l.label}
                  </m.a>
                </li>
              ))}
            </ul>

            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
              className="relative flex flex-col items-center gap-6 text-center"
            >
              <a href={smsHref} className="btn btn-primary min-h-11">
                <Chat className="h-[18px] w-[18px]" />
                Text me
              </a>
              <div>
                <p className="label">Email me</p>
                <a href={`mailto:${EMAIL}`} className="mt-1 inline-block break-all text-lg underline underline-offset-4">
                  {EMAIL}
                </a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
