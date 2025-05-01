import {clsx} from 'clsx';
import {motion} from 'framer-motion';
import React, {ForwardedRef, ReactNode, useEffect, useId} from 'react';

import BodyScroll from '../bodyScroll';
import {useModal} from '../ModalProvider';
import {IModalOptions} from '../types';
import {isEmpty} from '../utils';
import styles from './motion-drawer.module.scss';


const maskMotionProps: IModalOptions = {
    animation: {
        variants: {
            initial: {opacity: 0, transition: {type:'spring'}},
            animate: {opacity: 1},
            exit: {opacity: 0},
        },
        transition: {
            duration: .2,
        }
    }

};




interface IProps {
    modalOptions?: IModalOptions
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
    const {style, className, isMaskHidden, isHideWithMaskClick, isBodyScrollEnable, isFixedDisabled, animation} = modalOptions ?? {className: ''};
    const id = useId();

    const {hide} = useModal();


    useEffect(() => {
        // 鎖背景
        if(!isBodyScrollEnable){
            BodyScroll.disableBodyScroll(id);
        }
        return () => {
            if(!isBodyScrollEnable) {
                BodyScroll.enableBodyScroll(id);
            }
        };
    }, [isBodyScrollEnable]);


    /**
     * 渲染主內容
     */
    const renderMain = () => {
        if(isEmpty(animation)) {
            return children;
        }

        return <motion.div
            transition={{type: 'spring', duration: .2}}
            className={clsx(styles.motionAnimationWrapper, className)}
            style={style}
            // variants={animation.fadeInDown}
            {...animation}
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
            {...maskMotionProps.animation}
            initial="initial"
            animate="animate"
            exit="exit"
            data-enable-click={isHideWithMaskClick}
            onClick={isHideWithMaskClick ? hide : undefined}
        />;
    };


    return <div className={clsx(styles.motionDrawer, {[styles.fixedDisabled]: isFixedDisabled})} ref={ref}>
        {renderMask()}
        {renderMain()}
    </div>;
};


export default React.forwardRef(MotionDrawer);

