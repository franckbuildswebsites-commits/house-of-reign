import { scrollToSection } from "./scroll";
import { selectPlan, selectService } from "./utils";

// One page, clean paths: /contact, /pricing… each map to a section. Links use plain hrefs
// (so they work without JavaScript and open in new tabs); this file turns same-page clicks into
// history.pushState + a smooth scroll, handles back/forward and deep links, rewrites old
// /#section links, and keeps the URL in step with the section on screen.
export const PATHS = {
  "/": "top",
  "/services": "services",
  "/pricing": "pricing",
  "/work": "featured",
  "/how-it-works": "process",
  "/about": "about",
  "/faq": "faq",
  "/contact": "contact",
};

// Old hash links (#monthly, #process…) → [path, section to scroll to].
const HASHES = {
  top: ["/", "top"],
  services: ["/services", "services"],
  pricing: ["/pricing", "pricing"],
  monthly: ["/pricing", "monthly"],
  featured: ["/work", "featured"],
  process: ["/how-it-works", "process"],
  about: ["/about", "about"],
  faq: ["/faq", "faq"],
  contact: ["/contact", "contact"],
  flow: ["/contact", "contact"],
};
const clean = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

// While a scroll we started is running, the scroll spy stays quiet so it can't rewrite the URL
// with every section the page glides past.
let programmatic = 0;
let settleTimer;
function go(section, smooth) {
  programmatic++;
  clearTimeout(settleTimer);
  scrollToSection(section, smooth, () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => (programmatic = 0), 150);
  });
  // Fallback in case the scroll is interrupted (wheel, touch) and never reports completion.
  settleTimer = setTimeout(() => (programmatic = 0), 1600);
}

// ?plan=growth / ?service=… preselect the Get started flow.
function applyParams(search) {
  const q = new URLSearchParams(search);
  if (q.get("plan")) selectPlan(q.get("plan"));
  if (q.get("service")) selectService(q.get("service"));
}

function onClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest?.("a[href]");
  if (!a || a.target || a.hasAttribute("download")) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  const path = clean(url.pathname);
  if (!(path in PATHS)) return;
  e.preventDefault();
  const section = a.dataset.section || PATHS[path];
  const next = path + url.search;
  if (next !== location.pathname + location.search) history.pushState({ section }, "", next);
  else history.replaceState({ section }, "", next);
  applyParams(url.search);
  requestAnimationFrame(() => go(section, true));
}

function onPop(e) {
  const section = e.state?.section || PATHS[clean(location.pathname)];
  if (section) go(section, true);
}

// Scroll spy: the section crossing the middle of the screen sets the path (replaceState,
// so it never adds history entries). IntersectionObserver only fires on crossings, so it costs
// nothing while scrolling.
function spy() {
  const byId = { monthly: "/pricing" };
  for (const [p, id] of Object.entries(PATHS)) byId[id] = p;
  const io = new IntersectionObserver(
    (entries) => {
      if (programmatic) return;
      const hit = entries.find((en) => en.isIntersecting);
      if (!hit) return;
      const path = byId[hit.target.id];
      if (path && path !== location.pathname) history.replaceState({ section: hit.target.id }, "", path);
    },
    { rootMargin: "-50% 0px -50% 0px" },
  );
  Object.keys(byId).forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
  return () => io.disconnect();
}

export function startRouter() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  // Old shared links: /#contact → /contact.
  const hash = location.hash.slice(1);
  if (HASHES[hash]) {
    const [path, section] = HASHES[hash];
    history.replaceState({ section }, "", path + location.search);
  }

  const path = clean(location.pathname);
  const section = history.state?.section || PATHS[path];
  if (path !== location.pathname) history.replaceState(history.state, "", path + location.search);
  applyParams(location.search);
  if (section && section !== "top") requestAnimationFrame(() => go(section, false));

  document.addEventListener("click", onClick);
  window.addEventListener("popstate", onPop);
  const stopSpy = spy();
  return () => {
    document.removeEventListener("click", onClick);
    window.removeEventListener("popstate", onPop);
    stopSpy();
  };
}
