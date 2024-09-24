import {ReactDidMountPortal} from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {rootId} from '../config';
import {ModalProviderContext} from '../ModalProvider';
import MotionDrawer from '../MotionDrawer';
import {IStageModalOptions} from '../types';
import {createQueueKey} from "../utils";


interface ICreateStateModal<T> extends React.FC<T>{
}


/**
 * 產生帶 framer-motion 功能的Modal Component
 *
 * 當渲染時直接會插入到 Portal
 * @param ModalComponent
 * @param modalOptions
 */
function createStateModal<T>(ModalComponent: React.FC<T>, modalOptions?: IStageModalOptions): ICreateStateModal<T>{
    /**
     * Add framer motion
     * Add state
     * @param args
     */
    const StateModal = (args: T) => {

        const [isVisible, setVisible] = useState(true);

        const resolveRef = useRef<() => void>();
        const queueKey = modalOptions?.queueKey ?? createQueueKey();

        useEffect(() => {
            if(modalOptions?.onShow) modalOptions.onShow(queueKey);
            return () => {
                if(modalOptions?.onHide) modalOptions.onHide(queueKey);
            };
        }, []);

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


        return <ModalProviderContext.Provider
            value={{
                hide: handleHide,
                queueKey,
            }}
        >
            <ReactDidMountPortal
                containerSelector={() => document.getElementById(rootId)}
            >
                <AnimatePresence onExitComplete={handleOnExitComplete}>
                    {isVisible &&
                        <MotionDrawer modalOptions={modalOptions}>
                            <ModalComponent {...args as T & {}} />
                        </MotionDrawer>
                    }
                </AnimatePresence>
            </ReactDidMountPortal>
        </ModalProviderContext.Provider>;
    };


    return StateModal;
}

export default createStateModal;
