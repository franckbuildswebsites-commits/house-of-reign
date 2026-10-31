import { useEffect, useRef, useState } from "react";
import { m, scroll, useMotionValue, useSpring } from "motion/react";

const SMOOTH = { stiffness: 120, damping: 26, mass: 0.5 };

// True only where the live drop will run well: a real GPU, motion allowed, data not being saved.
// Software rendering counts as no WebGL. Everyone else keeps the static image, which is the same
// drop, exported from the same shader (public/blob/).
function canRender() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.connection?.saveData) return false;
  const gl = document.createElement("canvas").getContext("webgl", { failIfMajorPerformanceCaveat: true });
  if (!gl) return false;
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : "";
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return !/swiftshader|llvmpipe|software/i.test(name);
}

const isDark = () => document.documentElement.dataset.theme === "dark";

// The hero's liquid glass drop. The page paints the static image first, then the WebGL engine loads
// once the browser is idle and takes over on the matching frame. Scrolling shrinks it and lets the
// headline pass over it, on transforms only. It stops drawing off screen and in hidden tabs.
export default function Blob() {
  const frame = useRef(null);
  const canvas = useRef(null);
  const [live, setLive] = useState(false);
  const y = useMotionValue(0);
  const size = useMotionValue(1);
  const smoothY = useSpring(y, SMOOTH);
  const smoothSize = useSpring(size, SMOOTH);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.getElementById("top");
    return scroll(
      (p) => {
        y.set(p * hero.offsetHeight * 0.36);
        size.set(1 - p * 0.36);
      },
      { target: hero, offset: ["start start", "end start"] },
    );
  }, [y, size]);

  useEffect(() => {
    let engine;
    let cancelled = false;
    const cleanups = [];

    async function start() {
      if (cancelled || !canRender()) return;
      const { runBlob } = await import("../lib/blob-engine");
      if (cancelled) return;
      const box = frame.current;
      const hero = document.getElementById("top");
      engine = runBlob(canvas.current, {
        dark: isDark(),
        lowPower: document.documentElement.classList.contains("lite"),
        size: box.offsetWidth,
        onFirstFrame: () => setLive(true),
        onContextLost: () => setLive(false),
      });

      let onScreen = true;
      const sync = () => engine.setActive(onScreen && !document.hidden);
      const io = new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting;
        sync();
      });
      io.observe(hero);
      document.addEventListener("visibilitychange", sync);
      const resize = new ResizeObserver(() => engine.setSize(box.offsetWidth));
      resize.observe(box);
      const theme = new MutationObserver(() => engine.setDark(isDark()));
      theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      cleanups.push(() => {
        io.disconnect();
        resize.disconnect();
        theme.disconnect();
        document.removeEventListener("visibilitychange", sync);
      });

      if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
        let lastX = 0;
        let lastY = 0;
        const onMove = (e) => {
          if (!onScreen) return;
          const r = box.getBoundingClientRect();
          const reach = Math.max(window.innerWidth, 900) / 2;
          const x = (e.clientX - (r.left + r.width / 2)) / reach;
          const up = (r.top + r.height / 2 - e.clientY) / reach;
          const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY) / 90;
          lastX = e.clientX;
          lastY = e.clientY;
          engine.setPointer(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, up)), speed);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        cleanups.push(() => window.removeEventListener("pointermove", onMove));
      }
      sync();
    }

    // Only after the page is interactive and the browser has a quiet moment.
    const idle = () => {
      const run = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200));
      run(start, { timeout: 2000 });
    };
    const timer = setTimeout(idle, 600);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cleanups.forEach((fn) => fn());
      engine?.destroy();
    };
  }, []);

  return (
    <m.div aria-hidden="true" style={{ y: smoothY, scale: smoothSize }} className="blob pointer-events-none">
      <div ref={frame} className={`blob-frame ${live ? "is-live" : ""}`}>
        <div className="blob-still" />
        <canvas ref={canvas} className="blob-canvas" />
      </div>
    </m.div>
  );
}
