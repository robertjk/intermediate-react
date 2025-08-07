"use client";

import { useState } from "react";

function ClientComponent() {
  console.log("Rendering client component");

  const [counter, setCounter] = useState(0);

  return (
    <fieldset>
      <legend>Client Component</legend>
      <p>Counter: {counter}</p>
      <button onClick={setCounter(counter + 1)}>Increment</button>
    </fieldset>
  );
}

export { ClientComponent };
