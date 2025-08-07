import { createElement } from "react";

function App() {
  return createElement(
    "div",
    null,
    createElement("h1", null, "Hello Frontend Masters"),
    createElement("p", null, "This is SSG")
  );
}

export default App;
