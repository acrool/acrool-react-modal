import {Variants} from 'framer-motion';
import React from 'react';

import MotionDrawer from './MotionDrawer';
import {IMotionProps} from './types';


/**
 * 產生帶 framer-motion 功能的Modal
 * @param ModalComponent
 * @param motionProps
 */
const CreateModal = <T = undefined>(ModalComponent: React.FC<T>, motionProps?: IMotionProps): React.FC<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const MotionModal = (args?: T) => {
        return <MotionDrawer motionProps={motionProps}>
            <ModalComponent {...args}/>
        </MotionDrawer>;
    };

    return MotionModal;
};

export default CreateModal;
