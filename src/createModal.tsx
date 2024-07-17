import React from 'react';

import {modal} from './Modal';
import MotionDrawer from './MotionDrawer';
import {IModalOptions} from './types';


type TShowArgs<T> = (args: T) => void
type TShow = () => void
// type TShowMulti<T> = T extends undefined ? TShow : TShowArgs<T>;


interface ICreateModal<T = undefined> {
    FC: React.FC<T>,
    show: TShow;
    showArgs: TShowArgs<T>;
}

/**
 * 產生帶 framer-motion 功能的Modal
 * @param ModalComponent
 * @param modalOptions
 */
const createModal = <T = undefined>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateModal<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const MotionModal = (args: T) => {
        return <MotionDrawer modalOptions={modalOptions}>
            <ModalComponent {...args}/>
        </MotionDrawer>;
    };

    return {
        FC: MotionModal,
        show: () => modal.show(MotionModal),
        showArgs: (args) => modal.show(MotionModal, args),
    };
};

export default createModal;
