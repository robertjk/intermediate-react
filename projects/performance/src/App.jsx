import { useCallback, useEffect, useMemo, useState } from "react";
import { marked } from "marked";

import MarkdownPreview from "./MarkdownPreview";
import markdownContent from "./markdownContent";

export default function App() {
  const [text, setText] = useState(markdownContent);
  const [time, setTime] = useState(Date.now());
  const [theme, setTheme] = useState("green");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = useMemo(
    () => ({
      text,
      theme,
    }),
    [text, theme]
  );
  const render = useCallback((text) => marked.parse(text), []);

  function handleThemeChange(event) {
    setTheme(event.target.value);
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  return (
    <div className="app">
      <h1>Perf with React</h1>
      <h2>Current Time: {time}</h2>

      <label htmlFor="theme">
        Choose a theme
        <select onChange={handleThemeChange} value={theme}>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
        </select>
      </label>

      <div className="markdown">
        <textarea
          className="markdown-editor"
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <MarkdownPreview options={options} render={render} />
      </div>
    </div>
  );
}
