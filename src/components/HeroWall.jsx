import { useEffect, useRef } from "react";

// Hero background: our own project screenshots in tilted columns that drift up and down
// (CSS animation, transform only). Pauses when the hero is off screen; still with reduced motion.
//
// Each column is ONE element whose background is a pre-composed strip of 5 screenshots
// (/public/portfolio/wall/col-N.webp, 200px "-sm" version for phones), repeated vertically.
// One element per column means nothing "new" scrolls into view later, which keeps the
// page's Largest Contentful Paint at load time instead of chasing the animation.
const columns = [
  { dur: "70s" },
  { dur: "85s", down: true },
  { dur: "75s" },
  { dur: "90s", down: true },
  { dur: "80s" },
];

// AVIF + WebP, phone (200px) and desktop (400px) versions; index.css picks the right one.
const strip = (c, dur) => {
  const f = `/portfolio/wall/col-${(c % 4) + 1}`;
  return {
    "--dur": dur,
    "--avif-sm": `url(${f}-sm.avif)`,
    "--webp-sm": `url(${f}-sm.webp)`,
    "--avif-lg": `url(${f}.avif)`,
    "--webp-lg": `url(${f}.webp)`,
  };
};

export default function HeroWall({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("wall-paused", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
    >
      <div className="absolute inset-x-[-12%] inset-y-[-30%] [perspective:1600px]">
        <div className="flex h-full justify-center gap-2.5 [transform:rotateX(26deg)_rotateZ(-11deg)] sm:gap-4">
          {columns.map((col, c) => (
            <div key={c} className={`w-[22%] shrink-0 sm:w-[19%] ${c === 4 ? "hidden sm:block" : ""}`}>
              <div
                className={`wall-col aspect-[400/2660] w-full bg-[length:100%_auto] bg-repeat-y ${col.down ? "down" : ""}`}
                style={strip(c, col.dur)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
