import {addClass, hasClass, removeClass} from '../utils';


let disableBodyModalCount = 0;
const modalOpenClassName = 'acrool__modal-open';

/**
 * @Deprecated 計畫與
 * 需加上 model-open 樣式
 * body.modal-open{
 *     overflow: hidden;
 *     overscroll-behavior-x: contain;
 *     max-width: 100vw;
 * }
 */
function disableBodyScroll(printLog = false){
    if(disableBodyModalCount >= 0){
        disableBodyModalCount += 1;

        if(!hasClass(document.body, modalOpenClassName)){
            addClass(document.body, modalOpenClassName);
        }
    }

}

function enableBodyScroll(printLog = false){
    if(disableBodyModalCount > 0){
        disableBodyModalCount -= 1;

        if(disableBodyModalCount === 0){
            removeClass(document.body, modalOpenClassName);
        }
    }
}

export default {
    disableBodyScroll,
    enableBodyScroll
};
