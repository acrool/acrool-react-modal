import {motion} from 'framer-motion';
import {ReactNode} from 'react';

import {IMotionProps} from '../types';
import styles from './motion-drawer.module.scss';


const maskMotionProps: IMotionProps = {
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
    motionProps?: IMotionProps,
    children: ReactNode
}


/**
 * 右側半抽屜彈窗
 * @param isVisible
 * @param children
 */
const MotionDrawer = ({
    motionProps,
    children,
}: IProps) => {

    return <motion.div
        className={styles.motionDrawer}
        {...maskMotionProps}
        initial="initial"
        animate="show"
        exit="exit"
    >
        <div className={styles.motionScrollWrapper}>
            <motion.div
                transition={{type: 'spring', duration: 0.5}}
                {...motionProps}
            >
                {children}
            </motion.div>
        </div>
    </motion.div>;

};


export default MotionDrawer;

