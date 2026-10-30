import { useEffect, useState } from "react";
import { Chat } from "./Icons";
import { smsHref } from "../lib/utils";

// "Text me" pill pinned bottom-center on every screen, like the reference's message button.
// It steps aside while the contact form or the closing section (which have their own) is on screen.
export default function FloatingContact() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const inView = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        setHidden(inView.size > 0);
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    ["contact", "text-me"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    // The wrapper fades in on load; the link itself hides/shows (an animation's fill would override it).
    <div
      className="fade-in fixed left-1/2 z-40 -translate-x-1/2"
      style={{ bottom: "calc(1.1rem + env(safe-area-inset-bottom))", "--d": "1200ms" }}
    >
      <a
        href={smsHref}
        inert={hidden || undefined}
        className={`group flex items-center gap-3 rounded-full border border-line bg-cream py-1.5 pl-5 pr-1.5 text-[0.9375rem] font-medium text-night shadow-[var(--shadow-deep)] transition-[opacity,translate,scale] duration-500 ease-[var(--ease-out-soft)] hover:scale-[1.04] ${
          hidden ? "pointer-events-none translate-y-6 opacity-0" : ""
        }`}
      >
        Text me
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-ink transition-transform duration-500 group-hover:rotate-[-12deg]">
          <Chat className="h-[18px] w-[18px]" />
        </span>
      </a>
    </div>
  );
}
