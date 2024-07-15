import {ReactNode} from 'react';
import {Variants} from "framer-motion";


export interface IRow {
    queueKey?: string
    children: ReactNode,
}



export interface IModal {
    show: TShow
    hidden: THidden
    hiddenAll: THiddenAll
}

interface IShowArgs extends IRow{
}


export type TShow = (queueKey: string, children: ReactNode) => void
export type THidden = (queueKey?: string) => void;
export type THiddenAll = () => void;

export type TOnExitComplete = () => void;

export interface IModalProps {
    id?: string
    isVisibleQueueKey?: boolean
    motionVariants?: Variants
    children: ReactNode
    isVisible: boolean
}
