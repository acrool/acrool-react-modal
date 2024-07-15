import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {useState} from 'react';

import {rootId} from './config';
import styles from './modal.module.scss';
import ModalWrapper from './ModalWrapper';
import {IModalProps} from './types';


/**
 * Global var
 */
const Modal = (props: IModalProps) => {

    /**
     * 渲染項目
     */
    const renderModal = () => {

        if(!props.visible){
            return null;
        }
        return <ModalWrapper
            isVisibleQueueKey={props.isVisibleQueueKey}
            motionVariants={props.motionVariants}
        >
            {props.children}
        </ModalWrapper>;
    };


    /**
     *
     */
    // const handleHidden = () => {
    //     setMainVisible(false);
    // };

    // if(!isMainVisible){
    //     return null;
    // }

    return (
        <ReactPortal
            id={props.id || rootId}
            className={styles.root}
        >
            <AnimatePresence onExitComplete={props.onExitComplete}>
                {renderModal()}
            </AnimatePresence>
        </ReactPortal>
    );
};

export default Modal;
