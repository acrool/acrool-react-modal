import React, {useEffect} from 'react';

import {modal} from './Modal';
import MotionDrawer from './MotionDrawer';
import {IModalOptions} from './types';
import {useModal} from "./ModalProvider";


type TShowArgs<T> = (args: T) => void
type TShow = () => void
// type TShowMulti<T> = T extends undefined ? TShow : TShowArgs<T>;


interface ICreateModal<T> {
    FC: React.FC<T>,
    HashFC: React.FC<T>,
    show: TShow;
    showArgs: TShowArgs<T>;
}

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
    
    const HashModal = (args: T) => {
        const {hide} = useModal();
        useEffect(() => {
            modal.show(MotionModal, args);

            return () => {
                hide();
            };
        }, [modal]);
        return null;
    };

    return {
        FC: MotionModal,
        HashFC: HashModal,
        show: () => modal.show(MotionModal),
        showArgs: (args) => modal.show(MotionModal, args),
    };
};

export default createModal;
