import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { ArmyMovement, ArmyMovementProps } from "./ArmyMovement.tsx";
import { useEffect, useState } from "react";
import { GalaxyPlanet } from "../../models/game.model.ts";
import { determineGalaxyPlanetPositions } from "../Galaxy/Galaxy.utils.ts";
import { Galaxy } from "../Galaxy/Galaxy.tsx";

const planetsData: GalaxyPlanet[] = [
  {
    id: "from",
    armyCount: 15,
    faction: 1,
    x: -5,
    y: 0,
    scale: 1,
  },
  {
    id: "to",
    armyCount: 10,
    faction: 3,
    x: 5,
    y: 0,
    scale: 1,
  },
  {
    id: "from-2",
    armyCount: 10,
    faction: 1,
    x: -7,
    y: 2,
    scale: 1,
  },
  {
    id: "to-2",
    armyCount: 10,
    faction: 1,
    x: -6,
    y: 2,
    scale: 1,
  },
];
determineGalaxyPlanetPositions(planetsData);
// planetsData.forEach(planet => planet.position![2] = 0);

const meta = {
  title: "Components/ArmyMovement",
  component: ArmyMovement,
} satisfies Meta<typeof ArmyMovement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneArmyMovement: Story = {
  render: ({ from, to, ...props }) => (
    <StoryBookCanvasWrapper>
      <Galaxy planets={planetsData} />
      <ArmyMovement from={from} to={to} {...props} />
    </StoryBookCanvasWrapper>
  ),
  args: {
    from: "from",
    to: "to",
    id: 1,
    armyCount: 1,
    faction: 1,
    showPath: true,
  },
};

export const TwoArmyMovements: Story = {
  render: ({ from, to, ...props }) => (
    <StoryBookCanvasWrapper>
      <Galaxy planets={planetsData} />
      <ArmyMovement from="from" to="to" {...props} />
      <ArmyMovement from="from-2" to="to" {...props} />
    </StoryBookCanvasWrapper>
  ),
  args: {
    id: 1,
    armyCount: 1,
    faction: 1,
    showPath: true,
  },
};

export const PerformanceTest: Story = {
  render: ({ from, to, ...props }) => (
    <StoryBookCanvasWrapper>
      <Galaxy planets={planetsData} />
      <ArmyMovement id={1} faction={1} from="from" to="to" armyCount={500} />
      <ArmyMovement id={1} faction={2} from="from-2" to="to" armyCount={500} />
      <ArmyMovement id={1} faction={3} from="to-2" to="to" armyCount={500} />
    </StoryBookCanvasWrapper>
  ),
  args: {},
};

export const ShortDistance: Story = {
  render: ({ from, to, ...props }) => (
    <StoryBookCanvasWrapper>
      <Galaxy planets={planetsData} />
      <ArmyMovement from="from-2" to="to-2" {...props} />
    </StoryBookCanvasWrapper>
  ),
  args: {
    faction: 1,
    showPath: true,
  },
};
