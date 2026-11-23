import {clsx} from 'clsx';
import {usePresence} from 'motion/react';
import {useAnimate} from 'motion/react-mini';
import React, {ForwardedRef, ReactNode, useEffect, useId, useLayoutEffect, useRef, useState} from 'react';

import BodyScroll from '../bodyScroll';
import {getDrawerZIndex, registerMask, unregisterMask} from '../maskStore';
import {useModal} from '../ModalProvider';
import {IModalAnimation, IModalOptions} from '../types';
import {isEmpty} from '../utils';
import styles from './motion-drawer.module.scss';
import {applyFinalKeyframe, checkIsSkipMotion, maskDuration} from './utils';


/**
 * 在 client 用 useLayoutEffect（paint 前完成登記＋拿到 token），SSR 退回 useEffect 以免警告。
 * 用 layout effect 是為了在「開新層」的同一次 commit 內就把本層 z-index 與遮罩 z-index 一起更新，
 * 避免新層先以預設 z-index 畫一個 frame、造成下層瞬間沒被壓暗的閃爍；
 * 進場動畫也在這裡啟動，避免第一格先以最終位置閃一下。
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;


/**
 * 本層遮罩的動畫: 淡入、淡出
 * (只在關閉共用遮罩時使用)
 */
const maskMotion: Record<'enter'|'exit', IModalAnimation> = {
    enter: {keyframes: {opacity: [0, 1]}, options: {duration: maskDuration}},
    exit: {keyframes: {opacity: 0}, options: {duration: maskDuration}},
};


interface IProps {
    modalOptions?: IModalOptions
    children: ReactNode
}


/**
 * Motion 動畫
 *
 * 離場後才移除節點由 AnimatePresence + usePresence 處理 (需放在 AnimatePresence 內)，
 * 動畫由 motion mini (Web Animations API) 播放
 *
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
    const [isPresent, safeToRemove] = usePresence();
    const [, animate] = useAnimate();
    const maskRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    // 離場動畫結束時用來確認「是否仍在離場」：離場途中又被開啟的話，舊的離場不可以把節點移除
    const isPresentRef = useRef(isPresent);
    isPresentRef.current = isPresent;

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
            // unmount 保險注銷：退場時已注銷過就不可再注銷一次。
            // 全部關閉後 token 會歸零重用，這時再注銷會誤刪「之後才開啟的那一層」的登記
            if (tokenRef.current === registeredToken) {
                unregisterMask(registeredToken);
                tokenRef.current = null;
            }
        };
    }, [isSharedMaskActive, isHideWithMaskClick]);

    // 一進入退場就把本層從遮罩計算移除，讓共用遮罩立刻下移到上一層／跟著淡出
    useIsomorphicLayoutEffect(() => {
        if (!isPresent && tokenRef.current !== null) {
            unregisterMask(tokenRef.current);
            tokenRef.current = null;
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


    // 播放進場、離場動畫 (本層遮罩 + 主內容)
    useIsomorphicLayoutEffect(() => {
        const step = isPresent ? 'enter': 'exit';
        const maskEl = maskRef.current;
        const mainEl = mainRef.current;
        const mainMotion = animation?.[step];

        if(checkIsSkipMotion()){
            if(isPresent && mainEl) applyFinalKeyframe(mainEl, animation?.enter);
            if(!isPresent) safeToRemove?.();
            return;
        }

        const animations: Array<Promise<unknown>> = [];
        if(maskEl){
            animations.push(animate(maskEl, maskMotion[step].keyframes, maskMotion[step].options).finished);
        }
        if(mainEl && mainMotion){
            animations.push(animate(mainEl, mainMotion.keyframes, mainMotion.options).finished);
        }

        if(!isPresent){
            // 離場動畫播完才讓 AnimatePresence 移除節點；動畫被中斷時也要移除，避免節點殘留
            Promise.all(animations)
                .catch(() => undefined)
                .then(() => {
                    if(!isPresentRef.current) safeToRemove?.();
                });
        }
    }, [isPresent]);


    /**
     * 渲染主內容
     */
    const renderMain = () => {
        if(isEmpty(animation)) {
            return children;
        }

        return <div
            ref={mainRef}
            className={clsx(styles.motionAnimationWrapper, className)}
            style={{...animation?.style, ...style}}
        >
            {children}
        </div>;
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

        return <div
            ref={maskRef}
            className={styles.motionMaskWrapper}
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

    return <div
        className={clsx(styles.motionDrawer, {[styles.fixedDisabled]: isFixedDisabled})}
        ref={ref}
        style={drawerStyle}
        data-exiting={isPresent ? undefined: ''}
    >
        {renderMask()}
        {renderMain()}
    </div>;
};


export default React.forwardRef(MotionDrawer);
