import {animation, createStateModal, useModal} from '@acrool/react-modal';
import {useHashParams, useHashPathname} from '@acrool/react-router-hash';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const EditPasswordModal = createStateModal(
    () => {
        const navigate = useNavigate();
        const pathname = useHashPathname();
        const {hide, queueKey} = useModal();

        return <>
            <p>hash pathname: {pathname}</p>
            <p>queueKey: {queueKey}</p>

            <button type="button" onClick={async () => {
                await hide();
                navigate({hash: undefined});
            }}>X</button>
        </>;
    },
    {
        ...animation.fadeInDown
    }
);

export default EditPasswordModal;
