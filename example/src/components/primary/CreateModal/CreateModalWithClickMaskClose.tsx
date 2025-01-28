import {animation, createModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';
import Card from '../../atoms/Card';




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




export default createModal(
    CreateModalWithClickMaskClose,
    {
        ...animation.generateFadeIn(),
        isHideWithMaskClick: true,
        className: 'p-3',
    },
);

const CreateTaskModalRoot = styled.div`
  width: 600px;
`;
