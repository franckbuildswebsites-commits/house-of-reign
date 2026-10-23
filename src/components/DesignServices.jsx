import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ContactCTA from "./ContactCTA";

// "More than websites": nine design services, each with a small abstract illustration
// drawn inline (no image files). Shared style: 2px espresso outlines, 10px corners,
// flat palette colors, one soft drop shadow. Items with class "tilt" rotate a little
// further on hover (see .illo in index.css).

const E = "#2B1D14"; // espresso
const O = "#E8622C"; // burnt orange
const P = "#FFE9D9"; // peach
const W = "#FFFFFF";
const S = "#F5EEE4"; // sand
const M = "#E6D9C8"; // placeholder text lines
const C = "#FBF7F0"; // cream
const R = 10; // corner radius
const line = { stroke: E, strokeWidth: 2 };
const tilt = (r, dr) => ({ className: "tilt", style: { "--r": `${r}deg`, "--dr": `${dr}deg` } });

function Illo({ id, children }) {
  return (
    <svg viewBox="0 0 240 180" className="illo h-full w-full" aria-hidden="true">
      <defs>
        <filter id={`illo-${id}`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#603E1E" floodOpacity="0.16" />
        </filter>
      </defs>
      <g filter={`url(#illo-${id})`}>{children}</g>
    </svg>
  );
}

const Bar = ({ x, y, w, h = 5, fill = M, ...rest }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} {...rest} />;

function Websites() {
  return (
    <Illo id="web">
      <rect x="26" y="24" width="164" height="118" rx={R} fill={W} {...line} />
      <path d="M26 44h164" {...line} />
      <circle cx="39" cy="34" r="3.5" fill={O} />
      <circle cx="50" cy="34" r="3.5" fill={O} opacity=".45" />
      <circle cx="61" cy="34" r="3.5" fill={E} opacity=".2" />
      <rect x="38" y="54" width="70" height="44" rx="6" fill={P} />
      <circle cx="88" cy="68" r="7" fill={O} />
      <Bar x={116} y={58} w={58} h={8} fill={E} />
      <Bar x={116} y={72} w={44} h={6} />
      <Bar x={116} y={84} w={28} h={10} fill={O} />
      {[38, 86, 134].map((x) => (
        <rect key={x} x={x} y="108" width="42" height="24" rx="6" fill={S} />
      ))}
      <g {...tilt(6, 5)}>
        <rect x="160" y="72" width="50" height="90" rx={R} fill={W} {...line} />
        <Bar x={177} y={78} w={16} h={4} fill={E} />
        <rect x="167" y="88" width="36" height="22" rx="5" fill={P} />
        <Bar x={167} y={116} w={28} fill={E} />
        <Bar x={167} y={125} w={20} h={4} />
        <Bar x={167} y={136} w={24} h={10} fill={O} />
      </g>
    </Illo>
  );
}

function Logos() {
  return (
    <Illo id="logo">
      <g {...tilt(-6, -6)}>
        <circle cx="74" cy="72" r="34" fill={O} {...line} />
        <circle cx="74" cy="72" r="25" fill="none" stroke={W} strokeWidth="2" strokeDasharray="4 4" />
        <path d="m74 58 4.4 8.9 9.8 1.4-7.1 6.9 1.7 9.8L74 80.4l-8.8 4.6 1.7-9.8-7.1-6.9 9.8-1.4z" fill={W} />
      </g>
      <g {...tilt(7, 6)}>
        <path d="M164 38l30 10v24c0 20-13 32-30 38-17-6-30-18-30-38V48z" fill={E} {...line} strokeLinejoin="round" />
        <circle cx="164" cy="58" r="5" fill={O} />
        <path d="m151 72 13 10 13-10" fill="none" stroke={O} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="52" y="126" width="136" height="28" rx="14" fill={W} {...line} />
      <circle cx="72" cy="140" r="7" fill={O} />
      <Bar x={86} y={135} w={70} h={10} fill={E} />
      <Bar x={160} y={136} w={16} h={8} />
    </Illo>
  );
}

function Flyers() {
  return (
    <Illo id="flyer">
      <g {...tilt(-9, -4)}>
        <rect x="50" y="30" width="80" height="112" rx={R} fill={P} {...line} />
        <rect x="60" y="42" width="60" height="12" rx="4" fill={E} />
        <rect x="60" y="60" width="60" height="40" rx="6" fill={O} />
        <Bar x={60} y={108} w={52} fill={E} opacity=".3" />
        <Bar x={60} y={118} w={40} fill={E} opacity=".3" />
        <Bar x={60} y={128} w={46} fill={E} opacity=".3" />
      </g>
      <g {...tilt(8, 4)}>
        <rect x="108" y="38" width="80" height="112" rx={R} fill={W} {...line} />
        <rect x="118" y="50" width="60" height="12" rx="4" fill={O} />
        <rect x="118" y="68" width="60" height="40" rx="6" fill={P} />
        <circle cx="162" cy="82" r="7" fill={O} />
        <path d="M118 108l18-16 13 11 10-8 19 13z" fill={E} opacity=".8" />
        <Bar x={118} y={116} w={52} />
        <Bar x={118} y={126} w={40} />
        <Bar x={118} y={136} w={46} />
      </g>
    </Illo>
  );
}

function SocialPosts() {
  return (
    <Illo id="social">
      <g {...tilt(-4, -3)}>
        <rect x="78" y="12" width="84" height="156" rx={R} fill={W} {...line} />
        <Bar x={110} y={18} w={20} h={4} fill={E} />
        <circle cx="92" cy="36" r="6" fill={O} />
        <Bar x={102} y={33} w={36} h={6} fill={E} />
        <rect x="86" y="48" width="68" height="68" rx="6" fill={P} />
        <circle cx="120" cy="74" r="12" fill={O} />
        <path d="M86 108l22-18 16 12 12-8 18 14v8H86z" fill={E} opacity=".8" />
        <path d="M95 131c-3-3-7-1-7 3 0 4 7 8 7 8s7-4 7-8c0-4-4-6-7-3z" fill={O} />
        <path d="M113 128h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-7l-5 4v-4h-1a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3z" fill="none" {...line} strokeLinejoin="round" />
        <Bar x={86} y={150} w={50} />
        <Bar x={86} y={158} w={34} />
      </g>
      <g {...tilt(8, 6)}>
        <rect x="150" y="54" width="54" height="30" rx="15" fill={O} {...line} />
        <path d="M166 64c-3-3-7-1-7 3 0 4 7 8 7 8s7-4 7-8c0-4-4-6-7-3z" fill={W} />
        <Bar x={178} y={66} w={16} h={6} fill={W} />
      </g>
    </Illo>
  );
}

function BusinessCards() {
  return (
    <Illo id="cards">
      <g {...tilt(-8, -5)}>
        <rect x="40" y="46" width="112" height="66" rx={R} fill={E} {...line} />
        <circle cx="96" cy="72" r="12" fill={O} />
        <Bar x={78} y={92} w={36} fill={W} opacity=".7" />
      </g>
      <g {...tilt(6, 5)}>
        <rect x="90" y="74" width="112" height="66" rx={R} fill={W} {...line} />
        <circle cx="110" cy="94" r="8" fill={O} />
        <Bar x={124} y={89} w={56} h={7} fill={E} />
        <Bar x={124} y={100} w={40} />
        <Bar x={104} y={116} w={64} />
        <Bar x={104} y={125} w={46} />
      </g>
    </Illo>
  );
}

function MenusSignage() {
  return (
    <Illo id="menu">
      <rect x="44" y="18" width="96" height="144" rx={R} fill={E} {...line} />
      <Bar x={58} y={32} w={68} h={12} fill={O} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Bar x={58} y={58 + i * 19} w={46} fill={C} opacity=".75" />
          <circle cx="122" cy={60.5 + i * 19} r="4" fill={O} />
        </g>
      ))}
      <g {...tilt(5, 5)}>
        <path d="M156 146l-6 18M200 146l6 18" {...line} strokeLinecap="round" />
        <path d="M170 82l8-8 8 8" fill="none" {...line} strokeLinejoin="round" />
        <rect x="150" y="82" width="56" height="66" rx={R} fill={W} {...line} />
        <Bar x={160} y={94} w={36} h={9} fill={O} />
        <Bar x={160} y={110} w={30} />
        <Bar x={160} y={119} w={24} />
        <Bar x={160} y={128} w={28} />
      </g>
    </Illo>
  );
}

