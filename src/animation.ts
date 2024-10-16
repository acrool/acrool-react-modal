import {IModalOptions, TAnimationConfig} from './types';






const fadeInDown: TAnimationConfig = {
    variants: {
        initial: {opacity: 0, x: '-50%', y: 20},
        show: {opacity: 1, y: 40, transition: {type: 'just', duration: .2}},
        exit: {opacity: 0, y: 20},
    }, 
    style: {
        position: 'absolute', // 或 "fixed"，依照需求調整
        left: '50%',           // 將元素的 left 移到 50% (水平置中)
    }
};

const zoomInDown: TAnimationConfig = {
    variants: {
        initial: {scaleX: .5, scaleY: .5, scaleZ: .8, translateX: 0, translateY: 20, translateZ: 0, opacity: 0},
        show: {scaleX: 1, scaleY: 1, scaleZ: 1, translateX: 0, translateY: 40, translateZ: 0, opacity: 1, transition: {type: 'just', duration: .2}},
        exit: {scaleX: .8, scaleY: .8, scaleZ: .8, translateX: 0, translateY: 20, translateZ: 0, opacity: 0, transition: {type:'spring'}},
    }
};

const slideInLeft: TAnimationConfig = {
    variants: {
        initial: {position: 'absolute', right: 0, translateX: '100%', opacity: .8},
        show: {translateX: 0, opacity: 1, transition: {type: 'just', duration: .2}},
        exit: {translateX: '100%', opacity: .8},
    }
};

const slideInRight: TAnimationConfig = {
    variants: {
        initial: {position: 'absolute', left: 0, translateX: '-100%', opacity: .8},
        show: {translateX: 0, opacity: 1, transition: {type: 'just', duration: .2}},
        exit: {translateX: '-100%', opacity: .8},
    }
};
const slideInUp: TAnimationConfig = {
    variants: {
        initial: {position: 'absolute', bottom: 0, translateY: '100%', opacity: .8},
        show: {translateY: 0, opacity: 1, transition: {type: 'just', duration: .2}},
        exit: {translateY: '100%', opacity: .8},
    }
};


export default {
    zoomInDown,
    fadeInDown,
    slideInLeft,
    slideInRight,
    slideInUp,
};
