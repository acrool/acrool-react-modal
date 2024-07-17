import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {useCallback, useEffect, useState} from 'react';
import {ulid} from 'ulid';

import {rootId} from './config';
import styles from './modal.module.scss';
import {ModalProviderContext} from './ModalProvider';
import {IModal, IModalPortalProps, IRow, THidden, TShow} from './types';
import {removeByIndex} from './utils';


/**
 * Global var
 */
export let modal: IModal;



const Modal = (props: IModalPortalProps) => {
    const [rows, setRows] = useState<IRow[]>([]);

    // set global
    useEffect(() => {
        modal = {
            show: (children, args) => show(children, args),
            hide,
        };
        // modal.hide = (item) => show({...item, status: EStatus.warning});
    }, []);


    /**
     * 顯示 Toaster
     * @param newItem
     */
    const show: TShow = useCallback((ModalComponent, args) => {
        const queueKey = ulid().toLowerCase();
        setRows(prevRows => [...prevRows, {queueKey, ModalComponent, args}]);
    }, []);


    /**
     * 隱藏 Toaster
     * @param queueKey
     */
    const hide: THidden = useCallback((queueKey) => {
        setRows(prevRows => {
            const index = prevRows.findIndex(row => row.queueKey === queueKey);
            return removeByIndex(prevRows, index);
        });
    }, []);


    /**
     * 渲染項目
     */
    const renderItems = () => {
        return rows.map(row => {
            return (
                <ModalProviderContext.Provider
                    key={row.queueKey}    
                    value={{
                        queueKey: row.queueKey,
                        hide: () => hide(row.queueKey)
                    }}>
                    <row.ModalComponent
                        key={row.queueKey}
                        {...row.args}
                    />
                </ModalProviderContext.Provider>
            );
        });
    };

    return (
        <ReactPortal
            id={props.id || rootId}
            className={styles.root}
        >
            <AnimatePresence>
                {renderItems()}
            </AnimatePresence>
        </ReactPortal>
    );
};

export default Modal;
