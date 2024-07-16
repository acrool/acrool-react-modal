import {useCreateModal} from '@acrool/react-modal';
import AcroolTable from '@acrool/react-table';
import {useState} from 'react';

import Card from '../../components/Card';
import {BaseModal} from '../../viewModal/CreateTaskModal/CreateTaskModal';


const Example = () => {

    // const [visible, setVisible] = useState<EVisible>(EVisible.none);
    // const [isVisible, setVisible] = useState<boolean>(false);

    // const MyModel = CreateTaskModal;

    return <div style={{display: 'flex', gap: '10px', alignItems: 'flex-start', width: '100%'}}>

        <AcroolTable
            isDark
            isVisiblePaginate={false}
            tableCellMediaSize={768}
            gap="10px"
            title={{
                name: {text: 'Name', col: '450px'},
                use: {text: 'Use', col: true},
            }}
            data={[
                {
                    id: 1,
                    onClickRow: () => {
                        // modal.show(
                        //     'createModal',
                        //     <Card title="Create Modal" direction="column" children={<div>test</div>}/>
                        // );

                        // TaskModal.show();
                        // CreateTaskModal.visible();
                        // setVisible(EVisible.visible);
                        // setTimeout(() => modal.hiddenAll(), 3000);
                    },
                    field: {
                        name: 'Default',
                        use: 'modal.show()',
                    }
                },
            ]}
        />


        <BaseModal myVar="xx"/>
        {/*<CreateTaskModal*/}
        {/*    onClose={() => setVisible(EVisible.none)}*/}
        {/*/>*/}

        {/*{isVisible &&*/}
        {/*    <CreateTaskModal*/}
        {/*        onExitComplete={() => {*/}
        {/*            console.log('close');*/}
        {/*            setVisible(false);*/}
        {/*        }}*/}
        {/*    />*/}
        {/*}*/}



    </div>;
};

export default Example;




