# ts-cast &middot; API Specification

Runtime type checking for Typescript and JavaScript projects.

## Refernce

1. [Type Checking Engine](./1-engine.md)
   1. [CasterFn&lt;T&gt; <sup>`type`</sup>](./1-engine.md#1-caster-fn)
   2. [Caster&lt;T&gt; <sup>type</sup>](./1-engine.md#2-caster)
   3. [casterApi&lt;T&gt; <sup>`fn`</sup>](./1-engine.md#3-caster-api)
   4. [createCaster&lt;T&gt; <sup>fn</sup>](./1-engine.md#4-create-cater)
   5. [validate <sup>fn</sup>](./1-engine.md#5-validate)

2. [Primitive Type Casters](./2-types.md#1-primitives)
   1. [boolean](./2-types.md$1-1-boolean)
   2. [integer](./2-types.md$1-2-integer)
   3. [number](./2-types.md$1-3-number)
   4. [string](./2-types.md$1-4-string)
   5. [text.integer](./2-types.md$1-5-text.integer)
   6. [text.number](./2-types.md$1-6-text.number)

3. [Literal Types Casters](./2-types.md#2-literals)
   1. [value](./2-types.md#2-1-value)
   2. [values](./2-types.md#2-2-values)

4. [Special Types Casters](./2-types.md#3-special)
   1. [any](./2-types.md#3-1-any)
   2. [nil](./2-types.md#3-2-nil)
   3. [undef](./2-types.md#3-3-undef)

5. [Complex Type Casters](./2-types.md#4-complex)
   1. [array](./2-types.md#4-1-array)
   2. [record](./2-types.md#4-2-record)
   3. [struct](./2-types.md#4-3-struct)
   4. [tuple](./2-types.md#4-4-tuple)

6. [Recursive Type Casters](./2-types.md)

7. [Type Composition](./3-operations.md)
   1. [prod <sup>fn</sup>](./3-operations.md#1-prod)
   2. [union <sup>fn</sup>](./3-operations.md#2-union)

8. [Narrowing Types](./4-restrictions.md#1-rules)
   1. [Predicate&lt;T&gt; <sup>type</sup>](./4-restrictions.md#1-1-predicate)
   2. [RuleFn&lt;T&gt; <sup>type</sup>](./4-restrictions.md#1-2-rulefn)
   3. [toBe <sup>fn</sup>](./4-restrictions.md#1-3-tobe)
   4. [notToBe <sup>fn</sup>](./4-restrictions.md#1-4-nottobe)
   5. [and <sup>fn</sup>](./4-restrictions.md#1-5-and)
   6. [or <sup>fn</sup>](./4-restrictions.md#1-6-or)
   7. [not <sup>fn</sup>](./4-restrictions.md#1-7-not)

9. [Predicates](./4-restrictions.md#2-predicates)
   1.  [greaterThen (gt)](./4-restrictions.md#2-1-gt)
   2.  [lessThen (lt)](./4-restrictions.md#2-2-lt)
   3.  [notGreaterThen (gte)](./4-restrictions.md#2-3-gte)
   4.  [notLessThen (lte)](./4-restrictions.md#2-4-lte)
   5.  [nonEmpty](./4-restrictions.md#2-5-notempty)
   6.  [longerThen (length.gt)](./4-restrictions.md#2-6-length-gt)
   7.  [shorterThen (length.lt)](./4-restrictions.md#2-7-length-lt)
   8.  [notLongerThen (length.lte)](./4-restrictions.md#2-8-length-lte)
   9.  [notShorterThen (length.gte)](./4-restrictions.md#2-9-length-gte)
   10. [matching](./4-restrictions.md#2-10-matching)
   11. [notEqual (ne)](./4-restrictions.md#2-11-ne)

10. [Type Guards](./6-type-guards.md)

## How To
   1. [Create Custom Types](./custom-types.md)
   2. [Cast to Either&lt;\*, T&gt; and Validation&lt;\*, T&gt;](./monadic-caster.md)