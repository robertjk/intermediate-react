import { useDeferredValue, useReducer } from "react";

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

  const deferredParameters = useDeferredValue(parameters);

  function parametersReducer(parameters, newParameterAction) {
    return {
      ...parameters,
      ...newParameterAction,
    };
  }

  const filterStyle = `
    blur(${deferredParameters.blur}px)
    brightness(${deferredParameters.brightness}%)
    contrast(${deferredParameters.contrast}%)
    saturate(${deferredParameters.saturate}%)
    sepia(${deferredParameters.sepia}%)
    `;

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
          deferred={deferredParameters.blur}
          onChange={createChangeHandler("blur")}
          name="Blur"
          max="20"
        />
        <Slider
          value={parameters.brightness}
          deferred={deferredParameters.brightness}
          onChange={createChangeHandler("brightness")}
          name="Brightness"
          min="0"
          max="200"
        />
        <Slider
          value={parameters.contrast}
          deferred={deferredParameters.contrast}
          onChange={createChangeHandler("contrast")}
          name="Contrast"
          min="0"
          max="200"
        />
        <Slider
          value={parameters.saturate}
          deferred={deferredParameters.saturate}
          onChange={createChangeHandler("saturate")}
          name="Saturate"
          min="0"
          max="200"
        />
        <Slider
          value={parameters.sepia}
          deferred={deferredParameters.sepia}
          onChange={createChangeHandler("sepia")}
          name="Sepia"
          min="0"
          max="100"
        />
      </ul>
    </div>
  );
}
