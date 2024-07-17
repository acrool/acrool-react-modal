import {CreateModal, useModalContext} from '@acrool/react-modal';
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


export const BaseModal = CreateModal<IBaseModalProps>(
    animationVariants,
    (args) => {

        const {hide} = useModalContext();

        // const data = useContext(ModalProviderContext);


        return <CreateTaskModalRoot>
            <Card title="Create Modal" direction="column">
                <div>Test content {args?.myVar}</div>
            </Card>

            <button type="button" onClick={hide}>X </button>

            {/*<button type="button" onClick={() => setVisible(EVisible.visible)}>Open2Modal</button>*/}

        </CreateTaskModalRoot>;
    }
);


export const BaseModal2 = (args: IBaseModalProps) => {

    const {isVisible, show, hide} = useModalContext();

    // const data = useContext(ModalProviderContext);

    
    console.log('hidden', hide);

    return <CreateTaskModalRoot>
        <Card title="Create Modal" direction="column">
            <div>Test content {args?.myVar}</div>
            <div>{String(isVisible)}</div>
        </Card>

        <button type="button" onClick={hide}>X </button>

        {/*<button type="button" onClick={() => setVisible(EVisible.visible)}>Open2Modal</button>*/}

    </CreateTaskModalRoot>;
};



const CreateTaskModalRoot = styled.div`

`;
