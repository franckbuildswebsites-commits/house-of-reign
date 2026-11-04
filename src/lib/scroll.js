import Lenis from "lenis";

// Smooth scrolling (Lenis), like the reference site. Skipped with reduced motion and on touch
// screens (native scrolling feels better there). Anchor links (#pricing, #contact…) glide too.
let lenis = null;

export function startSmoothScroll() {
  if (lenis || matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(hover: none)").matches) return;
  // Offsets come from scroll-margin-top in index.css.
  lenis = new Lenis({ duration: 1.1, anchors: true, autoRaf: true });
}

// Scroll to a section by id ("top" = the very top) with the same offset. Used by the router
// (lib/router.js): smooth for clicks and back/forward, instant for deep links on load.
export function scrollToSection(id, smooth = true, onDone) {
  const el = id === "top" ? 0 : document.getElementById(id);
  if (el == null) return onDone?.();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenis) return lenis.scrollTo(el, { immediate: !smooth || reduce, force: true, onComplete: onDone });
  if (el === 0) window.scrollTo({ top: 0, behavior: smooth && !reduce ? "smooth" : "auto" });
  else el.scrollIntoView({ behavior: smooth && !reduce ? "smooth" : "auto" });
  if (!smooth || reduce) onDone?.();
  else window.addEventListener("scrollend", () => onDone?.(), { once: true });
}

// Jump to "#section" with the same offset, smoothly where Lenis runs (used by the menu,
// which has to close and unfreeze the page first).
export function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
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
