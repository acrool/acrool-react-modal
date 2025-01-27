import type {Meta, StoryObj} from '@storybook/react';
import ZoomInCenter from "./ZoomInCenter";




const meta = {
    title: 'Examples/ZoomInCenter',
    component: ZoomInCenter,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {};
