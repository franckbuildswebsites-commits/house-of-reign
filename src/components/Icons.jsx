const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};
const line = { ...base, strokeWidth: 1.75 };

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export const Check = (p) => (
  <svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);

export const Plus = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);

export const ChevronDown = (p) => (
  <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
);

export const Lock = (p) => (
  <svg {...base} {...p}><rect x="5" y="11" width="14" height="9.5" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
);

// Line icons
export const Layout = (p) => (
  <svg {...line} {...p}><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M9.5 9v11" /></svg>
);

export const Key = (p) => (
  <svg {...line} {...p}><circle cx="7.5" cy="15.5" r="3.5" /><path d="m10 13 9.5-9.5M15.5 7.5 18 10M18 5l2 2" /></svg>
);

export const Clock = (p) => (
  <svg {...line} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></svg>
);

export const MapPin = (p) => (
  <svg {...line} {...p}><path d="M12 21s-7-6-7-11.5a7 7 0 0 1 14 0C19 15 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);

export const Chat = (p) => (
  <svg {...line} {...p}><path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.6a8.5 8.5 0 1 1 15.6-4.4z" /></svg>
);

export const Wave = (p) => (
  <svg {...line} {...p}>
    <path d="M7.5 12V6.75a1.25 1.25 0 0 1 2.5 0v4.75M10 11.5V5.75a1.25 1.25 0 0 1 2.5 0v5.75M12.5 11.5V6.75a1.25 1.25 0 0 1 2.5 0v4.75" />
    <path d="M15 11.5V8.75a1.25 1.25 0 0 1 2.5 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.8-2.4l-2.3-3.4a1.3 1.3 0 0 1 2-1.7l2.1 2V12" />
    <path d="M4.6 8.4c.1-1.3.6-2.5 1.5-3.4M2.6 7.6c.2-1.9 1-3.6 2.3-4.8" />
  </svg>
);
