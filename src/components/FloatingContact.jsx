import { useEffect, useState } from "react";
import { Chat } from "./Icons";
import { smsHref } from "../lib/utils";

// Desktop: floating "Text me" button. Mobile: sticky bottom bar with "Start a project".
// Both appear after the hero and step aside while the contact section is on screen.
export default function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let pastHero = false;
    let contactInView = false;
    const update = () => setShow(pastHero && !contactInView);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };

    const contact = document.getElementById("contact");
    const io = new IntersectionObserver(
      ([entry]) => {
        contactInView = entry.isIntersecting;
        update();
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    if (contact) io.observe(contact);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const hidden = !show;

  return (
    <>
      <a
        href={smsHref}
        inert={hidden || undefined}
        className={`btn btn-primary fixed bottom-6 right-6 z-40 hidden shadow-lift transition-[opacity,translate,transform,background-color,color] duration-300 md:inline-flex ${
          hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
        }`}
      >
        <Chat className="h-5 w-5" />
        Text me
      </a>

      <div
        inert={hidden || undefined}
        className={`fixed inset-x-0 bottom-0 z-40 flex gap-3 bg-paper/95 px-4 pt-3 shadow-[0_-10px_30px_-14px_rgb(96_66_36/0.35)] backdrop-blur transition-[translate] duration-300 md:hidden ${
          hidden ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <a href={smsHref} className="btn btn-secondary shrink-0 px-5">
          <Chat className="h-5 w-5" />
          <span className="max-[379px]:sr-only">Text me</span>
        </a>
        <a href="#contact" className="btn btn-primary flex-1">
          Start a project
        </a>
      </div>
    </>
  );
}
