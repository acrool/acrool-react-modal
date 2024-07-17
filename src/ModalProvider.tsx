import React, {createContext, ReactNode, useCallback, useContext, useEffect, useId, useState} from 'react';


interface IContextProps {
    hide: () => void
}

export const ModalProviderContext = createContext<IContextProps>({
    hide: () => console.log('Not ready yet'),
});

export const ModalProviderConsumer = ModalProviderContext.Consumer;

export const useModalContext = () => useContext(ModalProviderContext);


interface IProps {
    children: ReactNode
    hide: () => void,
}

export enum EVisible {
    show,
    hidden,
    exit,
}

const ModalProvider = ({
    children,
    hide,
}: IProps) => {


    return (
        <ModalProviderContext.Provider value={{
            hide,
        }}>
            {children}
        </ModalProviderContext.Provider>
    );
};

export default ModalProvider;

