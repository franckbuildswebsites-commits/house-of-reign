import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { SPRING } from "./Press";

// Small light / dark switch; the icon spins in on a spring. Everyone opens in light, whatever their
// device is set to; dark only turns on from this switch. The choice is saved, and index.html applies
// it before the first paint.
export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const root = document.documentElement;
    if (next) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#000000" : "#ffffff");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <m.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      transition={SPRING}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`hit grid h-9 w-9 place-items-center rounded-full text-ink/80 transition-colors duration-200 hover:text-ink ${className}`}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <m.svg
          key={dark ? "sun" : "moon"}
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={SPRING}
        >
          {dark ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
            </>
          ) : (
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
          )}
        </m.svg>
      </AnimatePresence>
    </m.button>
  );
}
