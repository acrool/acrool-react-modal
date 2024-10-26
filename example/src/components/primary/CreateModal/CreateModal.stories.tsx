import {Flex} from '@acrool/react-grid';
import type {Meta, StoryObj} from '@storybook/react';
import Button from "../../atoms/Button";
import CreateModalPrimary from "./CreateModalPrimary";
import CreateModalWithArgs from "./CreateModalWithArgs";
import CreateModalWithClickMaskClose from "./CreateModalWithClickMaskClose";
import CreateModalWithCustomAnimation from "./CreateModalWithCustomAnimation";
import CreateModalWithFetchWait from "./CreateModalWithFetchWait";




const meta = {
    title: 'Components/CreateModal',
    // component: CreateModalPrimary,
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
        return <Button
            color="primary"
            onClick={CreateModalPrimary.show}
        >
            Open
        </Button>;
    },
};

export const WithArgs: Story = {
    render: function Render(args) {


        return <Flex className="gap-1">
            <Button
                color="primary"
                onClick={() => CreateModalWithArgs.show({promotionId: '1b9d6bcd'})}
            >
                Open (Args: 1b9d6bcd)
            </Button>
            <Button
                color="primary"
                onClick={() => CreateModalWithArgs.show({promotionId: '2c0e7cde'})}
            >
                Open (Args: 2c0e7cde)
            </Button>
        </Flex>;
    },
};


export const WithClickMaskClose: Story = {
    render: function Render(args) {

        return <Button
            color="primary"
            onClick={CreateModalWithClickMaskClose.show}
        >
            Open
        </Button>;
    },
};

export const WithCustomAnimation: Story = {
    render: function Render(args) {

        return <Button
            color="primary"
            onClick={CreateModalWithCustomAnimation.show}
        >
            Open
        </Button>;
    },
};


export const WithFetchWait: Story = {
    render: function Render(args) {

        return <Button
            color="primary"
            onClick={CreateModalWithFetchWait.show}
        >
            Open
        </Button>;
    },
};
