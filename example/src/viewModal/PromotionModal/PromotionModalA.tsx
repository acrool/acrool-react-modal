import {animation, createPortalModal, IModalOptions, useModal} from '@acrool/react-modal';
import styled from 'styled-components';
import PromotionModalB from './PromotionModalB';

// import Card from '../../components/Card';


interface IBaseModalProps {
    myVar: string
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
const PromotionModalA = createPortalModal(
    (args: IBaseModalProps) => {
        const {hide} = useModal();

        return <CreateTaskModalRoot>
            {/*<Card title="Create Modal" direction="column">*/}
            <div>Test content {args?.myVar}</div>
            {/*</Card>*/}

            <button type="button" onClick={hide}>X </button>
            <button type="button" onClick={PromotionModalB.show}>Show B Modal </button>

        </CreateTaskModalRoot>;
    }
    , modalOptions);

export default PromotionModalA;



const CreateTaskModalRoot = styled.div`
  width: 400px;
  margin: 0 auto;
`;
