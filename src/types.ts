import {Transition, Variant, Variants} from 'framer-motion';
import React, {ReactNode} from 'react';


export interface IRow<T = any> {
    queueKey?: string
    ModalComponent: React.FC<T>,
    args?: T,
}

// export enum EVisible {
//     hidden= 'hidden',
//     visible = 'visible',
//     none= 'none',
// }

export interface IModal {
    show: TShow
    // hide: THidden
}



export type TShow = <T>(children: React.FC<T>, args?: T) => void
export type THidden = (queueKey?: string) => void;

export type TOnExitComplete = () => void;

export interface IModalProps {
    id?: string
}


type TVariantKey = 'initial'|'show'|'exit'
export type TAnimationVariants = Record<TVariantKey, Variant>;


export interface IModalProps {
    variants?: TAnimationVariants,
    transition?: Transition,
    className?: string
}

// export type TShowMulti = TShow & TShowStatus;
