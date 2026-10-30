import { BRAND, STUDIO_NAME } from "../config";

export function Crown({ className = "" }) {
  return (
    <svg viewBox="3 4 18 17.25" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 17.5V7l5.25 4.5L12 4l3.75 7.5L21 7v10.5z" />
      <rect x="3" y="19" width="18" height="2.25" rx=".5" />
    </svg>
  );
}

// The crown plus a tight, bold "Reign" wordmark. The crown is sized to the cap height of the
// letters so the two read as one mark.
export function Wordmark({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-[0.3em] font-display font-semibold leading-none tracking-[-0.035em] ${className}`}>
      <Crown className="h-[0.74em] w-auto -translate-y-[0.06em] text-brand transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-12" />
      {BRAND}
    </span>
  );
}

export default function Logo({ className = "", onClick }) {
  return (
    <a href="#top" onClick={onClick} aria-label={`${STUDIO_NAME}, back to top`} className={`group inline-flex min-h-11 items-center text-[1.6rem] ${className}`}>
      <Wordmark />
    </a>
  );
}
