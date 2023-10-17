import type { Meta, StoryObj } from "@storybook/react";
import { Galaxy } from "../components/Galaxy/Galaxy";
import { GalaxySize, generateGalaxy } from "./galaxy-generator.utils";
import { StoryBookCanvasWrapper } from "../../.storybook/StoryBookCanvasWrapper";

const meta = {
  title: "Utils/GalaxyGenerator",
  component: Galaxy,
} satisfies Meta<typeof Galaxy>;

export default meta;
type Story = StoryObj<typeof meta>;

const Environment = () => {
  const planets = generateGalaxy(GalaxySize.LARGE);

  console.log('Generated planets', planets);

  return (
    <Galaxy planets={planets} />
  );
};

export const GenerateGalaxy: Story = {
  render: () => <StoryBookCanvasWrapper><Environment /></StoryBookCanvasWrapper>
};
