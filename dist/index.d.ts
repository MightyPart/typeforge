import type { Add, Eq } from "ts-arithmetic";
export type StringStartsWith<FullString extends string, Start extends string> = FullString extends `${Start}${infer _}` ? true : false;
export type StringEndsWith<FullString extends string, End extends string> = FullString extends `${infer _}${End}` ? true : false;
export type StringRemoveFirstChar<S extends string> = S extends `${infer _}${infer Rest}` ? Rest : never;
export type StringRemoveLastChar<S extends string> = (S extends `${infer First}${infer Rest}` ? Rest extends "" ? "" : `${First}${StringRemoveLastChar<Rest>}` : never);
export type StringSplit<Str extends string, Delimiter extends string, MaxSplits extends number = -1, _Iter extends number = 1> = (MaxSplits extends 0 ? [Str] : Str extends `${infer First}${Delimiter}${infer Rest}` ? Eq<MaxSplits, _Iter> extends 1 ? [First, Rest] : [
    First,
    ...StringSplit<Rest, Delimiter, MaxSplits, Add<_Iter, 1>>
] : [Str]);
export type StringSplitOnce<Str extends string, Delimiter extends string> = Str extends `${infer First}${Delimiter}${infer Rest}` ? [First, Rest] : [Str];
export type StringSplitAll<S extends string, Delimiter extends string> = S extends `${infer Part}${Delimiter}${infer Rest}` ? [Part, ...StringSplitAll<Rest, Delimiter>] : [S];
export type StringReplaceAll<Str extends string, Target extends string, ReplaceWith extends string> = (Str extends `${infer Before}${Target}${infer After}` ? StringReplaceAll<`${Before}${ReplaceWith}${After}`, Target, ReplaceWith> : Str);
export type StringReplace<Str extends string, Target extends string, ReplaceWith extends string, MaxReplacements extends number = -1> = (MaxReplacements extends 0 ? Str : MaxReplacements extends -1 ? StringReplaceAll<Str, Target, ReplaceWith> : ArrayConcat<StringSplit<Str, Target, MaxReplacements>, ReplaceWith>);
export type StringLooseAutocomplete<T extends string> = T | Omit<string, T>;
export type StringCondenseDuplicates<Str extends string, Target extends string> = (Str extends `${infer Start}${Target}${Target}${infer End}` ? StringCondenseDuplicates<`${Start}${Target}${End}`, Target> : Str);
export type StringIsLiteral<T> = T extends `${infer U}` ? string extends U ? false : true : false;
export type StringContains<T extends string, C extends string> = (T extends `${infer _Start}${C}${infer _End}` ? true : false);
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type UnionToOvlds<U> = UnionToIntersection<U extends any ? (f: U) => void : never>;
type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]> : [T, ...A];
export type UnionPrettify<T> = ArrayToUnion<UnionToArray<T>>;
export type ArrayToUnion<T extends any[]> = T[number];
export type ArrayConcat<T extends string[], Delimiter extends string> = (T extends [] ? '' : T extends [infer F extends string | number | bigint | boolean | null | undefined, ...infer R extends string[]] ? `${F}${Eq<T["length"], 1> extends 0 ? Delimiter : ""}${ArrayConcat<R, Delimiter>}` : never);
export type ArrayRemoveTypes<T extends any[], ToKeep extends any> = (T extends [infer Head, ...infer Tail] ? Head extends ToKeep ? ArrayRemoveTypes<Tail, ToKeep> : [Head, ...ArrayRemoveTypes<Tail, ToKeep>] : []);
export type ArrayKeepTypes<T extends any[], ToFilter extends any> = (T extends [infer Head, ...infer Tail] ? Head extends ToFilter ? [Head, ...ArrayKeepTypes<Tail, ToFilter>] : ArrayKeepTypes<Tail, ToFilter> : []);
export type ArrayRemoveLastItem<Arr extends any[]> = Arr extends [...infer Items, any] ? Items : never;
export type ArrayLastItem<Arr extends any[]> = Arr extends [...any, infer Last] ? Last : never;
export type ArrayNonEmpty<ElementType extends any> = [ElementType, ...ElementType[]];
export type ObjectShallowPrettify<Obj extends Record<any, any>> = {
    [Key in keyof Obj]: Obj[Key];
} & {};
export type ObjectPrettify<Obj extends Record<any, any>> = {
    [Key in keyof Obj]: Obj[Key] extends Record<any, any> ? ObjectPrettify<Obj[Key]> : Obj[Key];
} & {};
export type ObjectDifferentKeys<Obj1 extends Record<any, any>, Obj2 extends Record<any, any>> = ObjectPrettify<Omit<Obj1, keyof Obj2> & Omit<Obj2, keyof Obj1>>;
export type ObjectSameKeys<Obj1 extends Record<any, any>, Obj2 extends Record<any, any>> = Omit<Obj1 | Obj2, keyof ObjectDifferentKeys<Obj1, Obj2>>;
export type ObjectRemoveKeys<Obj extends Record<any, any>, KeyToRemove extends string | number | symbol> = {
    [Key in keyof Obj as Key extends KeyToRemove ? never : Key]: Obj[Key];
};
export type ObjectKeepKeys<Obj extends Record<any, any>, KeyToRemove extends string | number | symbol> = {
    [Key in keyof Obj as Key extends KeyToRemove ? Key : never]: Obj[Key];
};
export type ObjectOverwrite<Obj1 extends Record<any, any>, Obj2 extends Record<any, any>, _SameKeys = ObjectSameKeys<Obj1, Obj2>, _DifferentKeys = ObjectDifferentKeys<Obj1, Obj2>> = ObjectShallowPrettify<{
    [Key in keyof _SameKeys]: (Obj2[Key] extends Record<any, any> ? Obj1[Key] extends Record<any, any> ? ObjectOverwrite<Obj1[Key], Obj2[Key]> : Obj2[Key] : Obj2[Key]);
} & _DifferentKeys>;
export type ObjectShallowOverwrite<Obj1 extends Record<any, any>, Obj2 extends Record<any, any>, _SameKeys = ObjectSameKeys<Obj1, Obj2>, _DifferentKeys = ObjectDifferentKeys<Obj1, Obj2>> = ObjectShallowPrettify<{
    [Key in keyof _SameKeys]: Obj2[Key];
} & _DifferentKeys>;
export type ISOYear = `${number}${number}${number}${number}`;
export type ISOMonth = `${number}${number}`;
export type ISODay = `${number}${number}`;
export type ISOHours = `${number}${number}`;
export type ISOMinutes = `${number}${number}`;
export type ISOSeconds = `${number}${number}`;
export type ISOMilliseconds = `${number}${number}${number}`;
export type ISOTimeZoneOffset = `+${number}${number}${number}${number}`;
export type ISODate = `${ISOYear}-${ISOMonth}-${ISODay}`;
export type ISOTime = `${ISOHours}:${ISOMinutes}:${ISOSeconds}${ISOMilliseconds | ""}`;
export type ISODateTime = `${ISODate}T${ISOTime}${ISOTimeZoneOffset}`;
export {};
