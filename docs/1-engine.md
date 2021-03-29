# ts-cast &middot; Type Checking Engine API

  - [1. CasterFn&lt;T&gt; <sup>`type`</sup>](#1-casterfnt-suptypesup)
  - [2. Caster&lt;T&gt; <sup>`type`</sup>](#2-castert-suptypesup)
    - [Type Definition](#type-definition)
    - [Property `.optional`](#property-optional)
    - [Property `.nullable`](#property-nullable)
    - [Method `.default`](#method-default)
    - [Method `.restrict`](#method-restrict)
    - [Method `.map`](#method-map)
    - [Method `.validate`](#method-validate)
    - [Method `.either`](#method-either)
    - [Method `.validation`](#method-validation)
  - [3. casterApi&lt;T&gt; <sup>`fn`</sup>](#3-casterapit-supfnsup)
  - [4. createCaster&lt;T&gt; <sup>`fn`</sup>](#4-createcastert-supfnsup)
  - [5. validate&lt;T&gt; <sup>`fn`</sup>](#5-validatet-supfnsup)

<a name="1-caster-fn"></a>
## 1. CasterFn&lt;T&gt; <sup>`type`</sup>

The named function that accepts `unknown` type value and returns value of 
target type `T` or reports about casting error:

```ts
export interface CasterFn<T> {
  (value: unknown, context?: string, reportError?: ErrorReporter): T;
  name: string;
}

export type ErrorReporter = (message: string, context?: string) => never;
```

**Argumernts**

|    Parameter    |      Type       | Mandatory / Optional | Descriptions                                                                                                                          |
| :-------------: | :-------------: | :------------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
|    **value**    |    `unknown`    |    **mandatory**     | The value to be casted                                                                                                                |
|   **context**   |    `string`     |      _optional_      | The Casting Context. It is could be considered as a name of root object to be casted. As instance it could be "SomeApiMethodResponse" |
| **reportError** | `ErrorReporter` |      _optional_      | The function accepts an error message and casting context. It could throw an error or return undefined.                               |

**Returns**
 - **casted value**: `T`

**Example**

```ts
import { CasterFn, ErrorReporter } from 'ts-cast';

const casterFn: CasterFn<number> = function yearOf21stCentury(
  value: unknown, 
  context?: string, 
  reportError: ErrorReporter = (msg: string) => { throw new TypeError(msg); }
): number {
  if (typeof value === 'number' && value > 2000 && value < 2101) {
    return value;
  }
  
  reportError(
    `Current Year is expected${
      context ? ` in ${context}` : ''
    } but "${value}" received.`,
    context,
  );
}
```

<a name="2-caster"></a>
## 2. Caster&lt;T&gt; <sup>`type`</sup>

The extenstion of the `CasterFn<T>` that contains properties and methods to build other types,
including by mapping casted data.

Please note that `CasterFn<T>` doesn't have correspondent methods.

### Type Definition

```ts
export interface Caster<T> extends CasterFn<T> {
  optional: Caster<T | undefined>;
  nullable: Caster<T | null>;
  default(defaltValue: T): Caster<Exclude<T, undefined>>;
  restrict(...rules: RuleFn<Exclude<T, null | undefined>>[]): Caster<T>;
  map<D>(
    transform: (value: Exclude<T, null | undefined>) => D
  ): Caster<D | Exclude<T, Exclude<T, null | undefined>>>;
  validate(value: unknown): ValidationResult<T>;

  either<Right, Left>(
    leftFactory: (error: TypeError) => Left,
    rightFactory:(value: T) => Right,
  ): CasterFn<Left | Right>;

  validation<Valid, Invalid>(
    invalidFactory: (errors: ErrorMessage[]) => Invalid,
    validFactory: (value: T) => Valid
  ): CasterFn<Valid | Invalid>;
}
```

### Property `.optional`

```ts
Caster<T | undefined>
```

The `.optional` property refers to `Caster` of **optional** type. Optional is considered as _could be undefined_.

**Example**

```ts
const optNumber = number.optional;

optNumber(10); // returns 10
optNumber(undefined); // returns undefined
optNumber(null); // throws a TypeError
```

### Property `.nullable`

```ts
Caster<T | null>
```

The `.nullable` property refers to `Caster` of **nullable** type that means the correspondent caster accepts `null` as valid value.

**Example**

```ts
const nullableStr = string.nullable;

nullableStr('Hello World'); // returns "Hello World"
nullableStr(null); // returns null
nullableStr(undefined); // throws a TypeError
```

### Method `.default`

```ts
(value: T) => Caster<Exclude<T, undefined>>
```

Creates new `Caster` that replaces `undefined` input with `value` specified as argument.

**Arguments**

| Parameter | Type  | Mandatory | Description                            |
| :-------: | :---: | :-------: | :------------------------------------- |
| **value** |  `T`  |  **yes**  | The value to replace `undefined` input |

**Returns**
 - **caster**: `Caster<Exclude<T, undefined>>`

**Example**

```ts
const someStr = string.default('no-input');

someStr('Hello World'); // returns "Hello World"
someStr(undefined); // returns "no-input"
someStr(null); // throws a TypeError
```

### Method `.restrict`

```ts
(...rules: RuleFn<Exclude<T, null | undefined>>[]) => Caster<T>

type RuleFn<T> = (value: T) => string | null
```

Creates new `Caster` that checks if casted value satisfies restrictions described with one ore more `RuleFn`.

The `RuleFn<T>` is a type of function that accepts: `value` of type `T`, optionally `context` of type `string`,
and returns `null` if `value` satisfies rule and `string` with error message that descibes rule violation.

<font color="red">Note</font>
> if type `T` allows `null` or/and `undefined` the correspondent values will not be verified with any rule.

More details about restrictions are described in [Narrowing Types](./4-restrictions.md)

**Arguments**

|  Parameters  |                   Type                    |      Mandatory      | Description              |
| :----------: | :---------------------------------------: | :-----------------: | :----------------------- |
| **...rules** | `RuleFn<Exclude<T, null \| undefined>>[]` | _at least one rule_ | Rules to narrow the type |

**Returns**
 - **caster**: `Caster<T>`

### Method `.map`

 ```ts
 <D>(transform: TransformFn<T. D>) => Caster<D | Exclude<T, Exclude<T, null | undefined>>>;

 type TransformFn<T, D> = (value: Exclude<T, null | undefined>) => D;
 ```

Creates `caster` that addionally transforms casted value to other type keeping `null | undefined` context untouched.

The `.map` method is originally aimed to normalize casted value, as instance as shown in the example bellow, however it
can give much more 

**Example**

```ts
import { union, string, integer } from `ts-cast`;

const ID = union(
  string.map(value => value.toUpperCase()),
  integer.map(value => value.toString()),
);

ID('abc'); // returns "ABC"
ID('ABC'); // returns "ABC";
ID(123); // returns "123";

export type TID = ReturnType<typeof ID>; // ReturnType<Caster<string>> is string
```

**Arguments**

|   Parameter   |        Type         | Mandatory | Description                                                                         |
| :-----------: | :-----------------: | :-------: | :---------------------------------------------------------------------------------- |
| **transform** | `TransformFn<T, D>` |    yes    | The function transforms defined non-nullable value of type `T` to value of type `D` |


**Returns**
 - **caster**: `Caster<D | Exclude<T, Exclude<T, null | undefined>>>`

### Method `.validate`

```ts
(value: unknown, context?: string) => ValidationResult<T>

type ValidationResult<T> =
  | { ok: true; result: T; errors: [] } 
  | { ok: false; errors: NonEmptyArray<ErrorInContext> }

type ErrorInContext = { context: string | undefined, message: string }
```

Validates `value` of `unknown` type and returns a validation result object. The
method doesn't throw TypeErrors if `value` couldn't be casted to type `T` or doesn't
satisfy to restriction rules if available.

**Example**

```ts
import { integer, toBe, gt } from 'ts-cast';

const { validate } = integer.restrict(toBe(gt(0)));

validate(1);
// { ok: true, errors: [], result: 1 }

validate(0); 
/**
{ 
  ok: false, 
  errors: [{ message: 'expected value is greater then 0 but received 0.', context: undefined }]
}
*/

validate('123', 'myValue');
/**
{
  ok: false,
  errors: [{ message: 'integer is expected in myValue but "123" received.', context: 'myValue' }]
}
*/
```

**Arguments**

|  Parameter  |   Type    | Mandatory | Description                                                            |
| :---------: | :-------: | :-------: | :--------------------------------------------------------------------- |
|  **value**  | `unknown` |    yes    | The value to be validated                                              |
| **context** | `string`  |   _no_    | The string describes the validation context (aka field or object name) |

**Returns**
  - **validationResult**: `ValidationResult<T>`

### Method `.either`

```ts
<Left, Right>(
  leftFactory: (error: TypeError) => Left, 
  rightFactory: (value: T) => Right,
) => (value: unknown, context?: string | undefined) => Left | Right
```

Creates a function that accepts value of `unknown` type, optional string context
and returns result of type `Right` if casting was performed successfully and 
value of type `Left` otherwise.

To build result of `Left | Right` the function uses `leftFactory` and `rightFactory`
those are usaully data constructors of `MayBe` or `Either` monad subtypes as also as
`Left` and `Right` are usually are generic types.

**Example**

```ts
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { integer } from 'ts-cast';

const printIntOrErr = (value: unknown) => pipe(
  value,
  integer.either(E.left, E.right),
  E.map(x => x + 1),
  E.mapLeft(({ message }) => message),
  E.match(
    error => `Error: ${error}`,
    value => `Value: ${value}`
  ),
  console.log
);

printIntOrErr(10); // Value: 11
printIntOrErr(10.23); // Error: integer is expected but "10.23" received
```

**Arguments**

|    Parameter     |             Type             | Mandatory | Description                                                       |
| :--------------: | :--------------------------: | :-------: | :---------------------------------------------------------------- |
| **leftFactory**  | `(error: TypeError) => Left` |    yes    | factory to create value that represents casting failure           |
| **rightFactory** |    `(value: T) => Right`     |    yes    | factory to create value that represents successful casting result |

**Returns**
 - **casting function**: `(value: unknown, context?: string) => Left | Right`

### Method `.validation`

```ts
<Invalid, Valid>(
  invalidFactory: (errors: NonEmptyError<ErrorInContext>) => Invalid, 
  validFactory: (value: T) => Valid,
) => (value: unknown, context?: string) => Invalid | Valid;

type ErrorInContext = { context: string | undefined, message: string };
```

Creates a function that accepts value of `unknown` type, optional string context
and returns result of type `Valid` if casting was performed successfully and 
value of type `Invalid` otherwise.

To build result of `Invalid` type the returned function uses `invalidFactory` that
receives a non-empty array of `ErrorInContext`.

The `.validation` method is designed to be used with `Validation` monad.


**Arguments**

|     Parameter      |                         Type                         | Mandatory | Description                                                          |
| :----------------: | :--------------------------------------------------: | :-------: | :------------------------------------------------------------------- |
| **invalidFactory** | `(errors: NonEmptyError<ErrorInContext>) => Invlaid` |    yes    | factory to create value that represents validation errors            |
|  **rightFactory**  |                `(value: T) => Valid`                 |    yes    | factory to create value that represents successful validation result |

**Returns**
 - **casting function**: `(value: unknown, context?: string) => Invalid | Valid`

<a name="3-caster-api"></a>
## 3. casterApi&lt;T&gt; <sup>`fn`</sup>

<a name="4-create-caster"></a>
## 4. createCaster&lt;T&gt; <sup>`fn`</sup>


<a name="5-validate"></a>
## 5. validate&lt;T&gt; <sup>`fn`</sup>