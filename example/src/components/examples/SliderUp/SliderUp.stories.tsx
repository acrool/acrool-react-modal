import type {Meta, StoryObj} from '@storybook/react';
import SliderUp from "./SliderUp";




const meta = {
    title: 'Examples/SliderUp',
    component: SliderUp,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {};
