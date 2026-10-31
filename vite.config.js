import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as config from "./src/config.js";

const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim());
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Injects <title>, SEO and Open Graph tags into index.html from src/config.js,
// so the studio name is never hardcoded in the HTML.
function siteMeta() {
  return {
    name: "site-meta",
    transformIndexHtml(html) {
      const { BRAND, STUDIO_NAME, OWNER, SITE_DESCRIPTION, SITE_URL, EMAIL, PHONE } = config;
      const url = isPlaceholder(SITE_URL) ? "" : SITE_URL.replace(/\/$/, "");
      const title = `${BRAND} — Look like you run the place.`;
      const ogImage = `${url}/og-image.jpg`;

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: STUDIO_NAME,
        alternateName: "Reign",
        description: SITE_DESCRIPTION,
        areaServed: { "@type": "Country", name: "United States" },
        founder: { "@type": "Person", name: OWNER },
        knowsLanguage: ["en", "es"],
        ...(url && { url, image: ogImage }),
        ...(!isPlaceholder(EMAIL) && { email: EMAIL }),
        ...(!isPlaceholder(PHONE) && { telephone: PHONE }),
      };

      const tags = [
        `<title>Reign Studios</title>`,
        `<meta name="description" content="${esc(SITE_DESCRIPTION)}" />`,
        `<meta name="robots" content="index, follow" />`,
        `<meta name="author" content="${esc(OWNER)}" />`,
        url && `<link rel="canonical" href="${esc(url)}/" />`,
        `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`,
        `<link rel="manifest" href="/site.webmanifest" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${esc(STUDIO_NAME)}" />`,
        `<meta property="og:title" content="${esc(title)}" />`,
        `<meta property="og:description" content="${esc(SITE_DESCRIPTION)}" />`,
        url && `<meta property="og:url" content="${esc(url)}/" />`,
        `<meta property="og:image" content="${esc(ogImage)}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${esc(STUDIO_NAME)}" />`,
        `<meta property="og:locale" content="en_US" />`,
        `<meta property="og:locale:alternate" content="es_US" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(title)}" />`,
        `<meta name="twitter:description" content="${esc(SITE_DESCRIPTION)}" />`,
        `<meta name="twitter:image" content="${esc(ogImage)}" />`,
        `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
      ]
        .filter(Boolean)
        .join("\n    ");

      return html.replace("<!--site-meta-->", tags);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
});
