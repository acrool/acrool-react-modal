import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React from 'react';

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

        if(!props.isVisible){
            return null;
        }
        return <ModalWrapper
            isVisibleQueueKey={props.isVisibleQueueKey}
            motionVariants={props.motionVariants}
        >
            {props.children}
        </ModalWrapper>;
    };


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
