import {animation, createModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';





/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const SliderLeftInRight = () => {
    const {hide} = useModal();

    return <SliderLeftRoot>
        <div>Content</div>

        <Button color="danger" onClick={hide}>CLOSE</Button>

    </SliderLeftRoot>;
};


export default createModal(
    SliderLeftInRight,
    {
        animation: animation.slideLeftInRight,
        isHideWithMaskClick: true,
        isFixedDisabled: true,
    }
);



const SliderLeftRoot = styled.div`
  width: 300px;
  height: 100vh;

  background-color: #2b3035;
  color: #fff;
  padding: 40px 20px;
`;
