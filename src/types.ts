import CSS from 'csstype';
import {AnimatePresenceProps, Transition, Variant} from 'framer-motion';
import React from 'react';


export interface IRow<T = any> {
    queueKey: string
    ModalComponent: React.FC<T>
    args?: T
}

export interface IModal {
    show: TShow
    hide: THidden
}



export type TShow = <T>(children: React.FC<T>, args?: T) => void
export type THidden = (queueKey: string) => void;


interface IControlVisibleStatus {
    _onShow?: (queueKey: string) => void
    _onHide?: (queueKey: string) => void
}

export interface IModalPortalProps extends IControlVisibleStatus{
    id?: string
    containerSelector?: () => HTMLElement | null;
    animatePresenceMode?: AnimatePresenceProps['mode'];
}



type TVariantKey = 'initial'|'animate'|'exit';
type TVariantKeys = Record<TVariantKey, string>;
export type TAnimationVariants = Partial<Record<TVariantKey, Variant>>;

export type TAnimationConfig = Pick<IModalOptions, 'variants'|'style'|'transition'> & TVariantKeys;

export interface IModalOptions {
    variants?: TAnimationVariants
    transition?: Transition
    className?: string
    style?: CSS.Properties
    isEnableHideWithClickMask?: boolean,
}

export interface IStageModalOptions extends IModalOptions, IControlVisibleStatus{
    queueKey?: string
    animatePresenceMode?: AnimatePresenceProps['mode'],
}

