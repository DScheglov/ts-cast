# ts-cast &middot; Type Checking Engine API


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

> `Caster<T | undefined>`

The `.optional` property refers to `Caster` of **optional** type. Optional is considered as _could be undefined_.

**Example**

```ts
const optNumber = number.optional;

optNumber(10); // returns 10
optNumber(undefined); // returns undefined
optNumber(null); // throws a TypeError
```

### Property `.nullable`

> `Caster<T | null>`

The `.nullable` property refers to `Caster` of **nullable** type that means the correspondent caster accepts `null` as valid value.

**Example**

```ts
const nullableStr = string.nullable;

nullableStr('Hello World'); // returns "Hello World"
nullableStr(null); // returns null
nullableStr(undefined); // throws a TypeError
```

### Method `.default`

> `(value: T) => Caster<Exclude<T, undefined>>`

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

> `(...rules: RuleFn<Exclude<T, null | undefined>>[]) => Caster<T>`

Creates new `Caster` that cheks if casted value satisfies restrictions described with one ore more `RuleFn`.

The `RuleFn<T>` is a type of function that accepts: `value` of type `T`, optionally `context` of type `string`,
and returns `null` if `value` satisfies rule and `string` with error message that descibes rule violation.

<font color="red">Note</font>
> if type `T` allows `null` or/and `undefined` the correspondent values will not be verified with any rule.

More details avout restrictions are described in [Narrowing Types](./4-restrictions.md)

**Arguments**

| Parameters |                   Type                   |      Mandatory      | Description              |
| :--------: | :--------------------------------------: | :-----------------: | :----------------------- |
| **...rules** | `RuleFn<Exclude<T, null \| undefined>>[]` | _at least one rule_ | Rules to narrow the type |

**Returns**
 - **caster**: `Caster<T>`

### Method `.map`

 > `<D>(transform: (value: Exclude<T, null | undefined>) => D) => Caster<D | Exclude<T, Exclude<T, null | undefined>>>;`

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

<a name="3-caster-api"></a>
## 3. casterApi&lt;T&gt; <sup>`fn`</sup>

<a name="4-create-caster"></a>
## 4. createCaster&lt;T&gt; <sup>`fn`</sup>


<a name="5-validate"></a>
## 5. validate&lt;T&gt; <sup>`fn`</sup>