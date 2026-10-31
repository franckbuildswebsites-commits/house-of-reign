import { useLayoutEffect, useRef, useState } from "react";

// A one-time entrance: a slight slide-up the first time something scrolls into view, as an
// enhancement only. Everything renders in place (that's what the prerendered HTML, crawlers and
// link previews get) and stays at full opacity. After hydration, elements that are still below the
// fold are offset, and they settle once when scrolled to. Above-the-fold content never moves, and
// nothing moves with reduced motion or without IntersectionObserver.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setHidden(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${hidden ? "is-hidden" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
