import { Meta, StoryObj } from "@storybook/react";
import { Screen } from "./Screen";
import { StorybookScreenWrapper } from "./StorybookScreenWrapper";
import { Button } from "./atoms/Button/Button";
import { Label } from "./atoms/Label/Label";

const meta = {
  title: "Screen/Screen",
  component: Screen,
} satisfies Meta<typeof Screen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => (
    <StorybookScreenWrapper {...props}>
      <Label text="Label" x={160} y={10} />
      <Button text="Button" x={10} y={30} width={300} />
    </StorybookScreenWrapper>
  ),
  args: {
    height: 320,
    width: 320,
  },
};
