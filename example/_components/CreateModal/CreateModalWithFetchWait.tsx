import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import {motion, usePresence} from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import Button from '../../src/components/Button';
import Card from '../../src/components/Card';




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
const CreateModalWithFetchWait = (props: undefined, ref: any) => {
    const {hide} = useModal();
    const [isPresent, safeToRemove] = usePresence();

    console.log('ref', ref);
    return <motion.div
        {...animation.fadeInDown}
    >
        {String(isPresent)}
        <Card title="With Fetch Wait" direction="column">
            <p>
                    Acrool is an developer driven platform to visually design and manage project infrastructure, collaboratively.
                    It's the solution for any provider
                <a href="https://acrool.com" target="_blank" rel="noreferrer">Link</a>
            </p>

            <Button color="grayDanger" onClick={hide}>Close</Button>
        </Card>


    </motion.div>;
};


export default createModal(
    CreateModalWithFetchWait,
    modalProps,
);





const CreateTaskModalRoot = styled(motion.div)`
  width: 400px;
`;
