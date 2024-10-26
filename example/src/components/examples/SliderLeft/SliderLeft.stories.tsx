import type {Meta, StoryObj} from '@storybook/react';
import SliderLeft from "./SliderLeft";




const meta = {
    title: 'Examples/SliderLeft',
    component: SliderLeft,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {};
