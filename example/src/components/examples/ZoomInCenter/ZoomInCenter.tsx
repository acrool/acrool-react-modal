import {animation, createStateModal, useModal} from '@acrool/react-modal';
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
        <div>ZoomInCenter</div>

        <Button color="danger" onClick={hide}>CLOSE</Button>

    </ZoomInCenterRoot>;
};

export default createStateModal(
    ZoomInCenter,
    {
        ...animation.zoomInCenter,
    }
);


const ZoomInCenterRoot = styled.div`
  width: 200px;
  height: 200px;
  
  background-color: #2b3035;
  color: #fff;
  padding: 40px 20px;
`;
