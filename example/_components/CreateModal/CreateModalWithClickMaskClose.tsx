import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../src/components/Button';
import Card from '../../src/components/Card';




/**
 * 點擊遮罩關閉光箱
 */
const CreateModalWithClickMaskClose = () => {
    const {hide} = useModal();


    return <CreateTaskModalRoot>
        <Card title="With Click MaskClose" direction="column">
            <p>
                    Acrool is an developer driven platform to visually design and manage project infrastructure, collaboratively.
                    It's the solution for any provider
                <a href="https://acrool.com" target="_blank" rel="noreferrer">Link</a>
            </p>

            <Button color="grayDanger" onClick={hide}>Close</Button>
        </Card>


    </CreateTaskModalRoot>;
};



const modalOptions: IModalOptions = {
    ...animation.fadeInDown,
    className: 'p-3',
    isEnableHideWithClickMask: true,
};


export default createModal(
    CreateModalWithClickMaskClose,
    modalOptions,
);

const CreateTaskModalRoot = styled.div`
  width: 600px;
`;
