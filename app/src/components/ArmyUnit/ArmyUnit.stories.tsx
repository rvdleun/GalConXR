import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { ArmyUnit } from "./ArmyUnit.tsx";

const meta = {
  title: "Components/ArmyUnit",
  component: ArmyUnit,
} satisfies Meta<typeof ArmyUnit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleArmy: Story = {
  render: (props) => (
    <StoryBookCanvasWrapper>
      <ArmyUnit {...props} />
    </StoryBookCanvasWrapper>
  ),
  args: {
    armyCount: 3,
    faction: 1,
  },
};

export const MultipleArmies: Story = {
  render: ({ armyCount1, armyCount2, faction1, faction2 }) => (
    <StoryBookCanvasWrapper>
      <ArmyUnit
        position={[0, 1, 0]}
        armyCount={armyCount1}
        faction={faction1}
      />
      <ArmyUnit
        position={[0, -1, 0]}
        armyCount={armyCount2}
        faction={faction2}
      />
    </StoryBookCanvasWrapper>
  ),
  args: {
    armyCount1: 2,
    faction1: 1,
    armyCount2: 2,
    faction2: 2,
  },
};
