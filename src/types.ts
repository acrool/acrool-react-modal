import {Transition, Variant} from 'framer-motion';
import React, {FunctionComponent} from 'react';


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
    onShow?: (queueKey: string) => void
    onHide?: (queueKey: string) => void
}

export interface IModalPortalProps extends IControlVisibleStatus{
    id?: string
    containerSelector?: () => HTMLElement | null;
    Outlet?: FunctionComponent;
}



type TVariantKey = 'initial'|'show'|'exit'
export type TAnimationVariants = Record<TVariantKey, Variant>;


export interface IModalOptions {
    variants?: TAnimationVariants
    transition?: Transition
    className?: string
    isEnableHideWithClickMask?: boolean,
}

export interface IStageModalOptions extends IModalOptions, IControlVisibleStatus{
    queueKey?: string
}

