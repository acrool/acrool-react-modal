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
            initial: {position: 'absolute', left: '50%', opacity: 0, x: '-50%', y: formY},
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

const zoomInCenter: TAnimationConfig = {
    ...defaultVariant,
    variants: {
        initial: {position: 'absolute', top: '50%', left: '50%', scaleX: .5, scaleY: .5, scaleZ: .8, translateX: '-50%', translateY: '-50%', translateZ: 0, opacity: 0},
        animate: {scaleX: 1, scaleY: 1, scaleZ: 1, translateZ: 0, opacity: 1, transition: {type: 'spring', duration: .4}},
        exit: {scaleX: .8, scaleY: .8, scaleZ: .8, translateZ: 0, opacity: 0},
    },
    transition: {
        damping: 0,
        duration: .2,
    }
};

const slideLeftInRight: TAnimationConfig = {
    ...defaultVariant,
    variants: {
        initial: {position: 'fixed', top: 0, bottom: 0, right: 0, translateX: '100%', opacity: .9},
        animate: {translateX: 0, opacity: 1},
        exit: {translateX: '100%', opacity: .9},
    },
    transition: {
        damping: 0,
    }
};

const slideRightInLeft: TAnimationConfig = {
    ...defaultVariant,
    variants: {
        initial: {position: 'fixed', top: 0, bottom: 0, left: 0, translateX: '-100%', opacity: .9},
        animate: {translateX: 0, opacity: 1},
        exit: {translateX: '-100%', opacity: .9},
    },
    transition: {
        damping: 0,
    }
};

const slideUpInBottom: TAnimationConfig = {
    ...defaultVariant,
    // style: {maxWidth: 'inherit'},
    variants: {
        initial: {position: 'fixed', bottom: 0, left: 0, right: 0, translateY: '100%', opacity: .9},
        animate: {translateY: 0, opacity: 1},
        exit: {translateY: '100%', opacity: .9},
    },
    transition: {
        damping: 0,
        duration: .2,
    },

};


export default {
    zoomInDown,
    zoomInCenter,
    generateFadeIn,
    slideRightInLeft,
    slideLeftInRight,
    slideUpInBottom,
};
