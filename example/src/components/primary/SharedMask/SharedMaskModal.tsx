import {animation, createModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';
import Card from '../../atoms/Card';


interface IProps {
    /** 目前是第幾層（從 1 開始） */
    level: number
    /** 是否開啟共用遮罩 */
    isSharedMask: boolean
}


/**
 * 共用遮罩示範光箱內容（可無限往上疊）
 *
 * 用「再開一層」按鈕遞迴往上開更多層，觀察遮罩疊加行為：
 *   - 共用遮罩 ON ：不論疊幾層，畫面上永遠只有「最上層」一張遮罩底色，
 *     疊再多層背景也不會越來越黑。
 *   - 共用遮罩 OFF：回到舊行為，每層各自一張遮罩，越疊越黑。
 */
const SharedMaskModalInner = ({level, isSharedMask}: IProps) => {
    const {hide} = useModal();

    const handleOpenNext = () => {
        // 開下一層 —— 沿用相同的 isSharedMask 設定，由對應的 modal 實例開啟
        const next = isSharedMask ? SharedMaskModal : NonSharedMaskModal;
        next.show({level: level + 1, isSharedMask});
    };

    /*
     * 每層往右下錯開 32px，讓多層疊起來時能看到下面每一層的邊緣 ——
     * 才比較得出「ON 背景只壓暗一層 vs OFF 越疊越黑、深層看不到」。
     */
    const offset = (level - 1) * 32;

    return <ModalRoot style={{transform: `translate(${offset}px, ${offset}px)`}}>
        <Card title={`第 ${level} 層光箱`} direction="column">
            <p>
                這是第 <Level>{level}</Level> 層光箱。<br/>
                共用遮罩：<Mode $on={isSharedMask}>{isSharedMask ? 'ON（只留最上層一張遮罩）' : 'OFF（每層各自一張，越疊越黑）'}</Mode>
            </p>

            <p style={{opacity: 0.7, fontSize: 13}}>
                按「再開一層」往上疊，觀察背景與下面每一層光箱的明暗變化。
            </p>

            <Actions>
                <Button color="primary" onClick={handleOpenNext}>再開一層 →</Button>
                <Button color="grayDanger" onClick={hide}>關閉本層</Button>
            </Actions>
        </Card>
    </ModalRoot>;
};


/**
 * 共用遮罩 ON（預設行為）
 * isSharedMask 預設即為 true，這裡顯式標明以利閱讀。
 */
export const SharedMaskModal = createModal<IProps>(
    SharedMaskModalInner,
    {
        animation: animation.generateFadeInFromTop(),
        className: 'p-3',
        isSharedMask: true,
        /* 點最上層遮罩即可關閉該層 —— 配合共用遮罩，永遠是關掉看得到的那一張 */
        isHideWithMaskClick: true,
    },
);


/**
 * 共用遮罩 OFF（舊行為對照組）
 * 每層各自渲染一張遮罩，疊越多層背景越黑。
 */
export const NonSharedMaskModal = createModal<IProps>(
    SharedMaskModalInner,
    {
        animation: animation.generateFadeInFromTop(),
        className: 'p-3',
        isSharedMask: false,
        isHideWithMaskClick: true,
    },
);


const ModalRoot = styled.div`
  width: 460px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const Level = styled.b`
  color: #297cff;
`;

const Mode = styled.b<{$on: boolean}>`
  color: ${props => props.$on ? '#23a55a' : '#f85149'};
`;
