import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import Logo from "./Logo";
import Press, { SPRING, SPRING_SOFT } from "./Press";
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

// Minimal frosted bar: logo left, one pill in the center ("Menu" + theme switch), one solid pill
// right. It eases a little thinner once the hero is gone (transforms only: the frosted layer scales,
// the content rides up with it). "Menu" drops a full-screen sheet with big centered links.
// The frost is on its own layer so its backdrop filter can't trap the fixed sheet.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [thin, setThin] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setThin(!e.isIntersecting), { rootMargin: "-56px 0px 0px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

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
      <div className="relative z-10">
        <m.div
          aria-hidden="true"
          initial={false}
          animate={{ scaleY: thin ? 0.8 : 1 }}
          transition={SPRING_SOFT}
          className="frost absolute inset-x-0 top-0 h-14 origin-top border-b border-ink/10"
        />
        <m.nav aria-label="Main" initial={false} animate={{ y: thin ? -5.5 : 0 }} transition={SPRING_SOFT} className="relative">
          <div className="site-wrap relative flex h-14 items-center justify-between gap-4">
            <Logo onClick={close} />

            <div className="flex items-center rounded-full border border-line bg-page/60 p-0.5 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
              <m.button
                type="button"
                aria-expanded={open}
                aria-controls="site-menu"
                onClick={() => setOpen((o) => !o)}
                whileTap={{ scale: 0.95 }}
                transition={SPRING}
                className="hit flex h-9 items-center gap-2 rounded-full pl-3.5 pr-2.5 text-[0.8125rem] tracking-[-0.01em]"
              >
                <span aria-hidden="true" className="relative h-2 w-3.5">
                  <m.span initial={false} animate={open ? { y: 4, rotate: 45 } : { y: 0, rotate: 0 }} transition={SPRING} className="absolute left-0 top-0 h-px w-3.5 bg-current" />
                  <m.span initial={false} animate={open ? { y: -3, rotate: -45 } : { y: 0, rotate: 0 }} transition={SPRING} className="absolute bottom-0 left-0 h-px w-3.5 bg-current" />
                </span>
                {open ? "Close" : "Menu"}
              </m.button>
              <span aria-hidden="true" className="h-4 w-px bg-line" />
              <ThemeToggle />
            </div>

            <Press href="#contact" onClick={close} className="btn btn-primary btn-nav hidden sm:inline-flex">
              Start a project
            </Press>
          </div>
        </m.nav>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="site-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.9 }}
            className="fixed inset-0 flex flex-col items-center overflow-y-auto bg-page px-6 pb-10 pt-24"
          >
            <ul className="relative my-auto flex flex-col items-center gap-1 py-8 text-center">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <m.a
                    href={l.href}
                    onClick={go}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ ...SPRING_SOFT, delay: 0.08 + i * 0.045 }}
                    className="block py-1 text-[clamp(2.5rem,4.4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.026em] transition-colors duration-200 hover:text-accent focus-visible:text-accent"
                  >
                    {l.label}
                  </m.a>
                </li>
              ))}
            </ul>

            <m.div
              initial={{ y: 24 }}
              animate={{ y: 0 }}
              transition={{ ...SPRING_SOFT, delay: 0.3 }}
              className="relative flex flex-col items-center gap-6 text-center"
            >
              <Press href={smsHref} className="btn btn-primary">
                <Chat className="h-[18px] w-[18px]" />
                Message us
              </Press>
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
