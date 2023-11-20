import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { ScreenPlane } from "./ScreenPlane.tsx";
import { Button } from "../../screen/atoms/Button/Button.tsx";

const meta = {
  title: "Components/ScreenPlane",
  component: ScreenPlane,
} satisfies Meta<typeof ScreenPlane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => (
    <StoryBookCanvasWrapper>
      <ScreenPlane {...props}>
        <Button
          onClick={() => alert("Click test")}
          x={10}
          y={10}
          width={230}
          text="Click me"
        />
      </ScreenPlane>
    </StoryBookCanvasWrapper>
  ),
  args: {
    height: 250,
    width: 250,
    renderCanvas: false,
  },
};
