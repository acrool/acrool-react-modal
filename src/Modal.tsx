import ReactPortal from '@acrool/react-portal';
import {removeFind} from 'bear-jsutils/array';
import {AnimatePresence} from 'framer-motion';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {rootId} from './config';
import styles from './modal.module.scss';
import ModalWrapper from './ModalWrapper';
import {IModal, IModalProps, IRow, THidden, THiddenAll, TShow} from './types';


/**
 * Global var
 */
export let modal: IModal;

export const defaultKey = 'globalModal';

const Modal = (props: IModalProps) => {

    /**
     * 渲染項目
     */
    const renderModal = () => {

        if(!props.isVisible){
            return null;
        }
        return <ModalWrapper
            // onExitComplete={hidden}
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
            <AnimatePresence>
                {renderModal()}
            </AnimatePresence>
        </ReactPortal>
    );
};

export default Modal;
