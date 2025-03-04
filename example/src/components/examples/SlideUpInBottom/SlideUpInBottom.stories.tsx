import type {Meta, StoryObj} from '@storybook/react';
import SlideUpInBottom from './SlideUpInBottom';
import Button from '../../atoms/Button';




const meta = {
    title: 'Animation/SlideUpInBottom',
    component: SlideUpInBottom,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
    render: function Render(args) {
        return <div>
            <Button color="primary" onClick={SlideUpInBottom.show}>
                Open
            </Button>

            {Array.from({length: 50}).map((_, i) => {
                return <div key={i}>Test fill space</div>;
            })}


            <Button color="primary" onClick={SlideUpInBottom.show}>
            Open
        </Button>
    </div>;
    }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {};
