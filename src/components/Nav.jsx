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
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// No bar: everything floats over the page. Logo left, a solid pill in the center ("Menu" + theme
// switch), a solid "Get Started" pill right (in the menu on phones). The header itself ignores the
// pointer so the page stays clickable around them. The logo sits at averlo.co's position, outside
// the page container (.nav-logo).
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav aria-label="Main" className="relative z-10">
        <Logo onClick={close} className="nav-logo pointer-events-auto" />
        <div className="site-wrap relative flex h-16 items-start justify-between gap-2 pt-5 lg:h-[5.3125rem] lg:items-center lg:pt-[1.875rem]">
          <span aria-hidden="true" />

          <div className="pill-solid nav-pill pointer-events-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2">
            <m.button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((o) => !o)}
              whileTap={{ scale: 0.95 }}
              transition={SPRING}
              className="hit flex h-[1.625rem] items-center gap-2.5 rounded-full text-sm leading-none tracking-[-0.04em]"
            >
              <span aria-hidden="true" className="relative h-[1.625rem] w-[1.625rem]">
                <m.span initial={false} animate={open ? { y: 4, rotate: 45 } : { y: 0, rotate: 0 }} transition={SPRING} className="absolute left-1.5 top-2.5 h-px w-3.5 bg-current" />
                <m.span initial={false} animate={open ? { y: -3, rotate: -45 } : { y: 0, rotate: 0 }} transition={SPRING} className="absolute bottom-2 left-1.5 h-px w-3.5 bg-current" />
              </span>
              {open ? "Close" : "Menu"}
            </m.button>
            <ThemeToggle />
          </div>

          <Press href="#contact" onClick={close} className="btn btn-nav pill-solid pointer-events-auto hidden sm:inline-flex">
            Get Started
          </Press>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="site-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.9 }}
            className="pointer-events-auto fixed inset-0 flex flex-col items-center overflow-y-auto bg-page px-6 pb-10 pt-24"
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
              <div className="flex flex-wrap justify-center gap-3">
                <Press href="#contact" onClick={go} className="btn pill-solid sm:hidden">
                  Get Started
                </Press>
                <Press href={smsHref} className="btn btn-primary">
                  <Chat className="h-[18px] w-[18px]" />
                  Message us
                </Press>
              </div>
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
