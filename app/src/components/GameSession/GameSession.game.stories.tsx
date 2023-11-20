import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { GameSession, GameSessionProps } from "./GameSession.tsx";
import { GalaxySize } from "../../utils/galaxy-generator.utils.ts";
import { PlayerType } from "../../models/game.model.ts";
import { AiMethod } from "../../utils/ai-player.utils.ts";

const meta = {
  title: "Game/GameSession",
  component: GameSession,
} satisfies Meta<typeof GameSession>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (props: GameSessionProps) => (
  <StoryBookCanvasWrapper>
    <GameSession {...props} />
  </StoryBookCanvasWrapper>
);

export const PlayerSmallGalaxy: Story = {
  render,
  args: {
    settings: {
      galaxySize: GalaxySize.SMALL,
      players: [
        {
          aiMethod: AiMethod.RANDOM,
          faction: 1,
          type: PlayerType.HUMAN,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 2,
          type: PlayerType.AI,
        },
      ],
    },
  },
};

export const PlayerMediumGalaxy: Story = {
  render,
  args: {
    settings: {
      galaxySize: GalaxySize.SMALL,
      players: [
        {
          aiMethod: AiMethod.RANDOM,
          faction: 1,
          type: PlayerType.HUMAN,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 2,
          type: PlayerType.AI,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 3,
          type: PlayerType.AI,
        },
      ],
    },
  },
};

export const PlayerLargeGalaxy: Story = {
  render,
  args: {
    settings: {
      galaxySize: GalaxySize.LARGE,
      players: [
        {
          aiMethod: AiMethod.RANDOM,
          faction: 1,
          type: PlayerType.HUMAN,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 2,
          type: PlayerType.AI,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 3,
          type: PlayerType.AI,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 4,
          type: PlayerType.AI,
        },
      ],
    },
  },
};

export const AISmallGalaxy: Story = {
  render,
  args: {
    settings: {
      galaxySize: GalaxySize.SMALL,
      players: [
        {
          aiMethod: AiMethod.RANDOM,
          faction: 1,
          type: PlayerType.AI,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 2,
          type: PlayerType.AI,
        },
      ],
    },
  },
};

export const AIMediumGalaxy: Story = {
  render,
  args: {
    settings: {
      galaxySize: GalaxySize.MEDIUM,
      players: [
        {
          aiMethod: AiMethod.RANDOM,
          faction: 1,
          type: PlayerType.AI,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 2,
          type: PlayerType.AI,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 3,
          type: PlayerType.AI,
        },
      ],
    },
  },
};

export const AILargeGalaxy: Story = {
  render,
  args: {
    settings: {
      galaxySize: GalaxySize.LARGE,
      players: [
        {
          aiMethod: AiMethod.RANDOM,
          faction: 1,
          type: PlayerType.AI,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 2,
          type: PlayerType.AI,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 3,
          type: PlayerType.AI,
        },
        {
          aiMethod: AiMethod.RANDOM,
          faction: 4,
          type: PlayerType.AI,
        },
      ],
    },
  },
};

export const HasWinner: Story = {
  render,
  args: {
    settings: {
      galaxySize: GalaxySize.SMALL,
      players: [
        {
          aiMethod: AiMethod.RANDOM,
          faction: 1,
          type: PlayerType.AI,
        },
      ],
    },
  },
};
