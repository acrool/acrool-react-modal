import {AnimatePresence, usePresence} from 'motion/react';
import {useAnimate} from 'motion/react-mini';
import React, {useLayoutEffect, useRef} from 'react';

import {getMaskZIndex, useMaskState} from '../maskStore';
import styles from './motion-drawer.module.scss';
import {checkIsSkipMotion, maskDuration} from './utils';


interface IMaskLayerProps {
    topToken: number
    onClick?: () => void
}


/**
 * 共用遮罩的那一張遮罩
 *
 * 需放在 AnimatePresence 內：進場淡入，離場淡出後才移除節點
 * @param topToken 最上層 Modal 的 token
 * @param onClick 點擊遮罩時的行為
 */
const SharedMaskLayer = ({
    topToken,
    onClick,
}: IMaskLayerProps) => {
    const [isPresent, safeToRemove] = usePresence();
    const [, animate] = useAnimate();
    const ref = useRef<HTMLDivElement>(null);

    // 離場動畫結束時用來確認「是否仍在離場」：淡出途中又被開啟的話，舊的離場不可以把節點移除
    const isPresentRef = useRef(isPresent);
    isPresentRef.current = isPresent;

    useLayoutEffect(() => {
        const el = ref.current;

        if(!el || checkIsSkipMotion()){
            if(!isPresent) safeToRemove?.();
            return;
        }

        if(isPresent){
            // 由目前的透明度接續淡入：第一次進場是 0，淡出途中又被開啟時不會先跳回 0
            const from = el.dataset.entered ? Number(getComputedStyle(el).opacity): 0;
            el.dataset.entered = 'true';
            animate(el, {opacity: [from, 1]}, {duration: maskDuration});
            return;
        }

        // 離場動畫播完才讓 AnimatePresence 移除節點；動畫被中斷時也要移除，避免節點殘留
        animate(el, {opacity: 0}, {duration: maskDuration}).finished
            .catch(() => undefined)
            .then(() => {
                if(!isPresentRef.current) safeToRemove?.();
            });
    }, [isPresent]);

    /*
     * token 變動時不重建 DOM，只更新 z-index 與點擊行為。
     * 更新 z-index 只是把這張遮罩在堆疊中上移／下移，透明度不變所以不閃。
     */
    return <div
        ref={ref}
        className={styles.motionMaskWrapper}
        data-shared-mask="true"
        data-top-token={topToken}
        onClick={isPresent ? onClick: undefined}
        style={{
            ['--modal-msak-index' as string]: getMaskZIndex(topToken),
            cursor: onClick ? 'pointer' : undefined,
            // 離場動畫期間不攔截點擊
            pointerEvents: isPresent ? undefined: 'none',
        }}
    />;
};


/**
 * 單一全域共用遮罩
 *
 * 由 ModalProvider 掛載「唯一一個」實例。訂閱 maskStore：
 *   - 只要有任一個開啟共用遮罩的 Modal 掛載著，就顯示這張遮罩（淡入）。
 *   - 全部關閉後淡出。
 *
 * 因為遮罩 DOM 自始至終只有這一個，多層 Modal 疊加／關閉時遮罩都不會在層間
 * 新增或移除，背景明暗維持穩定、不會閃爍，也不會「越疊越黑」。
 *
 * z-index（重點）：遮罩用 `--modal-msak-index`，但值是「動態」的 ——
 *   永遠等於『最上層 Modal 的 z-index − 1』(getMaskZIndex)。
 *   於是遮罩剛好卡在最上層內容的正下方、其餘下層的正上方：
 *     - 最上層 Modal 在遮罩之上（清楚顯示）
 *     - 所有下層 Modal 被這張遮罩壓暗
 *   疊一層→遮罩往上挪一格、關一層→遮罩往下挪一格，全程同一個 DOM、透明度不變，
 *   所以「換層」時不會有遮罩消失再出現的閃爍。
 */
const SharedMask = () => {
    const {visible, topToken, topOnMaskClick} = useMaskState();

    return <AnimatePresence>
        {visible && topToken !== null && (
            <SharedMaskLayer
                key="acrool-shared-mask"
                topToken={topToken}
                onClick={topOnMaskClick}
            />
        )}
    </AnimatePresence>;
};


export default SharedMask;
