import {Variants} from 'framer-motion';
import React from 'react';

import MotionDrawer from './MotionDrawer';


/**
 * 產生帶 framer-motion 功能的Modal
 * @param animationVariants
 * @param Comp
 * @constructor
 */
const CreateModal = <T = undefined>(animationVariants: Variants, Comp: React.FC<T>): React.FC<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const MotionModal = (args?: T) => {
        return <MotionDrawer motionVariants={animationVariants}>
            <Comp {...args}/>
        </MotionDrawer>;
    };

    return MotionModal;
};

export default CreateModal;
