import type {Meta, StoryObj} from '@storybook/react';
import ZoomInCenter from './ZoomInCenter';
import Button from '../../atoms/Button';




const meta = {
    title: 'Animation/ZoomInCenter',
    component: ZoomInCenter,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
    render: function Render(args) {
        return <Button color="primary" onClick={ZoomInCenter.show}>
            Open
        </Button>
    }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {};
