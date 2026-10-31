import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Chat } from "./Icons";
import { EMAIL } from "../config";
import { smsHref } from "../lib/utils";
import { pauseScroll, resumeScroll, scrollToHash } from "../lib/scroll";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.2, 0.8, 0.2, 1];

// A thin frosted bar. Desktop: logo left, small text links, theme switch and a compact pill right.
// Phones and tablets: "Menu" opens a full-screen sheet with big centered links.
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
  // Menu links: close the sheet, unfreeze the page, then glide to the section under the header.
  const go = (e) => {
    const hash = e.currentTarget.getAttribute("href");
    e.preventDefault();
    setOpen(false);
    resumeScroll();
    requestAnimationFrame(() => scrollToHash(hash));
    history.replaceState(null, "", hash);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav aria-label="Main" className="frost relative z-10 border-b border-ink/10">
        <div className="site-wrap flex h-12 items-center justify-between gap-4">
          <Logo onClick={close} />

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-xs text-ink/80 transition-colors duration-200 hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 lg:gap-3">
            <ThemeToggle />
            <a href="#contact" className="btn btn-primary btn-sm hidden lg:inline-flex">
              Start a project
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((o) => !o)}
              className="-mr-2 flex h-11 items-center gap-2 px-2 text-sm lg:hidden"
            >
              <span aria-hidden="true" className="relative h-2 w-3.5">
                <span className={`absolute left-0 h-px w-3.5 bg-current transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-3.5 bg-current transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`} />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="site-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 flex flex-col items-center overflow-y-auto bg-page px-6 pb-10 pt-24 lg:hidden"
          >
            <ul className="relative my-auto flex flex-col items-center gap-1 py-8 text-center">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <m.a
                    href={l.href}
                    onClick={go}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.04 + i * 0.04 }}
                    className="block py-1 text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.026em] transition-colors duration-200 hover:text-accent focus-visible:text-accent"
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
              transition={{ duration: 0.45, ease: EASE, delay: 0.25 }}
              className="relative flex flex-col items-center gap-6 text-center"
            >
              <a href={smsHref} className="btn btn-primary">
                <Chat className="h-[18px] w-[18px]" />
                Message us
              </a>
              <div>
                <p className="label">Email us</p>
                <a href={`mailto:${EMAIL}`} className="mt-1 inline-flex min-h-11 items-center break-all text-accent hover:underline focus-visible:underline">
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
