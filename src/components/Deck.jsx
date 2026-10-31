import { useState } from "react";
import { m } from "motion/react";
import Photo from "./Photo";
import { SPRING, SPRING_SOFT } from "./Press";

// Our real clients as a hand of cards. Screenshots are live homepages captured at the card's shape
// (/public/portfolio/hero/); logos are the same files the brand uses (/public/portfolio/tiles/).
//   side   -1 left, 0 middle (in front), 1 right
const hero = "/portfolio/hero";
const tiles = "/portfolio/tiles";
const cards = [
  {
    name: "Token Forge", side: -1, href: "https://www.tokenforgecgc.com", shot: `${hero}/token-forge.webp`,
    logo: `${tiles}/token-forge.webp`, w: 180, h: 180, fit: "80%", colors: ["#5b9bff", "#1a66ee", "#0b1b4d", "#e0359f"], bob: [8.5, -3],
  },
  {
    name: "Go Digital Hero", side: 0, href: "https://www.godigitalhero.com", shot: `${hero}/go-digital-hero.webp`,
    logo: `${tiles}/go-digital-hero.svg`, w: 120, h: 120, fit: "90%", colors: ["#c4dde6", "#7fa5b3", "#55808f", "#fbbd40"], bob: [7.5, -1],
  },
  {
    name: "Champions4Character", side: 1, href: "https://celebrated-dasik-06c87b.netlify.app", shot: `${hero}/champions4character.webp`,
    logo: `${tiles}/champions4character.webp`, w: 230, h: 130, fit: "76%", colors: ["#a78bfa", "#6d28d9", "#2e1065", "#c026d3"], bob: [9, -5],
  },
];

function Card({ card, spread }) {
  const { name, side, href, shot, logo, w, h, fit, colors, bob } = card;
  return (
    <div
      className="deck-slot"
      style={{
        "--side": side, "--bob": `${bob[0]}s`, "--bob-delay": `${bob[1]}s`,
        "--c1": colors[0], "--c2": colors[1], "--c3": colors[2], "--c4": colors[3],
      }}
    >
      <div className="deck-bob h-full">
        <m.div
          initial={false}
          animate={{ x: spread ? side * 22 : 0, rotate: spread ? side * 3 : 0 }}
          transition={SPRING_SOFT}
          className="h-full origin-[50%_120%]"
        >
          <m.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} website (opens in a new tab)`}
            whileHover={{ y: -12, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={SPRING}
            className="deck-card"
          >
            <Photo src={shot} alt="" width="660" height="840" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
            <span className="liquid deck-badge">
              <span aria-hidden="true" className="liquid-gloss" />
              <Photo src={logo} alt="" width={w} height={h} decoding="async" style={{ width: fit }} className="relative h-auto" />
            </span>
          </m.a>
        </m.div>
      </div>
    </div>
  );
}

// The fan. It opens from a stack on first paint and floats with CSS alone (no waiting for
// JavaScript); hovering anywhere on it spreads the hand a little with a spring, on desktop.
// Still with reduced motion; the float pauses off screen.
export default function Deck() {
  const [spread, setSpread] = useState(false);
  return (
    <div
      className="deck"
      onPointerEnter={(e) => e.pointerType === "mouse" && setSpread(true)}
      onPointerLeave={() => setSpread(false)}
    >
      {cards.map((c) => (
        <Card key={c.name} card={c} spread={spread} />
      ))}
    </div>
  );
}
