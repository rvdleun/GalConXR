import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { Galaxy } from "./Galaxy.tsx";
import { GalaxyPlanet } from "../../models/game.model.ts";
import { determineGalaxyPlanetPositions } from "./Galaxy.utils.ts";

const meta = {
  title: "Components/Galaxy",
  component: Galaxy,
} satisfies Meta<typeof Galaxy>;

export default meta;
type Story = StoryObj<typeof meta>;

const Environment = ({ planets }: { planets: GalaxyPlanet[] }) => {
  determineGalaxyPlanetPositions(planets);

  return <Galaxy planets={planets} />;
};

const render = ({ planets }: { planets: GalaxyPlanet[] }) => (
  <StoryBookCanvasWrapper>
    <Environment planets={planets} />
  </StoryBookCanvasWrapper>
);
export const SmallGalaxy: Story = {
  render,
  args: {
    planets: [
      { id: "1", x: 0, y: 0, armyCount: 10, faction: 1 },
      { id: "2", x: 6, y: 1, armyCount: 15, faction: 1 },
      { id: "3", x: 3, y: 4, armyCount: 5, faction: 2 },
      { id: "4", x: 7, y: 5, armyCount: 3, faction: 0 },
    ],
  },
};

export const MediumGalaxy: Story = {
  render,
  args: {
    planets: [
      { id: "1", x: 0, y: 0, armyCount: 10, faction: 1 },
      { id: "2", x: 6, y: 1, armyCount: 15, faction: 1 },
      { id: "3", x: 3, y: 4, armyCount: 5, faction: 2 },
      { id: "4", x: 7, y: 5, armyCount: 13, faction: 2 },
      { id: "5", x: 9, y: 2, armyCount: 2, faction: 3 },
      { id: "6", x: 12, y: 3, armyCount: 4, faction: 3 },
      { id: "7", x: 15, y: 5, armyCount: 12, faction: 4 },
      { id: "8", x: 17, y: 0, armyCount: 8, faction: 4 },
    ],
  },
};

export const LargeGalaxy: Story = {
  render,
  args: {
    planets: [
      { id: "1", x: 0, y: 0, armyCount: 10, faction: 1 },
      { id: "2", x: 6, y: 1, armyCount: 15, faction: 1 },
      { id: "3", x: 3, y: 4, armyCount: 5, faction: 2 },
      { id: "4", x: 7, y: 5, armyCount: 13, faction: 2 },
      { id: "5", x: 9, y: 2, armyCount: 2, faction: 3 },
      { id: "6", x: 12, y: 3, armyCount: 4, faction: 3 },
      { id: "7", x: 15, y: 5, armyCount: 12, faction: 4 },
      { id: "8", x: 17, y: 0, armyCount: 8, faction: 4 },
      { id: "9", x: 20, y: 0, armyCount: 10, faction: 1 },
      { id: "10", x: 21, y: 1, armyCount: 15, faction: 1 },
      { id: "11", x: 25, y: 4, armyCount: 5, faction: 2 },
      { id: "12", x: 28, y: 5, armyCount: 13, faction: 2 },
      { id: "13", x: 30, y: 2, armyCount: 2, faction: 3 },
      { id: "14", x: 31, y: 3, armyCount: 4, faction: 3 },
      { id: "15", x: 32, y: 5, armyCount: 12, faction: 4 },
      { id: "16", x: 35, y: 0, armyCount: 8, faction: 4 },
    ],
  },
};

const xOffset = 10;
export const ClusteredGalaxy: Story = {
  render,
  args: {
    planets: [
      { id: "1", x: xOffset + -1, y: 2, armyCount: 10, faction: 1 },
      { id: "1", x: xOffset + 0, y: 2, armyCount: 10, faction: 1 },
      { id: "1", x: xOffset + 1, y: 2, armyCount: 10, faction: 1 },
      { id: "1", x: xOffset + -1, y: 3, armyCount: 10, faction: 1 },
      { id: "1", x: xOffset + 0, y: 3, armyCount: 10, faction: 1 },
      { id: "1", x: xOffset + 1, y: 3, armyCount: 10, faction: 1 },
      { id: "1", x: xOffset + -1, y: 4, armyCount: 10, faction: 1 },
      { id: "1", x: xOffset + 0, y: 4, armyCount: 10, faction: 1 },
      { id: "1", x: xOffset + 1, y: 4, armyCount: 10, faction: 1 },
    ],
  },
};

let allPlanets = [];
for(let x = 0; x < 36; x++) {
  for(let y = 0; y < 6; y++) {
    allPlanets.push({
      id: `${x}-${y}`,
      x,
      y,
      armyCount: 10,
      faction: 0
    })
  }
}export const FilledGalaxy: Story = {
  render,
  args: {
    planets: allPlanets,
  },
};
