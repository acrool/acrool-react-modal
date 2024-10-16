import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../src/components/Button';
import Card from '../../src/components/Card';




const modalOptions: IModalOptions = {
    ...animation.fadeInDown,
    className: 'p-3',
    isEnableHideWithClickMask: true,
};


/**
 * 優惠活動光箱
 *
 * PS: 示範用客製化光箱
 */
const CreateModalWithClickMaskClose = createModal(
    () => {
        const {hide} = useModal();


        return <CreateTaskModalRoot>
            <Card title="Create Modal" direction="column">
                <p>
                    Acrool is an developer driven platform to visually design and manage project infrastructure, collaboratively.
                    It's the solution for any provider
                    <a href="https://acrool.com" target="_blank" rel="noreferrer">Link</a>
                </p>

                <Button color="grayDanger" onClick={hide}>Close</Button>
            </Card>


        </CreateTaskModalRoot>;
    }
    , modalOptions);

export default CreateModalWithClickMaskClose;



const CreateTaskModalRoot = styled.div`
  width: 600px;
`;
