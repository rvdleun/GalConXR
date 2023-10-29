import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { GameSession } from './GameSession.tsx';
import { GalaxySize } from '../../utils/galaxy-generator.utils.ts';
import { PlayerType } from '../../models/game.model.ts';

const meta = {
    title: "Game/GameSession",
    component: GameSession,
} satisfies Meta<typeof GameSession>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (props) => (
        <StoryBookCanvasWrapper>
            <GameSession {...props} />
        </StoryBookCanvasWrapper>
    ),
    args: {
        settings: {
            galaxySize: GalaxySize.SMALL,
            players: [
                PlayerType.HUMAN,
                PlayerType.AI,
            ]
        }
    },
};
