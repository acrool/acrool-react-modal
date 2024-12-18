import {animation, createStateModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';
import Button, {RoundButton} from "../../atoms/Button";



/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const SliderUp = () => {
    const {hide} = useModal();

    return <SliderUpRoot>
        <div>RightSlider content</div>

        <Button color="danger" onClick={hide}>CLOSE</Button>

    </SliderUpRoot>;
};

export default createStateModal(
    SliderUp,
    {
        ...animation.slideInBottom,
        isEnableHideWithClickMask: true
    }
);


const SliderUpRoot = styled.div`
  width: 100vw;
  height: 200px;
  
  background-color: #2b3035;
  color: #fff;
  padding: 40px 20px;
`;
