import {addClass, createQueueKey, hasClass, isEmpty,removeByIndex, removeClass} from './utils';

describe('removeByIndex', () => {
    it('應正確移除指定索引的元素', () => {
        expect(removeByIndex([1, 2, 3], 1)).toEqual([1, 3]);
    });
    it('索引為 -1 或超出範圍時應回傳原陣列', () => {
        expect(removeByIndex([1, 2, 3], -1)).toEqual([1, 2, 3]);
        expect(removeByIndex([1, 2, 3], 3)).toEqual([1, 2, 3]);
    });
});

describe('hasClass', () => {
    it('應正確判斷 class 是否存在', () => {
        const dom = {className: 'foo bar'};
        expect(hasClass(dom, 'foo')).toBe(true);
        expect(hasClass(dom, 'bar')).toBe(true);
        expect(hasClass(dom, 'baz')).toBe(false);
    });
});

describe('addClass', () => {
    it('應新增 class 到 dom', () => {
        const dom = {className: '', classList: {add: jest.fn()}};
        addClass(dom, 'foo');
        expect(dom.classList.add).toHaveBeenCalledWith('foo');
    });
    it('已存在 class 不應重複新增', () => {
        const dom = {className: 'foo', classList: {add: jest.fn()}};
        addClass(dom, 'foo');
        expect(dom.classList.add).not.toHaveBeenCalled();
    });
});

describe('removeClass', () => {
    it('應從 dom 移除 class', () => {
        const dom = {classList: {remove: jest.fn()}};
        removeClass(dom, 'foo');
        expect(dom.classList.remove).toHaveBeenCalledWith('foo');
    });
});

describe('createQueueKey', () => {
    it('應產生唯一且為小寫的 queueKey', () => {
        const key1 = createQueueKey();
        const key2 = createQueueKey();
        expect(typeof key1).toBe('string');
        expect(key1).toMatch(/^[0-9a-h]{26}$/); // ulid 格式
        expect(key1).toBe(key1.toLowerCase());
        expect(key1).not.toBe(key2);
    });
});

describe('isEmpty', () => {
    it('應判斷 undefined, null, false, 0, 空字串, 空物件為空', () => {
        expect(isEmpty(undefined)).toBe(true);
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty(false)).toBe(true);
        expect(isEmpty(0)).toBe(true);
        expect(isEmpty('')).toBe(true);
        expect(isEmpty({})).toBe(true);
    });
    it('應判斷非空值', () => {
        expect(isEmpty(1)).toBe(false);
        expect(isEmpty('abc')).toBe(false);
        expect(isEmpty([1])).toBe(false);
        expect(isEmpty({a: 1})).toBe(false);
        expect(isEmpty(new Date())).toBe(false);
    });
    it('可自訂 isZero, isFalse 選項', () => {
        expect(isEmpty(0, {isZero: false})).toBe(false);
        expect(isEmpty(false, {isFalse: false})).toBe(false);
    });
}); 