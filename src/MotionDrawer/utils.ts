import {IModalAnimation} from '../types';


/**
 * 遮罩動畫的時間 (秒)，每層自己的遮罩與共用遮罩相同
 */
export const maskDuration = .2;


/**
 * 是否不播放動畫
 * - 環境不支援 Web Animations API (例如測試環境)
 * - 使用者開啟「減少動態效果」
 */
export const checkIsSkipMotion = (): boolean => {
    if(typeof Element === 'undefined' || typeof Element.prototype.animate !== 'function') return true;
    return typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};


/**
 * 不播放動畫時，直接套用進場動畫的最後一格
 * (例如置中的 transform，沒有套用版面會跑掉)
 * @param el
 * @param animation
 */
export const applyFinalKeyframe = (el: HTMLElement, animation?: IModalAnimation) => {
    if(!animation) return;

    Object.keys(animation.keyframes).forEach(name => {
        const value = animation.keyframes[name];
        const final = Array.isArray(value) ? value[value.length - 1]: value;
        el.style[name] = String(final);
    });
};
