import Logger from '@acrool/js-logger';
import {createContext, useContext} from 'react';

import {THidden} from './types';


interface IContextProps {
    hide: THidden
}

export const GlobalModalContext = createContext<IContextProps>({
    hide: () => Logger.warning('No GlobalModal/hide method detected, did you embed your app with Acrool/ModalPortal?'),
});

// export const GlobalModalConsumer = GlobalModalContext.Consumer;

export const useGlobalModal = () => useContext(GlobalModalContext);
