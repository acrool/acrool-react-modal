import {AnimatePresence, motion, usePresence} from 'framer-motion';
import React, {useState} from 'react';

import MotionDrawer from '../../../src/MotionDrawer';


const SubChildComponent = () => {
    const [isPresent, safeToRemove] = usePresence(); // 使用 usePresence hook

    return (
        <motion.div
            initial={{x: 10}}
            animate={{x: 20}}
            exit={{x: 0}}
            transition={{duration: 1}} // 設定退場動畫的持續時間
            style={{backgroundColor: 'lightcoral', padding: 20, margin: 10}}
            onAnimationComplete={() => {
                if (!isPresent) {
                    safeToRemove(); // 告訴 AnimatePresence 可以移除元素
                }
            }}
        >
            孫子元件
        </motion.div>
    );
};

const ChildComponent = () => {
    const [isPresent, safeToRemove] = usePresence(); // 使用 usePresence hook

    return (
        <MotionDrawer>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1}} // 設定退場動畫的持續時間
                style={{backgroundColor: 'lightcoral', padding: 20, margin: 10}}
                onAnimationComplete={() => {
                    if (!isPresent) {
                        safeToRemove(); // 告訴 AnimatePresence 可以移除元素
                    }
                }}
            >
            子元件

            </motion.div>
            <SubChildComponent/>
        </MotionDrawer>
    );
};

interface IData {
    ModalComponent: React.FC
}


const ParentComponent3 = ({
    ModalComponent,
}: IData) => {
    const [data, setData] = useState<IData[]>([]);


    const handleToggle = () => {
        if(data.length === 0){
            setData(curr => [...curr, {key: '2', ModalComponent}]);
        }else{
            setData([]);
        }
    };


    const renderItems = () => {
        return data.map(row => {
            return <row.ModalComponent key={row.key} />;
        });
    };

    return (
        <>
            <button onClick={handleToggle}>
                切換子元件
            </button>
            <AnimatePresence>
                {renderItems()}
            </AnimatePresence>
        </>
    );
};

export default ParentComponent3;
