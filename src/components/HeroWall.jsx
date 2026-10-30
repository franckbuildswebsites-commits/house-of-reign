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
];

export default function HeroWall() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("wall-paused", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-22%] right-[-22%] top-[-6%] h-[70%] [perspective:1400px] sm:left-[-10%] sm:right-[-20%] sm:h-[78%] lg:left-[30%] lg:right-[-14%] lg:top-[-12%] lg:h-[124%]">
        <div className="flex h-full justify-center gap-2 [transform:rotateX(22deg)_rotateZ(-14deg)_scale(1.05)] sm:gap-4">
          {columns.map((col, c) => (
            <div key={c} className="w-[24%] shrink-0">
              <div
                className={`wall-col aspect-[400/2660] w-full bg-[image:var(--strip)] bg-[length:100%_auto] bg-repeat-y sm:bg-[image:var(--strip-lg)] ${col.down ? "down" : ""}`}
                style={{
                  "--dur": col.dur,
                  "--strip": `url(/portfolio/wall/col-${c + 1}-sm.webp)`,
                  "--strip-lg": `url(/portfolio/wall/col-${c + 1}.webp)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Fade the wall into the page: from the bottom everywhere, from the left on desktop. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(12_9_7/0.55)_0%,rgb(12_9_7/0.1)_20%,rgb(12_9_7/0.6)_36%,var(--color-night)_49%)] lg:bg-[linear-gradient(to_right,var(--color-night)_28%,rgb(12_9_7/0.55)_52%,rgb(12_9_7/0.15)_80%),linear-gradient(to_bottom,rgb(12_9_7/0.6),transparent_25%,transparent_70%,var(--color-night))]" />
    </div>
  );
}
