import CSS from 'csstype';
import React from 'react';

import SvgLoader from '../../../assets/loader.svg?react';
import {IMessageProps} from '../../types';
import styles from './message.module.scss';


interface IProps extends IMessageProps{
    style?: CSS.Properties,
    onClose?: (confirmValue?: string) => void,
}

/**
 * Message
 */
const Message = ({
    style,
    queueKey,
    isVisibleQueueKey = false,
    children,
}: IProps) => {

    /**
     * 渲染除錯資訊
     */
    const renderInfo = () => {
        if(!isVisibleQueueKey || !queueKey){
            return null;
        }

        return <div className={styles.statusCode}>
            {queueKey}
        </div>;
    };



    return (
        <div
            className={styles.message}
            style={style}
            role="alert"
        >
            {/*{children && <div className={styles.content} dangerouslySetInnerHTML={{__html: children}}/>}*/}

            {children}

            {renderInfo()}
        </div>
    );
};

export default Message;

