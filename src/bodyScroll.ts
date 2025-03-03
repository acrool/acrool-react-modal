import {addClass, hasClass, removeClass} from './utils';


let disableBodyModalCount = 0;
const modalOpenClassName = 'acrool__modal-open';
const modalOpenFixedClassName = 'acrool__modal-open-fixed';

/**
 * @Deprecated 計畫與
 * 需加上 model-open 樣式
 * body.modal-open{
 *     overflow: hidden;
 *     overscroll-behavior-x: contain;
 *     max-width: 100vw;
 * }
 */
function disableBodyScroll(isFixed = false){
    if(disableBodyModalCount >= 0){
        disableBodyModalCount += 1;

        if(!hasClass(document.body, modalOpenClassName) &&
            !hasClass(document.body, modalOpenFixedClassName)
        ){
            addClass(document.body, isFixed ? modalOpenFixedClassName : modalOpenClassName);
        }
    }

}

function enableBodyScroll(fixed = false){
    if(disableBodyModalCount > 0){
        disableBodyModalCount -= 1;

        if(disableBodyModalCount === 0){
            removeClass(document.body, modalOpenClassName);
            removeClass(document.body, modalOpenFixedClassName);
        }
    }
}

export default {
    disableBodyScroll,
    enableBodyScroll
};
