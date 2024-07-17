import React, {createContext, useContext} from 'react';


interface IContextProps {
    queueKey?: string,
    hide: () => void
}

export const ModalProviderContext = createContext<IContextProps>({
    hide: () => {throw new Error('No hide method detected, did you embed your app with Acrool/ModalPortal?');}
});

export const ModalProviderConsumer = ModalProviderContext.Consumer;

export const useModal = () => useContext(ModalProviderContext);
