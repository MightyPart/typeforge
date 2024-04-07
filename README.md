# Typeforge

Typeforge contains useful utility types for typescript!

- - -

## Strings
```ts
StringStartsWith<"Hello", "H"> // true

StringEndsWith<"Hello", "baz"> // false

StringRemoveFirstChar<"Hello"> // ello

StringRemoveLastChar<"World"> // Worl

StringSplit<
  "Hello_World_Foo_Bar", // The string to split.
  "_",                   // The seperator to split at.
  2                      // The maximum amount of splits to make.
> // ["Hello", "World", "Foo_Bar"]

StringSplitAll<
  "Hello_World_Foo_Bar", // The string to split.
  "_",                   // The seperator to split at.
>  // ["Hello", "World", "Foo", "Bar"]

StringSplitOnce<
  "Hello_World_Foo_Bar", // The string to split.
  "_",                   // The seperator to split at.
> // ["Hello", "_World_Foo_Bar"]

StringReplace<
  "Hello World World", // The string to replace from.
  "World",             // The target characters to replace.
  "There",             // The replacement characters.
  1                    // The maximum amount of times to replace.
> // "Hello There World"

// Slightly more performant than `StringReplace` if you are replacing all occurrences.
StringReplaceAll<
  "Hello World World", // The string to replace from.
  "World",             // The target characters to replace.
  "There"              // The replacement characters.
> // "Hello There There"

StringLooseAutocomplete<"FooBar">

StringCondenseDuplicates<
  "Hello____World__Foo_________Bar", // The string to condense duplicates for.
  "_"                                // The target characters to condense.
> // "Hello_World_Foo_Bar"

StringIsLiteral<"Hello"> // true

StringContains<"Hello", "lo"> // true
```

## Unions
```ts
UnionPrettify<"Hello" | "World" | "Foo" | "Baz"> // "Hello" | "World" | "Foo" | "Baz"

IsUnion<"Hello" | "World" | "Foo" | "Baz"> // true

UnionToArray<"Hello" | "World" | "Foo" | "Baz"> // ["Hello", "World", "Foo", "Baz"]
```

## Arrays
```ts
ArrayPrettify<[ "Hello", "World" ]> // ["Hello", "World"]

ArrayToUnion<["Hello", "World", "Foo", "Baz"]> // "Hello" | "World" | "Foo" | "Baz"

ArrayConcat<
  [ "One", "Two", "Three", "Four" ] // The array to concatenate.
  ", "                              // The characters to concatenate with.
> // "One, Two, Three, Four"

ArrayRemoveTypes<
  [ true, "carrot", 55, "tomato", "onion", 66 ], // The array to remove from.
  string | number                                // The type of elements to be removed.
> // [true]

// Only keeps elements of specified types in an array.
ArrayKeepTypes<
  [ true, "carrot", 55, "tomato", "onion", 66 ], // The array to remove from.
  string | number                                // The type of elements to be kept.
> // ["carrot", 55, "tomato", "onion", 66]

ArrayRemoveLastItem<[ "one", "two", "three" ]> // ["one", "two"]

ArrayLastItem<[ "one", "two", "three" ]> // "three"

// Used to ensure that an array type is not empty (e.g. [] extends ArrayNonEmpty<string>)/
ArrayNonEmpty<string> // [string, ...string[]]
```

## Object
```ts
ObjectPrettify<
  { hello: "world" } & { foo: "bar" }
  & { baz: { hello: "world" } & { foo: "bar" } }
> /* {
  hello: "world";
  foo: "bar";
  baz: {
      hello: "world";
      foo: "bar";
  };
} */

ObjectShallowPrettify<
  { hello: "world" } & { foo: "bar" }
  & { baz: { hello: "world" } & { foo: "bar" } }
> /* {
  hello: "world";
  foo: "bar";
  baz: {
      hello: "world";
  } & {
      foo: "bar";
  };
} */

ObjectDifferentKeys<
  { hello: "world", bar: "foo" },
  { hello: "world", baz: "foo" }
> // { bar: "foo"; baz: "foo"; }

ObjectSameKeys<
  { hello: "world", bar: "foo" },
  { hello: "world", baz: "foo" }
> // { hello: "world"; }

ObjectDeepMerge<
  { Bob: { Age: 41 }, Dave: { Age: 32, EyeColor: "Green" } },
  { Bob: { EyeColor: "Blue" }, Dave: { EyeColor: "Brown" } }
> // { Bob: { Age: 41, EyeColor: "Blue" }, Dave: { Age: 32, EyeColor: "Brown" } } 

ObjectRemoveKeys<
  { hello: "world", foo: "bar", baz: "foo" },
  "hello" | "baz"
> // { foo: "bar" }

// Only keep specified keys inside of an object.
ObjectKeepKeys<
  { hello: "world", foo: "bar", baz: "foo" },
  "hello" | "baz"
> // { hello: "world"; baz: "foo"; }

ObjectOverwrite<
  { foo: { bar: "baz", hello: "world" } },
  { foo: { bar: "fooBar" } }
> // { foo: { bar: "fooBar"; hello: "world"; }; }

ObjectShallowOverwrite<
  { foo: { bar: "baz", hello: "world" } },
  { foo: { bar: "fooBar" } }
> // { foo: { bar: "fooBar"; }; }
```
## ISO
```ts
// Utility types to ensure a string is an ISO string.

ISOYear        
ISOMonth       
ISODay         
ISOHours       
ISOMinutes     
ISOSeconds     
ISOMilliseconds
ISOTimeZoneOffset
ISODate
ISOTime
ISODateTime
```

# Prettify
```ts
// Automatically prettifies Objects, Unions and Arrays.

Prettify<{ hello: "world" }>
Prettify<"Hello" | "World">
Prettify<[ "Hello", "World" ]>
```