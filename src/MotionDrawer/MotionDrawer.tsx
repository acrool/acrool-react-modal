import {clsx} from 'clsx';
import {usePresence} from 'motion/react';
import {useAnimate} from 'motion/react-mini';
import React, {ForwardedRef, ReactNode, useEffect, useId, useLayoutEffect, useRef} from 'react';

import BodyScroll from '../bodyScroll';
import {useModal} from '../ModalProvider';
import {IModalAnimation, IModalOptions} from '../types';
import {isEmpty} from '../utils';
import styles from './motion-drawer.module.scss';


/**
 * 遮罩動畫: 淡入、淡出
 */
const maskMotion: Record<'enter'|'exit', IModalAnimation> = {
    enter: {keyframes: {opacity: [0, 1]}, options: {duration: .2}},
    exit: {keyframes: {opacity: 0}, options: {duration: .2}},
};


interface IProps {
    modalOptions?: IModalOptions
    children: ReactNode
}


/**
 * 是否不播放動畫
 * - 環境不支援 Web Animations API (例如測試環境)
 * - 使用者開啟「減少動態效果」
 */
const checkIsSkipMotion = (): boolean => {
    if(typeof Element === 'undefined' || typeof Element.prototype.animate !== 'function') return true;
    return typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};


/**
 * 不播放動畫時，直接套用進場動畫的最後一格
 * (例如置中的 transform，沒有套用版面會跑掉)
 * @param el
 * @param animation
 */
const applyFinalKeyframe = (el: HTMLElement, animation?: IModalAnimation) => {
    if(!animation) return;

    Object.keys(animation.keyframes).forEach(name => {
        const value = animation.keyframes[name];
        const final = Array.isArray(value) ? value[value.length - 1]: value;
        el.style[name] = String(final);
    });
};


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
    const {style, className, isMaskHidden, isHideWithMaskClick, isBodyScrollEnable, isFixedDisabled, animation} = modalOptions ?? {className: ''};
    const id = useId();
    const [isPresent, safeToRemove] = usePresence();
    const [, animate] = useAnimate();
    const maskRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const {hide} = useModal();

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


    // 用 layout effect，避免進場第一格先以最終位置閃一下
    useLayoutEffect(() => {
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
                .then(() => safeToRemove?.());
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
     * 渲染遮罩
     */
    const renderMask = () => {

        if(isMaskHidden){
            return;
        }

        return <div
            ref={maskRef}
            className={styles.motionMaskWrapper}
            data-enable-click={isHideWithMaskClick}
            onClick={isHideWithMaskClick ? hide : undefined}
        />;
    };


    return <div
        className={clsx(styles.motionDrawer, {[styles.fixedDisabled]: isFixedDisabled})}
        ref={ref}
        data-exiting={isPresent ? undefined: ''}
    >
        {renderMask()}
        {renderMain()}
    </div>;
};


export default React.forwardRef(MotionDrawer);
