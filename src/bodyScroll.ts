import {addClass, hasClass, removeClass} from './utils';


const modalOpenClassName = 'acrool__modal-open';
const modalOpenFixedClassName = 'acrool__modal-open-fixed';

/**
 * 需加上 model-open 樣式
 * body.modal-open{
 *     overflow: hidden;
 *     overscroll-behavior-x: contain;
 *     max-width: 100vw;
 * }
 */
function disableBodyScroll(id: string, isFixed = false, ){
    addClass(document.body, isFixed ? `${modalOpenFixedClassName}__${id}` : `${modalOpenClassName}__${id}`);
}

function enableBodyScroll(id: string, isFixed = false, ){
    removeClass(document.body, isFixed ? `${modalOpenFixedClassName}__${id}` : `${modalOpenClassName}__${id}`);
}

export default {
    disableBodyScroll,
    enableBodyScroll
};
