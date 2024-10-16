import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../src/components/Button';
import Card from '../../src/components/Card';




const modalProps: IModalOptions = {
    ...animation.fadeInDown,
    className: 'p-3'
};

/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const CreateModalPrimary = () => {
    const {hide} = useModal();

    return <CreateTaskModalRoot>
        <Card title="Primary" direction="column">
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
    CreateModalPrimary,
    modalProps,
);



const CreateTaskModalRoot = styled.div`
  width: 400px;
`;
