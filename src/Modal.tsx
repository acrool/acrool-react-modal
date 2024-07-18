import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React from 'react';
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

interface IState {
    rows: IRow[]
}

class Modal extends React.Component<IModalPortalProps, IState> {

    state: IState = {
        rows: []
    };

    constructor(props) {
        super(props);

        modal = {
            show: this.show,
            hide: this.hide,
        };
    }

    /**
     * 顯示 Toaster
     * @param ModalComponent
     * @param args
     */
    show: TShow = (ModalComponent, args) => {
        const queueKey = ulid().toLowerCase();
        this.setState(prev => {
            return {
                rows: [...prev.rows, {queueKey, ModalComponent, args}],
            };
        });
    };


    /**
     * 隱藏 Toaster
     * @param queueKey
     */
    hide: THidden = (queueKey) => {
        this.setState(prev => {
            const index = prev.rows.findIndex(row => row.queueKey === queueKey);
            return {
                rows: removeByIndex(prev.rows, index),
            };
        });

    };


    /**
     * 渲染項目
     */
    renderItems() {
        const {rows} = this.state;
        return rows.map(row => {
            return (
                <ModalProviderContext.Provider
                    key={row.queueKey}
                    value={{
                        queueKey: row.queueKey,
                        hide: async () => this.hide(row.queueKey)
                    }}>
                    <row.ModalComponent
                        key={row.queueKey}
                        {...row.args}
                    />
                </ModalProviderContext.Provider>
            );
        });
    };



    render() {
        return (
            <ReactPortal
                id={this.props.id || rootId}
                className={styles.root}
            >
                <AnimatePresence>
                    {this.renderItems()}
                </AnimatePresence>
            </ReactPortal>
        );
    }
}

export default Modal;
