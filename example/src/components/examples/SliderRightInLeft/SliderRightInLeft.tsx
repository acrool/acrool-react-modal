import {animation, createModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';




/**
 * 右側抽屜
 *
 * PS: 示範用客製化光箱
 */
const SlideRightInLeft = () => {
    const {hide} = useModal();

    return <SliderRightRoot>
        <div>Content</div>

        <Button color="danger" onClick={hide}>CLOSE</Button>

    </SliderRightRoot>;
};

export default createModal(
    SlideRightInLeft,
    {
        animation: animation.slideRightInLeft,
        isHideWithMaskClick: true
    }
);


const SliderRightRoot = styled.div`
  width: 300px;
  height: 100vh;

  background-color: #2b3035;
  color: #fff;
  padding: 40px 20px;
`;
