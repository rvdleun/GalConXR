import { Meta, StoryObj } from "@storybook/react";
import { StorybookScreenWrapper } from "../../StorybookScreenWrapper";
import { Select, SelectOption } from "./Select";
import { useState } from "react";

const meta = {
  title: "Screen/Molecules/Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: SelectOption<number>[] = [
    {
        text: "Option #1",
        value: 1
    },
    {
        text: "Option #2",
        value: 2
    },
    {
        text: "Option #3",
        value: 3
    },
]

export const Primary: Story = {
  render: (props) => {
    const [selected, setSelected] = useState<SelectOption<number>>(options[0]);

    return (
        <StorybookScreenWrapper height={320} width={640}>
        <Select {...props} onNewSelectedOption={setSelected} selectedOption={selected} />
        </StorybookScreenWrapper>
    )
  },
  args: {
    options,
    selectedOption: options[0],
    x: 10,
    y: 10,
    width: 620,
  },
};
