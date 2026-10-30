import { useEffect, useRef } from "react";

// A dot that trails the mouse and swells over links and buttons (desktop with a mouse only,
// never with reduced motion). The real cursor stays visible.
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let raf = 0;
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      el.classList.add("is-on");
      el.classList.toggle("is-link", !!e.target.closest("a, button, label, [role=button]"));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => el.classList.remove("is-on");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="cursor pointer-events-none fixed left-0 top-0 z-[120]">
      <span />
    </div>
  );
}
