import ReactModal from '@acrool/react-modal';
import {useState} from 'react';
import styled from 'styled-components';

import Card from '../../components/Card';
import {EVisible} from "../../../../src";

interface IProps {
    onClose: () => void,
}


const modalVariantsItem = {
    initial: {opacity: 1, transform: 'scale(0)'},
    visible: {transform: 'scale(1)'},
    hidden: {opacity: 0, transform: 'scale(0)'},
};

const CreateTaskModal = ({
    onClose
}: IProps) => {

    // const [visible, setVisible] = useState<EVisible>(EVisible.hidden);
    const [visible, setVisible] = useState<boolean>(true);


    return <>
        {/*<div>visible: {String(visible)}</div>*/}

        <ReactModal
            id="portal1"
            motionVariants={modalVariantsItem}
            visible={visible}
            // onChangeVisible={() => setVisible(1)}
            onExitComplete={onClose}
        >
            <CreateTaskModalRoot>
                <Card title="Create Modal" direction="column">
                    <div>Test content</div>
                </Card>

                <button type="button" onClick={() => setVisible(false)}>X</button>
                {/*<button type="button" onClick={() => setVisible(EVisible.visible)}>Open2Modal</button>*/}

            </CreateTaskModalRoot>
        </ReactModal>


        {/*<CreateTask2Modal isVisible={isVisible2Modal} onClose={() => setVisible2Modal(false)}/>*/}

    </>;
};

export default CreateTaskModal;





const CreateTaskModalRoot = styled.div`

`;
