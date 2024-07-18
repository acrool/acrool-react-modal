import React, {createContext, useContext} from 'react';
import Logger from '@acrool/js-logger';


interface IContextProps {
    queueKey?: string,
    hide: () => Promise<void>
}

export const ModalProviderContext = createContext<IContextProps>({
    hide: async () => Logger.warning('No hide method detected, did you embed your app with Acrool/ModalPortal?'),
});

export const ModalProviderConsumer = ModalProviderContext.Consumer;

export const useModal = () => useContext(ModalProviderContext);
