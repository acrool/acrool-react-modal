import {Variants} from 'framer-motion';
import {ReactNode} from 'react';


export interface IMessageProps {
    queueKey?: string,
    isVisibleQueueKey?: boolean,
    motionVariants?: Variants
    children: ReactNode
}

