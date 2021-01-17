import { validate } from './validate';
import {
  CasterFn, Caster, TypeGuard, RuleFn,
} from './types';
import optional from './optional';
import required from './required';
import map from './map';
import defValue from './default';
import { nullable } from './nullable';

const createCasterObj = <T>(casterFn: CasterFn<T>): Caster<T> =>
  Object.defineProperties(casterFn, {
    name: {
      value: casterFn.name,
    },
    optional: {
      enumerable: true,
      get: () => createCasterObj(optional(casterFn)),
    },
    nullable: {
      enumerable: true,
      get: () => createCasterObj(nullable(casterFn)),
    },
    validate: {
      enumerable: true,
      value: (...rules: RuleFn<T>[]) => createCasterObj(validate(casterFn, rules)),
    },
    map: {
      enumerable: true,
      value: <D>(transform: (value: T) => D) => createCasterObj(map(casterFn, transform)),
    },
    default: {
      enumerable: true,
      value: <D extends T>(def: D) => createCasterObj(defValue(casterFn, def)),
    },
  });

const createCaster = <T>(
  typeName: string,
  typeGuard: TypeGuard<T>,
  transform?: CasterFn<T>,
): Caster<T> => createCasterObj(required(typeName, typeGuard, transform));

export default createCaster;
