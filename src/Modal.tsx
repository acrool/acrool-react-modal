import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {useCallback, useEffect, useState} from 'react';
import {ulid} from 'ulid';

import {rootId} from './config';
import styles from './modal.module.scss';
import ModalProvider from './ModalProvider';
import MotionDrawer from './MotionDrawer';
// import ToasterWrapper from './ToasterWrapper';
import {IModal, IModalProps, IRow, THidden, TShow} from './types';
import {removeByIndex} from './utils';


/**
 * Global var
 */
export let modal: IModal;



const Modal = (props: IModalProps) => {
    const [rows, setRows] = useState<IRow[]>([]);

    // set global
    useEffect(() => {
        modal = {
            show: (children, args) => show(children, args),
        };
        // modal.hide = (item) => show({...item, status: EStatus.warning});
    }, []);


    /**
     * 顯示 Toaster
     * @param newItem
     */
    const show: TShow = useCallback((children) => {
        const queueKey = ulid().toLowerCase();
        // @ts-ignore
        setRows(prevRows => [...prevRows, {queueKey, children}]);
    }, []);


    /**
     * 隱藏 Toaster
     * @param key
     */
    const hide: THidden = useCallback((key) => {
        console.log('remove');
        setRows(prevRows => {
            const index = prevRows.findIndex(row => row.queueKey === key);
            return removeByIndex(prevRows, index);
        });
    }, []);


    /**
     * 渲染項目
     */
    const renderItems = () => {
        return rows.map(row => {
            return (

                <ModalProvider
                    key={row.queueKey}
                    hide={() => hide(row.queueKey)}
                >
                    <row.children
                        // @ts-ignore
                        {...row.args}
                    />
                </ModalProvider>
            );

            // return <MotionDrawer key={row.queueKey}>
            //     <ToasterWrapper
            //         status={row.status}
            //         timeout={row.timeout ?? props.defaultTimeout ?? defaultTimeout}
            //         onClose={() => hidden(row.queueKey)}
            //         message={row.message}
            //     />
            // </MotionDrawer>;
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
