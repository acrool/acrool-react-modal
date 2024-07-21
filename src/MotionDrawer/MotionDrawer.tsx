import {clsx} from 'clsx';
import {motion} from 'framer-motion';
import {ReactNode} from 'react';

import {IModalOptions} from '../types';
import styles from './motion-drawer.module.scss';
import animation from '../animation';


const maskMotionProps: IModalOptions = {
    variants: {
        initial: {opacity: 0, transition: {type:'spring'}},
        show: {opacity: 1},
        exit: {opacity: 0},
    },
    transition: {
        damping: .2,
    }
};




interface IProps {
    modalOptions?: IModalOptions,
    children: ReactNode
}


/**
 * Motion 動畫
 * @param modalOptions
 * @param children
 */
const MotionDrawer = ({
    modalOptions,
    children,
}: IProps) => {
    const {className, ...motionProps} = modalOptions ?? {className: ''};


    return <motion.div
        className={styles.motionDrawer}
        {...maskMotionProps}
        initial="initial"
        animate="show"
        exit="exit"
    >
        <motion.div
            transition={{type: 'spring', duration: 0.5}}
            className={clsx(styles.motionAnimationWrapper, className)}
            variants={animation.fadeInDown}
            {...motionProps}
        >
            {children}
        </motion.div>
    </motion.div>;

};


export default MotionDrawer;

