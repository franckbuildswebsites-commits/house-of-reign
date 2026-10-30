import { useEffect, useState } from "react";
import { Chat } from "./Icons";
import { smsHref } from "../lib/utils";

// A "Text me" pill pinned bottom-center once you're past the hero. It steps aside while the
// contact form or the closing "Text me" block is on screen.
export default function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let pastHero = false;
    const inView = new Set();
    const update = () => setShow(pastHero && inView.size === 0);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.7;
      update();
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        update();
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    ["contact", "text-me"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const hidden = !show;

  return (
    <div
      inert={hidden || undefined}
      className={`fixed inset-x-0 z-40 flex justify-center transition-[opacity,translate] duration-500 ease-[var(--ease-out-soft)] ${
        hidden ? "pointer-events-none translate-y-6 opacity-0" : "opacity-100"
      }`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-1 rounded-full border border-line bg-coal/85 p-1.5 shadow-[var(--shadow-deep)] backdrop-blur-md">
        <a href="#contact" className="rounded-full px-4 py-2.5 text-[0.95rem] font-semibold text-cream/85 transition-colors hover:text-cream">
          Start a project
        </a>
        <a href={smsHref} className="btn btn-primary min-h-11 px-4 py-2.5 text-[0.95rem]">
          <Chat className="h-[18px] w-[18px]" />
          Text me
        </a>
      </div>
    </div>
  );
}
