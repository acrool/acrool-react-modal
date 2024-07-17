import {TAnimationVariants} from './types';






const fadeInDown: TAnimationVariants = {
    initial: {opacity: 0, y: 20, transition: {type:'spring'}},
    show: {opacity: 1, y: 40},
    exit: {opacity: 0, y: 0}
};

const zoomInDown: TAnimationVariants = {
    initial: {scaleX: .1, scaleY: .1, scaleZ: .1, translateX: 0, translateY: -1000, translateZ: 0, opacity: 0, transition: {type:'spring'}},
    show: {scaleX: 1, scaleY: 1, scaleZ: 1, translateX: 0, translateY: 60, translateZ: 0, opacity: 1},
    exit: {scaleX: .8, scaleY: .8, scaleZ: .8, translateX: 0, translateY: -1000, translateZ: 0, opacity: 0, transition: {type:'spring'}},
};


export default {
    zoomInDown,
    fadeInDown,
};
