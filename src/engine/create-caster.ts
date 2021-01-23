import { validate } from './validate';
import {
  CasterFn, Caster, TypeGuard, RuleFn,
} from './types';
import optional from './optional';
import required from './required';
import map from './map';
import defValue from './default';
import { nullable } from './nullable';

export const casterApi = <T>(casterFn: CasterFn<T>): Caster<T> =>
  Object.defineProperties(casterFn, {
    name: Object.getOwnPropertyDescriptor(casterFn, 'name')!,
    optional: {
      enumerable: true,
      get: () => casterApi(optional(casterFn)),
    },
    nullable: {
      enumerable: true,
      get: () => casterApi(nullable(casterFn)),
    },
    validate: {
      enumerable: true,
      value: (...rules: RuleFn<T>[]) => casterApi(validate(casterFn, rules)),
    },
    map: {
      enumerable: true,
      value: <D>(transform: (value: T) => D) => casterApi(map(casterFn, transform)),
    },
    default: {
      enumerable: true,
      value: <D extends T>(def: D) => casterApi(defValue(casterFn, def)),
    },
  });

const createCaster = <T>(
  typeName: string,
  typeGuard: TypeGuard<T>,
  transform?: CasterFn<T>,
): Caster<T> => casterApi(required(typeName, typeGuard, transform));

export default createCaster;
