import {animation, createModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';



/**
 * 從下面滑動到上面的光箱
 */
const SlideUpInBottom = () => {
    const {hide} = useModal();

    return <SlideUpInBottomRoot>
        <div>Content</div>

        <Button color="danger" onClick={hide}>CLOSE</Button>

    </SlideUpInBottomRoot>;
};

console.log('animation.slideUpInBottom', animation.slideUpInBottom);
export default createModal(
    SlideUpInBottom,
    {
        animation: animation.slideUpInBottom,
        isHideWithMaskClick: true
    }
);


const SlideUpInBottomRoot = styled.div`
  width: 100vw;
  height: 200px;
  
  background-color: #2b3035;
  color: #fff;
  padding: 40px 20px;
`;
