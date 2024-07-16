import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {createContext, ReactNode, useCallback, useContext, useEffect, useId, useState} from 'react';

import {rootId} from './config';
import styles from './modal.module.scss';

interface IContextProps {
    isVisible: boolean
    hidden: () => void
    show: () => void
}

export const ModalProviderContext = createContext<IContextProps>({
    isVisible: false,
    hidden: () => console.log('Not ready yet'),
    show: () => console.log('Not ready yet')
});

export const ModalProviderConsumer = ModalProviderContext.Consumer;

export const useModalContext = () => useContext(ModalProviderContext);


interface IProps {
    children: ReactNode
}

export enum EVisible {
    show,
    hidden,
    exit,
}

const ModalProvider = ({
    children,
    // isVisible,
    // show,
    // hidden,
}: IProps) => {
    const [visible, setVisible] = useState<EVisible>(EVisible.show);

    const show = () => {
        console.log('show new');
        setVisible(EVisible.show);
    };

    const hidden = () => {
        console.log('hidden new');
        setVisible(EVisible.hidden);
    };

    const exit = () => {
        console.log('hidden new');
        setVisible(EVisible.exit);
    };


    return (
        <ModalProviderContext.Provider value={{
            isVisible: visible === EVisible.show,
            show,
            hidden,
        }}>
            <ReactPortal
                id={rootId}
                className={styles.root}
            >
                <AnimatePresence onExitComplete={exit}>
                    {visible === EVisible.show && children}
                </AnimatePresence>
            </ReactPortal>
        </ModalProviderContext.Provider>
    );
};

export default ModalProvider;

