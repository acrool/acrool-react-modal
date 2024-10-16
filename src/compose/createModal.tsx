import React, {forwardRef} from 'react';

import {modal} from '../Modal';
import MotionDrawer from '../MotionDrawer';
import {IModalOptions} from '../types';
import {motion} from "framer-motion";



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
 * @param MainComponent
 * @param modalOptions
 */
function createModal<P = undefined>(
    MainComponent: React.FC<P>,
    modalOptions?: IModalOptions
): ICreateModal<P> {

    const RefMainComponent = forwardRef(MainComponent as React.ForwardRefRenderFunction<P>) as React.ForwardRefExoticComponent<React.RefAttributes<P>>;
    const MotionRefMainComponent = motion.create(RefMainComponent);

    /**
     * Add framer motion
     * @param args
     */
    const MotionModal: React.FC<P> & { show: TModalShowMulti<P> } = (args?: P) => {
        return (
            <MotionDrawer modalOptions={modalOptions}>
                <MotionRefMainComponent {...args as P & {}} />
            </MotionDrawer>
        );
    };

    // Overload signatures
    function show();
    function show(args: P): void;
    function show(args?: P): void {
        if (args) {
            modal.show(MotionModal, args);
        } else {
            modal.show(MotionModal);
        }
    }

    // Assign the overloaded function to MotionModal.show
    MotionModal.show = show as TModalShowMulti<P>;

    return MotionModal as ICreateModal<P>;
}

export default createModal;
