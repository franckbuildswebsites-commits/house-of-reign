import { useEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { SPRING, SPRING_SOFT } from "./Press";
import { Chat } from "./Icons";
import { smsHref } from "../lib/utils";

// The pill's insides, in px: [16 + text + 10 + icon 32 + 4]. On hover they trade places.
const TEXT_SHIFT = 30; // text ends 4 + 32 + 10 from the left, up from 16
const ICON_SHIFT = 22; // plus the text's width

// "Message us" pill pinned bottom-center on every screen, like the reference's message button.
// On hover the icon slides to the left and the text to the right; a tap on touch screens plays the
// same swap quickly. It slides out of the way (no fade) over the contact form, closing section or footer.
export default function FloatingContact() {
  const [hidden, setHidden] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const text = useRef(null);
  const timer = useRef(0);

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
    return () => {
      io.disconnect();
      clearTimeout(timer.current);
    };
  }, []);

  // Measured when it's needed, so it's right for whichever font loaded.
  const swap = (on) => {
    if (on) setTextWidth(text.current.getBoundingClientRect().width);
    setSwapped(on);
  };
  const onTouch = (e) => {
    if (e.pointerType === "mouse") return;
    swap(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => swap(false), 650);
  };

  return (
    // The wrapper rises in on load; the inner layer slides away (an animation's fill would override it).
    <aside aria-label="Quick contact" className="rise fixed left-1/2 z-40 -translate-x-1/2" style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))", "--d": "900ms" }}>
      <m.div initial={false} animate={{ y: hidden ? 110 : 0 }} transition={SPRING_SOFT}>
        <m.a
          href={smsHref}
          inert={hidden || undefined}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={SPRING}
          onHoverStart={() => swap(true)}
          onHoverEnd={() => swap(false)}
          onPointerDown={onTouch}
          onFocus={(e) => e.target.matches(":focus-visible") && swap(true)}
          onBlur={() => swap(false)}
          className="pill-solid flex items-center gap-2.5 rounded-full py-1 pl-4 pr-1 text-[0.9375rem] tracking-[-0.01em]"
        >
          <m.span ref={text} initial={false} animate={{ x: swapped ? TEXT_SHIFT : 0 }} transition={SPRING} className="block whitespace-nowrap">
            Message us
          </m.span>
          <m.span
            initial={false}
            animate={{ x: swapped ? -(textWidth + ICON_SHIFT) : 0 }}
            transition={SPRING}
            className="grid h-8 w-8 place-items-center rounded-full bg-pill-soft"
          >
            <Chat className="h-4 w-4" />
          </m.span>
        </m.a>
      </m.div>
    </aside>
  );
}
