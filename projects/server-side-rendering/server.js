import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

import { App } from "./App.js";

const PORT = 3000;
const DIST_PATH = "dist";
const INDEX_FILENAME = "index.html";
const ENTRY_POINT_MARKUP = "{{ app }}";

async function getAppShell() {
  const shell = await readFile(
    join(import.meta.dirname, DIST_PATH, INDEX_FILENAME),
    "utf-8"
  );
  return shell.split(ENTRY_POINT_MARKUP);
}

function createServer(appShellHead, appShellTail) {
  const server = fastify();
  server.register(fastifyStatic, {
    root: join(import.meta.dirname, DIST_PATH),
    prefix: "/",
  });

  server.get("/", (_, reply) => {
    reply.raw.write(appShellHead);
    const reactApp = renderToString(createElement(App));
    reply.raw.write(reactApp);
    reply.raw.write(appShellTail);
    reply.raw.end();
  });

  server.listen({
    port: PORT,
  });
}

const [appShellHead, appShellTail] = await getAppShell();
createServer(appShellHead, appShellTail);
