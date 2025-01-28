import type {Meta, StoryObj} from '@storybook/react';
import Button from '../../atoms/Button';
import SliderLeftInRight from "./SliderLeftInRight";




const meta = {
    title: 'Animation/SliderLeftInRight',
    component: SliderLeftInRight,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
    render: function Render(args) {
        return <Button color="primary" onClick={SliderLeftInRight.show}>
            Open
        </Button>
    }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {};
