import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';

const getCreatePortal = () => ReactDOM.createPortal;

type TSelector = () => HTMLElement;

interface IProps {
    children: React.ReactNode;
    rootSelector: TSelector;
}

/**
 * 傳送到目標 (不進行創建)
 */
const ReactDidMountPortal = ({
    children,
    rootSelector,
}: IProps) => {
    const [isMount, setIsMount] = useState(false);

    useEffect(() => {
        setIsMount(true);
    }, []);

    const renderPortal = (): React.ReactPortal | null => {
        const createPortal = getCreatePortal();

        if (isMount) {
            return createPortal(children, rootSelector());
        }

        return null;
    };

    return renderPortal();
};

export default ReactDidMountPortal;
