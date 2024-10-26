import type {Meta, StoryObj} from '@storybook/react';
import CreateStageModalPrimary from "./CreateStateModalPrimary";




const meta = {
    title: 'Components/CreateStageModal',
    // component: CreateStageModalPrimary,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Custom skeleton by component'
            },
        },
    },
    argTypes: {},
    args: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    render: function Render(args) {
        return <CreateStageModalPrimary/>;
    },
};
