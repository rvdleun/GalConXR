import { AppState } from "../store.tsx";
import { DELTA_MODIFIER_PAUSED } from "./game.constants.ts";

export const selectArmyMovements = (state: AppState) =>
  state.game.armyMovements;

export const selectDeltaModifier = (state: AppState) =>
  state.game.deltaModifier;

export const selectGameIsPaused = (state: AppState) =>
  state.game.deltaModifier === DELTA_MODIFIER_PAUSED;

export const selectPlanets = (state: AppState) => state.game.planets;

export const selectSelectedPlanetId = (state: AppState) =>
  state.game.selectedPlanetId;
