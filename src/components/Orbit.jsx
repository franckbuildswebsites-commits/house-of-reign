import { useEffect } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import Photo from "./Photo";
import { Crown } from "./Logo";

// Our clients as app-icon tiles, each its brand's logo on a soft gradient of its own colors.
const tile = "/portfolio/tiles";
const tiles = [
  { id: "wicked-bread", bg: ["#c81a22", "#6e0a0f"], src: `${tile}/wicked-bread.webp`, w: 240, h: 196, fit: "76%" },
  { id: "go-digital-hero", bg: ["#b5d0da", "#7fa5b3"], src: `${tile}/go-digital-hero.svg`, w: 120, h: 120, fit: "84%" },
  { id: "token-forge", bg: ["#1a66ee", "#0b1b4d"], src: `${tile}/token-forge.webp`, w: 180, h: 180, fit: "74%" },
  { id: "reign", bg: ["#5b50e6", "#3730a3"] },
  { id: "ppf-comics", bg: ["#f6c936", "#ef7a3c"], src: `${tile}/ppf-comics.webp`, w: 170, h: 170, fit: "78%" },
  { id: "champions4character", bg: ["#7c3aed", "#2e1065"], src: `${tile}/champions4character.webp`, w: 230, h: 130, fit: "70%" },
];

const SWAY = { stiffness: 50, damping: 13, mass: 0.9 };

// The ring. Each tile's orbit is a CSS animation (index.css), so it runs on the compositor with no
// JavaScript per frame, and tiles always face you. The mouse only adds a soft spring sway on top, on
// desktop. Pauses off screen; still with reduced motion.
export default function Orbit({ className = "", children }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, SWAY);
  const rotateX = useSpring(pointerY, SWAY);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e) => {
      if (window.scrollY > window.innerHeight) return;
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 16);
      pointerY.set((e.clientY / window.innerHeight - 0.5) * -10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY]);

  return (
    <div className={`orbit ${className}`}>
      <m.div aria-hidden="true" style={{ rotateX, rotateY }} className="orbit-layer pointer-events-none">
        {tiles.map((t, i) => (
          <div key={t.id} className="orbit-slot" style={{ "--t": `${i * 60}deg` }}>
            <div className="orbit-tile" style={{ background: `linear-gradient(145deg, ${t.bg[0]}, ${t.bg[1]})` }}>
              {t.src ? (
                <Photo src={t.src} alt="" width={t.w} height={t.h} decoding="async" style={{ width: t.fit }} className="h-auto" />
              ) : (
                <Crown className="h-auto w-[56%] text-white" />
              )}
            </div>
          </div>
        ))}
      </m.div>
      {children}
    </div>
  );
}
