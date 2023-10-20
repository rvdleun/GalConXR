import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { ArmyMovement } from "./ArmyMovement.tsx";

const meta = {
  title: "Components/ArmyMovement",
  component: ArmyMovement,
} satisfies Meta<typeof ArmyMovement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: ({ from, to, ...props }) => (
    <StoryBookCanvasWrapper>
      <mesh position={from} scale={0.5}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
      <mesh position={to} scale={0.5}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color={0x00ff00} />
      </mesh>
      <ArmyMovement from={from} to={to} {...props} />
    </StoryBookCanvasWrapper>
  ),
  args: {
    from: [-0.4, 0, -0.1],
    to: [0.4, 0, -0.1],
    armyCount: 40,
    faction: 1,
  },
};
