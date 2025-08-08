const { join, resolve } = require("node:path");
const { readFileSync } = require("node:fs");
const fastify = require("fastify");
const fastifyStaticPlugin = require("@fastify/static");
const { createElement } = require("react");
const { renderToPipeableStream } = require("react-server-dom-webpack/server");
const { App } = require("../src/App.jsx");

const PORT_DEFAULT = 3000;

const manifest = readFileSync(
  resolve(__dirname, "../dist/react-client-manifest.json"),
  "utf8"
);
const moduleMap = JSON.parse(manifest);
const port = process.env.PORT || PORT_DEFAULT;

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

server.register(fastifyStaticPlugin, {
  root: join(__dirname, "../dist"),
  prefix: "/assets/",
});

server.register(fastifyStaticPlugin, {
  root: join(__dirname, "../public"),
  decorateReply: false,
});

server.get("/", async function rootHandler(request, reply) {
  return reply.sendFile("index.html");
});

server.get("/react-flight", function reactFlightHandler(request, reply) {
  try {
    reply.header("Content-Type", "application/octet-stream");
    const { pipe } = renderToPipeableStream(createElement(App), moduleMap);
    pipe(reply.raw);
  } catch (err) {
    request.log.error("React flight request error:", err);
    throw err;
  }
});

function startServer() {
  try {
    server.listen({ port: port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

module.exports = { startServer };
