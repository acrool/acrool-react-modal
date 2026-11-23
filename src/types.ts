import CSS from 'csstype';
import type {AnimatePresenceProps} from 'motion/react';
import React from 'react';


export interface IRow<T = any> {
    queueKey: string
    ModalComponent: React.FC<T>
    args?: T
    onHide?: (queryKey: string) => void
}

export interface IModal {
    show: TShow
    showWithKey: TShowWithKey
    hide: THidden
    hideAll: THiddenAll
}

type TOnHide = (queryKey: string) => void


export type TShow = <T>(children: React.FC<T>, args?: T, onHide?: TOnHide) => void
export type TShowWithKey = <T>(children: React.FC<T>, queueKey: string, args?: T, onHide?: TOnHide) => void
export type THidden = (queueKey: string) => void;
export type THiddenAll = (ignoreKeys?: string[]) => void;


interface IControlVisibleStatus {
    onShow?: (queueKey: string) => void
    onHide?: (queueKey: string) => void
}

export interface IModalPortalProps extends IControlVisibleStatus{
    id?: string
    containerSelector?: () => HTMLElement | null
    animatePresenceMode?: AnimatePresenceProps['mode']
    children?: React.ReactNode
}



/**
 * 動畫曲線: 具名曲線，或貝茲曲線的四個數值
 */
export type TModalEase = 'linear'|'easeIn'|'easeOut'|'easeInOut'|[number, number, number, number];

type TKeyframeValue = string|number;

/**
 * 一段動畫 (由 Web Animations API 播放)
 * keyframes: CSS 屬性對應的影格，單一值代表「由目前狀態到該值」，陣列代表完整影格
 * 位移、縮放請寫成 transform 字串，例如 {transform: ['translateY(20px)', 'translateY(0px)']}
 */
export interface IModalAnimation {
    keyframes: Record<string, TKeyframeValue|TKeyframeValue[]>
    options?: {
        duration?: number,
        delay?: number,
        ease?: TModalEase,
    }
}

/**
 * 光箱內容的動畫設定
 * style: 不參與動畫的固定樣式 (例如定位)
 * enter: 進場動畫
 * exit: 離場動畫
 */
export type TAnimationConfig = {
    style?: CSS.Properties,
    enter?: IModalAnimation,
    exit?: IModalAnimation,
}

export interface IModalOptions{
    animation?: TAnimationConfig
    className?: string
    style?: CSS.Properties
    isMaskHidden?: boolean
    isHideWithMaskClick?: boolean
    isBodyScrollEnable?: boolean
    isFixedDisabled?: boolean
    /**
     * 共用遮罩模式（預設 `true`）
     *
     * 開啟時：多層 Modal 共用「唯一一張」全域遮罩（由 ModalProvider 掛載的 <SharedMask>）。
     * 這張遮罩永遠卡在「最上層 Modal 正下方」—— 最上層清楚顯示、其餘下層被壓暗。
     * 疊一層遮罩往上挪一格、關一層往下挪一格，全程同一個 DOM、opacity 不變，
     * 因此換層時不會閃爍，也不會因每層各疊一張而「越疊越黑」。
     *
     * 設為 `false` 可回到舊行為（每層 Modal 各自獨立渲染一張遮罩）。
     */
    isSharedMask?: boolean
    _effect?: IControlVisibleStatus
}

export interface IStageModalOptions extends IModalOptions{
    queueKey?: string
    animatePresenceMode?: AnimatePresenceProps['mode']
}

