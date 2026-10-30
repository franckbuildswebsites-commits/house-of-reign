import Logo from "./Logo";
import { STUDIO_NAME, EMAIL, PHONE } from "../config";
import { smsHref } from "../lib/utils";

const links = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Pricing", "#pricing"],
  ["Process", "#process"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

export default function Footer() {
  return (
    <footer className="overflow-hidden px-5 pt-16 sm:px-8 sm:pt-20">
      <div className="mx-auto grid max-w-[90rem] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-10">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-sm text-dim">
            <span lang="es">Hablamos español</span>
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <ul className="flex flex-col gap-2">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="link-sweep text-cream/80 transition-colors hover:text-cream">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <p className="label">Text</p>
            <a href={smsHref} className="link-sweep self-start text-cream/80 hover:text-cream">
              {PHONE}
            </a>
            <p className="label mt-4">Email</p>
            <a href={`mailto:${EMAIL}`} className="link-sweep self-start break-all text-cream/80 hover:text-cream">
              {EMAIL}
            </a>
          </div>
          <p className="text-sm text-dim sm:text-right" suppressHydrationWarning>
            © {new Date().getFullYear()} {STUDIO_NAME}
          </p>
        </div>
      </div>
      {/* Decorative wordmark, drawn from a CSS pseudo-element (.wordmark in index.css). */}
      <div aria-hidden="true" data-text={STUDIO_NAME.toUpperCase()} className="wordmark mx-auto mt-16 max-w-[90rem]" />
    </footer>
  );
}
