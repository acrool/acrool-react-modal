import {Variants} from 'framer-motion';
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

type TFComp = () => JSX.Element


export type TShow = <T>(children: React.FC<T>, args?: T) => void
export type THidden = (queueKey?: string) => void;
export type THiddenAll = () => void;

export type TOnExitComplete = () => void;

export interface IModalProps {
    id?: string
}



// export type TShowMulti = TShow & TShowStatus;
