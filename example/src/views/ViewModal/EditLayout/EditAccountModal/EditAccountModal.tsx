import {animation,createModal} from '@acrool/react-modal';
import {useHashParams, useHashPathname} from '@acrool/react-router-hash';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const EditAccountModal = createModal(
    () => {
        const {id} = useHashParams<{id: string}>();
        const navigate = useNavigate();
        const pathname = useHashPathname();
        return <>

            <p>hash pathname: {pathname}</p>
            <p>useHashParams id: {id}</p>
            <div className="d-flex  align-items-center justify-content-center gap-2">
                <button type="button" onClick={() => navigate({hash: undefined})}>X</button>
                <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>Close HashModal 1</button>
                <button type="button" onClick={() => navigate({hash: '/control/editAccount/2'})}>Close HashModal 2</button>
            </div>
        </>;
    }, {
        variants: animation.fadeInDown,
    }
);


export default EditAccountModal;

