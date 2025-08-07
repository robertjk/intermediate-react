import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";

import "doodle.css/doodle.css";

console.log("Fetching flight response...");
const root = createRoot(document.getElementById("app-root"));
const App = createFromFetch(fetch("/react-flight"));

console.log("Rendering app root:", App);
root.render(App);
