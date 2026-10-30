import { Crown } from "./Logo";

// Small illustrations for the four process steps (Process.jsx). Drawn in HTML, sized with
// container-query units so they scale with their card. Decorative: hidden from screen readers.
const Check = () => (
  <svg viewBox="0 0 24 24" className="h-[1em] w-[1em] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export function CallMock() {
  return (
    <div className="flex h-full flex-col gap-[3cqw] bg-[#14100d] p-[4cqw] text-[3.4cqw] text-[#f4ecdf]">
      <div className="grid flex-1 grid-cols-2 gap-[3cqw]">
        <div className="relative grid place-items-center rounded-[3cqw] bg-[linear-gradient(140deg,#3a2216,#1d1410)]">
          <span className="grid h-[16cqw] w-[16cqw] place-items-center rounded-full bg-[#e8622c] text-[#0c0907]">
            <Crown className="h-[7cqw] w-auto" />
          </span>
          <span className="absolute bottom-[2.5cqw] left-[3cqw]">Francisco</span>
        </div>
        <div className="relative grid place-items-center rounded-[3cqw] bg-[linear-gradient(140deg,#2b3a35,#141c1a)]">
          <span className="grid h-[16cqw] w-[16cqw] place-items-center rounded-full bg-[#f4ecdf] font-semibold text-[#0c0907]">You</span>
          <span className="absolute bottom-[2.5cqw] left-[3cqw]">You</span>
        </div>
        <div className="col-span-2 rounded-[3cqw] bg-[#f4ecdf] p-[3cqw] text-[#0c0907]">
          <p className="font-semibold">Your mockup · first look</p>
          <div className="mt-[2cqw] grid grid-cols-[1.2fr_1fr] gap-[2cqw]">
            <div className="space-y-[1.5cqw]">
              <span className="block h-[3cqw] w-full rounded-full bg-[#0c0907]/80" />
              <span className="block h-[3cqw] w-3/4 rounded-full bg-[#0c0907]/80" />
              <span className="block h-[2cqw] w-2/3 rounded-full bg-[#0c0907]/20" />
              <span className="mt-[2cqw] block h-[4.5cqw] w-1/2 rounded-full bg-[#e8622c]" />
            </div>
            <span className="rounded-[2cqw] bg-[radial-gradient(circle_at_30%_30%,#f6b183,#e8622c_55%,#7a2c10)]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[3cqw] text-[#f4ecdf]/70">
        <span>15:00 · Free call</span>
        <span className="flex gap-[1.5cqw]">
          <span className="h-[6cqw] w-[6cqw] rounded-full bg-white/15" />
          <span className="h-[6cqw] w-[6cqw] rounded-full bg-white/15" />
          <span className="h-[6cqw] w-[9cqw] rounded-full bg-[#e5484d]" />
        </span>
      </div>
    </div>
  );
}

export function BuildMock() {
  const items = ["Mobile layout", "Your photos & logo", "Contact form", "Booking link", "Revision round"];
  return (
    <div className="flex h-full flex-col bg-[#fbf6ee] text-[3.6cqw] text-[#0c0907]">
      <div className="flex items-center gap-[1.5cqw] bg-[#efe6d8] px-[4cqw] py-[3cqw]">
        <span className="h-[2.4cqw] w-[2.4cqw] rounded-full bg-[#e8622c]" />
        <span className="h-[2.4cqw] w-[2.4cqw] rounded-full bg-[#e8622c]/45" />
        <span className="h-[2.4cqw] w-[2.4cqw] rounded-full bg-black/15" />
        <span className="mx-auto rounded-full bg-white px-[4cqw] py-[0.8cqw] text-[2.8cqw] text-black/60">Building your site</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[3cqw] p-[6cqw]">
        {items.map((it, i) => (
          <div key={it} className="flex items-center gap-[3cqw]">
            <span className={`grid h-[6cqw] w-[6cqw] place-items-center rounded-full ${i < 4 ? "bg-[#0c0907] text-[#f4ecdf]" : "border-2 border-black/20"}`}>
              {i < 4 && <Check />}
            </span>
            <span className={i < 4 ? "" : "text-black/50"}>{it}</span>
          </div>
        ))}
        <div className="mt-[2cqw] h-[2.4cqw] overflow-hidden rounded-full bg-black/10">
          <span className="block h-full w-4/5 rounded-full bg-[#e8622c]" />
        </div>
      </div>
    </div>
  );
}

export function LaunchMock() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[5cqw] bg-[linear-gradient(160deg,#e8622c,#c4401a)] p-[6cqw] text-[#0c0907]">
      <div className="flex w-full items-center gap-[2cqw] rounded-full bg-white px-[4cqw] py-[2.5cqw] text-[3.6cqw]">
        <svg viewBox="0 0 24 24" className="h-[4cqw] w-[4cqw]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <rect x="5" y="11" width="14" height="9.5" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        yourbusiness.com
      </div>
      <p className="font-display text-[17cqw] font-semibold leading-none tracking-[-0.04em]">Live.</p>
      <div className="flex flex-wrap justify-center gap-[2cqw] text-[3.2cqw] font-semibold">
        {["Domain connected", "Secure (https)", "Fast on phones"].map((x) => (
          <span key={x} className="flex items-center gap-[1cqw] rounded-full bg-[#0c0907] px-[3cqw] py-[1.4cqw] text-[#f4ecdf]">
            <Check />
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CareMock() {
  return (
    <div className="flex h-full flex-col justify-end gap-[3cqw] bg-[#14100d] p-[5cqw] text-[3.6cqw]">
      <p className="text-center text-[2.8cqw] text-[#f4ecdf]/50">Today 9:41 AM</p>
      <p className="max-w-[78%] self-end rounded-[4cqw] rounded-br-[1cqw] bg-[#e8622c] px-[4cqw] py-[2.5cqw] text-[#0c0907]">
        Can you add our holiday hours and the new menu photo?
      </p>
      <p className="max-w-[78%] self-start rounded-[4cqw] rounded-bl-[1cqw] bg-[#2a201a] px-[4cqw] py-[2.5cqw] text-[#f4ecdf]">On it.</p>
      <p className="max-w-[78%] self-start rounded-[4cqw] rounded-bl-[1cqw] bg-[#2a201a] px-[4cqw] py-[2.5cqw] text-[#f4ecdf]">
        Done, it's live on your site.
      </p>
      <p className="self-end text-[2.8cqw] text-[#f4ecdf]/50">Site Care · $125/month</p>
    </div>
  );
}
