import {modal} from '@acrool/react-modal';
import AcroolTable from '@acrool/react-table';
import {useNavigate} from 'react-router-dom';

import {PromotionModal, PromotionModalArgs} from '../../viewModal/PromotionModal';


const Example = () => {
    const navigate = useNavigate();

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
                        PromotionModal.show();
                    },
                    field: {
                        name: 'Fast Show',
                        use: 'PromotionModal.show()',
                    }
                },
                {
                    id: 2,
                    onClickRow: () => {
                        PromotionModalArgs.showArgs({myVar: 'Imagine'});
                    },
                    field: {
                        name: 'Fast Show Args',
                        use: 'PromotionModal.showArgs({myVar: \'Imagine\'})',
                    }
                },
                {
                    id: 3,
                    onClickRow: () => {
                        modal.show(PromotionModal);
                    },
                    field: {
                        name: 'Origin Show',
                        use: 'modal.show(PromotionModal)',
                    }
                },
                {
                    id: 4,
                    onClickRow: () => {
                        modal.show(PromotionModalArgs, {myVar: 'Imagine'});
                    },
                    field: {
                        name: 'Origin Show Args',
                        use: 'modal.show(PromotionModal.FC, {myVar: \'Imagine\'})',
                    }
                },
                {
                    id: 5,
                    onClickRow: () => {
                        navigate({hash: '/control/editAccount/1'});
                    },
                    field: {
                        name: 'Hash Modal 1',
                        use: 'navigate({hash: \'/control/editAccount/1\'})',
                    }
                },
                {
                    id: 6,
                    onClickRow: () => {
                        navigate({hash: '/control/editAccount/2'});
                    },
                    field: {
                        name: 'Hash Modal 2',
                        use: 'navigate({hash: \'/control/editAccount/2\'})',
                    }
                },
                {
                    id: 7,
                    onClickRow: () => {
                        navigate({hash: '/control/editPassword'});
                    },
                    field: {
                        name: 'Hash Modal Diff',
                        use: 'navigate({hash: \'/control/editPassword\'})',
                    }
                },

            ]}
        />


        {/*<PromotionModal.FC myVar="image"/>*/}
        {/*<PromotionBaseModal myVar="image"/>*/}
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




