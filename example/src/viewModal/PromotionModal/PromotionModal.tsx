import {AnimationVariants, CreateModal, useModal} from '@acrool/react-modal';
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


/**
 * 優惠活動光箱
 *
 * PS: 示範用客製化光箱
 */
const PromotionModal = CreateModal<IBaseModalProps>(
    (args) => {
        const {hide} = useModal();

        return <CreateTaskModalRoot>
            <Card title="Create Modal" direction="column">
                <div>Test content {args?.myVar}</div>
            </Card>

            <button type="button" onClick={hide}>X </button>

        </CreateTaskModalRoot>;
    }
    ,{
        variants: AnimationVariants.zoomInDown,
    });

export default PromotionModal;


const CreateTaskModalRoot = styled.div`

`;
