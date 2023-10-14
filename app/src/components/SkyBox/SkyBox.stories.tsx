import type { Meta, StoryObj } from "@storybook/react";
import { SkyBox } from "./SkyBox.tsx";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";

const meta = {
  title: "Component/SkyBox",
  component: SkyBox,
} satisfies Meta<typeof SkyBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <StoryBookCanvasWrapper>
      <SkyBox />
    </StoryBookCanvasWrapper>
  ),
};
