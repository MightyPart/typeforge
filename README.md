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
```

## Unions
```ts
UnionToArray<"Hello" | "World" | "Foo" | "Baz"> // ["Hello", "World", "Foo", "Baz"]
```

## Arrays
```ts
ArrayToUnion<["Hello", "World", "Foo", "Baz"]> // "Hello" | "World" | "Foo" | "Baz"

ArrayConcat<
  [ "One", "Two", "Three", "Four" ] // The array to concatenate.
  ", "                              // The characters to concatenate with.
> // "One, Two, Three, Four"

// Removes elements from an array if its type is included in the filter list.
ArrayRemoveIncluded<
  [ true, "carrot", 55, "tomato", "onion", 66 ], // The array to remove from.
  string | number                                // The type of elements to be removed.
> // [true]

// Removes elements from an array if its type is excluded from the keep list.
ArrayRemoveExcluded<
  [ true, "carrot", 55, "tomato", "onion", 66 ], // The array to remove from.
  string | number                                // The type of elements to be removed.
> // ["carrot", 55, "tomato", "onion", 66]

ArrayLength<[ "potato", "cauliflower", "pumpkin" ]> // 3
```

## Object
```ts
ObjectValues<{ hello: "world", foo: "bar" }> // "world" | "bar"

ObjectPrettify<{ hello: "world" } & { foo: "bar" }> // { hello: "world", foo: "bar" }

ObjectDeepMerge<
  { Bob: { Age: 41 }, Dave: { Age: 32, EyeColor: "Green" } },
  { Bob: { EyeColor: "Blue" }, Dave: { EyeColor: "Brown" } }
> // { Bob: { Age: 41, EyeColor: "Blue" }, Dave: { Age: 32, EyeColor: "Brown" } } 
```