import React from 'react';

import {modal} from '../Modal';
import MotionDrawer from '../MotionDrawer';
import {IModalOptions} from '../types';
import {createQueueKey} from '../utils';



interface ICreateModal<T> extends React.FC<T>{
    show: TModalShowMulti<T>
    showWithKey: TModalShowWithKeyMulti<T>
}


// 不需要帶 (RuleEmpty)
type TModalShow = () => void;
type TModalShowWithKey = (queueKey: string) => void;

// 必填 (Rule2) >> 完全不帶 但是誤判
type TModalShowArgs<T> = (args: T) => void;
type TModalShowNotRequiredArgs<T> = (partialArgs?: T) => void;

type TModalShowWithKeyArgs<T> = (queueKey: string, args: T) => void;
type TModalShowWithKeyNotRequiredArgs<T> = (queueKey: string, partialArgs?: T) => void;

// 注意 createModal T = ? 與 T extends ?
// 兩個需要相同
type TModalShowMulti<T> = T extends undefined ? TModalShow :
    T extends Required<{}> ? TModalShowArgs<T> :
        TModalShowNotRequiredArgs<T>;

// 注意 createModal T = ? 與 T extends ?
// 兩個需要相同
type TModalShowWithKeyMulti<T> = T extends undefined ? TModalShowWithKey :
    T extends Required<{}> ? TModalShowWithKeyArgs<T> :
        TModalShowWithKeyNotRequiredArgs<T>;

type TMotionModal<T> =
    React.FC<T> &
    {
        show: TModalShowMulti<T>,
        showWithKey: TModalShowWithKeyMulti<T>,
    }

/**
 * 產生帶 framer-motion 功能的Modal
 *
 * 需要呼叫 show 才會傳送到 portal
 * @param ModalComponent
 * @param modalOptions
 */
function createModal<T = undefined>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateModal<T> {
    const {_effect, ...options} = modalOptions ?? {} as IModalOptions;

    /**
     * Add framer motion
     * @param args
     */
    const MotionModal: TMotionModal<T> = (args?: T) => {
        return (
            <MotionDrawer modalOptions={options}>
                <ModalComponent {...args as T & {}} />
            </MotionDrawer>
        );
    };

    // Overload signatures
    function show();
    function show(args: T): void;
    function show(args?: T): void {
        const queueKey = createQueueKey();

        if (args) {
            modal.showWithKey(MotionModal, queueKey, args, _effect?.onHide);
        } else {
            modal.showWithKey(MotionModal, queueKey, undefined, _effect?.onHide);
        }
        if(_effect?.onShow) _effect.onShow(queueKey);
    }

    // Overload signatures
    function showWithKey(queueKey: string);
    function showWithKey(queueKey: string, args: T): void;
    function showWithKey(queueKey: string, args?: T): void {
        if (args) {
            modal.showWithKey(MotionModal, queueKey, args, _effect?.onHide);
        } else {
            modal.showWithKey(MotionModal, queueKey, undefined, _effect?.onHide);
        }
        if(_effect?.onShow) _effect.onShow(queueKey);
    }

    // Assign the overloaded function to MotionModal.show
    MotionModal.show = show as TModalShowMulti<T>;
    MotionModal.showWithKey = showWithKey as TModalShowWithKeyMulti<T>;

    return MotionModal as ICreateModal<T>;
}

export default createModal;
