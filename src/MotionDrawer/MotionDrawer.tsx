import {clsx} from 'clsx';
import {motion, useIsPresent} from 'framer-motion';
import React, {ForwardedRef, ReactNode, useEffect, useId, useLayoutEffect, useRef, useState} from 'react';

import BodyScroll from '../bodyScroll';
import {getDrawerZIndex, registerMask, unregisterMask} from '../maskStore';
import {useModal} from '../ModalProvider';
import {IModalOptions} from '../types';
import {isEmpty} from '../utils';
import styles from './motion-drawer.module.scss';


/**
 * 在 client 用 useLayoutEffect（paint 前完成登記＋拿到 token），SSR 退回 useEffect 以免警告。
 * 用 layout effect 是為了在「開新層」的同一次 commit 內就把本層 z-index 與遮罩 z-index 一起更新，
 * 避免新層先以預設 z-index 畫一個 frame、造成下層瞬間沒被壓暗的閃爍。
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;


const maskMotionProps: IModalOptions = {
    animation: {
        variants: {
            initial: {opacity: 0, transition: {type:'spring'}},
            animate: {opacity: 1},
            exit: {opacity: 0},
        },
        transition: {
            duration: .2,
        }
    }

};




interface IProps {
    modalOptions?: IModalOptions
    children: ReactNode
}


/**
 * Motion 動畫
 * @param modalOptions
 * @param children
 * @param ref
 */
const MotionDrawer = ({
    modalOptions,
    children,
}: IProps, ref?: ForwardedRef<HTMLDivElement>) => {
    const {style, className, isMaskHidden, isHideWithMaskClick, isBodyScrollEnable, isFixedDisabled, animation, isSharedMask = true} = modalOptions ?? {className: ''};
    const id = useId();
    const isPresent = useIsPresent();

    const {hide} = useModal();

    /**
     * 共用遮罩模式（預設）：
     *   本層 Modal 不自己畫遮罩，而是向 maskStore 登記「我需要遮罩」。
     *   實際的遮罩由 ModalProvider 掛載的「唯一一個」<SharedMask> 統一渲染。
     *   這樣多層疊加時遮罩 DOM 只有一個，不會在層間跳動造成背景閃爍，也不會越疊越黑。
     *
     *   登記時機（重點）：
     *     - mount 時登記 → 遮罩出現／升到本層底下。
     *     - 一進入退場 (isPresent=false) 就「立刻」注銷 → 遮罩同步下移到上一層
     *       （最後一層則跟著淡出），與關閉動作同步，不會等退場動畫播完才跳。
     *
     *   但 drawer 的 z-index (token) 要保留到真正 unmount —— 退場動畫期間本層仍需
     *   蓋在遮罩之上，否則會在退場中途掉到遮罩底下被蓋住。
     */
    const isSharedMaskActive = isSharedMask && !isMaskHidden;

    // hide 是 useCallback 穩定參考，但仍以 ref 持有最新值供 store 點擊使用
    const hideRef = useRef(hide);
    hideRef.current = hide;

    // 本層在 store 取得的 token，用來推算本層 z-index（越上層越大）；
    // 一旦設定就保留到 unmount，不隨退場清除（退場動畫仍需此 z-index 蓋在遮罩上）
    const [token, setToken] = useState<number | null>(null);
    const tokenRef = useRef<number | null>(null);

    useIsomorphicLayoutEffect(() => {
        if (!isSharedMaskActive) {
            return;
        }
        const onMaskClick = isHideWithMaskClick ? () => hideRef.current() : undefined;
        const registeredToken = registerMask(onMaskClick);
        tokenRef.current = registeredToken;
        setToken(registeredToken);
        return () => {
            // unmount 保險注銷（多半已在退場時注銷過，這裡冪等補一次）
            unregisterMask(registeredToken);
            tokenRef.current = null;
        };
    }, [isSharedMaskActive, isHideWithMaskClick]);

    // 一進入退場就把本層從遮罩計算移除，讓共用遮罩立刻下移到上一層／跟著淡出
    useIsomorphicLayoutEffect(() => {
        if (!isPresent && tokenRef.current !== null) {
            unregisterMask(tokenRef.current);
        }
    }, [isPresent]);


    useEffect(() => {
        if(!isBodyScrollEnable) {
            if (isPresent) {
                BodyScroll.disableBodyScroll(id);
            } else {
                BodyScroll.enableBodyScroll(id);
            }
        }
    }, [isPresent]);


    useEffect(() => {
        return () => {
            if(!isBodyScrollEnable) {
                BodyScroll.enableBodyScroll(id);
            }
        };
    }, []);


    /**
     * 渲染主內容
     */
    const renderMain = () => {
        if(isEmpty(animation)) {
            return children;
        }

        return <motion.div
            transition={{type: 'spring', duration: .2}}
            className={clsx(styles.motionAnimationWrapper, className)}
            style={style}
            {...animation}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>;
    };


    /**
     * 渲染本層遮罩
     *
     * 共用遮罩模式 (isSharedMaskActive) 下「不」自己畫遮罩 —— 交給全域 <SharedMask>。
     * 只有關閉共用模式 (isSharedMask=false) 時，才回到舊行為：每層各自渲染一張遮罩。
     */
    const renderMask = () => {

        if(isMaskHidden || isSharedMaskActive){
            return;
        }

        return <motion.div
            className={styles.motionMaskWrapper}
            {...maskMotionProps.animation}
            initial="initial"
            animate="animate"
            exit="exit"
            data-enable-click={isHideWithMaskClick}
            onClick={isHideWithMaskClick ? hide : undefined}
        />;
    };


    /*
     * 共用遮罩模式下，依本層 token 給定遞增 z-index（越上層越大），
     * 讓全域 <SharedMask> 能把自己卡在「最上層」與「下一層」之間。
     * 非共用模式維持 scss 預設值。
     */
    const drawerStyle = token !== null
        ? {['--modal-drawer-index' as string]: getDrawerZIndex(token)} as React.CSSProperties
        : undefined;

    return <div className={clsx(styles.motionDrawer, {[styles.fixedDisabled]: isFixedDisabled})} ref={ref} style={drawerStyle}>
        {renderMask()}
        {renderMain()}
    </div>;
};


export default React.forwardRef(MotionDrawer);
