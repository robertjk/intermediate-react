import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { readFile, writeFile, mkdir, readdir, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import App from "./App.js";

function dirnameForESModules() {
  const __filename = fileURLToPath(import.meta.url);
  return dirname(__filename);
}

async function createHTML(__dirname, App) {
  const app = renderToStaticMarkup(createElement(App));
  const htmlSrc = await readFile(join(__dirname, "index.html"), "utf-8");
  return htmlSrc.replace("{{ app }}", app);
}

async function removeExistingFiles(path) {
  await mkdir(path, { recursive: true });
  const files = await readdir(path);
  for (const file of files) {
    await unlink(join(path, file));
  }
}

async function writeHTML(path, filename, html) {
  await writeFile(join(path, filename), html);
}

const __dirname = dirnameForESModules();
const html = await createHTML(__dirname, App);
const distPath = join(__dirname, "dist");
await removeExistingFiles(distPath);
await writeHTML(distPath, "index.html", html);

console.log("SSG build complete.\nOutput written to:", distPath);
