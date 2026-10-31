import Photo from "./Photo";
import { Lock } from "./Icons";

export const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

// Browser window chrome: three dots and an address bar.
export function BrowserFrame({ url, label = "", className = "", children }) {
  const address = (url && hostOf(url)) || label;
  return (
    <div className={`flex flex-col overflow-hidden rounded-[14px] bg-page ring-1 ring-line ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-3 py-2">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
        </span>
        <span className="mx-auto flex min-w-0 max-w-[65%] flex-1 items-center justify-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.7rem] leading-none text-caption">
          {url && <Lock className="h-3 w-3 shrink-0" />}
          <span className="truncate">{address}</span>
        </span>
        <span className="w-[42px] shrink-0" aria-hidden="true" />
      </div>
      <div className="relative flex flex-1 flex-col">{children}</div>
    </div>
  );
}

// Phone with a screenshot, sized by the width of its container.
export function PhoneFrame({ src, alt = "" }) {
  return (
    <div className="bg-[#1d1d1f] p-[3.5%] shadow-[var(--shadow-soft)]" style={{ borderRadius: "17% / 7.8%" }}>
      <div className="relative aspect-[390/844] overflow-hidden bg-page" style={{ borderRadius: "13% / 6%" }}>
        <Photo
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width="585"
          height="1266"
          className="absolute inset-0 h-full w-full object-cover object-top"
          fallback={<div className="absolute inset-0 bg-page" />}
        />
      </div>
    </div>
  );
}
