import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], summary, label";
const FIELDS = "input, textarea, select";

// Small accent dot that follows the mouse and grows over links.
// Only on devices with a precise pointer + hover, and never with reduced motion.
export default function Cursor() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = -100, y = -100, tx = x, ty = y, raf = 0;

    const tick = () => {
      x += (tx - x) * 0.28;
      y += (ty - y) * 0.28;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.remove("is-hidden");
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target;
      el.classList.toggle("is-hover", !!t.closest?.(INTERACTIVE));
      el.classList.toggle("is-hidden", !!t.closest?.(FIELDS));
    };
    const onLeave = () => el.classList.add("is-hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} className="cursor-dot is-hidden" aria-hidden="true">
      <span />
    </div>
  );
}
