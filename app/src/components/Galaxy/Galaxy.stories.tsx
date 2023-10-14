import type { Meta, StoryObj } from '@storybook/react';
import { StoryBookCanvasWrapper } from '../../../.storybook/StoryBookCanvasWrapper.tsx';
import { Galaxy } from './Galaxy.tsx';

const meta = {
    title: 'Component/Galaxy',
    component: Galaxy,
} satisfies Meta<typeof Galaxy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (props) => (<StoryBookCanvasWrapper><Galaxy {...props} /></StoryBookCanvasWrapper>),
    args: {
        planets: [
            { id: '1', x: 0, y: 0, armyCount: 10, faction: 1 },
            { id: '2', x: 5, y: 1, armyCount: 15, faction: 1 },
            { id: '3', x: 3, y: 4, armyCount: 5, faction: 2 },
            { id: '4', x: 7, y: 5, armyCount: 3, faction: 0 },
        ]
    }
};
