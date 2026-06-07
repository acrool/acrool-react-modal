import {AnimatePresence, motion} from 'framer-motion';
import React from 'react';

import {getMaskZIndex, useMaskState} from '../maskStore';
import styles from './motion-drawer.module.scss';


const maskAnimation = {
    variants: {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0},
    },
    transition: {duration: .2},
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
 *   疊一層→遮罩往上挪一格、關一層→遮罩往下挪一格，全程同一個 DOM、opacity 不變，
 *   所以「換層」時不會有遮罩消失再出現的閃爍。
 */
const SharedMask = () => {
    const {visible, topToken, topOnMaskClick} = useMaskState();

    return <AnimatePresence>
        {visible && topToken !== null && (
            <motion.div
                key="acrool-shared-mask"
                className={styles.motionMaskWrapper}
                data-shared-mask="true"
                {...maskAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                /*
                 * token 變動時不重建 DOM（同一個 key），只更新 z-index 與點擊行為。
                 * 更新 z-index 只是把這張遮罩在堆疊中上移／下移，opacity 維持 1 不閃。
                 */
                data-top-token={topToken}
                onClick={topOnMaskClick}
                style={{
                    ['--modal-msak-index' as string]: getMaskZIndex(topToken),
                    cursor: topOnMaskClick ? 'pointer' : undefined,
                }}
            />
        )}
    </AnimatePresence>;
};


export default SharedMask;
