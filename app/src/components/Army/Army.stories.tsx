import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { Army } from "./Army.tsx";

const meta = {
  title: "Component/Army",
  component: Army,
} satisfies Meta<typeof Army>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => (
    <StoryBookCanvasWrapper>
      <Army {...props} />
    </StoryBookCanvasWrapper>
  ),
  args: {
    armyCount: 3,
    end: 0,
    faction: 1,
    numberVisible: 3,
    start: 0,
  },
};
