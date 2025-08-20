import { useState } from "react";

import Slider from "./Slider";
import DisplayImage from "./DisplayImage";

export default function App() {
  // TODO: Use useReducer
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);

  const filterStyle = `
    blur(${blur}px)
    brightness(${brightness}%)
    contrast(${contrast}%)
    saturate(${saturate}%)
    sepia(${sepia}%)
  `;

  function handleBlurChange(event) {
    setBlur(event.target.value);
  }

  function handleBrightnessChange(event) {
    setBrightness(event.target.value);
  }

  function handleContrastChange(event) {
    setContrast(event.target.value);
  }

  function handleSaturateChange(event) {
    setSaturate(event.target.value);
  }

  function handleSepiaChange(event) {
    setSepia(event.target.value);
  }

  return (
    <div className="app">
      <h1>Deferred Value</h1>
      <DisplayImage filterStyle={filterStyle} />
      <ul>
        <Slider
          value={blur}
          deferred={blur}
          onChange={handleBlurChange}
          name="Blur"
          max="20"
        />
        <Slider
          value={brightness}
          deferred={brightness}
          onChange={handleBrightnessChange}
          name="Brightness"
          min="0"
          max="200"
        />
        <Slider
          value={contrast}
          deferred={contrast}
          onChange={handleContrastChange}
          name="Contrast"
          min="0"
          max="200"
        />
        <Slider
          value={saturate}
          deferred={saturate}
          onChange={handleSaturateChange}
          name="Saturate"
          min="0"
          max="200"
        />
        <Slider
          value={sepia}
          deferred={sepia}
          onChange={handleSepiaChange}
          name="Sepia"
          min="0"
          max="100"
        />
      </ul>
    </div>
  );
}
