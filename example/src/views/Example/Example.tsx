import {modal} from '@acrool/react-modal';
import AcroolTable from '@acrool/react-table';
import {useState} from 'react';

import Card from '../../components/Card';
import CreateTaskModal from '../../viewModal/CreateTaskModal/CreateTaskModal';


const Example = () => {

    const [isVisibleModal, setVisibleModal] = useState(false);

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

                        setVisibleModal(true);
                        // setTimeout(() => modal.hiddenAll(), 3000);
                    },
                    field: {
                        name: 'Default',
                        use: 'modal.show()',
                    }
                },
            ]}
        />


        {<CreateTaskModal isVisible={isVisibleModal} onClose={() => setVisibleModal(false)}/>}



    </div>;
};

export default Example;




