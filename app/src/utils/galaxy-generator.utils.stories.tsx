import type { Meta, StoryObj } from "@storybook/react";
import { Galaxy } from "../components/Galaxy/Galaxy";
import {
  GalaxySize,
  assignPlanetsToPlayers,
  generateGalaxy,
} from "./galaxy-generator.utils";
import { StoryBookCanvasWrapper } from "../../.storybook/StoryBookCanvasWrapper";
import { FC } from "react";

const meta = {
  title: "Utils/GalaxyGenerator",
  component: Galaxy,
} satisfies Meta<typeof Galaxy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GenerateLargeGalaxy: Story = {
  render: () => {
    const planets = generateGalaxy(GalaxySize.LARGE);

    return (
      <StoryBookCanvasWrapper>
        <Galaxy planets={planets} />
      </StoryBookCanvasWrapper>
    );
  },
};

const AssignPlayersEnvironment: FC<{
  factions: number;
  galaxySize: GalaxySize;
}> = ({ factions, galaxySize }) => {
  const planets = generateGalaxy(galaxySize);
  assignPlanetsToPlayers(planets, factions, galaxySize);

  return (
    <StoryBookCanvasWrapper>
      <Galaxy planets={planets} />
    </StoryBookCanvasWrapper>
  );
};

export const PlacePlayersInSmallGalaxy: Story = {
  render: (props) => <AssignPlayersEnvironment {...props} />,
  args: {
    factions: 2,
    galaxySize: GalaxySize.SMALL,
  },
};

export const PlacePlayersInMediumGalaxy: Story = {
  render: (props) => <AssignPlayersEnvironment {...props} />,
  args: {
    factions: 3,
    galaxySize: GalaxySize.MEDIUM,
  },
};

export const PlacePlayersInLargeGalaxy: Story = {
  render: (props) => <AssignPlayersEnvironment {...props} />,
  args: {
    factions: 4,
    galaxySize: GalaxySize.LARGE,
  },
};
