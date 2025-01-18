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
    const {className, isMaskHidden, isHideWithMaskClick, isBodyScrollDisabled, ...motionProps} = modalOptions ?? {className: ''};

    const {hide} = useModal();


    useEffect(() => {
        // 鎖背景
        if(isBodyScrollDisabled){
            BodyScroll.disableBodyScroll();
        }
        return () => {
            if(isBodyScrollDisabled) {
                BodyScroll.enableBodyScroll();
            }
        };
    }, [isBodyScrollDisabled]);


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


    const renderMask = () => {

        if(isMaskHidden){
            return;
        }

        return <motion.div
            className={styles.motionMaskWrapper}
            {...maskMotionProps}
            initial="initial"
            animate="animate"
            exit="exit"
            data-enable-click={isHideWithMaskClick}
            onClick={isHideWithMaskClick ? hide : undefined}
        />;
    };


    return <div className={clsx(styles.motionDrawer, {[styles.maskHidden]: !isMaskHidden})} ref={ref}>
        {renderMask()}
        {renderMain()}
    </div>;
};


export default React.forwardRef(MotionDrawer);

