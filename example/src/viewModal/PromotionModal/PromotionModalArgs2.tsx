import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import styled from 'styled-components';

import Card from '../../components/Card';


interface IProps {
    myVar?: string
}


const modalOptions: IModalOptions = {
    variants: animation.fadeInDown,
    className: 'p-3',
    // isEnableClickMaskHide: true,
};

/**
 * 優惠活動光箱
 *
 * PS: 示範用客製化光箱
 */
const PromotionModalArgs2 = createModal(
    ({myVar}: IProps) => {
        const {hide} = useModal();

        return <CreateTaskModalRoot>
            <Card title="Create Modal" direction="column">
                <div>Test not all required {myVar}</div>
            </Card>

            <button type="button" onClick={hide}>X </button>
        </CreateTaskModalRoot>;
    }
    , modalOptions);

export default PromotionModalArgs2;



const CreateTaskModalRoot = styled.div`
  width: 400px;
  margin: 0 auto;
`;
