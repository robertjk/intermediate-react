import { useReducer } from "react";

import Slider from "./Slider";
import DisplayImage from "./DisplayImage";

export default function App() {
  const [parameters, dispatchParametersAction] = useReducer(parametersReducer, {
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
  });

  function parametersReducer(parameters, newParameterAction) {
    return {
      ...parameters,
      ...newParameterAction,
    };
  }

  const filterStyle = `
    blur(${parameters.blur}px)
    brightness(${parameters.brightness}%)
    contrast(${parameters.contrast}%)
    saturate(${parameters.saturate}%)
    sepia(${parameters.sepia}%)
    `;

  console.log(filterStyle);

  const createChangeHandler = (parameter) => (event) => {
    dispatchParametersAction({ [parameter]: Number(event.target.value) });
  };

  return (
    <div className="app">
      <h1>Deferred Value</h1>
      <DisplayImage filterStyle={filterStyle} />
      <ul>
        <Slider
          value={parameters.blur}
          deferred={parameters.blur}
          onChange={createChangeHandler("blur")}
          name="Blur"
          max="20"
        />
        <Slider
          value={parameters.brightness}
          deferred={parameters.brightness}
          onChange={createChangeHandler("brightness")}
          name="Brightness"
          min="0"
          max="200"
        />
        <Slider
          value={parameters.contrast}
          deferred={parameters.contrast}
          onChange={createChangeHandler("contrast")}
          name="Contrast"
          min="0"
          max="200"
        />
        <Slider
          value={parameters.saturate}
          deferred={parameters.saturate}
          onChange={createChangeHandler("saturate")}
          name="Saturate"
          min="0"
          max="200"
        />
        <Slider
          value={parameters.sepia}
          deferred={parameters.sepia}
          onChange={createChangeHandler("sepia")}
          name="Sepia"
          min="0"
          max="100"
        />
      </ul>
    </div>
  );
}
