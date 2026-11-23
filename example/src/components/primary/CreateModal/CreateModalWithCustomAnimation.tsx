import {createModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';
import Card from '../../atoms/Card';



/**
 *
 *
 * PS: 示範用客製化光箱
 */
const CreateModalWithCustomAnimation = () => {
    const {hide} = useModal();

    return <CreateTaskModalRoot>
        <Card title="With Custom Animation" direction="column">
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
    CreateModalWithCustomAnimation,
    {
        // 自訂動畫: style 放固定的定位，enter / exit 放影格 (位移、縮放寫成 transform 字串)
        animation: {
            style: {position: 'absolute', left: '50%', top: '80px'},
            enter: {
                keyframes: {opacity: [0, 1], transform: ['translate(-50%, 40px) scale(.9)', 'translate(-50%, 0px) scale(1)']},
                options: {duration: .35, ease: [.22, 1.2, .36, 1]},
            },
            exit: {
                keyframes: {opacity: 0, transform: 'translate(-50%, 40px) scale(.9)'},
                options: {duration: .2, ease: 'easeIn'},
            },
        },
    },
);





const CreateTaskModalRoot = styled.div`
  width: 400px;
`;
