import {ModalPortal} from '@acrool/react-modal';
import {Flex} from '@acrool/react-grid';
import type {Meta, StoryObj} from '@storybook/react';
import {createElement, useEffect} from 'react';
import Button from "../src/components/Button";
import {CreateModalPrimary, CreateModalWithArgs} from "./CreateModal";
import CreateModalWithClickMaskClose from "./CreateModal/CreateModalWithClickMaskClose";




const meta = {
    title: 'Components/CreateModal',
    component: ModalPortal,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Custom skeleton by component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        message: 'loading...'
    },
} satisfies Meta<typeof ModalPortal>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {},
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
    args: {},
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
    args: {},
    render: function Render(args) {

        return <Button
            color="primary"
            onClick={CreateModalWithClickMaskClose.show}
        >
            Open
        </Button>;
    },
};
