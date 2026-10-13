import { STUDIO_NAME } from "../config";

export function Crown({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 17.5V7l5.25 4.5L12 4l3.75 7.5L21 7v10.5z" />
      <rect x="3" y="19" width="18" height="2.25" rx=".5" />
    </svg>
  );
}

export default function Logo({ className = "" }) {
  return (
    <a href="#top" aria-label={`${STUDIO_NAME}, back to top`} className={`group inline-flex items-center gap-2 ${className}`}>
      <Crown className="h-5 w-5 text-brand transition-transform duration-300 group-hover:-rotate-12" />
      <span className="font-display text-[0.95rem] font-semibold tracking-[0.08em]">{STUDIO_NAME.toUpperCase()}</span>
    </a>
  );
}
