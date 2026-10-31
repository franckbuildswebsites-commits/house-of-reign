import { BRAND, STUDIO_NAME } from "../config";

export function Crown({ className = "" }) {
  return (
    <svg viewBox="3 4 18 17.25" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 17.5V7l5.25 4.5L12 4l3.75 7.5L21 7v10.5z" />
      <rect x="3" y="19" width="18" height="2.25" rx=".5" />
    </svg>
  );
}

// The final mark plus the name in our font. Brand files live in /public/brand/.
const MARK = "/brand/reign-mark-header.png";

export function Wordmark({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-[0.35em] font-semibold leading-none tracking-[-0.03em] ${className}`}>
      <img src={MARK} alt="" width="118" height="96" decoding="async" className="h-[1.5em] w-auto" />
      {STUDIO_NAME}
    </span>
  );
}

// Header logo: the mark 48px tall (44 on phones), the name beside it. Below 375px only the mark fits.
export default function Logo({ className = "", onClick }) {
  return (
    <a href="#top" onClick={onClick} aria-label={`${STUDIO_NAME}, back to top`} className={`flex h-11 items-center gap-2 text-ink lg:h-12 ${className}`}>
      <img src={MARK} alt="" width="118" height="96" className="h-full w-auto" />
      <span className="whitespace-nowrap text-[1.125rem] font-semibold leading-none tracking-[-0.03em] max-[23.4rem]:hidden min-[26rem]:text-[1.375rem] lg:text-[1.75rem]">{STUDIO_NAME}</span>
    </a>
  );
}
