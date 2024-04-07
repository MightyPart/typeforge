import type { Add, Eq } from "ts-arithmetic";
export type StringStartsWith<FullString extends string, Start extends string> = FullString extends `${Start}${infer _}` ? true : false;
export type StringEndsWith<FullString extends string, End extends string> = FullString extends `${infer _}${End}` ? true : false;
export type StringRemoveFirstChar<S extends string> = S extends `${infer _}${infer Rest}` ? Rest : never;
export type StringRemoveLastChar<S extends string> = (S extends `${infer First}${infer Rest}` ? Rest extends "" ? "" : `${First}${StringRemoveLastChar<Rest>}` : never);
export type StringSplit<Str extends string, Sep extends string, MaxSplits extends number = -1, _Iter extends number = 1> = (MaxSplits extends 0 ? [Str] : Str extends `${infer First}${Sep}${infer Rest}` ? Eq<MaxSplits, _Iter> extends 1 ? [First, Rest] : [
    First,
    ...StringSplit<Rest, Sep, MaxSplits, Add<_Iter, 1>>
] : [Str]);
export type StringSplitOnce<Str extends string, Delimiter extends string> = Str extends `${infer First}${Delimiter}${infer Rest}` ? [First, Rest] : [Str];
export type StringSplitAll<S extends string, Delimiter extends string> = S extends `${infer Part}${Delimiter}${infer Rest}` ? [Part, ...StringSplitAll<Rest, Delimiter>] : [S];
export type StringReplaceAll<Str extends string, Target extends string, ReplaceWith extends string> = (Str extends `${infer Before}${Target}${infer After}` ? StringReplaceAll<`${Before}${ReplaceWith}${After}`, Target, ReplaceWith> : Str);
export type StringReplace<Str extends string, Target extends string, ReplaceWith extends string, MaxReplacements extends number = -1> = (MaxReplacements extends 0 ? Str : MaxReplacements extends -1 ? StringReplaceAll<Str, Target, ReplaceWith> : ArrayConcat<StringSplit<Str, Target, MaxReplacements>, ReplaceWith>);
export type StringCondenseDuplicates<Str extends string, Target extends string> = (Str extends `${infer Start}${Target}${Target}${infer End}` ? StringCondenseDuplicates<`${Start}${Target}${End}`, Target> : Str);
export type StringIsLiteral<T extends string> = T extends `${infer U}` ? string extends U ? false : true : false;
export type StringLooseAutocomplete<T extends string> = T | Omit<string, T>;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type UnionToOvlds<U> = UnionToIntersection<U extends any ? (f: U) => void : never>;
type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]> : [T, ...A];
export type ArrayToUnion<T extends any[]> = T[number];
export type ArrayConcat<T extends string[], Delimiter extends string> = (T extends [] ? '' : T extends [infer F extends string | number | bigint | boolean | null | undefined, ...infer R extends string[]] ? `${F}${Eq<ArrayLength<T>, 1> extends 0 ? Delimiter : ""}${ArrayConcat<R, Delimiter>}` : never);
export type ArrayRemoveIncluded<T extends any[], ToKeep extends any> = (T extends [infer Head, ...infer Tail] ? Head extends ToKeep ? ArrayRemoveIncluded<Tail, ToKeep> : [Head, ...ArrayRemoveIncluded<Tail, ToKeep>] : []);
export type ArrayRemoveExcluded<T extends any[], ToFilter extends any> = (T extends [infer Head, ...infer Tail] ? Head extends ToFilter ? [Head, ...ArrayRemoveExcluded<Tail, ToFilter>] : ArrayRemoveExcluded<Tail, ToFilter> : []);
export type ArrayLength<T extends any[]> = T extends {
    length: infer L;
} ? L : never;
export type ObjectValues<Obj extends Object> = Obj[keyof Obj];
export type ObjectPrettify<T> = {
    [K in keyof T]: T[K];
} & {};
export type ObjectDeepMerge<T, U> = (T extends object ? U extends object ? {
    [K in Extract<keyof T, string> | Extract<keyof U, string>]: K extends keyof T ? K extends keyof U ? ObjectDeepMerge<T[K], U[K]> : T[K] : K extends keyof U ? U[K] : never;
} : never : U);
export {};
