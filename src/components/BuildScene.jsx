import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Lock } from "./Icons";

// A browser window (plus a phone) that builds a small-business website by itself, on a loop.
// The markup is always the *finished* site, so the prerendered HTML, no-JS visitors and
// reduced-motion visitors see a complete still frame. When motion is allowed, the
// Web Animations API plays a 9-second timeline over it (transform + opacity only).

const LOOP = 9; // seconds per business
const WIRE = "#ECE7E1";
const BRAND = "#E8622C";
const ESPRESSO = "#2B1D14";
const OUT = "cubic-bezier(.2,.8,.2,1)";
const BACK = "cubic-bezier(.34,1.56,.64,1)";
const INOUT = "cubic-bezier(.65,0,.35,1)";
const cq = (n) => `${n}cqw`;

// ── Illustrations (flat SVG) ────────────────────────────────

const art = { viewBox: "0 0 120 90", preserveAspectRatio: "xMidYMid slice", className: "absolute inset-0 h-full w-full" };

function BakeryArt() {
  return (
    <svg {...art}>
      <rect width="120" height="90" fill="#FFE7A6" />
      <g stroke="#F4B942" strokeWidth="2.6" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const r = (a * Math.PI) / 180;
          return <line key={a} x1={88 + Math.cos(r) * 14} y1={24 + Math.sin(r) * 14} x2={88 + Math.cos(r) * 19} y2={24 + Math.sin(r) * 19} />;
        })}
      </g>
      <circle cx="88" cy="24" r="10" fill="#F4B942" />
      <rect y="66" width="120" height="24" fill="#F6D27A" />
      <path d="M24 67c0-15 15-25 34-25s34 10 34 25z" fill="#D98E45" />
      <path d="M40 51l6 6M53 47l6 6M66 48l6 6" stroke="#B8732F" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function BarberArt() {
  return (
    <svg {...art}>
      <rect width="120" height="90" fill="#3E2C20" />
      <circle cx="38" cy="13" r="4" fill="#C9A27E" />
      <rect x="30" y="16" width="16" height="6" rx="2" fill="#C9A27E" />
      <rect x="32" y="22" width="12" height="46" fill="#F5EBDD" />
      {[24, 34, 44, 54].map((y) => (
        <polygon key={y} points={`32,${y + 6} 44,${y} 44,${y + 4} 32,${y + 10}`} fill="#C9A27E" />
      ))}
      <rect x="30" y="68" width="16" height="6" rx="2" fill="#C9A27E" />
      <path d="M73 26l18 32M91 26 73 58" stroke="#F5EBDD" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="70" cy="64" r="6" fill="none" stroke="#C9A27E" strokeWidth="3" />
      <circle cx="94" cy="64" r="6" fill="none" stroke="#C9A27E" strokeWidth="3" />
      <circle cx="82" cy="42" r="2" fill="#3E2C20" />
    </svg>
  );
}

function RentalsArt() {
  return (
    <svg {...art}>
      <rect width="120" height="90" fill="#FFD6C2" />
      <rect y="80" width="120" height="10" fill="#FFC4AA" />
      <path d="M40 49q4 16 18 33M62 41q-2 20-2 41M82 50q-6 16-20 32" stroke="#7A3B2E" strokeWidth="1.2" fill="none" />
      <ellipse cx="40" cy="34" rx="12" ry="15" fill="#FF6F5E" />
      <ellipse cx="62" cy="26" rx="12" ry="15" fill="#FFB547" />
      <ellipse cx="82" cy="36" rx="11" ry="14" fill="#FF8E72" />
      <g fill="#fff" opacity=".45">
        <ellipse cx="35" cy="28" rx="3" ry="5" />
        <ellipse cx="57" cy="20" rx="3" ry="5" />
        <ellipse cx="78" cy="30" rx="2.6" ry="4.4" />
      </g>
      <g fill="#FF6F5E">
        <circle cx="16" cy="20" r="2" />
        <circle cx="104" cy="16" r="2" />
        <circle cx="100" cy="64" r="2" />
        <circle cx="20" cy="66" r="2" />
      </g>
    </svg>
  );
}

// Card icons (24×24, single color).
const icon = (children) =>
  function CardIcon() {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        {children}
      </svg>
    );
  };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" };

