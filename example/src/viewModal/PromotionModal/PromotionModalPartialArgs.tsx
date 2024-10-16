import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';
import styled from 'styled-components';

import Card from '../../components/Card';


interface IProps {
    myVar?: string
}


const modalOptions: IModalOptions = {
    ...animation.zoomInDown,
    className: 'p-3',
    // isEnableClickMaskHide: true,
};

/**
 * 優惠活動光箱
 *
 * PS: 示範用客製化光箱
 */
const PromotionModalPartialArgs = createModal(
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

export default PromotionModalPartialArgs;



const CreateTaskModalRoot = styled.div`
  width: 400px;
  margin: 0 auto;
`;
