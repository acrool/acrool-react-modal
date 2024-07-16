import React from 'react';

import ModalProvider from './ModalProvider';

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
const CreateModal = <T = undefined>(Comp: React.FC<T>): React.FC<T> => {
    const ComposeModal = (args?: T) => {
        return <ModalProvider>
            <Comp {...args}/>
        </ModalProvider>;
    };

    return ComposeModal;
};

export default CreateModal;
