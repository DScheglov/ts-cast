# rt-ts
Runtime type checking for Typescript projects

## Installation

```shell
npm i rt-ts
```

## Overview

The package **rt-ts** is a type checking utility for contract programming.

It allows to describe data schema of the incoming resources (requests to the application or responses from other applications) and then validate correspondent resources with the schema.

Let's start with an example:

**./src/schema.ts**

```typescript
import { int, num, str, struct, tuple, array } from 'rt-ts';
import { toBe } from 'rt-ts/validation';
import { isEmail } from 'validator';

export const Person = struct({
  name: str,
  email: str.validate(toBe(isEmail, "a valid email")),
});

export const Coords = tuple(num, num);

export const Book = struct({
  title: str,
  annotation: str.optional,
  year: int,
  authors: array(Person),
  coords: Coords.optional,
});

export type TPerson = ReturnType<typeof Person>;
export type TCoords = ReturnType<typeof Coords>;
export type TBook = ReturnType<typeof Book>;
```

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

console.log(JSON.stringify(book, null, 2));
```

## TODO:
 - [ ] Cover with tests
 - [ ] Setup CI/CD and Publish `v0.0.1`
 - [ ] Add `date` and `datetime` types
 - [ ] Add operators over the caster (`oneOfTypes`, `allOfTypes`)
 - [ ] Add general validation rules (`eq`, `neq`)
 - [ ] Add operators over rules (`any`, `all`)
 - [ ] Add operators over predicates (`or`, `and`, `not`)