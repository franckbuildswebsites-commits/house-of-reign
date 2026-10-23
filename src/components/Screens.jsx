// Real screenshots in a plain browser frame and phone frame.

export function BrowserFrame({ src, alt, address, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-white shadow-frame ${className}`}>
      <div className="flex h-7 items-center justify-center border-b border-line bg-sand px-3 sm:h-8">
        <span className="truncate text-[0.6875rem] text-muted sm:text-xs">{address}</span>
      </div>
      <img src={src} alt={alt} width="1440" height="900" loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

export function PhoneFrame({ src, alt, className = "", eager = false }) {
  return (
    <div className={`overflow-hidden rounded-[18%/8.3%] border-[3px] border-ink bg-ink shadow-frame sm:border-4 ${className}`}>
      <img
        src={src}
        alt={alt}
        width="390"
        height="844"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block aspect-[390/844] w-full rounded-[15%/7%] object-cover object-top"
      />
    </div>
  );
}

// "godigitalhero.com" from "https://godigitalhero.com"
export const hostname = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
