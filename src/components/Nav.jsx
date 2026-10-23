import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[45] transition-[background-color,box-shadow] duration-300 ${
        solid ? "bg-paper/90 shadow-[0_1px_0_rgb(96_66_36/0.1)] backdrop-blur-md" : ""
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline text-[0.95rem] font-medium transition-colors hover:text-brand-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-primary hidden py-2.5 sm:inline-flex">
            Start a project
          </a>
          <button
            type="button"
            className="relative -mr-2 grid h-11 w-11 place-items-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`absolute h-[2px] w-6 bg-ink transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-ink transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-[4px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper px-5 pb-10 pt-6 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <a href={l.href} onClick={close} className="block py-4 font-display text-4xl font-semibold tracking-tight transition-colors hover:text-brand-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={close} className="btn btn-primary mt-8 w-full">
            Start a project
          </a>
        </div>
      )}
    </header>
  );
}
