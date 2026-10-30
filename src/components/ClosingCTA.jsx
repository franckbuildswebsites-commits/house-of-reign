import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Words from "./Words";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { STUDIO_NAME, PHONE, WEB3FORMS_KEY } from "../config";
import { isPlaceholder, smsHref, telHref } from "../lib/utils";

const shots = [
  "wicked-bread-a", "gdh-home", "token-forge-a", "ppf-comics-a", "champions4character-a", "mm-casino-party-a", "gdh-event",
  "wicked-bread-b", "token-forge-b", "gdh-volunteer", "ppf-comics-b", "mm-casino-party-b", "champions4character-b",
];
const fan = [...shots, ...shots.slice(0, 7)]; // 20 cards: a dense arc

// The fan of screenshots opens (cards rotate out along an arc) when the section scrolls into view.
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
    <div ref={ref} aria-hidden="true" className="fan pointer-events-none absolute inset-0 overflow-hidden">
      {/* pivot point, below the section; every card hangs above it and rotates around it */}
      <div className="absolute left-[62%] top-[120%] h-0 w-0 lg:left-[66%] lg:top-[135%]">
        {fan.map((id, i) => (
          <img
            key={i}
            src={`/portfolio/cards/${id}.webp`}
            alt=""
            width="600"
            height="375"
            loading="lazy"
            decoding="async"
            style={{ "--a": `${-80 + i * 5.6}deg`, "--i": i }}
            className="fan-card absolute left-0 top-0 aspect-[16/10] w-[clamp(13rem,30vw,27rem)] max-w-none rounded-[12px] object-cover object-top shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] ring-1 ring-white/10"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#120d0a_8%,rgb(18_13_10/0.55)_45%,rgb(18_13_10/0.25)_70%,rgb(18_13_10/0.85))]" />
    </div>
  );
}

// "Get a text": the visitor leaves a number and I text them back (sent through Web3Forms).
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
          subject: `Text-me request: ${data.phone}`,
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
      <p role="status" className="mt-8 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.04em]">
        Got it. I'll text you soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
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
        className="h-12 w-full border border-white/20 bg-white/[0.06] px-4 text-base text-paper placeholder:text-paper/50 focus:border-brand focus:outline-none sm:max-w-[15rem]"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex shrink-0 items-center gap-3 self-start whitespace-nowrap font-display text-[clamp(2.2rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.04em] transition-colors hover:text-brand disabled:opacity-60 sm:self-auto"
      >
        {status === "sending" ? "Sending…" : "Get a text"}
        <ArrowRight className="h-[0.6em] w-[0.6em] transition-transform duration-300 group-hover:translate-x-1.5" />
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-paper/80">
          That didn't go through. Text me at <a href={smsHref} className="underline">{PHONE}</a> instead.
        </p>
      )}
    </form>
  );
}

const meta = ["Websites", "Google Business Profile", "Menus & signage", "Social posts"];

export default function ClosingCTA() {
  return (
    <section id="text-me" aria-labelledby="text-me-title" className="bg-[#120d0a] text-paper">
      <div className="relative min-h-[620px] overflow-hidden lg:min-h-[720px]">
        <Fan />
        <div className="px-section relative mx-auto flex min-h-[620px] max-w-[100rem] flex-col pb-12 pt-10 lg:min-h-[720px] lg:pb-16 lg:pt-14">
          <div className="grid grid-cols-2 gap-6 pt-14 text-[0.9rem] [text-shadow:0_1px_14px_rgb(0_0_0/0.95)] lg:grid-cols-4 lg:pt-16">
            <p className="font-medium">{STUDIO_NAME}</p>
            <ul className="space-y-1 text-paper/75">
              {meta.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="hidden text-paper/75 lg:block">takereign.com</p>
            <p className="hidden text-paper/75 lg:block lg:text-right" lang="es">
              Hablamos español
            </p>
          </div>
          <Reveal as="h2" id="text-me-title" className="reveal-words mt-auto pt-40 font-display text-[clamp(2.7rem,6.2vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            <span className="block">
              <Words text="Your next customer" />
            </span>
            <span className="block text-paper/45">
              <Words text="is looking right now." start={3} />
            </span>
          </Reveal>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="px-section border-t border-white/10 py-12 lg:py-16 lg:pr-12">
          <p className="text-[0.95rem] text-paper/80">Text me directly</p>
          <GetAText />
          <p className="mt-6 text-sm text-paper/60">
            Or text me yourself at{" "}
            <a href={smsHref} className="font-semibold text-paper underline underline-offset-4">
              {PHONE}
            </a>
            . I reply within 24 hours.
          </p>
        </div>
        <a href={telHref} className="group px-section block bg-paper py-12 text-ink transition-colors duration-500 hover:bg-brand lg:py-16 lg:pl-12">
          <p className="text-[0.95rem] text-ink/70">or call me.</p>
          <p className="mt-8 flex items-center gap-4 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.04em]">
            {PHONE}
            <ArrowUpRight className="h-[0.55em] w-[0.55em] transition-transform duration-500 group-hover:rotate-45" />
          </p>
          <p className="mt-6 text-sm text-ink/60">English or español.</p>
        </a>
      </div>
    </section>
  );
}
