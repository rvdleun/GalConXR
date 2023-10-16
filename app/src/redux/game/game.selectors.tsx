import { AppState } from "../store.tsx";

export const selectArmyMovements = (state: AppState) =>
  state.game.armyMovements;

export const selectPlanets = (state: AppState) => state.game.planets;

export const selectSelectedPlanetId = (state: AppState) =>
  state.game.selectedPlanetId;
