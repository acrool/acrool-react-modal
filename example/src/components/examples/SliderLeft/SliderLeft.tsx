import {animation, createStateModal, IModalOptions, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';
import Button, {RoundButton} from "../../atoms/Button";





const modalProps: IModalOptions = {
    ...animation.slideInRight,
    isEnableHideWithClickMask: true
    // variants: {
    //     initial: {transform: 'scale(0)'},
    //     show: {transform: 'scale(1)'},
    //     exit: {transform: 'scale(0)'},
    // },
};
// const modalPropsUndefined: IModalProps|undefined = undefined;

/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const SliderLeft = () => {
    const {hide} = useModal();

    return <SliderLeftRoot>
        <div>RightSlider content</div>

        <Button color="danger" onClick={hide}>CLOSE</Button>

    </SliderLeftRoot>;
};


export default createStateModal(
    SliderLeft,
    {
        ...animation.slideInRight,
        isEnableHideWithClickMask: true
    }
);



const SliderLeftRoot = styled.div`
  width: 300px;
  height: 100vh;

  background-color: #2b3035;
  color: #fff;
  padding: 40px 20px;
`;