const Loaf = icon(<path d="M4 16c0-4.4 3.6-8 8-8s8 3.6 8 8v2H4z" />);
const Cupcake = icon(<><path d="M7 13h10l-1.6 7H8.6z" /><path d="M6.5 13a5.5 5 0 0 1 11 0z" /></>);
const Cup = icon(<><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" /><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" {...stroke} strokeWidth={1.8} /></>);
const Scissors = icon(<g {...stroke}><circle cx="7" cy="17" r="3" /><circle cx="17" cy="17" r="3" /><path d="M9 14.5 16.5 4M15 14.5 7.5 4" /></g>);
const Comb = icon(<><rect x="4" y="6" width="16" height="4.5" rx="1.5" /><path d="M6.5 10v8M10 10v8M13.5 10v8M17 10v8" {...stroke} /></>);
const Star = icon(<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" />);
const Balloon = icon(<><ellipse cx="12" cy="9" rx="6" ry="7" /><path d="M12 16v6" {...stroke} strokeWidth={1.6} /></>);
const Gift = icon(<><rect x="4" y="10" width="16" height="10" rx="1.5" /><rect x="3" y="7" width="18" height="4" rx="1" /></>);
const Hat = icon(<path d="M12 3 19 20H5z" />);

// ── The three fictional businesses ──────────────────────────

const BUSINESSES = [
  {
    name: "Sunny Side Bakery",
    tagline: "Fresh bread every morning.",
    url: "sunnysidebakery.com",
    Art: BakeryArt,
    icons: [Loaf, Cupcake, Cup],
    c: { bg: "#FFF6DF", surface: "#FFFFFF", text: "#3A2A12", soft: "#6B5232", accent: "#F4B942", onAccent: "#3A2A12", tint: "#FFE7A6", bar: "#EADCB8", icon: "#B8732F" },
  },
  {
    name: "Fade House Barbers",
    tagline: "Clean cuts, no waiting.",
    url: "fadehousebarbers.com",
    Art: BarberArt,
    icons: [Scissors, Comb, Star],
    c: { bg: "#2B1D14", surface: "#3A2A1F", text: "#F5EBDD", soft: "#C9A27E", accent: "#C9A27E", onAccent: "#2B1D14", tint: "#4A3628", bar: "#57412F", icon: "#C9A27E" },
  },
  {
    name: "Bounce Party Rentals",
    tagline: "Bounce houses for every party.",
    url: "bouncepartyrentals.com",
    Art: RentalsArt,
    icons: [Balloon, Gift, Hat],
    c: { bg: "#FFE9D9", surface: "#FFFFFF", text: "#3B1D16", soft: "#7A3B2E", accent: "#FF6F5E", onAccent: "#3B1D16", tint: "#FFD6C2", bar: "#F6CDB8", icon: "#E2503F" },
  },
];

// Confetti pieces: angles fanned upward, distances in cqw (deterministic for SSR).
const CONFETTI = Array.from({ length: 14 }, (_, i) => {
  const a = ((-165 + (150 * i) / 13) * Math.PI) / 180;
  const d = 7 + ((i * 37) % 6);
  return { dx: +(Math.cos(a) * d).toFixed(2), dy: +(Math.sin(a) * d).toFixed(2), r: (i * 67) % 360, round: i % 3 === 0 };
});

const LABELS = [
  { text: "Mobile-ready", t: 2.2, style: { top: cq(24.5), right: cq(0.5) }, delay: "-1.2s" },
  { text: "Fast", t: 3.2, style: { top: 0, right: cq(17) }, delay: "-3s" },
  { text: "Bookings on", t: 6.7, style: { bottom: cq(3), left: cq(1.5) }, delay: "0s" },
];

// ── Timeline ────────────────────────────────────────────────

// [seconds, props, easing?] points → WAAPI keyframes covering the whole loop.
function track(points) {
  const frames = points.map(([t, props, easing]) => ({ offset: t / LOOP, easing: easing || "linear", ...props }));
  if (frames[0].offset > 0) frames.unshift({ ...frames[0], offset: 0, easing: "linear" });
  if (frames[frames.length - 1].offset < 1) frames.push({ ...frames[frames.length - 1], offset: 1, easing: "linear" });
  return frames;
}
const op = (opacity) => ({ opacity });
const hide = (transform = "none") => ({ opacity: 0, transform });
const show = (transform = "none") => ({ opacity: 1, transform });
const at = (x, y, s = 1) => `translate(${x}cqw, ${y}cqw) scale(${s})`;
const fling = (x, y, r, s) => `translate(${x}cqw, ${y}cqw) rotate(${r}deg) scale(${s})`;

const BUILDERS = {
  // 0–1s: gray wireframe block slides in, then gives way to the real thing.
  wire: ({ t, out = 2.6 }) => track([[t, hide("translateY(10px)"), OUT], [t + 0.35, show()], [out, show(), OUT], [out + 0.5, hide()]]),
  // 1–2.5s: typed characters, and the gray typed line that fades once color arrives.
  char: ({ t }) => track([[t, op(0)], [t + 0.04, op(1)]]),
  typed: () => track([[0, op(1)], [2.6, op(1), OUT], [3.2, op(0)]]),
  // 2.5–4s: color, illustrations, icons.
  fill: ({ t = 2.6 }) => track([[t, op(0), OUT], [t + 0.7, op(1)]]),
  pop: ({ t }) => track([[t, hide("scale(.6)"), BACK], [t + 0.5, show("scale(1)")]]),
  // 4–6.5s: button pops in, the mouse glides over and clicks it.
  button: () =>
    track([
      [4, hide("scale(.3)"), BACK],
      [4.5, show("scale(1)")],
      [6.05, show("scale(1)"), "ease-in"],
      [6.15, show("scale(.9)"), OUT],
      [6.45, show("scale(1)")],
    ]),
  cursor: ({ x, y }) =>
    track([
      [4.9, hide(at(x, y)), OUT],
      [5.15, show(at(x, y)), INOUT],
      [5.95, show(at(0, 0)), "ease-in"],
      [6.05, show(at(0, 0))],
      [6.15, show(at(0, 0, 0.82)), OUT],
      [6.35, show(at(0, 0))],
      [7.1, show(at(0, 0)), OUT],
      [7.6, hide(at(2, 2))],
    ]),
  ripple: () => track([[6.1, hide("scale(.3)")], [6.14, { opacity: 0.55, transform: "scale(.35)" }, OUT], [6.75, hide("scale(1.8)")]]),
  // 6.5–8s: booking toast + confetti.
  toast: ({ t = 6.5 }) => track([[t, hide("translateY(-70%)"), BACK], [t + 0.5, show("translateY(0)")]]),
  confetti: ({ dx, dy, r }) =>
    track([
      [6.45, hide(fling(0, 0, 0, 0.4))],
      [6.5, show(fling(0, 0, 0, 1)), "cubic-bezier(.1,.75,.3,1)"],
      [7.2, show(fling(dx, dy, r, 1)), "ease-in"],
      [7.75, hide(fling(dx, dy + 4, r + 120, 0.7))],
    ]),
  label: ({ t }) =>
    track([
      [t, hide("translateY(10px) scale(.9)"), BACK],
      [t + 0.5, show("translateY(0) scale(1)")],
      [8.4, show("translateY(0) scale(1)"), INOUT],
      [8.9, hide("translateY(0) scale(1)")],
    ]),
  // 8–9s: hold, then fade to blank.
  fadeout: () => track([[0, op(1)], [8.4, op(1), INOUT], [9, op(0)]]),
};

// The typing caret jumps to the end of each character as it appears (positions measured
// as a fraction of the line's width, so they hold at any size) and blinks via CSS.
function caretAnimations(el, opts) {
  const line = el.parentElement;
  const width = line.offsetWidth || 1;
  const moves = [{ offset: 0, transform: "translateX(0%)", easing: "step-end" }];
  for (const ch of line.querySelectorAll('[data-k="char"]')) {
    const x = ((ch.offsetLeft + ch.offsetWidth) / width) * 100;
    moves.push({ offset: Number(ch.dataset.t) / LOOP, transform: `translateX(${x.toFixed(2)}%)`, easing: "step-end" });
  }
  moves.push({ offset: 1, transform: moves[moves.length - 1].transform });
  const t0 = Number(el.dataset.t0);
  const t1 = Number(el.dataset.t1);
  const visible = track([[t0 - 0.12, op(0)], [t0 - 0.08, op(1)], [t1 + 0.3, op(1)], [t1 + 0.34, op(0)]]);
  return [el.animate(moves, opts), el.animate(visible, opts)];
}

function startScene(root) {
  const opts = { duration: LOOP * 1000, fill: "both" };
  const list = [];
  for (const el of root.querySelectorAll("[data-k]")) {
    const { k, master, ...data } = el.dataset;
    if (k === "caret") {
      list.push(...caretAnimations(el, opts));
      continue;
    }
    const build = BUILDERS[k];
    if (!build) continue;
    const params = Object.fromEntries(Object.entries(data).map(([key, v]) => [key, Number(v)]));
    const anim = el.animate(build(params), opts);
    if (master !== undefined) anim.id = "master";
    list.push(anim);
  }
  return list;
}

// ── Building blocks ─────────────────────────────────────────

// Gray wireframe placeholder (hidden in the finished frame).
function Wire({ t, out, className = "", style }) {
  return <span data-k="wire" data-t={t} data-out={out} className={`absolute block opacity-0 ${className}`} style={{ background: WIRE, ...style }} />;
}

function Bar({ w, h = 0.9, color }) {
  return <span className="block shrink-0 rounded-full" style={{ width: typeof w === "number" ? cq(w) : w, height: cq(h), background: color }} />;
}

// Text typed one character at a time (hidden in the finished frame; the final colored copy sits underneath).
function Typed({ text, from, to, caret = false, wrap = false, className = "", style }) {
  const step = (to - from) / Math.max(text.length - 1, 1);
  return (
    <span
      data-k="typed"
      className={`absolute left-0 top-0 opacity-0 ${wrap ? "right-0" : "whitespace-nowrap"} ${className}`}
      style={style}
    >
      {[...text].map((ch, i) => (
        <span key={i} data-k="char" data-t={(from + step * i).toFixed(3)}>
          {ch}
        </span>
      ))}
      {caret && (
        <span data-k="caret" data-t0={from} data-t1={to} className="absolute inset-0 opacity-0">
          <span className="caret-blink absolute left-0 w-[2px] rounded-full bg-current" style={{ top: "12%", bottom: "12%" }} />
        </span>
      )}
    </span>
  );
}

function CheckDot({ size }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full" style={{ width: size, height: size, background: BRAND }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: "62%", height: "62%" }}>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

function Pointer() {
  return (
    <svg viewBox="0 0 16 22" className="h-full w-full" style={{ filter: "drop-shadow(0 1px 1.5px rgb(43 29 20 / .35))" }}>
      <path d="M1.5 1.5v16.2l4.4-4.1 2.9 6.6 2.9-1.3-2.9-6.4h5.7z" fill="#fff" stroke={ESPRESSO} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

// ── Desktop page inside the browser ─────────────────────────

const headlineFont = { fontSize: cq(3.4), lineHeight: cq(4.6), letterSpacing: "-0.02em" };
const taglineFont = { fontSize: cq(1.85), lineHeight: cq(2.6) };

function Page({ biz }) {
  const { c, name, tagline, Art, icons } = biz;
  return (
    <div data-k="fadeout" data-master="" className="absolute inset-x-0 bottom-0 overflow-hidden bg-white" style={{ top: cq(6) }}>
      <div data-k="fill" data-t="2.5" className="absolute inset-0" style={{ background: c.bg }} />

      <div className="absolute inset-0" style={{ padding: `${cq(2.4)} ${cq(4)}` }}>
        {/* Nav */}
        <div className="relative" style={{ height: cq(4) }}>
          <Wire t={0.05} className="left-0 top-1/4 h-1/2 rounded-full" style={{ width: cq(16) }} />
          <Wire t={0.12} className="right-0 top-1/4 h-1/2 rounded-full" style={{ width: cq(20) }} />
          <div data-k="fill" data-t="2.6" className="absolute inset-0 flex items-center justify-between">
            <span className="flex items-center font-display font-semibold" style={{ gap: cq(0.9), fontSize: cq(1.45), color: c.text }}>
              <span className="rounded-full" style={{ width: cq(2.3), height: cq(2.3), background: c.accent }} />
              {name}
            </span>
            <span className="flex items-center" style={{ gap: cq(1.6) }}>
              <Bar w={4.5} color={c.bar} />
              <Bar w={4.5} color={c.bar} />
              <span className="rounded-full" style={{ width: cq(7), height: cq(2.4), background: c.accent }} />
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="grid" style={{ marginTop: cq(3.4), height: cq(26), gridTemplateColumns: `${cq(42)} 1fr`, gap: cq(3) }}>
          <div className="flex flex-col justify-center">
            <div className="relative" style={{ height: cq(4.6) }}>
              <Wire t={0.2} out={0.95} className="left-0 top-[18%] h-[64%]" style={{ width: cq(32), borderRadius: cq(0.6) }} />
              <Typed text={name} from={1.05} to={1.85} caret className="font-display font-semibold" style={{ ...headlineFont, color: "#4B423C" }} />
              <span data-k="fill" data-t="2.6" className="absolute left-0 top-0 whitespace-nowrap font-display font-semibold" style={{ ...headlineFont, color: c.text }}>
                {name}
              </span>
            </div>

            <div className="relative" style={{ marginTop: cq(1), height: cq(2.6) }}>
              <Wire t={0.28} out={1.9} className="left-0 top-1/4 h-1/2 rounded-full" style={{ width: cq(36) }} />
              <Typed text={tagline} from={1.95} to={2.45} caret style={{ ...taglineFont, color: "#6E655E" }} />
              <span data-k="fill" data-t="2.6" className="absolute left-0 top-0 whitespace-nowrap" style={{ ...taglineFont, color: c.soft }}>
                {tagline}
              </span>
            </div>

            <div style={{ marginTop: cq(3.2) }}>
              <div className="relative inline-block" style={{ height: cq(5) }}>
                <Wire t={0.8} out={3.9} className="left-0 top-0 h-full rounded-full" style={{ width: cq(14) }} />
                <span
                  data-k="button"
                  className="relative inline-flex h-full items-center rounded-full font-bold"
                  style={{ padding: `0 ${cq(3)}`, fontSize: cq(1.7), background: c.accent, color: c.onAccent }}
                >
                  Book now
                </span>
                <span
                  data-k="ripple"
                  className="absolute left-1/2 top-1/2 rounded-full opacity-0"
                  style={{ width: cq(9), height: cq(9), margin: `-${cq(4.5)} 0 0 -${cq(4.5)}`, border: `${cq(0.35)} solid ${c.accent}` }}
                />
                {CONFETTI.map((p, i) => (
                  <span
                    key={i}
                    data-k="confetti"
                    data-dx={p.dx}
                    data-dy={p.dy}
                    data-r={p.r}
                    className="absolute left-1/2 top-1/2 opacity-0"
                    style={{
                      width: p.round ? cq(0.9) : cq(1.2),
                      height: p.round ? cq(0.9) : cq(0.6),
                      margin: `-${cq(0.3)} 0 0 -${cq(0.5)}`,
                      borderRadius: p.round ? "50%" : "1px",
                      background: BRAND,
                    }}
                  />
                ))}
                <span
                  data-k="cursor"
                  data-x="16"
                  data-y="11"
                  className="absolute opacity-0"
                  style={{ left: "58%", top: "52%", width: cq(2.6), height: cq(3.6), transformOrigin: "0 0" }}
                >
                  <Pointer />
                </span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden" style={{ borderRadius: cq(1.6) }}>
            <Wire t={0.38} className="inset-0" />
            <div data-k="pop" data-t="2.75" className="absolute inset-0">
              <Art />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3" style={{ marginTop: cq(3.4), height: cq(18), gap: cq(2.2) }}>
          {icons.map((Icon, i) => (
            <div key={i} className="relative overflow-hidden" style={{ borderRadius: cq(1.4) }}>
              <Wire t={0.5 + i * 0.12} className="inset-0" />
              <div
                data-k="fill"
                data-t={2.8 + i * 0.1}
                className="absolute inset-0 flex flex-col"
                style={{ background: c.surface, padding: cq(1.6), gap: cq(1.1) }}
              >
                <span className="grid shrink-0 place-items-center rounded-full" style={{ width: cq(4.4), height: cq(4.4), background: c.tint }}>
                  <span data-k="pop" data-t={3.05 + i * 0.15} className="block" style={{ width: cq(2.6), height: cq(2.6), color: c.icon }}>
                    <Icon />
                  </span>
                </span>
                <Bar w="72%" color={c.bar} />
                <Bar w="48%" color={c.bar} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        data-k="toast"
        className="absolute flex items-center whitespace-nowrap bg-white font-semibold"
        style={{
          top: cq(6.5),
          right: cq(3.5),
          gap: "0.6em",
          padding: "0.7em 1.1em 0.7em 0.7em",
          borderRadius: cq(1.2),
          fontSize: "clamp(7px, 1.5cqw, 12px)",
          color: ESPRESSO,
          boxShadow: "0 12px 26px -12px rgb(43 29 20 / .4), 0 1px 2px rgb(43 29 20 / .08)",
        }}
      >
        <CheckDot size="1.9em" />
        New booking request!
      </div>
    </div>
  );
}

// ── Mobile version inside the phone ─────────────────────────

function PhonePage({ biz }) {
  const { c, name, Art, icons } = biz;
  return (
    <div data-k="fadeout" className="absolute inset-x-0 bottom-0 overflow-hidden bg-white" style={{ top: cq(2.2) }}>
      <div data-k="fill" data-t="2.5" className="absolute inset-0" style={{ background: c.bg }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: cq(1.3), gap: cq(1.2) }}>
        <div className="relative shrink-0" style={{ height: cq(2.2) }}>
          <Wire t={0.05} className="left-0 top-[20%] h-[60%] rounded-full" style={{ width: cq(9) }} />
          <div data-k="fill" data-t="2.6" className="absolute inset-0 flex items-center justify-between">
            <span className="rounded-full" style={{ width: cq(1.7), height: cq(1.7), background: c.accent }} />
            <span className="rounded-full" style={{ width: cq(4.2), height: cq(1.5), background: c.accent }} />
          </div>
        </div>

        <div className="relative shrink-0" style={{ height: cq(5.2) }}>
          <Wire t={0.2} out={0.95} className="left-0 top-0 w-[85%]" style={{ height: cq(1.8), borderRadius: cq(0.4) }} />
          <Wire t={0.26} out={0.95} className="left-0 w-[55%]" style={{ top: cq(2.6), height: cq(1.8), borderRadius: cq(0.4) }} />
          <Typed text={name} from={1.05} to={1.85} wrap className="font-display font-semibold" style={{ fontSize: cq(2.1), lineHeight: 1.12, color: "#4B423C" }} />
          <span data-k="fill" data-t="2.6" className="absolute inset-0 font-display font-semibold" style={{ fontSize: cq(2.1), lineHeight: 1.12, color: c.text }}>
            {name}
          </span>
        </div>

        <div className="relative shrink-0 overflow-hidden" style={{ height: cq(12), borderRadius: cq(1.2) }}>
          <Wire t={0.38} className="inset-0" />
          <div data-k="pop" data-t="2.75" className="absolute inset-0">
            <Art />
          </div>
        </div>

        <div className="relative shrink-0" style={{ height: cq(3.4) }}>
          <Wire t={0.8} out={3.9} className="left-0 top-0 h-full rounded-full" style={{ width: cq(10) }} />
          <span
            data-k="button"
            className="relative inline-flex h-full items-center rounded-full font-bold"
            style={{ padding: `0 ${cq(2)}`, fontSize: cq(1.3), background: c.accent, color: c.onAccent }}
          >
            Book now
          </span>
        </div>

        {icons.slice(0, 2).map((Icon, i) => (
          <div key={i} className="relative shrink-0 overflow-hidden" style={{ height: cq(7), borderRadius: cq(1) }}>
            <Wire t={0.5 + i * 0.12} className="inset-0" />
            <div data-k="fill" data-t={2.8 + i * 0.1} className="absolute inset-0 flex items-center" style={{ background: c.surface, padding: cq(1.2), gap: cq(1.1) }}>
              <span className="grid shrink-0 place-items-center rounded-full" style={{ width: cq(3.2), height: cq(3.2), background: c.tint }}>
                <span data-k="pop" data-t={3.05 + i * 0.15} className="block" style={{ width: cq(1.9), height: cq(1.9), color: c.icon }}>
                  <Icon />
                </span>
              </span>
              <span className="flex flex-1 flex-col" style={{ gap: cq(0.8) }}>
                <Bar w="80%" h={0.7} color={c.bar} />
                <Bar w="50%" h={0.7} color={c.bar} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        data-k="toast"
        data-t="6.6"
        className="absolute flex items-center whitespace-nowrap rounded-full bg-white font-semibold"
        style={{
          top: cq(0.5),
          left: cq(1.2),
          right: cq(1.2),
          gap: "0.5em",
          padding: "0.5em 0.7em",
          fontSize: "clamp(5px, 1.15cqw, 10px)",
          color: ESPRESSO,
          boxShadow: "0 8px 18px -8px rgb(43 29 20 / .4)",
        }}
      >
        <CheckDot size="1.7em" />
        New booking!
      </div>
    </div>
  );
}

// ── Scene ───────────────────────────────────────────────────

export default function BuildScene({ className = "" }) {
  const rootRef = useRef(null);
  const [index, setIndex] = useState(0);
  const visible = useRef(true);
  const cycled = useRef(false);
  const holding = useRef(false);
  const anims = useRef([]);
  const biz = BUSINESSES[index];

  // Start the timeline for the current business (skipped with reduced motion: the still frame stays).
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof root.animate !== "function") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.classList.add("is-live");
    const list = startScene(root);
    // The page loads showing the finished bakery, so its first run starts at the "hold" moment
    // and stays there for a couple of seconds before fading into the next build.
    const firstRun = index === 0 && !cycled.current;
    let holdTimer;
    for (const a of list) {
      a.currentTime = firstRun ? 8000 : 0;
      if (firstRun || !visible.current) a.pause();
    }
    if (firstRun) {
      holding.current = true;
      holdTimer = setTimeout(() => {
        holding.current = false;
        if (visible.current) list.forEach((a) => a.play());
      }, 2000);
    }
    const master = list.find((a) => a.id === "master");
    if (master) {
      master.onfinish = () => {
        cycled.current = true;
        setIndex((i) => (i + 1) % BUSINESSES.length);
      };
    }
    anims.current = list;
    return () => {
      clearTimeout(holdTimer);
      holding.current = false;
      list.forEach((a) => a.cancel());
    };
  }, [index]);

  // Pause everything while the hero is off-screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      root.classList.toggle("is-paused", !entry.isIntersecting);
      for (const a of anims.current) {
        if (entry.isIntersecting && a.playState === "paused" && !holding.current) a.play();
        else if (!entry.isIntersecting && a.playState === "running") a.pause();
      }
    });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const urlStep = 0.8 / Math.max(biz.url.length - 1, 1);

  return (
    <div ref={rootRef} aria-hidden="true" className={`@container relative aspect-[5/4] w-full select-none ${className}`}>
      {/* Browser window */}
      <div className="absolute left-0 overflow-hidden rounded-[16px] bg-white shadow-lift" style={{ top: cq(3), width: cq(86), height: cq(66) }}>
        <div className="flex items-center bg-sand" style={{ height: cq(6), padding: `0 ${cq(2.2)}`, gap: cq(2) }}>
          <span className="flex shrink-0" style={{ gap: cq(0.8) }}>
            {["bg-brand", "bg-brand/45", "bg-ink/20"].map((bg) => (
              <span key={bg} className={`rounded-full ${bg}`} style={{ width: cq(1.3), height: cq(1.3) }} />
            ))}
          </span>
          <span
            className="mx-auto flex items-center justify-center rounded-full bg-white text-muted"
            style={{ width: cq(42), height: cq(3.4), gap: "0.45em", fontSize: "clamp(7px, 1.5cqw, 12px)" }}
          >
            <Lock style={{ width: "1em", height: "1em", flexShrink: 0 }} />
            <span key={index} data-k="fadeout" className="whitespace-nowrap">
              {[...biz.url].map((ch, i) => (
                <span key={i} data-k="char" data-t={(0.15 + urlStep * i).toFixed(3)}>
                  {ch}
                </span>
              ))}
            </span>
          </span>
          <span className="shrink-0" style={{ width: cq(5.5) }} />
        </div>
        <Page key={index} biz={biz} />
      </div>

      {/* Phone, building the mobile version in sync */}
      <div className="absolute bottom-0 right-0 z-10 bg-ink shadow-lift" style={{ width: cq(23), height: cq(48.5), padding: cq(0.9), borderRadius: cq(3.6) }}>
        <div className="relative h-full w-full overflow-hidden bg-white" style={{ borderRadius: cq(2.8) }}>
          <span className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink" style={{ top: cq(0.5), width: cq(6), height: cq(1.3) }} />
          <PhonePage key={index} biz={biz} />
        </div>
      </div>

      {/* Floating labels */}
      {LABELS.map((l) => (
        <div key={l.text} data-k="label" data-t={l.t} className="absolute z-20" style={l.style}>
          <div className="drift" style={{ animationDelay: l.delay }}>
            <span
              className="flex items-center whitespace-nowrap rounded-full bg-white font-semibold text-ink shadow-soft"
              style={{ gap: "0.45em", padding: "0.55em 0.9em", fontSize: "clamp(9px, 1.6cqw, 13px)", lineHeight: 1 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.1em", height: "1.1em" }}>
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              {l.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
