import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';

import Card from '../../components/Card';




const modalProps: IModalOptions = {
    ...animation.fadeInDown,
    className: 'p-3'
};
// const modalPropsUndefined: IModalProps|undefined = undefined;

/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const PromotionModal = createModal(
    () => {
        const {hide} = useModal();
        // const navigate = useNavigate();
        const {id} = useParams();

        return <CreateTaskModalRoot>
            <Card title="Create Modal" direction="column">
                <div>id {id}</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
            </Card>

            {/*<button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>navigate HashModal 1</button>*/}
            <button type="button" onClick={hide}>X </button>

        </CreateTaskModalRoot>;
    }
    ,modalProps);

export default PromotionModal;


const CreateTaskModalRoot = styled.div`
  width: 400px;
  margin: 0 auto;
`;
