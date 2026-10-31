import { BRAND, STUDIO_NAME } from "../config";
import mark from "../assets/logo-mark.svg?raw";

export function Crown({ className = "" }) {
  return (
    <svg viewBox="3 4 18 17.25" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 17.5V7l5.25 4.5L12 4l3.75 7.5L21 7v10.5z" />
      <rect x="3" y="19" width="18" height="2.25" rx=".5" />
    </svg>
  );
}

// The indigo crown plus the "Reign" wordmark. In the header the crown is averlo.co's logo size,
// 46px wide (REFERENCE.md); elsewhere it scales with the text.
export function Wordmark({ className = "", crown = "h-[0.74em] -translate-y-[0.04em]" }) {
  return (
    <span className={`inline-flex items-center gap-[0.3em] font-semibold leading-none tracking-[-0.03em] ${className}`}>
      <Crown className={`w-auto text-accent ${crown}`} />
      {BRAND}
    </span>
  );
}

// The header logo. To swap in the final logo, replace src/assets/logo-mark.svg (keep
// fill="currentColor"); the favicon is built from the same file (vite.config.js).
export default function Logo({ className = "", onClick }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label={`${STUDIO_NAME}, back to top`}
      className={`block h-11 w-[42px] text-ink lg:h-12 lg:w-[46px] [&>svg]:h-full [&>svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: mark }}
    />
  );
}
