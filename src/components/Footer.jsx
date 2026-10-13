import Logo from "./Logo";
import { STUDIO_NAME } from "../config";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line px-5 pt-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p className="text-sm text-muted">
          <span lang="es">Hablamos español</span>
        </p>
        <p className="text-sm text-muted" suppressHydrationWarning>
          © {new Date().getFullYear()} {STUDIO_NAME}
        </p>
      </div>
      <p
        aria-hidden="true"
        className="mx-auto mt-10 max-w-7xl select-none whitespace-nowrap font-display text-[clamp(3rem,11vw,10rem)] font-semibold uppercase leading-[0.8] tracking-[-0.04em] text-ink/[0.06]"
      >
        {STUDIO_NAME}
      </p>
    </footer>
  );
}
