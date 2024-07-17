import React, {createContext, useContext} from 'react';


interface IContextProps {
    queueKey?: string,
    hide: () => void
}

export const ModalProviderContext = createContext<IContextProps>({
    hide: () => console.log('Not ready yet'),
});

export const ModalProviderConsumer = ModalProviderContext.Consumer;

export const useModal = () => useContext(ModalProviderContext);
