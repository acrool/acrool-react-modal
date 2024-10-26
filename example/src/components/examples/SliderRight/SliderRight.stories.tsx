import type {Meta, StoryObj} from '@storybook/react';
import SliderRight from "./SliderRight";




const meta = {
    title: 'Examples/SliderRight',
    component: SliderRight,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {};