function GoogleProfile() {
  return (
    <Illo id="gbp">
      <rect x="22" y="22" width="132" height="132" rx={R} fill={S} {...line} />
      <path d="M22 72h132M22 112h132M64 22v132M110 22v132" stroke={W} strokeWidth="6" />
      <path d="M22 96c30-6 50-26 80-20s30 24 52 20" fill="none" stroke={P} strokeWidth="10" strokeLinecap="round" />
      <g {...tilt(-6, -6)}>
        <path d="M88 30c-16 0-26 12-26 26 0 20 26 42 26 42s26-22 26-42c0-14-10-26-26-26z" fill={O} {...line} strokeLinejoin="round" />
        <circle cx="88" cy="56" r="9" fill={W} />
      </g>
      <g {...tilt(5, 5)}>
        <rect x="112" y="92" width="104" height="66" rx={R} fill={W} {...line} />
        <Bar x={124} y={104} w={58} h={8} fill={E} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`m${128 + i * 13} 118 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4-3.9-3.8 5.4-.8z`}
            fill={i < 4 ? O : M}
          />
        ))}
        <Bar x={124} y={140} w={40} />
        <Bar x={170} y={136} w={34} h={12} fill={O} />
      </g>
    </Illo>
  );
}

function OrderingBooking() {
  return (
    <Illo id="order">
      <g {...tilt(-5, -4)}>
        <rect x="34" y="20" width="84" height="148" rx={R} fill={W} {...line} />
        <Bar x={66} y={26} w={20} h={4} fill={E} />
        <Bar x={44} y={40} w={50} h={8} fill={E} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="44" y={56 + i * 28} width="20" height="20" rx="5" fill={P} />
            <Bar x={70} y={60 + i * 28} w={34} h={5} fill={E} opacity=".6" />
            <Bar x={70} y={69 + i * 28} w={22} h={4} />
          </g>
        ))}
        <rect x="44" y="142" width="64" height="16" rx="8" fill={O} />
        <Bar x={58} y={148} w={36} h={4} fill={W} />
      </g>
      <g {...tilt(6, 5)}>
        <rect x="118" y="46" width="94" height="96" rx={R} fill={W} {...line} />
        <path d="M118 66h94" {...line} />
        <rect x="118" y="46" width="94" height="20" rx={R} fill={E} />
        <path d="M118 60h94v6h-94z" fill={E} />
        <path d="M138 40v12M192 40v12" {...line} strokeLinecap="round" />
        {[0, 1, 2, 3].map((c) =>
          [0, 1, 2].map((r) => (
            <rect
              key={`${c}-${r}`}
              x={128 + c * 20}
              y={76 + r * 20}
              width="14"
              height="14"
              rx="4"
              fill={c === 2 && r === 1 ? O : S}
            />
          ))
        )}
        <path d="m172.5 103 3 3 6-6" fill="none" stroke={W} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Illo>
  );
}

