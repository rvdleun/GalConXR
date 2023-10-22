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
];
determineGalaxyPlanetPositions(planetsData);

const meta = {
  title: "Components/ArmyMovement",
  component: ArmyMovement,
} satisfies Meta<typeof ArmyMovement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: ({ from, to, ...props }) => (
    <StoryBookCanvasWrapper>
      <Galaxy planets={planetsData} />
      <ArmyMovement from={from} to={to} {...props} />
    </StoryBookCanvasWrapper>
  ),
  args: {
    from: 'from',
    to: 'to',
    id: 1,
    armyCount: 1,
    faction: 1,
  },
};
