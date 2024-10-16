import {clsx} from 'clsx';
import {AnimatePresence, motion} from 'framer-motion';
import React, {ForwardedRef, ReactNode, useEffect} from 'react';

import animation from '../animation';
import BodyScroll from '../bodyScroll';
import {useModal} from '../ModalProvider';
import {IModalOptions} from '../types';
import {isEmpty} from '../utils';
import styles from './motion-drawer.module.scss';


const maskMotionProps: IModalOptions = {
    variants: {
        initial: {opacity: 0, transition: {type:'spring'}},
        animate: {opacity: 1, transition: {type: 'just'}},
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
 * @param ref
 */
const MotionDrawer = ({
    modalOptions,
    children,
}: IProps, ref?: ForwardedRef<HTMLDivElement>) => {
    const {className, isEnableHideWithClickMask, ...motionProps} = modalOptions ?? {className: ''};
    
    const {hide} = useModal();


    useEffect(() => {
        // 鎖背景
        BodyScroll.disableBodyScroll();
        return () => {
            BodyScroll.enableBodyScroll();
        };
    }, []);


    /**
     * 渲染主內容
     */
    const renderMain = () => {
        if(isEmpty(motionProps)) {
            return children;
        }
        
        return <motion.div
            transition={{type: 'spring', duration: .2}}
            className={clsx(styles.motionAnimationWrapper, className)}
            // variants={animation.fadeInDown}
            {...motionProps}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>;


    };


    return <div className={styles.motionDrawer} ref={ref}>
        <motion.div
            className={styles.motionMaskWrapper}
            {...maskMotionProps}
            initial="initial"
            animate="animate"
            exit="exit"
            data-enable-click={isEnableHideWithClickMask}
            onClick={isEnableHideWithClickMask ? hide: undefined}
        />

        {renderMain()}
    </div>;
};


export default React.forwardRef(MotionDrawer);

