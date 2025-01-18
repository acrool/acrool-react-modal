import {animation, createModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';
import Card from '../../atoms/Card';




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
    {
        ...animation.generateFadeIn(),
        className: 'p-3',
        isBodyScrollEnable: true,
        isHideWithMaskClick: true,
        isMaskHidden: false
    },
);


export const PrimaryWithHideMask = createModal(
    CreateModalPrimary,
    {
        ...animation.generateFadeIn(),
        className: 'p-3',
        isBodyScrollEnable: true,
        isHideWithMaskClick: true,
        isMaskHidden: true
    },
);



const CreateTaskModalRoot = styled.div`
  width: 400px;
`;
