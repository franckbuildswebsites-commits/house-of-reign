import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "How it works", href: "#process" },
  { label: "About", href: "#about" },
];

// Logo, section links (tablet and up) and "Get a quote". The bar gets a hairline once scrolled.
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[45] bg-paper/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[0.9375rem] font-medium text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn-primary min-h-0 px-4 py-2 text-[0.9375rem]">
          Get a quote
        </a>
      </nav>
    </header>
  );
}
