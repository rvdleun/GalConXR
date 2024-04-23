import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { togglePauseGame } from "../redux/game/game.slice";

export const useKeyboardControls = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.code) {
        case "KeyP":
          dispatch(togglePauseGame());
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.addEventListener("keydown", handleKeyDown);
  }, []);
};
