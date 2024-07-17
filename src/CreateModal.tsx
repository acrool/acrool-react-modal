import React from 'react';

import MotionDrawer from './MotionDrawer';
import {IModalProps} from './types';


/**
 * 產生帶 framer-motion 功能的Modal
 * @param ModalComponent
 * @param props
 */
const CreateModal = <T = undefined>(ModalComponent: React.FC<T>, props?: IModalProps): React.FC<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const MotionModal = (args?: T) => {
        return <MotionDrawer props={props}>
            <ModalComponent {...args}/>
        </MotionDrawer>;
    };

    return MotionModal;
};

export default CreateModal;
