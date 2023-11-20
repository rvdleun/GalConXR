import { useState } from "react";

let globalDeltaModifier = 1;

export const useDeltaModifier = () => {
  const [deltaModifier, setDeltaModifier] = useState(globalDeltaModifier);

  const updateDeltaModifier = (newDeltaModifier: number) => {
    globalDeltaModifier = newDeltaModifier;
    setDeltaModifier(newDeltaModifier);
  };

  return {
    deltaModifier,
    setDeltaModifier: updateDeltaModifier,
  };
};
