import {ulid} from 'ulid';

/**
 * 刪除陣列中的一筆資料 (immutable)
 * ps: 不用先複製, 方法內會複製出來
 * ex: [1,2,3] -> [1,3]
 *
 * @param arrayData
 * @param index
 */
export function removeByIndex<T>(arrayData: T[], index: number): T[] {
    if(index === -1 || index > arrayData.length - 1) return arrayData;
    return [...arrayData.slice(0, index), ...arrayData.slice(index + 1)];
}


/**
 * 判斷 elements 中的 css class
 * @param dom elements
 * @param className css class
 * @returns {boolean}
 */
export function hasClass(dom: any, className: string): boolean {
    return !!dom.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}

/**
 * 在 elements 中新增 css class
 * @param dom elements
 * @param className
 */
export function addClass(dom: any, className: string):void {
    if (!hasClass(dom, className)) {
        dom.classList.add(className);
    }
}

/**
 * 刪除 elements 中的 css class
 * @param dom elements
 * @param className
 */
export function removeClass(dom: any, className: string):void {
    dom.classList.remove(className);
}



/**
 * 產生 queueKey
 */
export function createQueueKey() {
    return ulid().toLowerCase();
}



export type Empty = null | undefined | false | '' | 0;

/**
 * 判断是否为空
 * @param value
 * @param checkOption
 * @returns {boolean}
 */
export function isEmpty<T>(value: T, checkOption?: {
    isZero?: boolean,
    isFalse?: boolean,
}): value is Extract<T, Empty> {
    const defaultCheckOption = {
        isZero: checkOption?.isZero ?? true,
        isFalse: checkOption?.isFalse ?? true,
    };
    return (
        value === undefined
        || value === null
        || (defaultCheckOption.isFalse && (value === false || value === 'false'))
        || (defaultCheckOption.isZero && (value === 0 || value === '0'))
        || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
    );
}

