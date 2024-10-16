import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import styled from 'styled-components';

import Card from '../../src/components/Card';
import Button from "../../src/components/Button";
import React from "react";




const modalOptions: IModalOptions = {
    variants: animation.fadeInDown,
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
                    <a href="https://acrool.com" target="_blank">Link</a>
                </p>

                <Button color="grayDanger" onClick={hide}>Close</Button>
            </Card>


        </CreateTaskModalRoot>;
    }
    , modalOptions);

export default CreateModalWithClickMaskClose;



const CreateTaskModalRoot = styled.div`
  width: 600px;
  margin: 0 auto;
`;
