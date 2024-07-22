import React from 'react';

import {modal} from '../Modal';
import MotionDrawer from '../MotionDrawer';
import {IModalOptions} from '../types';

// 必填 (Rule1) >> 完全不帶 但是誤判
type TShowArgs<T> = (args: T) => void;

// 非必填 (Rule2)
type TShowNotRequiredArgs<T> = (args?: T) => void;

// 不需要帶 (RuleEmpty)
type TShow = () => void;

type TShowMulti<T> = T extends undefined ? TShow : T extends Required<{}> ? TShowArgs<T> : TShowNotRequiredArgs<T>;



interface ICreateModal<T> extends React.FC<T> {
    show: TShowMulti<T>;
}

/**
 * 產生帶 framer-motion 功能的Modal
 *
 * 需要呼叫 show 才會傳送到 portal
 * @param ModalComponent
 * @param modalOptions
 */
const createModal = <T = unknown>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateModal<T> => {
    /**
     * Add framer motion
     * @param args
     */
    const MotionModal: React.FC<T> & { show: TShowMulti<T> } = (args?: T) => {
        return (
            <MotionDrawer modalOptions={modalOptions}>
                <ModalComponent {...(args as T)} />
            </MotionDrawer>
        );
    };

    // Overload signatures
    function show(): void;
    function show(args: T): void;
    function show(args?: T): void {
        if (args) {
            modal.show(MotionModal, args);
        } else {
            modal.show(MotionModal);
        }
    }

    // Assign the overloaded function to MotionModal.show
    MotionModal.show = show as TShowMulti<T>;

    return MotionModal as ICreateModal<T>;
};

export default createModal;
