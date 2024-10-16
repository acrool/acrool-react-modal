import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';





const modalProps: IModalOptions = {
    ...animation.slideInLeft,
    isEnableHideWithClickMask: true
    // variants: {
    //     initial: {transform: 'scale(0)'},
    //     show: {transform: 'scale(1)'},
    //     exit: {transform: 'scale(0)'},
    // },
};
// const modalPropsUndefined: IModalProps|undefined = undefined;

/**
 * 右側抽屜
 *
 * PS: 示範用客製化光箱
 */
const SliderRight = createModal(
    () => {
        const {hide} = useModal();
        const navigate = useNavigate();

        return <SliderRightRoot>
            <div>RightSlider content</div>

            <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>navigate HashModal 1</button>
            <button type="button" onClick={hide}>X </button>

        </SliderRightRoot>;
    }
    ,modalProps
);

export default SliderRight;


const SliderRightRoot = styled.div`
  width: 300px;
  height: 100vh;


  
  background-color: #2b3035;
  padding: 40px 20px;
`;
