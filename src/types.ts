import {Variants} from 'framer-motion';
import React, {ReactNode} from 'react';


export interface IRow<T = undefined> {
    queueKey?: string
    children: React.FC<T>,
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

interface IShowArgs extends IRow{
}
type TFComp = () => JSX.Element


export type TShow = <T = undefined>(children: React.FC<T>, args?: T) => void
export type THidden = (queueKey?: string) => void;
export type THiddenAll = () => void;

export type TOnExitComplete = () => void;

export interface IModalProps {
    id?: string
}



// export type TShowMulti = TShow & TShowStatus;
