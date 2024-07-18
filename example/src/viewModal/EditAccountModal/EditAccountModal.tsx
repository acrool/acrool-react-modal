import {animation, useModal, createControlledModal} from '@acrool/react-modal';
import {useHashParams, useHashPathname} from '@acrool/react-router-hash';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {PromotionModal} from "../PromotionModal";

const EditAccountModal = createControlledModal(
    () => {
        const {id} = useHashParams<{id: string}>();
        const navigate = useNavigate();
        const pathname = useHashPathname();

        const {hide} = useModal();

        return <>

            <p>hash pathname: {pathname}</p>
            <p>useHashParams id: {id}</p>
            <div className="d-flex  align-items-center justify-content-center gap-2">
                {/*<button type="button" onClick={() => navigate({hash: undefined})}>X</button>*/}
                <button type="button" onClick={() => {
                    hide()
                        .then(() => navigate({hash: undefined}));
                }}>X</button>
                <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>navigate HashModal 1</button>
                <button type="button" onClick={() => navigate({hash: '/control/editAccount/2'})}>navigate HashModal 2</button>
                <button type="button" onClick={() => navigate({hash: '/control/editPassword'})}>navigate DiffModal</button>
                {/*<button type="button" onClick={PromotionModal.show}>show portal modal</button>*/}
            </div>
        </>;
    }, {
        variants: animation.fadeInDown,
    }
);


export default EditAccountModal;

