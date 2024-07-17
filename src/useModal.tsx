import {useState} from 'react';


const useModal = () => {
    const [isVisible, setVisible] = useState<boolean>(true);


    const onClose = () => {
        setVisible(false);
    };

    return {
        onClose,
        isVisible: isVisible
    };


};

export default useModal;
