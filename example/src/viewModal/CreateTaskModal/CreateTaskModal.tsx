import {CreateModal, useModalContext} from '@acrool/react-modal';
import styled from 'styled-components';

import Card from '../../components/Card';


interface IBaseModalProps {
    myVar: string
}

export const BaseModal = CreateModal<IBaseModalProps>(
    (args) => {

        const {isVisible, show, hidden} = useModalContext();

        // const data = useContext(ModalProviderContext);


        return <CreateTaskModalRoot>
            <Card title="Create Modal" direction="column">
                <div>Test content {args?.myVar}</div>
                <div>{String(isVisible)}</div>
            </Card>

            <button type="button" onClick={hidden}>X </button>

            {/*<button type="button" onClick={() => setVisible(EVisible.visible)}>Open2Modal</button>*/}

        </CreateTaskModalRoot>;
    }
);



const CreateTaskModalRoot = styled.div`

`;
