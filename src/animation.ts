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

const slideInLeft: TAnimationVariants = {
    initial: {translateX: '100%', opacity: .8, transition: {type: 'spring'}},
    show: {translateX: 0, opacity: 1, transition: {type: 'just'}},
    exit: {translateX: '100%', opacity: .8, transition: {type: 'spring'}},
};

const slideInRight: TAnimationVariants = {
    initial: {translateX: '-100%', opacity: .8, transition: {type: 'spring'}},
    show: {translateX: 0, opacity: 1, transition: {type: 'just'}},
    exit: {translateX: '-100%', opacity: .8, transition: {type: 'spring'}},
};
const slideInUp: TAnimationVariants = {
    initial: {translateY: '100%', opacity: .8, height: '100%', transition: {type: 'spring'}},
    show: {translateY: 0, opacity: 1, transition: {type: 'just'}},
    exit: {translateY: '100%', opacity: .8, transition: {type: 'spring'}},
};


export default {
    zoomInDown,
    fadeInDown,
    slideInLeft,
    slideInRight,
    slideInUp,
};
