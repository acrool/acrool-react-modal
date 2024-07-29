import {TAnimationVariants} from './types';






const fadeInDown: TAnimationVariants = {
    initial: {opacity: 0, y: 20},
    show: {opacity: 1, y: 40, transition: {type: 'just', duration: .2}},
    exit: {opacity: 0, y: 20}
};

const zoomInDown: TAnimationVariants = {
    initial: {scaleX: .5, scaleY: .5, scaleZ: .8, translateX: 0, translateY: 20, translateZ: 0, opacity: 0},
    show: {scaleX: 1, scaleY: 1, scaleZ: 1, translateX: 0, translateY: 40, translateZ: 0, opacity: 1, transition: {type: 'just', duration: .2}},
    exit: {scaleX: .8, scaleY: .8, scaleZ: .8, translateX: 0, translateY: 20, translateZ: 0, opacity: 0, transition: {type:'spring'}},
};

const slideInLeft: TAnimationVariants = {
    initial: {position: 'absolute', right: 0, translateX: '100%', opacity: .8},
    show: {translateX: 0, opacity: 1, transition: {type: 'just', duration: .2}},
    exit: {translateX: '100%', opacity: .8},
};

const slideInRight: TAnimationVariants = {
    initial: {position: 'absolute', left: 0, translateX: '-100%', opacity: .8},
    show: {translateX: 0, opacity: 1, transition: {type: 'just', duration: .2}},
    exit: {translateX: '-100%', opacity: .8},
};
const slideInUp: TAnimationVariants = {
    initial: {position: 'absolute', bottom: 0, translateY: '100%', opacity: .8},
    show: {translateY: 0, opacity: 1, transition: {type: 'just', duration: .2}},
    exit: {translateY: '100%', opacity: .8},
};


export default {
    zoomInDown,
    fadeInDown,
    slideInLeft,
    slideInRight,
    slideInUp,
};
