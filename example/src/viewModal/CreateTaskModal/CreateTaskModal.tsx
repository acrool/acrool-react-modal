import ReactModal, {useModal} from '@acrool/react-modal';
import styled from 'styled-components';

import Card from '../../components/Card';

interface IProps {
    onExitComplete: () => void,
}



const CreateTaskModal = ({
    onExitComplete
}: IProps) => {

    // const [visible, setVisible] = useState<EVisible>(EVisible.hidden);
    // const [visible, setVisible] = useState<boolean>(true);
    const {isVisible, onClose} = useModal();


    return <>
        {/*<div>visible: {String(visible)}</div>*/}

        <ReactModal
            id="portal1"
            motionVariants={{
                initial: {opacity: 1, transform: 'scale(0)'},
                visible: {transform: 'scale(1)'},
                hidden: {opacity: 0, transform: 'scale(0)'},
            }}
            isVisible={isVisible}
            onExitComplete={onExitComplete}
        >
            <CreateTaskModalRoot>
                <Card title="Create Modal" direction="column">
                    <div>Test content</div>
                </Card>

                <button type="button" onClick={onClose}>X</button>
                {/*<button type="button" onClick={() => setVisible(EVisible.visible)}>Open2Modal</button>*/}

            </CreateTaskModalRoot>
        </ReactModal>


        {/*<CreateTask2Modal isVisible={isVisible2Modal} onClose={() => setVisible2Modal(false)}/>*/}

    </>;
};

export default CreateTaskModal;





const CreateTaskModalRoot = styled.div`

`;
