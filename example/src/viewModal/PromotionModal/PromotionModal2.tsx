import {AnimationVariants, CreateModal, IModalProps, useModal} from '@acrool/react-modal';
import styled from 'styled-components';

import Card from '../../components/Card';


interface IBaseModalProps {
    myVar: string
}


const animationVariants = {
    initial: {transform: 'scale(0)'},
    visible: {transform: 'scale(1)'},
    hidden: {transform: 'scale(0)'},
};

const modalProps: IModalProps = {
    variants: AnimationVariants.fadeInDown,
    className: 'p-3'
};
// const modalPropsUndefined: IModalProps|undefined = undefined;

/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const PromotionModal2 = CreateModal(
    () => {
        const {hide} = useModal();

        return <CreateTaskModalRoot>
            <Card title="Create Modal" direction="column">
                <div>Test2 content</div>
            </Card>

            <button type="button" onClick={hide}>X </button>

        </CreateTaskModalRoot>;
    }
    , modalProps);

export default PromotionModal2;


const CreateTaskModalRoot = styled.div`
  width: 400px;
  margin: 0 auto;
`;
