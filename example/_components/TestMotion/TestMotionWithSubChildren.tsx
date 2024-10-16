import {AnimatePresence, motion, usePresence} from 'framer-motion';
import {useState} from 'react';


const SubChildComponent = () => {

    return (
        <motion.div
            initial={{x: 10}}
            animate={{x: 20}}
            exit={{x: 0}}
            transition={{duration: 1}} // 設定退場動畫的持續時間
            style={{backgroundColor: 'lightcoral', padding: 20, margin: 10}}
        >
            孫子元件
        </motion.div>
    );
};

const ChildComponent = () => {
    const [isPresent, safeToRemove] = usePresence(); // 使用 usePresence hook

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}} // 設定退場動畫的持續時間
            style={{backgroundColor: 'lightcoral', padding: 20, margin: 10}}
        >
            子元件

            <SubChildComponent/>
        </motion.div>
    );
};

const ParentComponent2 = () => {
    const [data, setData] = useState<string[]>([]);


    const handleToggle = () => {
        if(data.length === 0){
            setData(curr => [...curr, '2']);
        }else{
            setData([]);
        }
    };

    return (
        <>
            <button onClick={handleToggle}>
                切換子元件
            </button>
            <AnimatePresence>
                {data.map(row => {
                    return <ChildComponent key={row}/>;
                })}
            </AnimatePresence>
        </>
    );
};

export default ParentComponent2;
