import {useEffect} from "react";
import {currentDeltaModifier, DeltaModifier, setCurrentDeltaModifier} from "../utils/delta-modifier.tsx";

export const useKeyboardControls = () => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.code) {
        case "KeyP":
          setCurrentDeltaModifier(currentDeltaModifier === DeltaModifier.NORMAL ? DeltaModifier.PAUSED : DeltaModifier.NORMAL);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.addEventListener("keydown", handleKeyDown);
  }, []);
};
