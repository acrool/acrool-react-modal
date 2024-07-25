import React from 'react';

import {modal} from '../Modal';
import MotionDrawer from '../MotionDrawer';
import {IModalOptions} from '../types';



interface ICreateModal<T> extends React.FC<T>{
    show: TModalShowMulti<T>;
}


// 不需要帶 (RuleEmpty)
type TModalShow = () => void;

// 必填 (Rule2) >> 完全不帶 但是誤判
type TModalShowArgs<T> = (args: T) => void;
type TModalShowNotRequiredArgs<T> = (partialArgs?: T) => void;

// 注意 createModal T = ? 與 T extends ?
// 兩個需要相同
type TModalShowMulti<T> = T extends undefined ? TModalShow :
    T extends Required<{}> ? TModalShowArgs<T> :
        TModalShowNotRequiredArgs<T>;

/**
 * 產生帶 framer-motion 功能的Modal
 *
 * 需要呼叫 show 才會傳送到 portal
 * @param ModalComponent
 * @param modalOptions
 */
function createModal<T = undefined>(ModalComponent: React.FC<T>, modalOptions?: IModalOptions): ICreateModal<T> {
    /**
     * Add framer motion
     * @param args
     */
    const MotionModal: React.FC<T> & { show: TModalShowMulti<T> } = (args?: T) => {
        return (
            <MotionDrawer modalOptions={modalOptions}>
                {ModalComponent(args as T)}
                {/*<ModalComponent {...(args as T & {})} />*/}
            </MotionDrawer>
        );
    };

    // Overload signatures
    function show();
    function show(args: T): void;
    function show(args?: T): void {
        if (args) {
            modal.show(MotionModal, args);
        } else {
            modal.show(MotionModal);
        }
    }

    // Assign the overloaded function to MotionModal.show
    MotionModal.show = show as TModalShowMulti<T>;

    return MotionModal as ICreateModal<T>;
}

export default createModal;
