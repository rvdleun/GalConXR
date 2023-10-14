import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArmyMovement, GalaxyPlanet } from "../../models/game.model.ts";

export interface GameState {
  armyMovements: ArmyMovement[];
  selectedPlanetId?: string;
  planets: GalaxyPlanet[];
}

const initialState: GameState = {
  armyMovements: [],
  selectedPlanetId: undefined,
  planets: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlanets(state: GameState, action: PayloadAction<GalaxyPlanet[]>) {
      state.planets = action.payload;
    },

    toggleSelectedPlanetId(state: GameState, action: PayloadAction<string>) {
      if (state.selectedPlanetId === action.payload) {
        state.selectedPlanetId = undefined;
        return;
      }

      if (state.selectedPlanetId === undefined) {
        state.selectedPlanetId = action.payload;
        return;
      }

      const fromPlanet = state.planets.find(
        ({ id }) => id === state.selectedPlanetId,
      )!;
      const armyCount = Math.floor(fromPlanet.armyCount * 0.5);
      fromPlanet.armyCount -= armyCount;

      const attack: ArmyMovement = {
        from: state.selectedPlanetId,
        to: action.payload,
        armyCount,
      };

      state.armyMovements.push(attack);
      state.selectedPlanetId = undefined;
    },
  },
});

export const { setPlanets, toggleSelectedPlanetId } = gameSlice.actions;

export default gameSlice.reducer;
