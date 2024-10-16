import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';

import Card from '../../src/components/Card';
import Button from "../../src/components/Button";




const modalProps: IModalOptions = {
    ...animation.fadeInDown,
    // variants: {
    //     initial: {transform: 'scale(0)'},
    //     show: {transform: 'scale(1)'},
    //     exit: {transform: 'scale(0)'},
    // },
    className: 'p-3'
};
// const modalPropsUndefined: IModalProps|undefined = undefined;

/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const CreateModalPrimary = createModal(
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
    ,modalProps);

export default CreateModalPrimary;


const CreateTaskModalRoot = styled.div`
  width: 400px;
`;
