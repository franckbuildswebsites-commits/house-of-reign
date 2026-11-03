import { useEffect, useRef } from "react";
import { m, scroll, useMotionValue, useSpring } from "motion/react";

const SMOOTH = { stiffness: 140, damping: 26, mass: 0.5 };

// Images and mockups drift a few pixels and settle to full size as they cross the screen. Transform
// only; opacity is never touched. Nothing runs on touch or low-power devices (html.lite) or with
// reduced motion: those get a plain static element and no scroll work at all.
export default function Parallax({ y = 14, scale = 0.03, className = "", children }) {
  const ref = useRef(null);
  const offset = useMotionValue(0);
  const size = useMotionValue(1);
  const smoothOffset = useSpring(offset, SMOOTH);
  const smoothSize = useSpring(size, SMOOTH);

  useEffect(() => {
    if (document.documentElement.classList.contains("lite")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return scroll(
      (p) => {
        offset.set(y * (1 - 2 * p));
        size.set(1 - scale * Math.max(0, 1 - p * 2));
      },
      { target: ref.current, offset: ["start end", "end start"] },
    );
  }, [offset, size, y, scale]);

  return (
    <m.div ref={ref} style={{ y: smoothOffset, scale: smoothSize }} className={className}>
      {children}
    </m.div>
  );
}
