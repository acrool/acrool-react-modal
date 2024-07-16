import React, {createContext, ReactNode, useCallback, useContext, useId, useState} from 'react';

interface IContextProps {
    isVisible: boolean
    hidden: () => void
    visible: () => void
}

export const ModalProviderContext = createContext<IContextProps>(undefined);

export const ModalProviderConsumer = ModalProviderContext.Consumer;

export const useModal2 = () => useContext(ModalProviderContext);


interface IProps extends IContextProps{
    children: ReactNode
}

const ModalProvider = ({
    children,
    isVisible,
    visible,
    hidden,
}: IProps) => {
    // const [isVisible, setVisible] = useState(false);

    // const hide = useCallback(() => {
    //     setVisible(false);
    // }, []);


    return (
        <ModalProviderContext.Provider value={{
            isVisible,
            visible,
            hidden,
        }}>
            {children}
        </ModalProviderContext.Provider>
    );
};

export default ModalProvider;

