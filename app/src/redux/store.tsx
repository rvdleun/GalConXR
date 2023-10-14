import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/game.slice";

export interface AppState {
  game: ReturnType<typeof gameReducer>;
}

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;
