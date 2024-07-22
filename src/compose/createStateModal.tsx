import {ReactDidMountPortal} from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {useCallback, useRef, useState} from 'react';

import {rootId} from '../config';
import {ModalProviderContext} from '../ModalProvider';
import MotionDrawer from '../MotionDrawer';
import {IModalOptions} from '../types';


interface ICreateStateModal<T> extends React.FC<T>{
}


/**
 * 產生帶 framer-motion 功能的Modal Component
 *
 * 當渲染時直接會插入到 Portal
 * @param ModalComponent
 * @param modalOptions
 */
const createStateModal = <T = unknown>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateStateModal<T> => {
    /**
     * Add framer motion
     * Add state
     * @param args
     */
    const StateModal = (args: T) => {

        const [isVisible, setVisible] = useState(true);

        const resolveRef = useRef<() => void>();


        /**
         * 當動畫結束時通知
         */
        const handleOnExitComplete = () => {
            if (resolveRef.current) {
                resolveRef.current();
            }
        };

        /**
         * 處理隱藏
         */
        const handleHide = useCallback(async () => {
            return new Promise<void>((resolve) => {
                resolveRef.current = resolve;
                setVisible(false);
            });
        }, []);

        /**
         * 選取傳送點
         */
        const rootSelector = useCallback(() => {
            return document.getElementById(rootId);
        }, []);


        return <ModalProviderContext.Provider
            value={{
                hide: handleHide,
            }}
        >
            <ReactDidMountPortal
                rootSelector={rootSelector}
            >
                <AnimatePresence onExitComplete={handleOnExitComplete}>
                    {isVisible &&
                    <MotionDrawer modalOptions={modalOptions}>
                        <ModalComponent {...args}/>
                    </MotionDrawer>
                    }
                </AnimatePresence>
            </ReactDidMountPortal>
        </ModalProviderContext.Provider>;
    };


    return StateModal;
};

export default createStateModal;
