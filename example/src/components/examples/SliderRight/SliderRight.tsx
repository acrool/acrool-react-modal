import {animation, createStateModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';
import Button, {RoundButton} from "../../atoms/Button";




/**
 * 右側抽屜
 *
 * PS: 示範用客製化光箱
 */
const SliderRight = () => {
    const {hide} = useModal();

    return <SliderRightRoot>
        <div>RightSlider content</div>

        <Button color="danger" onClick={hide}>CLOSE</Button>

    </SliderRightRoot>;
};

export default createStateModal(
    SliderRight,
    {
        ...animation.slideInLeft,
        isEnableHideWithClickMask: true
    }
);


const SliderRightRoot = styled.div`
  width: 300px;
  height: 100vh;

  background-color: #2b3035;
  color: #fff;
  padding: 40px 20px;
`;
