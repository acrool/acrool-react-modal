import React from 'react';

import {modal} from '../Modal';
import MotionDrawer from '../MotionDrawer';
import {IModalOptions} from '../types';


type TShowArgs<T> = (args: T) => void
type TShow = () => void
// type TShowMulti<T> = T extends undefined ? TShow : TShowArgs<T>;


interface ICreateModal<T> extends React.FC<T>{
    show: TShow;
    showArgs: TShowArgs<T>;
}








/**
 * 產生帶 framer-motion 功能的Modal
 *
 * 需要呼叫 show 才會傳送到 portal
 * @param ModalComponent
 * @param modalOptions
 */
const createPortalModal = <T = {}>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateModal<T> => {
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


export default createPortalModal;
