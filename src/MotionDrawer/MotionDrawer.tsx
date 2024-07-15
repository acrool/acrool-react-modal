import {AnimatePresence, motion, Variant, Variants} from 'framer-motion';
import {ReactNode} from 'react';

import {TOnExitComplete} from '../types';
import styles from './motion-drawer.module.scss';


const spring = {
    damping: .2,
};

const maskVariantsItem = {
    initial: {opacity: 0, transition: {type:'spring'}},
    visible: {opacity: 1},
    hidden: {opacity: 0},
};

const modalVariantsItem = {
    initial: {transform: 'scale(0)'},
    visible: {transform: 'scale(1)'},
    hidden: {transform: 'scale(0)'},
};

interface IMotionVariants {
    initial: Variants,
    visible: Variants,
    hidden: Variants,
}

interface IProps {
    className?: string
    motionVariants?: Variants
    children: ReactNode
}


/**
 * 右側半抽屜彈窗
 * @param isVisible
 * @param children
 */
const MotionDrawer = ({
    motionVariants,
    children,
}: IProps) => {


    return <motion.div
        className={styles.motionDrawer}
        key="modal"
        transition={spring}
        variants={maskVariantsItem}
        animate="visible"
        initial="initial"
        exit="hidden"
    >
        <div className={styles.motionScrollWrapper}>
            <motion.div
                variants={motionVariants}
                transition={{type: 'spring', duration: 0.5}}
            >
                {children}
            </motion.div>
        </div>
    </motion.div>;

};


export default MotionDrawer;

