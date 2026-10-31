import { useEffect } from "react";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import Photo from "./Photo";
import { Crown } from "./Logo";
import { SPRING } from "./Press";

// Our real clients as small liquid glass tiles, floating loose around the center line. Each glass is
// four shades of the brand's own colors swirling slowly under a gloss layer (index.css).
//   a = [x, y, size] on desktop, b = the same on phones, in cluster units from the center
//   depth  how far the tile drifts with the mouse; closer tiles move more
//   bob    its own slow float: seconds, delay, rise in px, rock in degrees
const tile = "/portfolio/tiles";
const tiles = [
  {
    name: "Go Digital Hero",
    href: "https://www.godigitalhero.com",
    src: `${tile}/go-digital-hero.svg`, w: 120, h: 120, fit: "86%",
    colors: ["#c4dde6", "#7fa5b3", "#55808f", "#fbbd40"], flow: "26s",
    a: [-23, -6, 10], b: [-12, -25.5, 24], turn: -7, depth: 16, bob: [8.5, -1, -11, 2.5],
  },
  {
    name: "Reign Studio",
    href: "#work",
    colors: ["#a5b4fc", "#4338ca", "#312e81", "#818cf8"], flow: "22s",
    a: [-17.5, 2, 6.5], b: [-12, 22.5, 17], turn: 9, depth: 26, bob: [7, -3.5, -8, -3],
  },
  {
    name: "Token Forge",
    href: "https://www.tokenforgecgc.com",
    src: `${tile}/token-forge.webp`, w: 180, h: 180, fit: "76%",
    colors: ["#5b9bff", "#1a66ee", "#0b1b4d", "#e0359f"], flow: "30s",
    a: [18, -8, 8.5], b: [9.5, -27, 21], turn: 6, depth: 20, bob: [9.5, -5, -10, 3],
  },
  {
    name: "Champions4Character",
    href: "https://celebrated-dasik-06c87b.netlify.app",
    src: `${tile}/champions4character.webp`, w: 230, h: 130, fit: "72%",
    colors: ["#a78bfa", "#6d28d9", "#2e1065", "#c026d3"], flow: "24s",
    a: [21.5, 0.5, 9], b: [6.5, 24.5, 23], turn: -5, depth: 12, bob: [8, -2, -9, -2.5],
  },
];

const SWAY = { stiffness: 60, damping: 12, mass: 0.8 };

function Tile({ t, pointerX, pointerY }) {
  const x = useSpring(useTransform(pointerX, (v) => v * t.depth), SWAY);
  const y = useSpring(useTransform(pointerY, (v) => v * t.depth * 0.7), SWAY);
  const rotateY = useSpring(useTransform(pointerX, (v) => v * 12), SWAY);
  const rotateX = useSpring(useTransform(pointerY, (v) => v * -10), SWAY);
  const external = t.href.startsWith("http");
  const [ax, ay, as] = t.a;
  const [bx, by, bs] = t.b;
  const [dur, delay, rise, rock] = t.bob;
  const [c1, c2, c3, c4] = t.colors;

  return (
    <div
      className="cluster-slot"
      style={{
        "--ax": ax, "--ay": ay, "--as": as, "--bx": bx, "--by": by, "--bs": bs,
        "--c1": c1, "--c2": c2, "--c3": c3, "--c4": c4, "--flow": t.flow,
        "--bob": `${dur}s`, "--bob-delay": `${delay}s`, "--rise": `${rise}px`, "--rock": `${rock}deg`,
      }}
    >
      <div className="cluster-bob">
        <m.div style={{ x, y, rotateX, rotateY, transformPerspective: 700 }}>
          <m.a
            href={t.href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            aria-label={external ? `${t.name} website (opens in a new tab)` : `${t.name}: see our work`}
            initial="rest"
            animate="rest"
            whileHover="lift"
            whileFocus="lift"
            whileTap={{ scale: 0.96 }}
            variants={{ rest: { y: 0, scale: 1, rotate: t.turn }, lift: { y: -8, scale: 1.08, rotate: 0 } }}
            transition={SPRING}
            className="relative block"
          >
            <span className="liquid">
              <span aria-hidden="true" className="liquid-flow" />
              <span aria-hidden="true" className="liquid-gloss" />
              {t.src ? (
                <Photo src={t.src} alt="" width={t.w} height={t.h} decoding="async" style={{ width: t.fit }} className="relative h-auto" />
              ) : (
                <Crown className="relative h-auto w-[58%] text-white" />
              )}
            </span>
            <span className="absolute inset-x-[-4rem] top-full mt-2 flex justify-center">
              <m.span
                aria-hidden="true"
                variants={{ rest: { scale: 0, y: -6 }, lift: { scale: 1, y: 0 } }}
                transition={SPRING}
                className="pill-solid whitespace-nowrap rounded-full px-2.5 py-1 text-xs"
              >
                {t.name}
              </m.span>
            </span>
          </m.a>
        </m.div>
      </div>
    </div>
  );
}

// The cluster. Each tile bobs on its own CSS loop (compositor, no JavaScript per frame) and the mouse
// adds a soft spring drift and tilt on desktop. Pauses off screen; still with reduced motion.
export default function Cluster({ className = "", children }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e) => {
      if (window.scrollY > window.innerHeight) return;
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY]);

  return (
    <div className={`cluster ${className}`}>
      {children}
      {tiles.map((t) => (
        <Tile key={t.name} t={t} pointerX={pointerX} pointerY={pointerY} />
      ))}
    </div>
  );
}
