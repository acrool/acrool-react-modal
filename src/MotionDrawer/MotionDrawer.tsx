import {clsx} from 'clsx';
import {motion} from 'framer-motion';
import {ReactNode} from 'react';

import {IModalProps} from '../types';
import styles from './motion-drawer.module.scss';


const maskMotionProps: IModalProps = {
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
    props?: IModalProps,
    children: ReactNode
}


/**
 * 右側半抽屜彈窗
 * @param isVisible
 * @param children
 */
const MotionDrawer = ({
    props,
    children,
}: IProps) => {
    const {className, ...motionProps} = props ?? {className: ''};


    return <motion.div
        className={styles.motionDrawer}
        {...maskMotionProps}
        initial="initial"
        animate="show"
        exit="exit"
    >
        <motion.div
            transition={{type: 'spring', duration: 0.5}}
            className={clsx(styles.motionScrollWrapper, className)}
            {...motionProps}
        >
            {children}
        </motion.div>
    </motion.div>;

};


export default MotionDrawer;

