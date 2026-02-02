import './index.css';

import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React from 'react';

import {rootId} from './config';
import {GlobalModalContext} from './GlobalModalProvider';
import styles from './modal.module.scss';
import {ModalProviderContext} from './ModalProvider';
import {IModal, IModalPortalProps, IRow, THidden, THiddenAll, TShow, TShowWithKey} from './types';
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
            hideAll: this.hideAll,
        };
    }

    /**
     * 顯示 Modal
     * (自動 QueueKey)
     * @param ModalComponent
     * @param args
     * @param onHide
     */
    show: TShow = (ModalComponent, args, onHide) => {
        const queueKey = createQueueKey();

        this.showWithKey(ModalComponent, queueKey, args, onHide);
    };

    /**
     * 顯示 Modal
     * (手動 QueueKey)
     * @param ModalComponent
     * @param queueKey
     * @param args
     * @param onHide
     */
    showWithKey: TShowWithKey = (ModalComponent, queueKey, args, onHide) => {
        this.setState(prev => {
            if(this.typeProps.onShow){
                this.typeProps.onShow(queueKey);
            }

            const activeIdx = prev.rows.findIndex(row => row.queueKey === queueKey);
            if(activeIdx === -1){
                return {
                    rows: [...prev.rows, {queueKey, ModalComponent, args, onHide}],
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
     * 隱藏 Modal
     * @param queueKey
     */
    hide: THidden = (queueKey) => {
        this.setState(prev => {
            const index = prev.rows.findIndex(row => row.queueKey === queueKey);
            if(index === -1) return prev;

            const curr = prev.rows[index];
            if(curr?.onHide) curr.onHide(queueKey);

            return {
                rows: removeByIndex(prev.rows, index),
            };
        });

        if(this.typeProps.onHide){
            this.typeProps.onHide(queueKey);
        }
    };

    /**
     * 隱藏所有 Modal
     */
    hideAll: THiddenAll = (ignoreKeys) => {
        this.setState(prev => {
            const acc = prev.rows.filter(row => ignoreKeys?.includes(row.queueKey));
            return {
                rows: acc,
            };
        });

        // if(this.typeProps._onHide){
        //     this.typeProps._onHide(queueKey);
        // }
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
                hideAll: this.hideAll,
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
