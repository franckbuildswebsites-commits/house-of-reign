import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Photo from "./Photo";
import { ArrowUpRight } from "./Icons";
import { STUDIO_NAME, PHONE, WEB3FORMS_KEY } from "../config";
import { isPlaceholder, smsHref, telHref } from "../lib/utils";

const shots = [
  "wicked-bread-a", "gdh-home", "token-forge-a", "ppf-comics-a", "champions4character-a", "mm-casino-party-a", "gdh-event",
  "wicked-bread-b", "token-forge-b", "gdh-volunteer", "ppf-comics-b", "mm-casino-party-b", "champions4character-b",
];
const fan = shots; // 13 cards: an open arc

// The fan of screenshots opens (cards rotate out along an arc) once, when the section scrolls into view.
function Fan() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return el?.classList.add("is-open");
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (el.classList.add("is-open"), io.disconnect()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="fan pointer-events-none relative overflow-hidden">
      {/* pivot point, below the box; every card hangs above it and rotates around it */}
      <div className="fan-pivot absolute left-1/2 h-0 w-0">
        {fan.map((id, i) => (
          <Photo
            key={i}
            src={`/portfolio/cards/${id}.webp`}
            alt=""
            width="600"
            height="375"
            loading="lazy"
            decoding="async"
            style={{ "--a": `${-40 + i * 6.67}deg`, "--i": i }}
            className="fan-card absolute left-0 top-0 aspect-[16/10] max-w-none rounded-[12px] object-cover object-top ring-1 ring-line"
          />
        ))}
      </div>
    </div>
  );
}

// "Get a text": the visitor leaves a number and we text them back (sent through Web3Forms).
function GetAText() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.botcheck) return;
    if (isPlaceholder(WEB3FORMS_KEY)) return setStatus("error");
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Text-back request: ${data.phone}`,
          from_name: `${STUDIO_NAME} website`,
          "Text them back at": data.phone,
          Source: "Get a text (bottom of the page)",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="t-card mt-4">
        Got it. We'll text you soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="sr-only" htmlFor="get-a-text">
        Your phone number
      </label>
      <input
        id="get-a-text"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        placeholder="Your phone number"
        className="field sm:!w-auto sm:min-w-0 sm:flex-1"
      />
      <button type="submit" disabled={status === "sending"} className="btn btn-primary shrink-0 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Get a text"}
      </button>
      {status === "error" && (
        <p role="alert" className="w-full text-sm">
          That didn't go through. Text us at <a href={smsHref} className="text-accent underline">{PHONE}</a> instead.
        </p>
      )}
    </form>
  );
}

const meta = ["Websites", "Google Business Profile", "Menus & signage", "Social posts"];

export default function ClosingCTA() {
  return (
    <section id="text-us" aria-labelledby="text-us-title" className="bg-alt pb-28 pt-20 lg:pb-36 lg:pt-28">
      <div className="site-wrap">
        <div className="grid grid-cols-2 gap-6 text-[0.9375rem] leading-snug lg:grid-cols-4">
          <p className="font-semibold">{STUDIO_NAME}</p>
          <ul className="text-dim">
            {meta.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p className="hidden text-dim lg:block">takereign.com</p>
          <p className="hidden text-dim lg:block lg:text-right" lang="es">
            Hablamos español
          </p>
        </div>

        <div className="mt-10">
          <Fan />
        </div>

        <Reveal as="h2" id="text-us-title" className="t-h2 mt-12 lg:mt-16">
          <span className="block">Your next customer</span>
          <span className="block text-dim">is looking right now.</span>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-2">
          <div className="rounded-[24px] border border-line bg-page p-6 sm:p-8">
            <p className="label">Text us directly</p>
            <GetAText />
            <p className="mt-3 flex items-center gap-1.5 text-sm text-dim">
              Or text
              <a href={smsHref} className="inline-flex min-h-11 items-center text-accent hover:underline focus-visible:underline">
                {PHONE}
              </a>
            </p>
          </div>
          <a href={telHref} className="group flex flex-col justify-between gap-4 rounded-[24px] border border-line bg-page p-6 sm:p-8">
            <p className="label">or call us.</p>
            <p className="t-h3 flex items-center gap-3">
              {PHONE}
              <ArrowUpRight className="h-[0.5em] w-[0.5em] text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
