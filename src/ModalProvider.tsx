import React, {createContext, ReactNode, useCallback, useContext, useEffect, useId, useState} from 'react';

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

export const useModal2 = () => useContext(ModalProviderContext);


interface IProps {
    children: ReactNode
}

const ModalProvider = ({
    children,
    // isVisible,
    // show,
    // hidden,
}: IProps) => {
    const [isVisible, setVisible] = useState(false);

    const show = () => {
        console.log('show new');
        setVisible(true);
    };

    const hidden = () => {
        console.log('hidden new');
        setVisible(false);
    };


    return (
        <ModalProviderContext.Provider value={{
            isVisible,
            show,
            hidden,
        }}>
            {children}
        </ModalProviderContext.Provider>
    );
};

export default ModalProvider;

