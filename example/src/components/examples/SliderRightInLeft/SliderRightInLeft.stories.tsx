import type {Meta, StoryObj} from '@storybook/react';
import SliderRightInLeft from './SliderRightInLeft';
import Button from '../../atoms/Button';




const meta = {
    title: 'Animation/SliderRightInLeft',
    component: SliderRightInLeft,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
    render: function Render(args) {
        return <Button color="primary" onClick={SliderRightInLeft.show}>
            Open
        </Button>
    }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {};
