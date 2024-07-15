import {ModalPortal} from '@acrool/react-modal';
import styled from 'styled-components';

import Card from '../../components/Card';

interface IProps {
    isVisible: boolean,
    onClose: () => void,
}


const modalVariantsItem = {
    initial: {transform: 'scale(0)'},
    visible: {transform: 'scale(1)'},
    hidden: {transform: 'scale(0)'},
};

const CreateTaskModal = ({
    isVisible,
    onClose
}: IProps) => {



    return <>
        <div>isVisible: {String(isVisible)}</div>

        <ModalPortal
            id="test"
            motionVariants={modalVariantsItem}
            isVisible={isVisible}
        >
            <CreateTaskModalRoot>
                <Card title="Create Modal" direction="column">
                    <div>Test content</div>
                </Card>

                <button type="button" onClick={onClose}>X</button>

            </CreateTaskModalRoot>
        </ModalPortal>
    </>;
};

export default CreateTaskModal;





const CreateTaskModalRoot = styled.div`

`;
