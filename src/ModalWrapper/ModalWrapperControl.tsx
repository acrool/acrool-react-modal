import React, {useCallback, useState} from 'react';

import MotionDrawer from '../MotionDrawer';
import {TOnExitComplete} from '../types';
import Message from './_components/Message';
import {IMessageProps} from './types';

interface IProps extends IMessageProps{
    // onExitComplete: TOnExitComplete,
}


/**
 * 控制 Modal
 * @param status
 * @param children
 * @param onExitComplete
 */
const ModalWrapperControl = ({
    // onExitComplete,

    queueKey,
    isVisibleQueueKey = false,
    motionVariants,
    children,
}: IProps) => {
    // const [isVisible, setVisible] = useState<boolean>(true);

    /**
     * 隱藏
     * handleHidden 動畫結束後 -> onExitComplete
     */
    // const handleHidden = useCallback(() => {
    //     setVisible(false);
    // }, []);

    return (
        <MotionDrawer
            // isVisible={isVisible}
            // onExitComplete={onExitComplete}
            motionVariants={motionVariants}
        >
            {/*<Message*/}
            {/*    onClose={handleHidden}*/}
            {/*    isVisibleQueueKey={isVisibleQueueKey}*/}
            {/*    queueKey={queueKey}*/}
            {/*>*/}
            {children}
            {/*</Message>*/}
        </MotionDrawer>
    );
};

export default ModalWrapperControl;

