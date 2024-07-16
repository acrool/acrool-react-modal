import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {rootId} from './config';
import styles from './modal.module.scss';
import ModalProvider from './ModalProvider';
import ModalWrapper from './ModalWrapper';
import {IModalProps} from './types';

type TComp = () => JSX.Element

interface ICreateModal {
    show: () => void
    hidden: () => void
    Component: React.FC
}


const getCreatePortal = () => ReactDOM.createPortal;


export const useCreateModal = (Component?: () => JSX.Element) => {

    const [isVisible, setVisible] = useState(false);

    const visible = () => {
        console.log('visible');
        setVisible(true);

    };
    const hidden = () => {
        console.log('hide');
        setVisible(false);
    };

    const renderContent = () => {
        if(!isVisible){
            return null;
        }
        return <ModalProvider
            isVisible={isVisible}
            hidden={hidden}
            visible={visible}
        >
            <ReactPortal
                id={rootId}
                className={styles.root}
            >
                <AnimatePresence>
                    <Component/>
                </AnimatePresence>
            </ReactPortal>
        </ModalProvider>;
    };


    return {
        visible,
        hidden,
        Component: renderContent
    };

};





export const CreateModal = (Component: () => JSX.Element): ICreateModal => {

    // const [isVisible, setVisible] = useState(false);

    const show = () => {
        // setVisible(true);
    };
    const hidden = () => {
        // setVisible(false);
    };


    return {
        show,
        hidden,
        Component: () => {

            return <ReactPortal
                id={rootId}
                className={styles.root}
            >
                <AnimatePresence>
                    <Component/>
                </AnimatePresence>
            </ReactPortal>;
        },
    };
};



export const CreateModal2 = (isT: string): () => ICreateModal => {

    const [isVisible, setVisible] = useState(false);

    const show = () => {
        setVisible(true);
    };
    const hidden = () => {
        setVisible(false);
    };


    return (Component?: React.FC) => {


        return {
            show,
            hidden,
            Component: () => {
                const [isVisible, setVisible] = useState(false);

                return <ReactPortal
                    id={rootId}
                    className={styles.root}
                >
                    <AnimatePresence>
                        <Component/>
                    </AnimatePresence>
                </ReactPortal>;
            },
        };
    };
};


type TCreateModal3 = (BaseModal: () => JSX.Element) => ICreateModal;

export const CreateModal3 = <T = undefined>(Comp: React.FC<T>): React.FC<T> => {


    return (args?: T) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isVisible, setVisible] = useState(true);

        const hidden = () => {
            setVisible(false);
        };

        return <ReactPortal
            id={rootId}
            className={styles.root}
        >
            <AnimatePresence>
                {isVisible && Comp(args)}
            </AnimatePresence>
        </ReactPortal>;

    };


};

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

    return (test?: string) => {
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


};

export default Modal;
