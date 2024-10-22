import {TAnimationConfig} from './types';




const defaultVariant = {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
};


const generateFadeIn = (formY = 20, toY = 40): TAnimationConfig => {
    return {
        ...defaultVariant,
        variants: {
            initial: {position: 'relative',left: '50%', opacity: 0, x: '-50%', y: formY},
            animate: {opacity: 1, y: toY, transition: {type: 'just', duration: .2}},
            exit: {opacity: 0, y: formY},
        },
    };
};

const zoomInDown: TAnimationConfig = {
    ...defaultVariant,
    variants: {
        initial: {scaleX: .5, scaleY: .5, scaleZ: .8, translateX: 0, translateY: 20, translateZ: 0, opacity: 0},
        animate: {scaleX: 1, scaleY: 1, scaleZ: 1, translateX: 0, translateY: 40, translateZ: 0, opacity: 1, transition: {type: 'just', duration: .2}},
        exit: {scaleX: .8, scaleY: .8, scaleZ: .8, translateX: 0, translateY: 20, translateZ: 0, opacity: 0, transition: {type:'spring'}},
    }
};

const slideInLeft: TAnimationConfig = {
    ...defaultVariant,
    variants: {
        initial: {right: 0, translateX: '100%', opacity: .8},
        animate: {translateX: 0, opacity: 1, transition: {type: 'just', duration: .2}},
        exit: {translateX: '100%', opacity: .8},
    },
    style: {
        position: 'fixed',
    }
};

const slideInRight: TAnimationConfig = {
    ...defaultVariant,
    variants: {
        initial: {left: 0, translateX: '-100%', opacity: .8},
        animate: {translateX: 0, opacity: 1, transition: {type: 'just', duration: .2}},
        exit: {translateX: '-100%', opacity: .8},
    },
    style: {
        position: 'fixed',
    }
};
const slideInUp: TAnimationConfig = {
    ...defaultVariant,
    variants: {
        initial: {bottom: 0, translateY: '100%', opacity: .8},
        animate: {translateY: 0, opacity: 1, transition: {type: 'just', duration: .2}},
        exit: {translateY: '100%', opacity: .8},
    },
    style: {
        position: 'fixed',
    }
};


export default {
    zoomInDown,
    generateFadeIn,
    slideInLeft,
    slideInRight,
    slideInUp,
};
