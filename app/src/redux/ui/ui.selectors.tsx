import { AppState } from "../store";

export const selectGameHeight = (state: AppState) => state.ui.gameHeight;
