import { useEffect, useState } from "react";
import { Chat } from "./Icons";
import { smsHref } from "../lib/utils";

// "Message us" pill pinned bottom-center on every screen, like the reference's message button.
// It slides out of the way (no fade) while the contact form, closing section or footer is on screen.
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
    ["contact", "text-us", "site-footer"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    // The wrapper rises in on load; the link itself slides away (an animation's fill would override it).
    <aside aria-label="Quick contact" className="rise fixed left-1/2 z-40 -translate-x-1/2" style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))", "--d": "900ms" }}>
      <a
        href={smsHref}
        inert={hidden || undefined}
        className={`frost flex items-center gap-2.5 rounded-full border border-line py-1 pl-4 pr-1 text-[0.9375rem] tracking-[-0.01em] transition-transform duration-500 ease-[var(--ease-out-soft)] ${
          hidden ? "pointer-events-none translate-y-[calc(100%+2rem)]" : ""
        }`}
      >
        Message us
        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-on-accent">
          <Chat className="h-4 w-4" />
        </span>
      </a>
    </aside>
  );
}
