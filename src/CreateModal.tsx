import {Variants} from 'framer-motion';
import React from 'react';

import ModalProvider from './ModalProvider';
import MotionDrawer from './MotionDrawer';

interface ICreateModal {
    show: () => void
    hidden: () => void
    Component: React.FC
}

type TCreateModal = (BaseModal: () => JSX.Element) => ICreateModal;

/**
 * 產生Modal
 * @param Comp
 * @constructor
 */
const CreateModal2 = <T = undefined>(Comp: React.FC<T>): React.FC<T> => {
    const ComposeModal = (args?: T) => {
        return <ModalProvider hide={() => console.log('xx')}>
            <Comp {...args}/>
        </ModalProvider>;
    };

    return ComposeModal;
};

/**
 * 產生Modal
 * @param animationVariants
 * @param Comp
 * @constructor
 */
const CreateModal = <T = undefined>(animationVariants: Variants, Comp: React.FC<T>): React.FC<T> => {
    const ComposeModal = (args?: T) => {
        return <MotionDrawer motionVariants={animationVariants}>
            <Comp {...args}/>
        </MotionDrawer>;
    };

    return ComposeModal;
};

export default CreateModal;
