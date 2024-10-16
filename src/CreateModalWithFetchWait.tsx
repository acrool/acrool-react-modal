import {animation, createModal, IModalOptions, useModal} from './';
import {motion, usePresence} from 'framer-motion';
import React from 'react';





const modalProps: IModalOptions = {
    // variants: {
    //     initial: {transform: 'scale(0)'},
    //     show: {transform: 'scale(1)'},
    //     exit: {transform: 'scale(0)'},
    // },
    // className: 'p-3'
};
// const modalPropsUndefined: IModalProps|undefined = undefined;

/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const OriginCreateModalWithFetchWait = () => {
    const {hide} = useModal();
    const [isPresent, safeToRemove] = usePresence();

    return <motion.div
        {...animation.fadeInDown}
    >
        {String(isPresent)}
        <p>
                    Acrool is an developer driven platform to visually design and manage project infrastructure, collaboratively.
                    It's the solution for any provider
            <a href="https://acrool.com" target="_blank" rel="noreferrer">Link</a>
        </p>

        <button type="button" onClick={() => hide('xxx')}>Close</button>


    </motion.div>;
};


export {
    OriginCreateModalWithFetchWait,
};


