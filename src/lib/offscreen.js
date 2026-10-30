import { useEffect } from "react";

// Adds .is-offscreen to an element while it's off screen, which pauses its looping CSS
// animations (see index.css). Saves battery and keeps scrolling smooth elsewhere.
export function usePauseOffscreen(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-offscreen", !e.isIntersecting), { rootMargin: "100px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}
