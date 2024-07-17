import React from 'react';

import {modal} from './Modal';
import MotionDrawer from './MotionDrawer';
import {IModalProps} from './types';


type TShowArgs<T> = (args: T) => void
type TShow = () => void
type TShowMulti<T> = TShow|TShowArgs<T>
type TShowMulti2<T> = T extends undefined ? TShow : TShowArgs<T>;


interface ICreateModal<T = undefined> {
    FC: React.FC<T>,
    show: TShowArgs<T>;
    // show: any;
}

/**
 * 產生帶 framer-motion 功能的Modal
 * @param ModalComponent
 * @param props
 */
const CreateModal = <T = undefined>(ModalComponent: React.FC<T>, props?: IModalProps): ICreateModal<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const MotionModal = (args: T) => {
        return <MotionDrawer props={props}>
            <ModalComponent {...args}/>
        </MotionDrawer>;
    };

    return {
        FC: MotionModal,
        show: (args) => {
            if(args){
                modal.show(MotionModal, args);
            }else{
                modal.show(MotionModal);
            }
        },
    };
};

export default CreateModal;
