import './index.css';

import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React from 'react';

import {rootId} from './config';
import {OriginCreateModalWithFetchWait} from './CreateModalWithFetchWait';
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

    // componentDidUpdate() {
    //     modal = {
    //         show: this.show,
    //         hide: this.hide,
    //     };
    // }

    /**
     * 顯示 Toaster
     * @param ModalComponent
     * @param args
     */
    show: TShow = (ModalComponent, args) => {
        const queueKey = createQueueKey();
        this.setState(prev => {
            return {
                rows: [{queueKey: 'xx', ModalComponent, args}],
            };
        });
        // if(this.typeProps._onShow){
        //     this.typeProps._onShow(queueKey);
        // }
    };


    /**
     * 隱藏 Toaster
     * @param queueKey
     */
    hide: THidden = (queueKey) => {
        this.setState(prev => {
            const index = prev.rows.findIndex(row => row.queueKey === queueKey);
            return {
                rows: [],
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
            return <row.ModalComponent
                key={row.queueKey}
                {...row.args}
            />;
            // return (
            //     <OriginCreateModalWithFetchWait
            //         key={row.queueKey}
            //         {...row.args}
            //     />
            // );
        });
    };


    render() {
        return <ModalProviderContext.Provider
            value={{
                // queueKey: row.queueKey,
                hide: this.hide,
            }}>
            <AnimatePresence>
                {this.renderItems()}
            </AnimatePresence>
        </ModalProviderContext.Provider>;

        // return <ReactPortal
        //     id={this.typeProps.id}
        //     className={styles.root}
        //     containerSelector={this.typeProps.containerSelector}
        // >
        //     <AnimatePresence mode="wait">
        //         {this.renderItems()}
        //     </AnimatePresence>
        // </ReactPortal>;
    }
}

export default Modal;
