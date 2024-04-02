import { restrict } from './restrict';
import {
  CasterFn, Caster, TypeGuard, RuleFn, TypeChecker, ErrorMessage, Predicate, Guard,
} from './types';
import optional from './optional';
import required from './required';
import map from './map';
import defValue from './default';
import { nullable } from './nullable';
import either from './either';
import { validate, validation } from './validate';
import { memo } from '../helpers/memo0';
import { toBe } from './to-be';

export { is } from './is';

export {
  CasterFn, Caster, TypeGuard, TypeChecker,
};

export const casterApi = <T>(casterFn: CasterFn<T>): Caster<T> =>
  Object.defineProperties(casterFn as any, {
    ...Object.getOwnPropertyDescriptors(casterFn),

    optional: {
      enumerable: true,
      get: memo(() => casterApi(optional(casterFn))),
    },

    nullable: {
      enumerable: true,
      get: memo(() => casterApi(nullable(casterFn))),
    },

    restrict: {
      enumerable: true,
      value: (...rules: RuleFn<T>[]) => casterApi(restrict(casterFn, rules)),
    },

    map: {
      enumerable: true,
      value: <D>(transform: (value: T) => D) => casterApi(map(casterFn, transform)),
    },

    default: {
      enumerable: true,
      value: <D extends T>(def: D) => casterApi(defValue(casterFn, def)),
    },

    either: {
      enumerable: true,
      value: <Right, Left>(
        leftFactory: (error: TypeError) => Left,
        rightFactory:(value: T) => Right,
      ) => either(casterFn, leftFactory, rightFactory),
    },

    validation: {
      enumerable: true,
      value: <Valid, Invalid>(
        invalidFactory: (errors: ErrorMessage[]) => Invalid,
        validFactory: (value: T) => Valid,
      ) => validation(casterFn, invalidFactory, validFactory),
    },

    validate: {
      enumerable: true,
      get: memo(() => validate(casterFn)),
    },

    toBe: {
      enumerable: true,
      value:
        <S extends T>(
        predicate: Predicate<T> | Guard<T, S>,
        typeName?: string,
      ) => casterApi(toBe(casterFn, predicate, typeName)) as Caster<T | S>,
    },
  });

export const createCaster: {
  <T>(typeName: string, typeGuard: TypeGuard<T>, transform?: CasterFn<T>): Caster<T>
  <T>(typeName: string, typeGuard: TypeChecker, transform: CasterFn<T>): Caster<T>
} = <T>(
  typeName: string,
  typeGuard: TypeGuard<T> | TypeChecker,
  transform?: CasterFn<T>,
): Caster<T> => casterApi(required(typeName, typeGuard, transform));
