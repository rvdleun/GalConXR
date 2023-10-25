import { Meta, StoryObj } from "@storybook/react";
import { StorybookScreenWrapper } from "../../StorybookScreenWrapper";
import { Button } from "../Button/Button";

const meta = {
  title: "Screen/Atoms/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => (
    <StorybookScreenWrapper height={320} width={320}>
      <Button {...props} />
    </StorybookScreenWrapper>
  ),
  args: {
    label: "Test",
    onClick: () => alert("OnClick"),
    x: 10,
    y: 10,
    width: 300,
  },
};
