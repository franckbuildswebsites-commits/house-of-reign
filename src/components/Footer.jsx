import Logo from "./Logo";
import { EMAIL, OWNER, STUDIO_NAME } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p>
          Designed and built by {OWNER} ·{" "}
          <a href={`mailto:${EMAIL}`} className="text-link text-ink">
            {EMAIL}
          </a>
        </p>
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} {STUDIO_NAME}
        </p>
      </div>
    </footer>
  );
}
