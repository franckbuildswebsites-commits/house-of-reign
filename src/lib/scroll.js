import Lenis from "lenis";

// Smooth scrolling (Lenis), like the reference site. Skipped with reduced motion and on touch
// screens (native scrolling feels better there). Anchor links (#work, #contact…) glide too.
let lenis = null;

export function startSmoothScroll() {
  if (lenis || matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(hover: none)").matches) return;
  lenis = new Lenis({ duration: 1.1, anchors: { offset: -88 }, autoRaf: true });
}

// The full-screen menu freezes the page behind it.
export const pauseScroll = () => {
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
};
export const resumeScroll = () => {
  lenis?.start();
  document.documentElement.style.overflow = "";
};
