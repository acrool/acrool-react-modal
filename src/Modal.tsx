import './index.css';

import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React from 'react';

import {rootId} from './config';
import {GlobalModalContext} from './GlobalModalProvider';
import styles from './modal.module.scss';
import {ModalProviderContext} from './ModalProvider';
import {IModal, IModalPortalProps, IRow, THidden, TShow, TShowWithKey} from './types';
import {createQueueKey, removeByIndex} from './utils';


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

    static defaultProps = {
        id: rootId,
    };

    get typeProps(){
        return this.props as IModalPortalProps & typeof Modal.defaultProps;
    }


    constructor(props) {
        super(props);

        modal = {
            show: this.show,
            showWithKey: this.showWithKey,
            hide: this.hide,
        };
    }

    /**
     * 顯示 Toaster
     * (自動 QueueKey)
     * @param ModalComponent
     * @param args
     */
    show: TShow = (ModalComponent, args) => {
        const queueKey = createQueueKey();
        this.showWithKey(ModalComponent, queueKey, args);
    };

    /**
     * 顯示 Toaster
     * (手動 QueueKey)
     * @param ModalComponent
     * @param queueKey
     * @param args
     */
    showWithKey: TShowWithKey = (ModalComponent, queueKey, args) => {
        this.setState(prev => {
            if(this.typeProps._onShow){
                this.typeProps._onShow(queueKey);
            }

            const activeIdx = prev.rows.findIndex(row => row.queueKey === queueKey);
            if(activeIdx === -1){
                return {
                    rows: [...prev.rows, {queueKey, ModalComponent, args}],
                };
            }

            const cloneRow = [...prev.rows];
            cloneRow[activeIdx] = {queueKey, ModalComponent, args};

            return {
                rows: cloneRow,
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

        if(this.typeProps._onHide){
            this.typeProps._onHide(queueKey);
        }
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
                        hide: async () => {
                            this.hide(row.queueKey);
                        }
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
        return <GlobalModalContext.Provider
            value={{
                hide: this.hide,
            }}
        >

            {this.props.children}

            <ReactPortal
                id={this.typeProps.id}
                className={styles.root}
                containerSelector={this.typeProps.containerSelector}
            >
                <AnimatePresence mode={this.typeProps.animatePresenceMode}>
                    {this.renderItems()}
                </AnimatePresence>
            </ReactPortal>
                
        </GlobalModalContext.Provider>;

    }
}

export default Modal;
