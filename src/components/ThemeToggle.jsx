import { useEffect, useState } from "react";

const deviceDark = () => matchMedia("(prefers-color-scheme: dark)").matches;

function apply(dark) {
  const root = document.documentElement;
  if (dark) root.dataset.theme = "dark";
  else delete root.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#000000" : "#ffffff");
}

// Small light / dark switch. The site follows the device setting; the switch overrides it, and
// index.html applies a saved choice before the first paint. Picking what the device already uses
// clears the choice, so the site goes back to following the device.
export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      let saved = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {}
      if (saved) return;
      setDark(e.matches);
      apply(e.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    apply(next);
    try {
      if (next === deviceDark()) localStorage.removeItem("theme");
      else localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`grid h-11 w-11 place-items-center rounded-full text-ink/80 transition-colors duration-200 hover:text-ink lg:h-8 lg:w-8 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  );
}
