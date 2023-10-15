import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { Army } from "./Army.tsx";

const meta = {
    title: "Component/Army",
    component: Army,
} satisfies Meta<typeof Army>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleArmy: Story = {
    render: (props) => (
        <StoryBookCanvasWrapper>
            <Army {...props} />
        </StoryBookCanvasWrapper>
    ),
    args: {
        armyCount: 3,
        faction: 1
    },
};

export const MultipleArmies: Story = {
    render: ({ armyCount1, armyCount2, faction1, faction2}) => (
        <StoryBookCanvasWrapper>
            <Army position={[0, 1, 0]} armyCount={armyCount1} faction={faction1} />
            <Army position={[0, -1, 0]}  armyCount={armyCount2} faction={faction2} />
        </StoryBookCanvasWrapper>
    ),
    args: {
        armyCount1: 2,
        faction1: 1,
        armyCount2: 2,
        faction2: 2,
    },
};
