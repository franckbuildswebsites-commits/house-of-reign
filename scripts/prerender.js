// Runs after `vite build`: renders the app to HTML and writes it into dist/index.html,
// so the deployed page has all of its content without waiting for JavaScript
// (faster first paint; search engines and link previews see everything).
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href);

const file = `${root}dist/index.html`;
const placeholder = '<div id="root"></div>';
const html = readFileSync(file, "utf8");
if (!html.includes(placeholder)) throw new Error(`Couldn't find ${placeholder} in dist/index.html`);

writeFileSync(file, html.replace(placeholder, () => `<div id="root">${render()}</div>`));
rmSync(`${root}dist-ssr`, { recursive: true, force: true });
console.log("Prerendered dist/index.html");
