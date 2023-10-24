import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/game.slice";
import uiReducer from "./ui/ui.slice";

export interface AppState {
  game: ReturnType<typeof gameReducer>;
  ui: ReturnType<typeof uiReducer>;
}

const store = configureStore({
  reducer: {
    game: gameReducer,
    ui: uiReducer,
  },
});

export default store;
