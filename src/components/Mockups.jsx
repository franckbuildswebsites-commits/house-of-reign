// Small UI mockup for the Websites card (Services.jsx), drawn in HTML so it stays sharp and weighs
// nothing. Self-contained (its own colors), so it reads on any card. "Your Café" is a placeholder.

const Bar = ({ className = "" }) => <span className={`block h-[0.4em] rounded-full ${className}`} />;

export function WebsiteMockup() {
  return (
    <div className="relative h-full w-full text-[clamp(7px,2.05cqw,15px)]">
      <div className="absolute inset-y-[6%] left-0 right-[14%] overflow-hidden rounded-[1em] bg-[#ffffff] shadow-[var(--shadow-soft)] ring-1 ring-black/10 ">
        <div className="flex items-center gap-[0.5em] border-b border-[#d2d2d7] px-[1em] py-[0.8em]">
          <span className="h-[0.7em] w-[0.7em] rounded-full bg-black/15" />
          <span className="h-[0.7em] w-[0.7em] rounded-full bg-black/15" />
          <span className="h-[0.7em] w-[0.7em] rounded-full bg-black/15" />
          <span className="mx-auto rounded-full border border-[#d2d2d7] px-[1.5em] py-[0.25em] text-[0.8em] text-black/65">yourbusiness.com</span>
        </div>
        <div className="flex items-center justify-between px-[1.6em] py-[1em]">
          <span className="text-[1.1em] font-semibold text-[#1d1d1f]">Your Café</span>
          <span className="flex gap-[1em]">
            <Bar className="w-[3em] bg-black/15" />
            <Bar className="w-[3em] bg-black/15" />
            <Bar className="w-[3em] bg-black/15" />
          </span>
        </div>
        <div className="grid grid-cols-[1.1fr_1fr] gap-[1.4em] px-[1.6em] pt-[0.6em]">
          <div>
            <p className="text-[2.3em] font-semibold leading-[0.95] tracking-[-0.03em] text-[#1d1d1f]">
              Fresh every morning.
            </p>
            <Bar className="mt-[1em] w-[85%] bg-black/12" />
            <Bar className="mt-[0.5em] w-[65%] bg-black/12" />
            <span className="mt-[1.2em] inline-block rounded-full bg-[#4338ca] px-[1.2em] py-[0.5em] text-[0.9em] text-white">
              Order online
            </span>
          </div>
          <div className="aspect-[4/3.4] rounded-[0.8em] bg-[#e0e7ff]" />
        </div>
        <div className="mt-[1.6em] grid grid-cols-3 gap-[0.8em] px-[1.6em]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[4em] rounded-[0.6em] border border-[#d2d2d7]" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 top-[18%] aspect-[9/17] overflow-hidden rounded-[1.4em] border-[0.3em] border-[#1d1d1f] bg-[#ffffff] shadow-[var(--shadow-soft)] ring-1 ring-black/10 ">
        <div className="px-[0.9em] pt-[1.2em]">
          <span className="text-[0.9em] font-semibold text-[#1d1d1f]">Your Café</span>
          <p className="mt-[0.8em] text-[1.45em] font-semibold leading-[0.95] tracking-[-0.03em] text-[#1d1d1f]">
            Fresh every morning.
          </p>
          <div className="mt-[0.8em] aspect-square rounded-[0.6em] bg-[#e0e7ff]" />
          <span className="mt-[0.8em] block rounded-full bg-[#4338ca] py-[0.45em] text-center text-[0.75em] text-white">
            Order online
          </span>
        </div>
      </div>
    </div>
  );
}
