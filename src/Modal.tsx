import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {rootId} from './config';
import styles from './modal.module.scss';
import ModalProvider, {ModalProviderContext} from './ModalProvider';
import ModalWrapper from './ModalWrapper';
import {IModalProps} from './types';

type TComp = () => JSX.Element

interface ICreateModal {
    show: () => void
    hidden: () => void
    Component: React.FC
}



type TCreateModal3 = (BaseModal: () => JSX.Element) => ICreateModal;

export const CreateModal3 = <T = undefined>(Comp: React.FC<T>): React.FC<T> => {


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
