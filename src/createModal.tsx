import {AnimatePresence} from 'framer-motion';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ulid} from 'ulid';

import {modal} from './Modal';
import {ModalProviderContext, useModal} from './ModalProvider';
import MotionDrawer from './MotionDrawer';
import {IModalOptions} from './types';


type TShowArgs<T> = (args: T) => void
type TShow = () => void
// type TShowMulti<T> = T extends undefined ? TShow : TShowArgs<T>;


interface ICreateModal<T> extends React.FC<T>{
    show: TShow;
    showArgs: TShowArgs<T>;
}

interface ICreateHashModal<T> extends React.FC<T>{
}



type TCallBack = () => void;

/**
 * 產生帶 framer-motion 功能的Modal
 * @param ModalComponent
 * @param modalOptions
 */
const createHashModal = <T = {}>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateHashModal<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const HashMotionModal = (args: T) => {

        const queueKey = ulid();
        const [isVisible, setVisible] = useState(true);

        const resolveRef = useRef<() => void>();

        const handleOnExitComplete = () => {
            if (resolveRef.current) {
                resolveRef.current();
            }
        };

        const handleHide = useCallback(async () => {
            return new Promise<void>((resolve) => {
                resolveRef.current = resolve;
                setVisible(false);
            });
        }, []);

        return <ModalProviderContext.Provider
            value={{
                queueKey,
                hide: handleHide,
            }}
        >
            <AnimatePresence onExitComplete={handleOnExitComplete}>
                {isVisible &&
                    <MotionDrawer modalOptions={modalOptions}>
                        <ModalComponent {...args}/>
                    </MotionDrawer>
                }
            </AnimatePresence>
        </ModalProviderContext.Provider>;
    };


    return HashMotionModal;
};



/**
 * 產生帶 framer-motion 功能的Modal
 * @param ModalComponent
 * @param modalOptions
 */
const createModal = <T = {}>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateModal<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const MotionModal = (args: T) => {
        return <MotionDrawer modalOptions={modalOptions}>
            <ModalComponent {...args}/>
        </MotionDrawer>;
    };

    MotionModal.show = () => modal.show(MotionModal);
    MotionModal.showArgs = (args) => modal.show(MotionModal, args);

    return MotionModal;
};



export {
    createHashModal,
};

export default createModal;
