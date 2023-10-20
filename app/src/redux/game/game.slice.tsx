import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArmyMovement, GalaxyPlanet } from "../../models/game.model.ts";
import { ArmyMovementProps } from "../../components/ArmyMovement/ArmyMovement.tsx";

export interface GameState {
  armyMovements: ArmyMovementProps[];
  selectedPlanetId?: string;
  planets: GalaxyPlanet[];
}

const initialState: GameState = {
  armyMovements: [],
  selectedPlanetId: undefined,
  planets: [],
};

const findPlanet = (planetId: string, state: GameState) =>
  state.planets.find(({ id }) => id === planetId);
let armyMovementId = 0;

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addArmyMovement(state: GameState, action: PayloadAction<ArmyMovement>) {
      const from = findPlanet(action.payload.from, state)!;
      const to = findPlanet(action.payload.to, state)!;

      state.armyMovements.push({
        id: ++armyMovementId,
        from: from.position!,
        to: to.position!,
        armyCount: action.payload.armyCount,
        faction: from.faction,
        planetId: action.payload.to,
      });
    },

    landArmies(
      state: GameState,
      action: PayloadAction<{
        armyCount: number;
        faction: number;
        planetId: string;
      }>,
    ) {
      const planet = findPlanet(action.payload.planetId, state)!;
      if (planet.faction === action.payload.faction) {
        planet.armyCount += action.payload.armyCount;
      } else {
        planet.armyCount -= action.payload.armyCount;
      }

      if (planet.armyCount < 0) {
        planet.armyCount *= -1;
        planet.faction = action.payload.faction;
      }
    },

    removeArmyMovement(state: GameState, action: PayloadAction<number>) {
      state.armyMovements = state.armyMovements.filter(
        ({ id }) => id !== action.payload,
      );
    },

    reset() {
      return { ...initialState };
    },

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
      const armyCount = Math.ceil(fromPlanet.armyCount * 0.5);
      fromPlanet.armyCount -= armyCount;

      gameSlice.caseReducers.addArmyMovement(state, {
        payload: {
          from: state.selectedPlanetId!,
          to: action.payload,
          armyCount,
        },
        type: "",
      });

      state.selectedPlanetId = undefined;
    },

    updatePlanetArmyCounts(state: GameState) {
      state.planets.forEach((planet) => (planet.armyCount += planet.scale));
    },
  },
});

export const {
  addArmyMovement,
  landArmies,
  removeArmyMovement,
  reset,
  setPlanets,
  toggleSelectedPlanetId,
  updatePlanetArmyCounts,
} = gameSlice.actions;

export default gameSlice.reducer;
