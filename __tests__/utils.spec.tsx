import {createModal} from "../src";
import React from "react";

type IsUndefined<T> = T extends undefined ? true : false;
type IsNullOrUndefined<T> = T extends null | undefined ? true : false;
type IsObject<T> = T extends object ? true : false;
type IsEmptyObject<T> = keyof T extends never ? true : false;
type IsUnKnown<T> = T extends unknown ? true : false;
type IsNever<T> = T extends never ? true : false;
type IsFalse<T> = T extends false ? true : false;



type A1 = IsUndefined<string>; // X
type A2 = IsUndefined<undefined>; // O
type A3 = IsUndefined<{}>; // X

type B1 = IsNullOrUndefined<string>; // X
type B2 = IsNullOrUndefined<undefined>; // O
type B3 = IsNullOrUndefined<null>; // X
type B4 = IsNullOrUndefined<{}>; // X

type C1 = IsObject<string>; // X
type C2 = IsObject<undefined>; // X
type C3 = IsObject<{}>; // O
type C4 = IsObject<{x: string}>; // O

type D1 = IsEmptyObject<string>; // X
type D2 = IsEmptyObject<undefined>; // O
type D3 = IsEmptyObject<{}>; // O
type D4 = IsEmptyObject<{x: string}>; // X


type E1 = IsUnKnown<string>; // O
type E2 = IsUnKnown<undefined>; // O
type E3 = IsUnKnown<{}>; // O
type E4 = IsUnKnown<{x: string}>; // O



interface IProps {myVar: string}
const PromotionModal = createModal(() => <div>Test</div>);
const PromotionModalArgs = createModal((args: IProps) => <div>Test</div>);
const PromotionModalPartialArgs = createModal(({myVar}: Partial<IProps>) => <div>Test</div>);

PromotionModal.show(); // O
PromotionModal.show({xxx: 's'}); // X


PromotionModalArgs.show({myVar: 'xx'}); // O
PromotionModalArgs.show({}); // X
PromotionModalArgs.show(); // X


PromotionModalPartialArgs.show({myVar: 'xx'}); // O
PromotionModalPartialArgs.show({}); // O
PromotionModalPartialArgs.show(); // X


test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
});


export {};
