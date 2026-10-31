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
    <div className="flex h-full flex-col gap-[3cqw] bg-[#f5f5f7] p-[4cqw] text-[3.4cqw] text-[#1d1d1f]">
      <div className="grid flex-1 grid-cols-2 gap-[3cqw]">
        <div className="relative grid place-items-center rounded-[3cqw] bg-white">
          <span className="grid h-[16cqw] w-[16cqw] place-items-center rounded-full bg-[#4338ca] text-white">
            <Crown className="h-[7cqw] w-auto" />
          </span>
          <span className="absolute bottom-[2.5cqw] left-[3cqw]">Reign</span>
        </div>
        <div className="relative grid place-items-center rounded-[3cqw] bg-white">
          <span className="grid h-[16cqw] w-[16cqw] place-items-center rounded-full bg-[#e8e8ed]">You</span>
          <span className="absolute bottom-[2.5cqw] left-[3cqw]">You</span>
        </div>
        <div className="col-span-2 rounded-[3cqw] bg-white p-[3cqw]">
          <p className="font-semibold">Your mockup · first look</p>
          <div className="mt-[2cqw] grid grid-cols-[1.2fr_1fr] gap-[2cqw]">
            <div className="space-y-[1.5cqw]">
              <span className="block h-[3cqw] w-full rounded-full bg-[#1d1d1f]" />
              <span className="block h-[3cqw] w-3/4 rounded-full bg-[#1d1d1f]" />
              <span className="block h-[2cqw] w-2/3 rounded-full bg-[#d2d2d7]" />
              <span className="mt-[2cqw] block h-[4.5cqw] w-1/2 rounded-full bg-[#4338ca]" />
            </div>
            <span className="rounded-[2cqw] bg-[#e0e7ff]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[3cqw] text-[#6e6e73]">
        <span>15:00 · Free call</span>
        <span className="flex gap-[1.5cqw]">
          <span className="h-[6cqw] w-[6cqw] rounded-full bg-[#d2d2d7]" />
          <span className="h-[6cqw] w-[6cqw] rounded-full bg-[#d2d2d7]" />
          <span className="h-[6cqw] w-[9cqw] rounded-full bg-[#e5484d]" />
        </span>
      </div>
    </div>
  );
}

export function BuildMock() {
  const items = ["Mobile layout", "Your photos & logo", "Contact form", "Booking link", "Revision round"];
  return (
    <div className="flex h-full flex-col bg-white text-[3.6cqw] text-[#1d1d1f]">
      <div className="flex items-center gap-[1.5cqw] bg-[#f5f5f7] px-[4cqw] py-[3cqw]">
        <span className="h-[2.4cqw] w-[2.4cqw] rounded-full bg-[#d2d2d7]" />
        <span className="h-[2.4cqw] w-[2.4cqw] rounded-full bg-[#d2d2d7]" />
        <span className="h-[2.4cqw] w-[2.4cqw] rounded-full bg-[#d2d2d7]" />
        <span className="mx-auto rounded-full bg-white px-[4cqw] py-[0.8cqw] text-[2.8cqw] text-[#6e6e73]">Building your site</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[3cqw] p-[6cqw]">
        {items.map((it, i) => (
          <div key={it} className="flex items-center gap-[3cqw]">
            <span className={`grid h-[6cqw] w-[6cqw] place-items-center rounded-full ${i < 4 ? "bg-[#4338ca] text-white" : "border border-[#d2d2d7]"}`}>
              {i < 4 && <Check />}
            </span>
            <span className={i < 4 ? "" : "text-[#6e6e73]"}>{it}</span>
          </div>
        ))}
        <div className="mt-[2cqw] h-[1.6cqw] overflow-hidden rounded-full bg-[#f5f5f7]">
          <span className="block h-full w-4/5 rounded-full bg-[#4338ca]" />
        </div>
      </div>
    </div>
  );
}

export function LaunchMock() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[5cqw] bg-[#f5f5f7] p-[6cqw] text-[#1d1d1f]">
      <div className="flex w-full items-center gap-[2cqw] rounded-full bg-white px-[4cqw] py-[2.5cqw] text-[3.6cqw]">
        <svg viewBox="0 0 24 24" className="h-[4cqw] w-[4cqw]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <rect x="5" y="11" width="14" height="9.5" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        yourbusiness.com
      </div>
      <p className="text-[17cqw] font-semibold leading-none tracking-[-0.03em]">Live.</p>
      <div className="flex flex-wrap justify-center gap-[2cqw] text-[3.2cqw]">
        {["Domain connected", "Secure (https)", "Fast on phones"].map((x) => (
          <span key={x} className="flex items-center gap-[1cqw] rounded-full bg-white px-[3cqw] py-[1.4cqw]">
            <span className="text-[#4338ca]">
              <Check />
            </span>
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CareMock() {
  return (
    <div className="flex h-full flex-col justify-end gap-[3cqw] bg-white p-[5cqw] text-[3.6cqw] text-[#1d1d1f]">
      <p className="text-center text-[2.8cqw] text-[#6e6e73]">Today 9:41 AM</p>
      <p className="max-w-[78%] self-end rounded-[4cqw] rounded-br-[1cqw] bg-[#4338ca] px-[4cqw] py-[2.5cqw] text-white">
        Can you add our holiday hours and the new menu photo?
      </p>
      <p className="max-w-[78%] self-start rounded-[4cqw] rounded-bl-[1cqw] bg-[#f5f5f7] px-[4cqw] py-[2.5cqw]">On it.</p>
      <p className="max-w-[78%] self-start rounded-[4cqw] rounded-bl-[1cqw] bg-[#f5f5f7] px-[4cqw] py-[2.5cqw]">
        Done, it's live on your site.
      </p>
      <p className="self-end text-[2.8cqw] text-[#6e6e73]">Site Care · $125/month</p>
    </div>
  );
}
