import {Flex} from '@acrool/react-grid';
import type {Meta, StoryObj} from '@storybook/react';
import {useRef, useState} from 'react';
import Button from "../src/components/Button";
import {OriginCreateModalWithFetchWait} from "./CreateModal/CreateModalWithFetchWait";
import {TestMotionWithSubChildren, TestMotionPrimary, TestMotionWithPropsComponent} from "./TestMotion";




const meta = {
    title: 'Test/TestMotion',
    component: TestMotionPrimary,
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
} satisfies Meta<typeof TestMotionPrimary>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {},
};



export const WithSubChildren: Story = {
    args: {},
    render: function Render(args) {

        const [Modal, setModal] = useState(OriginCreateModalWithFetchWait);
        const ModalRef = useRef(OriginCreateModalWithFetchWait);

        return <Flex column>
            <TestMotionWithSubChildren />
        </Flex>
    },
};


export const WithPropsComponent: Story = {
    args: {},
    render: function Render(args) {

        const [Modal, setModal] = useState(OriginCreateModalWithFetchWait);
        const ModalRef = useRef(OriginCreateModalWithFetchWait);

        return <Flex>
            <Button color="primary" onClick={() => setModal(OriginCreateModalWithFetchWait)}>
                Mo
            </Button>
            <TestMotionWithPropsComponent ModalComponent={OriginCreateModalWithFetchWait} />
        </Flex>
    },
};


