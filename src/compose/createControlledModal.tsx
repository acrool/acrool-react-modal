import {AnimatePresence} from 'framer-motion';
import React, {useCallback, useRef, useState} from 'react';

import {ModalProviderContext} from '../ModalProvider';
import MotionDrawer from '../MotionDrawer';
import {IModalOptions} from '../types';


interface ICreateControlledModal<T> extends React.FC<T>{
}


/**
 * 產生帶 framer-motion 功能的Modal
 * @param ModalComponent
 * @param modalOptions
 */
const createControlledModal = <T = {}>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateControlledModal<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const ControlledMotionModal = (args: T) => {

        const [isVisible, setVisible] = useState(true);

        const resolveRef = useRef<() => void>();

        const handleOnExitComplete = () => {
            if (resolveRef.current) {
                resolveRef.current();
            }
        };

        const handleHide = useCallback(async () => {
            return new Promise<void>((resolve) => {
                resolveRef.current = resolve;
                setVisible(false);
            });
        }, []);

        return <ModalProviderContext.Provider
            value={{
                hide: handleHide,
            }}
        >
            <AnimatePresence onExitComplete={handleOnExitComplete}>
                {isVisible &&
                    <MotionDrawer modalOptions={modalOptions}>
                        <ModalComponent {...args}/>
                    </MotionDrawer>
                }
            </AnimatePresence>
        </ModalProviderContext.Provider>;
    };


    return ControlledMotionModal;
};

export default createControlledModal;
