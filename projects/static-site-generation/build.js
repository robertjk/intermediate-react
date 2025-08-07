import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { readFile, writeFile, mkdir, readdir, unlink } from "node:fs/promises";
import { join } from "node:path";

import App from "./App.js";

async function createHTML(App) {
  const app = renderToStaticMarkup(createElement(App));
  const htmlSrc = await readFile(
    join(import.meta.dirname, "index.html"),
    "utf-8"
  );
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

const html = await createHTML(App);
const distPath = join(import.meta.dirname, "dist");
await removeExistingFiles(distPath);
await writeHTML(distPath, "index.html", html);

console.log("SSG build complete.\nOutput written to:", distPath);
