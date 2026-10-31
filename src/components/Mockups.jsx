// Small UI mockups for the service cards (ServicePanels.jsx), drawn in HTML so they stay sharp
// and weigh nothing. Each one is self-contained (its own colors), so it reads on any card.
// Names, prices and numbers are placeholders for "your business", not real clients.

const Bar = ({ className = "" }) => <span className={`block h-[0.4em] rounded-full ${className}`} />;

function Stars({ className = "" }) {
  return (
    <span className={`inline-flex gap-[0.1em] text-[#fbbc04] ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-[1em] w-[1em] fill-current">
          <path d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

export function WebsiteMockup() {
  return (
    <div className="relative h-full w-full text-[clamp(7px,2.05cqw,15px)]">
      <div className="absolute inset-y-[6%] left-0 right-[14%] overflow-hidden rounded-[1em] bg-[#ffffff] shadow-[var(--shadow-soft)] ring-1 ring-black/10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-[2%]">
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
      <div className="absolute bottom-0 right-0 top-[18%] aspect-[9/17] overflow-hidden rounded-[1.4em] border-[0.3em] border-[#1d1d1f] bg-[#ffffff] shadow-[var(--shadow-soft)] ring-1 ring-black/10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-[4%] group-hover:rotate-2">
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

export function GoogleMockup() {
  const actions = ["Directions", "Call", "Website", "Menu"];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-[1em] text-[clamp(7px,2.2cqw,15px)]">
      <div className="mx-auto flex w-[82%] items-center gap-[0.8em] rounded-full bg-white px-[1.3em] py-[0.8em] text-[1.1em] text-[#1f1f1f] shadow-[var(--shadow-soft)] ring-1 ring-black/10">
        <svg viewBox="0 0 24 24" className="h-[1.1em] w-[1.1em] fill-none stroke-[#5f6368] stroke-2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        café near me
        <span className="-ml-[0.5em] h-[1.1em] w-px animate-pulse bg-[#1f1f1f]" />
      </div>
      <div className="mx-auto w-[92%] overflow-hidden rounded-[1em] bg-white text-[#1f1f1f] shadow-[var(--shadow-soft)] ring-1 ring-black/10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-[3%]">
        <div className="relative h-[7em] bg-[#e8eef3]">
          <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M0 55 C60 40 90 70 150 50 S250 20 300 35" stroke="#fff" strokeWidth="9" fill="none" />
            <path d="M110 0 L130 80" stroke="#fff" strokeWidth="6" />
            <path d="M0 20 H300" stroke="#cfe3d2" strokeWidth="14" />
          </svg>
          <span className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-[130%]">
            <svg viewBox="0 0 24 24" className="h-[2.4em] w-[2.4em] drop-shadow" aria-hidden="true">
              <path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" fill="#ea4335" />
              <circle cx="12" cy="10" r="2.6" fill="#fff" />
            </svg>
          </span>
        </div>
        <div className="px-[1.3em] py-[1.1em]">
          <p className="text-[1.5em] font-medium">Your Café</p>
          <p className="mt-[0.2em] flex flex-wrap items-center gap-[0.4em] text-[0.95em] text-[#5f6368]">
            <span className="font-medium text-[#1f1f1f]">4.9</span> <Stars /> (212) · Café
          </p>
          <p className="mt-[0.2em] text-[0.95em]">
            <span className="font-medium text-[#188038]">Open</span> <span className="text-[#5f6368]">· Closes 3 PM</span>
          </p>
          <div className="mt-[1em] flex gap-[0.5em] overflow-hidden">
            {actions.map((a, i) => (
              <span
                key={a}
                className={`shrink-0 rounded-full border px-[0.9em] py-[0.35em] text-[0.9em] ${
                  i === 0 ? "border-[#0b57d0] bg-[#0b57d0] text-white" : "border-[#c4c7c5] text-[#0b57d0]"
                }`}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MenuMockup() {
  const items = [
    ["Café con leche", "3.50"],
    ["Cortadito", "2.75"],
    ["Guava pastelito", "2.50"],
    ["Avocado toast", "9.00"],
    ["Cold brew", "5.00"],
    ["Empanada", "3.75"],
  ];
  return (
    <div className="flex h-full w-full items-center justify-center text-[clamp(7px,2.3cqw,16px)]">
      <div className="w-[88%] rounded-[1em] border-[0.6em] border-[#d2d2d7] bg-[#1d1d1f] p-[1.8em] text-[#ffffff] shadow-[var(--shadow-soft)] ring-1 ring-black/10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-rotate-1">
        <div className="flex items-end justify-between border-b border-dashed border-[#ffffff]/25 pb-[0.8em]">
          <p className="text-[2.6em] font-semibold leading-none tracking-[-0.02em]">Menu</p>
          <p className="font-hand text-[1.6em] leading-none text-[#a5b4fc]">today's specials</p>
        </div>
        <ul className="mt-[1em] grid gap-x-[2em] gap-y-[0.7em] sm:grid-cols-2">
          {items.map(([name, price]) => (
            <li key={name} className="flex items-baseline gap-[0.5em] text-[1.05em]">
              <span>{name}</span>
              <span className="flex-1 border-b border-dotted border-[#ffffff]/30" />
              <span className="font-semibold text-[#a5b4fc]">{price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SocialMockup() {
  return (
    <div className="flex h-full w-full items-center justify-center text-[clamp(7px,2.2cqw,15px)]">
      <div className="w-[min(62%,26em)] overflow-hidden rounded-[1.1em] bg-white text-[#111] shadow-[var(--shadow-soft)] ring-1 ring-black/10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-[2%] group-hover:rotate-1">
        <div className="flex items-center gap-[0.6em] px-[1em] py-[0.8em]">
          <span className="h-[2em] w-[2em] rounded-full bg-[#d2d2d7] p-[0.15em]">
            <span className="block h-full w-full rounded-full border-2 border-white bg-[#4338ca]" />
          </span>
          <span className="font-semibold">yourbusiness</span>
          <span className="ml-auto tracking-widest text-black/50">•••</span>
        </div>
        <div className="relative grid aspect-square place-items-center overflow-hidden bg-[#4338ca] text-center text-white">
          <div className="absolute -right-[20%] -top-[20%] h-[70%] w-[70%] rounded-full bg-[#818cf8]" />
          <div className="absolute -bottom-[25%] -left-[15%] h-[60%] w-[60%] rounded-full bg-[#3730a3]" />
          <div className="relative">
            <p className="text-[0.95em] font-semibold uppercase tracking-[0.2em]">This Saturday</p>
            <p className="text-[3.4em] font-semibold leading-[0.85] tracking-[-0.04em]">
              Grand
              <br />
              opening
            </p>
            <p className="mt-[0.5em] inline-block rounded-full bg-white px-[1em] py-[0.3em] text-[0.9em] text-[#1d1d1f]">
              10 AM · free samples
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[1em] px-[1em] pt-[0.8em]">
          <svg viewBox="0 0 24 24" className="h-[1.6em] w-[1.6em] fill-[#ed4956] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-125" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-9.5-9.3C1.1 8.4 3.2 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.8 0 5.9 3.9 4.5 7.2C19.5 16.4 12 21 12 21z" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-[1.6em] w-[1.6em] fill-none stroke-black stroke-[1.8]" aria-hidden="true">
            <path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.6a8.5 8.5 0 1 1 15.6-4.4z" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-[1.6em] w-[1.6em] fill-none stroke-black stroke-[1.8]" aria-hidden="true">
            <path d="M21 3 3 10.5l7 3 3 7z" />
          </svg>
        </div>
        <p className="px-[1em] pb-[1em] pt-[0.5em] font-semibold">1,204 likes</p>
      </div>
    </div>
  );
}

export function BrandMockup() {
  return (
    <div className="relative h-full w-full text-[clamp(7px,2.2cqw,15px)]">
      {/* flyer */}
      <div className="absolute left-[6%] top-[6%] w-[44%] -rotate-6 rounded-[0.6em] bg-[#ffffff] p-[1.4em] text-[#1d1d1f] shadow-[var(--shadow-soft)] ring-1 ring-black/10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-rotate-[9deg]">
        <p className="text-[0.85em] font-semibold uppercase tracking-[0.2em] text-[#4338ca]">Weekend only</p>
        <p className="mt-[0.3em] text-[3.6em] font-semibold leading-[0.85] tracking-[-0.04em]">
          20%
          <br />
          off
        </p>
        <div className="mt-[1em] aspect-[4/3] rounded-[0.5em] bg-[#e0e7ff]" />
        <Bar className="mt-[1em] w-[80%] bg-black/15" />
        <Bar className="mt-[0.5em] w-[55%] bg-black/15" />
      </div>
      {/* logo mark */}
      <div className="absolute right-[8%] top-[8%] grid h-[30%] aspect-square place-items-center rounded-full bg-[#1d1d1f] shadow-[var(--shadow-soft)] ring-1 ring-black/10 ring-1 ring-white/10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:rotate-12">
        <span className="text-[3em] font-semibold tracking-[-0.06em] text-[#a5b4fc]">Yb</span>
      </div>
      {/* business cards */}
      <div className="absolute bottom-[8%] right-[10%] w-[46%] rotate-3 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:rotate-6">
        <div className="absolute inset-0 translate-x-[6%] translate-y-[10%] rounded-[0.6em] bg-[#4338ca]" />
        <div className="relative aspect-[1.75] rounded-[0.6em] bg-[#1d1d1f] p-[1.2em] text-[#ffffff] shadow-[var(--shadow-soft)] ring-1 ring-black/10 ring-1 ring-white/10">
          <span className="text-[1.2em] font-semibold text-[#a5b4fc]">Yb</span>
          <p className="mt-[1.4em] text-[1.2em] font-semibold">Your Business</p>
          <p className="text-[0.8em] text-[#ffffff]/60">hello@yourbusiness.com</p>
        </div>
      </div>
    </div>
  );
}

export function BookingMockup() {
  const slots = ["10:00", "11:30", "1:00", "2:30", "4:00", "5:30"];
  return (
    <div className="flex h-full w-full items-center justify-center text-[clamp(7px,2.2cqw,15px)]">
      <div className="w-[min(84%,34em)] rounded-[1.1em] bg-white p-[1.6em] text-[#111] shadow-[var(--shadow-soft)] ring-1 ring-black/10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-[2%]">
        <div className="flex items-center justify-between">
          <p className="text-[1.6em] font-semibold tracking-tight">Book a visit</p>
          <span className="rounded-full border border-[#d2d2d7] px-[0.8em] py-[0.3em] text-[0.9em]">Fri, Nov 6</span>
        </div>
        <div className="mt-[1em] grid grid-cols-7 gap-[0.4em] text-center text-[0.85em]">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="text-black/60">
              {d}
            </span>
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className={`rounded-full py-[0.35em] ${i === 4 ? "bg-[#1d1d1f] font-semibold text-white" : ""}`}>
              {2 + i}
            </span>
          ))}
        </div>
        <div className="mt-[1.2em] grid grid-cols-3 gap-[0.5em]">
          {slots.map((s, i) => (
            <span
              key={s}
              className={`rounded-[0.6em] border py-[0.55em] text-center font-medium transition-colors duration-500 ${
                i === 1 ? "border-[#4338ca] bg-[#4338ca] text-white" : "border-black/10"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        <span className="mt-[1.2em] block rounded-full bg-[#1d1d1f] py-[0.75em] text-center font-semibold text-white">
          Confirm booking
        </span>
        <p className="mt-[0.9em] text-center text-[0.85em] text-black/65">Works with Square, DoorDash, Calendly & more</p>
      </div>
    </div>
  );
}
