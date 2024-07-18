import React from 'react';

import {modal} from '../Modal';
import MotionDrawer from '../MotionDrawer';
import {IModalOptions} from '../types';


type TShowArgs<T> = (args: T) => void
type TShow = () => void
type TShowMulti<T> = {} extends T ? TShow : TShowArgs<T>;

interface ICreateModal<T> extends React.FC<T>{
    show: TShowMulti<T>;
}

/**
 * 產生帶 framer-motion 功能的Modal
 *
 * 需要呼叫 show 才會傳送到 portal
 * @param ModalComponent
 * @param modalOptions
 */
const createModal = <T = {}>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateModal<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const MotionModal: React.FC<T> & { show: TShowMulti<T> }  = (args: T) => {
        return <MotionDrawer modalOptions={modalOptions}>
            <ModalComponent {...args}/>
        </MotionDrawer>;
    };

    // Overload signatures
    function show(): void;
    function show(args: T): void;
    function show(args?: T): void {
        if (args) {
            modal.show(MotionModal, args);
        } else {
            modal.show(MotionModal);
        }
    }

    // Assign the overloaded function to MotionModal.show
    MotionModal.show = show as TShowMulti<T>;

    return MotionModal as ICreateModal<T>;
};


export default createModal;
