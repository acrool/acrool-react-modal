import ReactModal, {useModal, useModal2, CreateModal, CreateModal2, CreateModal3} from '@acrool/react-modal';
import styled from 'styled-components';

import Card from '../../components/Card';

interface IProps {
    onExitComplete: () => void,
}

//
// const TestModal2 = CreateModal('asd');
// const TestModal2EE = TestModal2(
//     () => {
//
//         return <div></div>;
//     }
// );



interface IBaseModalProps {
    name: string
}

export const BaseModal = CreateModal3(({name}: IBaseModalProps) => {

    // const {hidden} = useModal2();



    return <CreateTaskModalRoot>
        <Card title="Create Modal" direction="column">
            <div>Test content</div>
        </Card>

        {/*<button type="button" onClick={hidden}>X</button>*/}
        {/*<button type="button" onClick={() => setVisible(EVisible.visible)}>Open2Modal</button>*/}

    </CreateTaskModalRoot>;
});

// export default CreateModal(BaseModal);
// export default CreateModal2()(BaseModal);
// export default CreateModal3(BaseModal);


//
//
// const TestModal = ReactModal(
//     ({isVisible: false, children: ''})
// )();
//
// const CreateTaskModal = ({
//     onExitComplete
// }: IProps) => {
//
//     // const [visible, setVisible] = useState<EVisible>(EVisible.hidden);
//     // const [visible, setVisible] = useState<boolean>(true);
//     const {isVisible, onClose} = useModal();
//
//
//     return <>
//         {/*<div>visible: {String(visible)}</div>*/}
//
//         <CreateTaskModal2/>
//
//         {/*<ReactModal*/}
//         {/*    id="portal1"*/}
//         {/*    motionVariants={{*/}
//         {/*        initial: {opacity: 1, transform: 'scale(0)'},*/}
//         {/*        visible: {transform: 'scale(1)'},*/}
//         {/*        hidden: {opacity: 0, transform: 'scale(0)'},*/}
//         {/*    }}*/}
//         {/*    isVisible={isVisible}*/}
//         {/*    onExitComplete={onExitComplete}*/}
//         {/*>*/}
//         {/*    <CreateTaskModalRoot>*/}
//         {/*        <Card title="Create Modal" direction="column">*/}
//         {/*            <div>Test content</div>*/}
//         {/*        </Card>*/}
//
//         {/*        <button type="button" onClick={onClose}>X</button>*/}
//         {/*        /!*<button type="button" onClick={() => setVisible(EVisible.visible)}>Open2Modal</button>*!/*/}
//
//         {/*    </CreateTaskModalRoot>*/}
//         {/*</ReactModal>*/}
//
//
//         {/*<CreateTask2Modal isVisible={isVisible2Modal} onClose={() => setVisible2Modal(false)}/>*/}
//
//     </>;
// };
//
//
// export const TestModal3EE = TestModal2(CreateTaskModal2);
//
// export default TestModal3EE;
// // export default CreateTaskModal;
//
//



const CreateTaskModalRoot = styled.div`

`;
