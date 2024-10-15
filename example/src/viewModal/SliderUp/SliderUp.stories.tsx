import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {Flex} from '@acrool/react-grid';
import SliderUp from "./SliderUp";
import Button from "../../components/Button";

const meta = {
    title: 'Components/SliderUp',
    component: SliderUp,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Drop-down menu with rich functions, including search/groups options/avatar for Reactjs'
            },
        },
    },
    tags: ['autodocs'],
    // argTypes: {},
    // args: {
    //
    // },
} satisfies Meta<typeof SliderUp>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    // args: {},
    render: function Render(args) {
        return <Button
            color="primary"
            onClick={SliderUp.show}
        >XXX</Button>;
    },
};
