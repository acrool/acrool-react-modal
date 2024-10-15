import {clsx} from 'clsx';
import {AnimatePresence, motion} from 'framer-motion';
import {ReactNode, useEffect} from 'react';

import animation from '../animation';
import BodyScroll from '../bodyScroll';
import {useModal} from '../ModalProvider';
import {IModalOptions} from '../types';
import styles from './motion-drawer.module.scss';


const maskMotionProps: IModalOptions = {
    variants: {
        initial: {opacity: 0, transition: {type:'spring'}},
        show: {opacity: 1, transition: {type: 'just'}},
        exit: {opacity: 0},
    },
    transition: {
        duration: .3,
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
    const {className, isEnableHideWithClickMask, ...motionProps} = modalOptions ?? {className: ''};
    
    const {hide} = useModal();


    useEffect(() => {
        // 鎖背景
        BodyScroll.disableBodyScroll();
        return () => {
            BodyScroll.enableBodyScroll();
        };
    }, []);


    return <div className={styles.motionDrawer}>
        <motion.div
            className={styles.motionMaskWrapper}
            {...maskMotionProps}
            initial="initial"
            animate="show"
            exit="exit"
            data-enable-click={isEnableHideWithClickMask}
            onClick={isEnableHideWithClickMask ? hide: undefined}
        />

        <AnimatePresence>
            {children}
        </AnimatePresence>

    </div>;
};


export default MotionDrawer;

