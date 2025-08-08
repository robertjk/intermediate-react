import { hydrateRoot } from "react-dom/client";
import { createElement } from "react";

import { App } from "./App.js";

const ROOT_ID = "root";

hydrateRoot(document.getElementById(ROOT_ID), createElement(App));
