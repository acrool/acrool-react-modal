import './index.css';

import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {createElement} from 'react';

import {rootId} from './config';
import styles from './modal.module.scss';
import {ModalProviderContext} from './ModalProvider';
import {IModal, IModalPortalProps, IRow, THidden, TShow} from './types';
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
            hide: this.hide,
        };
    }

    /**
     * 顯示 Toaster
     * @param ModalComponent
     * @param args
     */
    show: TShow = (ModalComponent, args) => {
        const queueKey = createQueueKey();
        this.setState(prev => {
            return {
                rows: [...prev.rows, {queueKey, ModalComponent, args}],
            };
        });
        if(this.typeProps.onShow){
            this.typeProps.onShow(queueKey);
        }
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

        if(this.typeProps.onHide){
            this.typeProps.onHide(queueKey);
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


    /**
     * 渲染 Outlet
     * 預留給 react-router-dom 使用
     */
    renderOutlet = () => {
        if(!this.typeProps.Outlet) return;
        return createElement(this.typeProps.Outlet, null, null);
    };


    render() {
        return (<>
            <ReactPortal
                id={this.typeProps.id}
                className={styles.root}
                containerSelector={this.typeProps.containerSelector}
            >
                <AnimatePresence>
                    {this.renderItems()}
                </AnimatePresence>
            </ReactPortal>
            {this.renderOutlet()}
        </>
        );
    }
}

export default Modal;
