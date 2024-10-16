import {AnimatePresence, motion, usePresence} from 'framer-motion';
import {useState} from 'react';


const SubChildComponent = () => {
    const [isPresent, safeToRemove] = usePresence(); // 使用 usePresence hook

    return (
        <motion.div
            initial={{x: 10}}
            animate={{x: 20}}
            exit={{x: 0}}
            transition={{duration: 1}} // 設定退場動畫的持續時間
            onAnimationComplete={() => {
                if (!isPresent) {
                    safeToRemove(); // 告訴 AnimatePresence 可以移除元素
                }
            }}
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
            onAnimationComplete={() => {
                if (!isPresent) {
                    safeToRemove(); // 告訴 AnimatePresence 可以移除元素
                }
            }}
            style={{backgroundColor: 'lightcoral', padding: 20, margin: 10}}
        >
            子元件

            <SubChildComponent/>
        </motion.div>
    );
};

const ParentComponent = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            <button onClick={() => setIsVisible(!isVisible)}>
                切換子元件
            </button>
            <AnimatePresence>
                {isVisible && <ChildComponent />}
            </AnimatePresence>
        </>
    );
};

export default ParentComponent;
