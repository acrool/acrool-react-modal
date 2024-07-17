import {modal} from '@acrool/react-modal';
import AcroolTable from '@acrool/react-table';

import PromotionModal from '../../viewModal/PromotionModal';
import PromotionModal2 from '../../viewModal/PromotionModal/PromotionModal2';


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
                        PromotionModal2.show();
                    },
                    field: {
                        name: 'Default',
                        use: 'PromotionModal2.show()',
                    }
                },
                {
                    id: 2,
                    onClickRow: () => {
                        modal.show(PromotionModal2.FC);
                    },
                    field: {
                        name: 'Base Default',
                        use: 'PromotionModal2.show()',
                    }
                },

                {
                    id: 3,
                    onClickRow: () => {
                        PromotionModal.showArgs({myVar: 'Imagine'});
                    },
                    field: {
                        name: 'Args',
                        use: 'PromotionModal.showArgs({myVar: \'Imagine\'})',
                    }
                },
                {
                    id: 4,
                    onClickRow: () => {
                        modal.show(PromotionModal.FC, {myVar: 'Imagine'});
                    },
                    field: {
                        name: 'Base Args',
                        use: 'modal.show(PromotionModal.FC, {myVar: \'Imagine\'})',
                    }
                },

            ]}
        />


        {/*<BaseModal myVar="XXXXX"/>*/}
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




