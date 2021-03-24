# ts-cast &middot; [![Coverage Status](https://coveralls.io/repos/github/DScheglov/ts-cast/badge.svg?branch=master&service=github)](https://coveralls.io/github/DScheglov/ts-cast?branch=master&service=github) [![npm version](https://img.shields.io/npm/v/ts-cast.svg?style=flat-square)](https://www.npmjs.com/package/ts-cast) [![npm downloads](https://img.shields.io/npm/dm/ts-cast.svg?style=flat-square)](https://www.npmjs.com/package/ts-cast) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/DScheglov/ts-cast/blob/master/LICENSE)

Runtime type checking for Typescript and JavaScript projects. It allows to specify data structures
of the "external" resources (requests to the application or responses from other applications).

The idea is based on the **Caster** that is a function accepts value of `unknown` type
and returns value of target type or throws a `TypeError` if casting is impossible.

Additionally `ts-cast` presents tools for:
 - validation casted data
 - transformation of casted data
 - `Either` and `Validation` monads support

Almost in all cases `ts-cast` allows to avoid specification of correspondent type in TypeScript,
because the type could be get as `ReturnType` of the correspondent caster-function.

```ts
const Person = struct({ name: string, age: integer });

type Person = ReturnType<typeof Person>;

// the same as

type Person = { name: string, age: number };
```

## Installation

```shell
npm i ts-cast
```

## [Documentation](https://github.com/DScheglov/ts-cast/tree/master/docs)

Read `ts-cast` documentation on github: <br/>
[https://github.com/DScheglov/ts-cast/tree/master/docs](https://github.com/DScheglov/ts-cast/tree/master/docs)

## Getting Started

Let's start with an example:

**./src/schema.ts**

```typescript
import { integer, number, string, struct, tuple, array, toBe } from 'ts-cast';
import v from 'validator';

export const Person = struct({
  name: string,
  email: string.restrict(toBe(v.isEmail, "a valid email")),
});

export const Coords = tuple(number, number);

export const Book = struct({
  title: string,
  annotation: string.optional,
  year: integer,
  authors: array(Person),
  coords: Coords.optional,
});

export type TPerson = ReturnType<typeof Person>;
export type TCoords = ReturnType<typeof Coords>;
export type TBook = ReturnType<typeof Book>;
```

Then we can use defined types and their `caster`-s in this way:

**./src/index.ts**

```typescript
import { Person, TPerson, Book, TBook } from './schema';

const me = Person({ name: "John Smith", email: "john@smith.com" });

const meAgain: TPerson = {
  name: "John Smith",
  email: "john.smith@gmail.com", // but email will not be validated with validator.isEmail
};

const myBook = Book({
  title: "My First Book",
  year: 2021,
  authors: [
    me,
    meAgain,
    { name: 'Some Other Guy', email: 'other.guy@gmail.com' },
  ],
  coords: [1.2, 23.32]
}, "myBook");

const book: TBook = myBook;

console.dir(book, { depth: null });
```

## TypeScript Analogy

### Primitive Types

|  ts-cast  | TypeScript  |
| :-------: | :---------: |
| `number`  |  `number`   |
| `integer` |  `number`   |
| `string`  |  `string`   |
| `boolean` |  `boolean`  |
|   `nil`   |   `null`    |
|  `undef`  | `undefined` |

**Example**:

```ts
import { integer } from 'ts-cast';

const x = integer(10); // works
const y = integer(Math.PI);  // throws TypeError
const z = integet('10'); // also throws TypeError
```

```ts
import { string } from 'ts-cast';

const a = string('Hello Wordl!'); // works
const b = string(''); // also works
const c = string(null); // throws TypeError
const d = string(20); // throws TypeError again
```

### Literal Types

|        ts-cast         |    TypeScript     | Comments                                                    |
| :--------------------: | :---------------: | :---------------------------------------------------------- |
|       `value(V)`       |   `V as const`    | `V extends number \| string \| boolean \| symbol`           |
| `values(A, B, C, ...)` | `A \| B \| C ...` | `A, B, C ... extends number \| string \| boolean \| symbol` |


```ts
import { values } from 'ts-cast';

const TrafficLight = values('red', 'yellow', 'green');

const green = TrafficLight('green'); // works

type TypeOfGreen = typeof green; // 'red' | 'yellow' | 'green'

const wrong = TrafficLight('blue'); // throws TypeError
```

### Complex Types

|                 ts-cast                  |   TypeScript    |
| :--------------------------------------: | :-------------: |
|   `tuple(caster<T1>, caster<T2>, ...)`   | `[T1, T2, ...]` |
|            `array(caster<T>)`            |      `T[]`      |
| `struct({ a: caster<A>, b: caster<B> })` | { a: A, b: B }  |
|      `record(caster<K>, caster<V>)`      | `Record<K, V>`  |


### Type Modifiers

|          ts-cast          |    TypeScript    |
| :-----------------------: | :--------------: |
|   `caster<T>.optional`    | `T \| undefined` |
|  `caster<T>.default(v)`   |    `x: T = v`    |
|   `caster<T>.nullable`    |   `T \| null`    |
| `caster<T>.restrict(...)` |       `T`        |

### Operations over Types

|               ts-cast                |    TypeScript     |
| :----------------------------------: | :---------------: |
| `union(caster<T1>, caster<T2>, ...)` | `T1 \| T2 \| ...` |
| `prod(caster<T1>, caster<T2>, ...)`  |  `T1 & T2 & ...`  |