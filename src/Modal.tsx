import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {useCallback, useEffect, useState} from 'react';
import {ulid} from 'ulid';

import {rootId} from './config';
import MotionDrawer from './MotionDrawer';
import styles from './modal.module.scss';
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
        setRows(prevRows => [...prevRows, {queueKey, children}]);
    }, []);


    /**
     * 隱藏 Toaster
     * @param key
     */
    const hidden: THidden = useCallback((key) => {
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
            return <row.children {...row.args}/>;
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
