import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import styled from 'styled-components';

import Card from '../../components/Card';


interface IBaseModalProps {
    myVar: string
}


const modalProps: IModalOptions = {
    variants: animation.fadeInDown,
    className: 'p-3'
};

/**
 * 優惠活動光箱
 *
 * PS: 示範用客製化光箱
 */
const PromotionModal = createModal(
    (args: IBaseModalProps) => {
        const {hide} = useModal();

        return <CreateTaskModalRoot>
            <Card title="Create Modal" direction="column">
                <div>Test content {args?.myVar}</div>
            </Card>

            <button type="button" onClick={hide}>X </button>

        </CreateTaskModalRoot>;
    }
    , modalProps);

export default PromotionModal;


const CreateTaskModalRoot = styled.div`
  width: 400px;
  margin: 0 auto;
`;
