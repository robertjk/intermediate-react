const { createRoot } = require("react-dom/client");
const { createFromFetch } = require("react-server-dom-webpack/client");

require("doodle.css/doodle.css");

console.log("Fetching flight response...");
const root = createRoot(document.getElementById("app-root"));
const App = createFromFetch(fetch("/react-flight"));

console.log("Rendering app root:", App);
root.render(App);
