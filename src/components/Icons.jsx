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

export const Calendar = (p) => (
  <svg {...line} {...p}><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2.5 2.5 4.5-4.5" /></svg>
);

export const Shield = (p) => (
  <svg {...line} {...p}><path d="M12 3l7.5 2.8v5.7c0 4.6-3.1 7.9-7.5 9.5-4.4-1.6-7.5-4.9-7.5-9.5V5.8z" /><path d="m8.8 12 2.3 2.3 4.2-4.3" /></svg>
);

export const Spark = (p) => (
  <svg {...line} {...p}><path d="M12 3.5l1.9 5.6a2 2 0 0 0 1.3 1.3L20.5 12l-5.3 1.6a2 2 0 0 0-1.3 1.3L12 20.5l-1.9-5.6a2 2 0 0 0-1.3-1.3L3.5 12l5.3-1.6a2 2 0 0 0 1.3-1.3z" /></svg>
);

export const Grid = (p) => (
  <svg {...line} {...p}><rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.8" /><rect x="13" y="3.5" width="7.5" height="7.5" rx="1.8" /><rect x="3.5" y="13" width="7.5" height="7.5" rx="1.8" /><rect x="13" y="13" width="7.5" height="7.5" rx="1.8" /></svg>
);

export const MenuBoard = (p) => (
  <svg {...line} {...p}><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M9 8h6M9 12h6M9 16h3.5" /></svg>
);

export const Flyer = (p) => (
  <svg {...line} {...p}><path d="M6.5 3h8l4 4v12a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M14 3v4.5h4.5M8 13h8M8 16.5h5" /></svg>
);

export const IdCard = (p) => (
  <svg {...line} {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><circle cx="8" cy="11" r="2" /><path d="M5 15.5c.6-1.3 1.7-2 3-2s2.4.7 3 2M14 10h4.5M14 13.5h4.5" /></svg>
);

// Get started flow
export const Camera = (p) => (
  <svg {...line} {...p}><path d="M4 8h3l1.5-2.5h7L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
);
export const Question = (p) => (
  <svg {...line} {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" /></svg>
);
export const Cup = (p) => (
  <svg {...line} {...p}><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10.5h1.5a2.5 2.5 0 0 1 0 5H17M8 3.5v2M12 3.5v2" /></svg>
);
export const Store = (p) => (
  <svg {...line} {...p}><path d="M4 10v10h16V10M3.5 4.5h17L21 10H3z" /><path d="M10 20v-5h4v5" /></svg>
);
export const Scissors = (p) => (
  <svg {...line} {...p}><circle cx="6" cy="7" r="2.5" /><circle cx="6" cy="17" r="2.5" /><path d="M8 8.5 20 18M8 15.5 20 6" /></svg>
);
export const Dumbbell = (p) => (
  <svg {...line} {...p}><path d="M6.5 7v10M4 9v6M17.5 7v10M20 9v6M6.5 12h11" /></svg>
);
export const Ticket = (p) => (
  <svg {...line} {...p}><path d="M3.5 7.5h17v3a1.5 1.5 0 0 0 0 3v3h-17v-3a1.5 1.5 0 0 0 0-3z" /><path d="M14 7.5v9" strokeDasharray="1.5 2" /></svg>
);
export const Briefcase = (p) => (
  <svg {...line} {...p}><rect x="3.5" y="7" width="17" height="12.5" rx="2" /><path d="M9 7V5h6v2M3.5 12.5h17" /></svg>
);
export const Dots = (p) => (
  <svg {...line} {...p}><path d="M6 12h.01M12 12h.01M18 12h.01" strokeWidth="3" /></svg>
);
export const Users = (p) => (
  <svg {...line} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14a6.5 6.5 0 0 1 3.5 6" /></svg>
);
export const Award = (p) => (
  <svg {...line} {...p}><circle cx="12" cy="9" r="5.5" /><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" /></svg>
);
export const Repeat = (p) => (
  <svg {...line} {...p}><path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19m0 0-3-3m3 3-3 3M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5m0 0 3 3m-3-3 3-3" /></svg>
);
export const Rocket = (p) => (
  <svg {...line} {...p}><path d="M13.5 17.5 9.5 13.5C11 8 14.5 4.5 20 4c-.5 5.5-4 9-6.5 13.5z" /><path d="M9.5 13.5 6 13l2.5-4H12M13.5 17.5l.5 3.5 4-2.5V15M6.5 17.5 4 20" /></svg>
);
export const Refresh = (p) => (
  <svg {...line} {...p}><path d="M20 12a8 8 0 0 1-14.3 4.9M4 12a8 8 0 0 1 14.3-4.9M18.5 3v4.5H14M5.5 21v-4.5H10" /></svg>
);
export const Phone = (p) => (
  <svg {...line} {...p}><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>
);
export const Sprout = (p) => (
  <svg {...line} {...p}><path d="M12 21v-9M12 12C12 8 9 5.5 4.5 5.5 4.5 10 7.5 12 12 12zM12 14c0-3.5 2.5-6 7-6 0 4-3 6-7 6z" /></svg>
);
export const Bolt = (p) => (
  <svg {...line} {...p}><path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z" /></svg>
);
export const Compass = (p) => (
  <svg {...line} {...p}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>
);
export const ArrowLeft = (p) => (
  <svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
