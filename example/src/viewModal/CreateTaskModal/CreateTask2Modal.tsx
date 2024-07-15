import ReactModal from '@acrool/react-modal';
import {useState} from 'react';
import styled from 'styled-components';

import Card from '../../components/Card';
import {EVisible} from "../../../../src";

interface IProps {
    isVisible: boolean,
    onClose: () => void,
}


const modalVariantsItem = {
    initial: {opacity: 1, transform: 'scale(0)'},
    visible: {transform: 'scale(1)'},
    hidden: {opacity: 0, transform: 'scale(0)'},
};

const CreateTask2Modal = ({
    isVisible,
    onClose
}: IProps) => {

    const [visible, setVisible] = useState<EVisible>(EVisible.initial);


    return <>
        <div>isVisible: {String(isVisible)}</div>

        <ReactModal
            id="portal2"
            motionVariants={modalVariantsItem}
            visible={visible}
            onChangeVisible={() => setVisible(1)}
        >
            <CreateTaskModalRoot>
                <Card title="Create Modal" direction="column">
                    <div>Test content 2</div>
                </Card>

                <button type="button" onClick={onClose}>X</button>

            </CreateTaskModalRoot>
        </ReactModal>


    </>;
};

export default CreateTask2Modal;





const CreateTaskModalRoot = styled.div`

`;
