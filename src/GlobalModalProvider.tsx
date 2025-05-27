import Logger from '@acrool/js-logger';
import {createContext, useContext} from 'react';

import {THidden, THiddenAll} from './types';


interface IContextProps {
    hide: THidden
    hideAll: THiddenAll
}

export const GlobalModalContext = createContext<IContextProps>({
    hide: () => Logger.warning('No GlobalModal/hide method detected, did you embed your app with Acrool/ModalPortal?'),
    hideAll: () => Logger.warning('No GlobalModal/hideAll method detected, did you embed your app with Acrool/ModalPortal?'),
});

// export const GlobalModalConsumer = GlobalModalContext.Consumer;

export const useGlobalModal = () => useContext(GlobalModalContext);
