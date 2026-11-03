import { useEffect, useState } from "react";
import { m } from "motion/react";
import { SPRING_SOFT } from "./Press";
import { Chat } from "./Icons";
import IconPill from "./IconPill";
import { smsHref } from "../lib/utils";

// "Message us" pill pinned bottom-center on every screen, like the reference's message button.
// Hover and tap motion is CSS (.icon-pill in index.css). It slides out of the way (no fade) over the contact form, closing section or footer.
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
    // The wrapper rises in on load; the inner layer slides away (an animation's fill would override it).
    <aside aria-label="Quick contact" className="rise fixed left-1/2 z-40 -translate-x-1/2" style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))", "--d": "900ms" }}>
      <m.div initial={false} animate={{ y: hidden ? 110 : 0 }} transition={SPRING_SOFT}>
        <IconPill href={smsHref} inert={hidden || undefined} className="pill-solid" Icon={Chat}>
            Message us
          </IconPill>
      </m.div>
    </aside>
  );
}
