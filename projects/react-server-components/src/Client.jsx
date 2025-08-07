import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";

import "doodle.css/doodle.css";

console.log("Fetching flight response...");
const root = createRoot(document.getElementById("root"));
const appFlight = createFromFetch(fetch("/react-flight"));

console.log("Rendering root:", appFlight);
root.render(appFlight);
