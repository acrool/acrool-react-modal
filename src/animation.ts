import {TAnimationConfig, TModalEase} from './types';


/**
 * 帶一點回彈的曲線，近似原本的 spring
 */
const easeBack: TModalEase = [.22, 1.2, .36, 1];

/**
 * 數字補上 px，字串原樣使用
 * @param value
 */
const toPx = (value: number | string): string => {
    return typeof value === 'number' ? `${value}px`: value;
};


/**
 * 淡入從上到下(中心點位置為上方)
 *
 * 停留位置由 top 決定 (可含 env() 這類無法放進動畫影格的值)，動畫只做位移
 * @param formY 起始位置 (toY 為字串時，視為「由停留位置往上的距離」)
 * @param toY 停留位置
 */
const generateFadeInFromTop = (
    formY = 20,
    toY: number | string = 'calc(40px + env(safe-area-inset-top))'
): TAnimationConfig => {
    const offsetY = typeof toY === 'number' ? formY - toY: -formY;
    const from = `translate(-50%, ${offsetY}px)`;

    return {
        style: {position: 'absolute', left: '50%', top: toPx(toY)},
        enter: {
            keyframes: {opacity: [0, 1], transform: [from, 'translate(-50%, 0px)']},
            options: {duration: .2},
        },
        exit: {
            keyframes: {opacity: 0, transform: from},
            options: {duration: .2},
        },
    };
};


/**
 * 淡入從上到下(中心點位置為中間)
 * @param formY
 */
const generateFadeInFromTopCentered = (formY = 20): TAnimationConfig => {
    return {
        style: {position: 'absolute', left: '50%', top: '50%'},
        enter: {
            keyframes: {opacity: [0, 1], transform: [`translate(-50%, calc(-50% - ${formY}px))`, 'translate(-50%, calc(-50% - 0px))']},
            options: {duration: .2},
        },
        exit: {
            keyframes: {opacity: 0},
            options: {duration: .2},
        },
    };
};

const zoomInDown: TAnimationConfig = {
    enter: {
        keyframes: {opacity: [0, 1], transform: ['translateY(20px) scale(.5)', 'translateY(40px) scale(1)']},
        options: {duration: .2},
    },
    exit: {
        keyframes: {opacity: 0, transform: 'translateY(20px) scale(.8)'},
        options: {duration: .2},
    },
};

const zoomInCenter: TAnimationConfig = {
    style: {position: 'absolute', top: '50%', left: '50%'},
    enter: {
        keyframes: {opacity: [0, 1], transform: ['translate(-50%, -50%) scale(.5)', 'translate(-50%, -50%) scale(1)']},
        options: {duration: .4, ease: easeBack},
    },
    exit: {
        keyframes: {opacity: 0, transform: 'translate(-50%, -50%) scale(.8)'},
        options: {duration: .2},
    },
};

const slideLeftInRight: TAnimationConfig = {
    style: {position: 'fixed', top: 0, bottom: 0, right: 0},
    enter: {
        keyframes: {opacity: [.9, 1], transform: ['translateX(100%)', 'translateX(0%)']},
        options: {duration: .3, ease: 'easeOut'},
    },
    exit: {
        keyframes: {opacity: .9, transform: 'translateX(100%)'},
        options: {duration: .3, ease: 'easeIn'},
    },
};

const slideRightInLeft: TAnimationConfig = {
    style: {position: 'fixed', top: 0, bottom: 0, left: 0},
    enter: {
        keyframes: {opacity: [.9, 1], transform: ['translateX(-100%)', 'translateX(0%)']},
        options: {duration: .3, ease: 'easeOut'},
    },
    exit: {
        keyframes: {opacity: .9, transform: 'translateX(-100%)'},
        options: {duration: .3, ease: 'easeIn'},
    },
};

const slideUpInBottom: TAnimationConfig = {
    style: {position: 'fixed', bottom: 0, left: 0, right: 0},
    enter: {
        keyframes: {opacity: [.9, 1], transform: ['translateY(100%)', 'translateY(0%)']},
        options: {duration: .2, ease: 'easeOut'},
    },
    exit: {
        keyframes: {opacity: .9, transform: 'translateY(100%)'},
        options: {duration: .2, ease: 'easeIn'},
    },
};


/**
 * 由畫面底部滑到頂端
 * (原本是動 top，改為位移一個畫面高度，不觸發重新排版)
 */
const slideUpEndInBottom: TAnimationConfig = {
    style: {position: 'fixed', top: 0, left: 0, right: 0},
    enter: {
        keyframes: {opacity: [.9, 1], transform: ['translateY(100vh)', 'translateY(0vh)']},
        options: {duration: .3, ease: 'easeOut'},
    },
    exit: {
        keyframes: {opacity: .9, transform: 'translateY(100vh)'},
        options: {duration: .3, ease: 'easeIn'},
    },
};


export default {
    zoomInDown,
    zoomInCenter,
    generateFadeInFromTop,
    generateFadeInFromTopCentered,
    slideRightInLeft,
    slideLeftInRight,
    slideUpInBottom,
    slideUpEndInBottom,
};
