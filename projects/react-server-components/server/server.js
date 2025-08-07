import path from "node:path";
import { readFile } from "node:fs";
import fastify from "fastify";
import fastifyStaticPlugin from "@fastify/static";
import React from "react";
import { renderToPipeableStream } from "react-server-dom-webpack/server";

import { App } from "../src/App.jsx";
