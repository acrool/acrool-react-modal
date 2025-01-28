import {animation, createModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';



/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const ZoomInCenter = () => {
    const {hide} = useModal();

    return <ZoomInCenterRoot>
        <div>Zoom In Center</div>

        <Button color="danger" onClick={hide}>CLOSE</Button>

    </ZoomInCenterRoot>;
};

export default createModal(
    ZoomInCenter,
    {
        animation: animation.zoomInCenter,
        isHideWithMaskClick: true
    }
);


const ZoomInCenterRoot = styled.div`
    width: 500px;
    height: 500px;

    background-color: #7758bd;
    color: #fff;
    padding: 40px 20px;
    border-radius: 8px;
`;
