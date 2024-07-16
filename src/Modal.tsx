import React, {useState} from 'react';

import ModalProvider, {ModalProviderContext} from './ModalProvider';

type TComp = () => JSX.Element

interface ICreateModal {
    show: () => void
    hidden: () => void
    Component: React.FC
}



type TCreateModal = (BaseModal: () => JSX.Element) => ICreateModal;


export const CreateModal = <T = undefined>(Comp: React.FC<T>): React.FC<T> => {


    const ComposeModal = (args?: T) => {
        // const [isVisible, setVisible] = useState(true);
        //
        // const hidden = () => {
        //     console.log('ComposeModal hidden!');
        //     setVisible(false);
        // };
        //
        // const show = () => {
        //     console.log('ComposeModal show!');
        //     setVisible(true);
        // };

        return <ModalProvider>

            <Comp {...args}/>
        </ModalProvider>;

    };

    return ComposeModal;

};
