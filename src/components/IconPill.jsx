import { useEffect, useRef, useState } from "react";

// A pill button with an icon in a circle: two copies, one parked past each edge (styles: .icon-pill in index.css).
// Mouse hover is pure CSS. Touch screens don't hover and don't reliably apply :active, so a tap
// sets data-tap for a moment to play the swap there and back.
export default function IconPill({ Icon, children, className = "", onPointerDown, ...rest }) {
  const [tap, setTap] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const down = (e) => {
    onPointerDown?.(e);
    if (e.pointerType === "mouse") return;
    setTap(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setTap(false), 700);
  };

  return (
    <a {...rest} data-tap={tap || undefined} onPointerDown={down} className={`icon-pill ${className}`}>
      <span aria-hidden="true" className="icon-pill-icon is-left">
        <Icon />
      </span>
      <span className="icon-pill-text">{children}</span>
      <span aria-hidden="true" className="icon-pill-icon is-right">
        <Icon />
      </span>
    </a>
  );
}
