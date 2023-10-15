import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { ArmyMovement } from './ArmyMovement.tsx';

const meta = {
    title: "Component/ArmyMovement",
    component: ArmyMovement,
} satisfies Meta<typeof ArmyMovement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: ({ from, to, ...props }) => (
        <StoryBookCanvasWrapper>
            <mesh position={from}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color={0xff0000} />
            </mesh>
            <mesh position={to}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color={0x00ff00} />
            </mesh>
            <ArmyMovement from={from} to={to} {...props} />
        </StoryBookCanvasWrapper>
    ),
    args: {
        from: [-10, 0, 0],
        to: [10, 0, 0],
        armyCount: 4,
        faction: 1
    },
};
