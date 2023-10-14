import type { Meta, StoryObj } from '@storybook/react';
import { StoryBookCanvasWrapper } from '../../../.storybook/StoryBookCanvasWrapper.tsx';
import { Planet } from './Planet.tsx';

const meta = {
    title: 'Component/Planet',
    component: Planet,
} satisfies Meta<typeof Planet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (props) => (<StoryBookCanvasWrapper><Planet {...props} /></StoryBookCanvasWrapper>),
    args: {
        armyCount: 10,
    }
};
