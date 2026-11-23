import {Flex} from '@acrool/react-grid';
import type {Meta, StoryObj} from '@storybook/react';

import Button from '../../atoms/Button';
import {NonSharedMaskModal, SharedMaskModal} from './SharedMaskModal';


/**
 * 共用遮罩（Shared Mask）
 *
 * 多層光箱疊加時，避免每層各自的半透明遮罩一張張相加、把背景越蓋越黑。
 * 開啟 `isSharedMask`（預設 true）後，畫面上永遠只有「最上層」那一張遮罩顯示底色，
 * 下層遮罩自動降級為全透明、不攔截點擊。
 *
 * 操作：開啟光箱後按「再開一層」往上疊，觀察背景遮罩明暗：
 *   - SharedMaskOn  ：疊再多層，背景維持同一明暗（只有一張遮罩）。
 *   - SharedMaskOff ：每層各自一張，越疊越黑（舊行為對照）。
 */
const meta = {
    title: 'Primary/SharedMask',
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: '多層光箱共用遮罩 —— 疊加時只保留最上層一張遮罩，避免背景越疊越黑。',
            },
        },
    },
    argTypes: {},
    args: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


/**
 * 共用遮罩 ON（預設）—— 疊再多層，背景只有一張遮罩
 */
export const SharedMaskOn: Story = {
    render: function Render() {
        return <Button
            color="primary"
            onClick={() => SharedMaskModal.show({level: 1, isSharedMask: true})}
        >
            開啟（共用遮罩 ON）
        </Button>;
    },
};


/**
 * 共用遮罩 OFF（舊行為對照）—— 每層各自一張遮罩，越疊越黑
 */
export const SharedMaskOff: Story = {
    render: function Render() {
        return <Button
            color="primary"
            onClick={() => NonSharedMaskModal.show({level: 1, isSharedMask: false})}
        >
            開啟（共用遮罩 OFF）
        </Button>;
    },
};


/**
 * 並排對照：左邊 ON、右邊 OFF，各自往上疊比較背景明暗
 */
export const Comparison: Story = {
    render: function Render() {
        return <Flex className="gap-1">
            <Button
                color="primary"
                onClick={() => SharedMaskModal.show({level: 1, isSharedMask: true})}
            >
                共用遮罩 ON
            </Button>
            <Button
                color="gray"
                onClick={() => NonSharedMaskModal.show({level: 1, isSharedMask: false})}
            >
                共用遮罩 OFF
            </Button>
        </Flex>;
    },
};
