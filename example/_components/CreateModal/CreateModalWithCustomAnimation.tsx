import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import {motion, usePresence} from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import Button from '../../src/components/Button';
import Card from '../../src/components/Card';



/**
 *
 *
 * PS: 示範用客製化光箱
 */
const CreateModalWithCustomAnimation = () => {
    const {hide} = useModal();

    return <CreateTaskModalRoot
        {...animation.fadeInDown}
    >
        <Card title="With Custom Animation" direction="column">
            <p>
                    Acrool is an developer driven platform to visually design and manage project infrastructure, collaboratively.
                    It's the solution for any provider
                <a href="https://acrool.com" target="_blank" rel="noreferrer">Link</a>
            </p>

            <Button color="grayDanger" onClick={hide}>Close</Button>
        </Card>

    </CreateTaskModalRoot>;
};

export default createModal(
    CreateModalWithCustomAnimation,
);





const CreateTaskModalRoot = styled(motion.div)`
  width: 400px;
`;
