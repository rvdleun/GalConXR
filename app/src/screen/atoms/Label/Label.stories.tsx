import { Meta, StoryObj } from "@storybook/react";
import { StorybookScreenWrapper } from "../../StorybookScreenWrapper";
import { Label } from "./Label";

const meta = {
  title: "Screen/Atoms/Label",
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => (
    <StorybookScreenWrapper height={320} width={320}>
      <Label {...props} />
    </StorybookScreenWrapper>
  ),
  args: {
    text: "Test",
    x: 160,
    y: 50,
  },
};
