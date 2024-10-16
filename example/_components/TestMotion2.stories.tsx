import {ModalPortal} from '@acrool/react-modal';
import {Flex} from '@acrool/react-grid';
import type {Meta, StoryObj} from '@storybook/react';
import {createElement, useEffect} from 'react';
import Button from "../src/components/Button";
import {CreateModalPrimary, CreateModalWithArgs} from "./CreateModal";
import CreateModalWithClickMaskClose from "./CreateModal/CreateModalWithClickMaskClose";
import CreateModalWithFetchWait from "./CreateModal/CreateModalWithFetchWait";
import ParentComponent from "./TestMotion/TestMotion2";




const meta = {
    title: 'Test/TestMotion2',
    component: ParentComponent,
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
    },
} satisfies Meta<typeof ParentComponent>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {},
};
