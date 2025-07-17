import CSS from 'csstype';
import {AnimatePresenceProps, Transition, Variant} from 'framer-motion';
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



type TVariantKey = 'initial'|'animate'|'exit';
type TVariantKeys = Record<TVariantKey, string>;
export type TAnimationVariants = Partial<Record<TVariantKey, Variant>>;

// export type TAnimationConfig = Pick<IModalOptions, 'variants'|'style'|'transition'> & TVariantKeys;
export type TAnimationConfig = {
    variants?: TAnimationVariants,
    transition?: Transition,
}

export interface IModalOptions{
    animation?: TAnimationConfig
    className?: string
    style?: CSS.Properties
    isMaskHidden?: boolean
    isHideWithMaskClick?: boolean
    isBodyScrollEnable?: boolean
    isFixedDisabled?: boolean
    _effect?: IControlVisibleStatus
}

export interface IStageModalOptions extends IModalOptions{
    queueKey?: string
    animatePresenceMode?: AnimatePresenceProps['mode']
}

