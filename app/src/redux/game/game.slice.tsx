import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArmyMovement, GalaxyPlanet } from "../../models/game.model.ts";
import { ArmyMovementProps } from "../../components/ArmyMovement/ArmyMovement.tsx";
import { DELTA_MODIFIER_PAUSED } from "./game.constants.ts";

export interface GameState {
  armyMovements: ArmyMovementProps[];
  deltaModifier: number;
  selectedPlanetId?: string;
  planets: GalaxyPlanet[];
  winner?: number;
}

const initialState: GameState = {
  armyMovements: [],
  deltaModifier: 1,
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
      from.armyCount -= action.payload.armyCount;

      state.armyMovements.push({
        id: ++armyMovementId,
        from: action.payload.from,
        to: action.payload.to,
        armyCount: action.payload.armyCount,
        faction: from.faction,
      });
    },

    freezeGame(state: GameState) {
      state.deltaModifier = 0;
    },

    landArmies(
      state: GameState,
      action: PayloadAction<{
        armyCount: number;
        faction: number;
        planetId: string;
      }>,
    ) {
      const planet = findPlanet(action.payload.planetId, state);
      if (!planet) {
        return;
      }

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

    playGame(state: GameState) {
      state.deltaModifier = 1;
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

    setWinner(state: GameState, action: PayloadAction<number>) {
      state.winner = action.payload;
    },

    togglePauseGame(state) {
      state.deltaModifier =
        state.deltaModifier === DELTA_MODIFIER_PAUSED
          ? 1
          : DELTA_MODIFIER_PAUSED;
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
      state.planets
        .filter((planet) => planet.faction > 0)
        .forEach((planet) => (planet.armyCount += planet.scale));
    },
  },
});

export const {
  addArmyMovement,
  freezeGame,
  landArmies,
  playGame,
  removeArmyMovement,
  reset,
  setPlanets,
  setWinner,
  togglePauseGame,
  toggleSelectedPlanetId,
  updatePlanetArmyCounts,
} = gameSlice.actions;

export default gameSlice.reducer;
