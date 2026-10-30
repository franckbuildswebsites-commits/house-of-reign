import { useEffect, useRef, useState } from "react";
import { Crown } from "./Logo";

// An image that swaps to `fallback` when the file is missing (the effect also catches images that
// failed before the prerendered page finished hydrating). WebP sources get their AVIF twin first:
// every .webp in /public/portfolio has a smaller .avif next to it.
export default function Photo({ src, fallback = null, ...imgProps }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return fallback;
  const img = <img ref={ref} src={src} onError={() => setFailed(true)} {...imgProps} />;
  if (!src.endsWith(".webp")) return img;
  return (
    <picture className="contents">
      <source srcSet={src.replace(/\.webp$/, ".avif")} type="image/avif" />
      {img}
    </picture>
  );
}

// Round photo of the owner (/public/me.jpg), with the crown mark until the photo exists.
export function Avatar({ className = "" }) {
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-brand text-ink ${className}`}>
      <Photo
        src="/me.jpg"
        alt=""
        width="96"
        height="96"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        fallback={<Crown className="h-1/2 w-1/2" />}
      />
    </span>
  );
}
