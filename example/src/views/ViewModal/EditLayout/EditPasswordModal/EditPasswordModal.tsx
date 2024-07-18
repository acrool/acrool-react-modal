import {animation, createControlledModal, useModal} from '@acrool/react-modal';
import {useHashParams, useHashPathname} from '@acrool/react-router-hash';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const EditPasswordModal = createControlledModal(
    () => {
        const {id} = useHashParams<{id: string}>();
        const navigate = useNavigate();
        const pathname = useHashPathname();
        const {hide} = useModal();

        return <>
            <p>hash pathname: {pathname}</p>
            <p>useHashParams id: {id}</p>

            <button type="button" onClick={async () => {
                await hide();
                navigate({hash: undefined});
            }}>X</button>
        </>;
    },
    {
        variants: animation.fadeInDown
    }
);

export default EditPasswordModal;