function SiteCare() {
  return (
    <Illo id="care">
      <rect x="26" y="28" width="164" height="118" rx={R} fill={W} {...line} />
      <path d="M26 48h164" {...line} />
      <circle cx="39" cy="38" r="3.5" fill={O} />
      <circle cx="50" cy="38" r="3.5" fill={O} opacity=".45" />
      <circle cx="61" cy="38" r="3.5" fill={E} opacity=".2" />
      <rect x="38" y="58" width="72" height="46" rx="6" fill={P} />
      <path d="M38 96l20-16 14 11 12-8 26 17v4H38z" fill={E} opacity=".8" />
      <Bar x={120} y={60} w={56} h={8} fill={E} />
      <Bar x={120} y={74} w={44} h={6} />
      <Bar x={120} y={86} w={50} h={6} />
      {[38, 86, 134].map((x) => (
        <rect key={x} x={x} y="114" width="42" height="22" rx="6" fill={S} />
      ))}
      <g {...tilt(-8, -10)}>
        <circle cx="182" cy="132" r="26" fill={O} {...line} />
        <path d="M170 128a12 12 0 0 1 21-6M194 136a12 12 0 0 1-21 6" fill="none" stroke={W} strokeWidth="3" strokeLinecap="round" />
        <path d="m192 114-1 8-8-1M172 150l1-8 8 1" fill="none" stroke={W} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Illo>
  );
}

const services = [
  { title: "Websites", text: "Fast, mobile-first sites built to bring in customers.", Art: Websites },
  { title: "Logos", text: "A simple, memorable mark that works everywhere.", Art: Logos },
  { title: "Flyers", text: "Promo flyers and posters for sales, specials, and grand openings, ready to print or post.", Art: Flyers },
  { title: "Social posts", text: "On-brand post templates for your feeds.", Art: SocialPosts },
  { title: "Business cards", text: "Cards that match your site and your logo.", Art: BusinessCards },
  { title: "Menus & signage", text: "Menus, price boards and signs for your space.", Art: MenusSignage },
  {
    title: "Google Business Profile",
    text: "Set up and polish your Google listing so locals find you on Maps.",
    Art: GoogleProfile,
  },
  {
    title: "Online ordering & booking",
    text: "Connect DoorDash, Square, Calendly, or your booking app to your site.",
    Art: OrderingBooking,
  },
  { title: "Site care", text: "$125/month: hosting, updates, and changes handled for you.", Art: SiteCare },
];

export default function DesignServices() {
  return (
    <section id="design" className="px-5 pb-40 pt-24 sm:px-8 sm:pb-44 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Design services" title="More than websites.">
          Design for local businesses — everything matches.
        </SectionHeading>

        <ul className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map(({ title, text, Art }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 70} className="group rounded-card bg-white p-5 shadow-soft sm:p-6">
              <div className="aspect-[4/3] rounded-[12px] bg-peach/60 p-2">
                <Art />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-1 text-muted">{text}</p>
            </Reveal>
          ))}
        </ul>

        <ContactCTA title="Need graphics?" text="Priced per job — text me what you need." className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
