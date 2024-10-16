import Logger from '@acrool/js-logger';
import React, {createContext, useContext} from 'react';
import {THidden} from "./types";


interface IContextProps {
    queueKey?: string,
    hide: THidden
}

export const ModalProviderContext = createContext<IContextProps>({
    hide: async () => Logger.warning('No hide method detected, did you embed your app with Acrool/ModalPortal?'),
});

export const ModalProviderConsumer = ModalProviderContext.Consumer;

export const useModal = () => useContext(ModalProviderContext);
