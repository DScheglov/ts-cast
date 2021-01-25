import createCaster from './engine/create-caster';
import { isAnObj } from './engine/guards';
import { throwTypeError } from './engine/throw-type-error';
import {
  Caster, StructSchema, TypeGuard, OptionalUndefined, ErrorReporter,
} from './engine/types';

const transformStruct = <S extends {}>(schema: StructSchema<S>) => {
  const fields = Object.entries(schema) as Array<[keyof S, Caster<any>]>;
  return (
    value: any,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ): OptionalUndefined<S> =>
    fields.reduce(
      (target, [field, caster]) => Object.defineProperty(target, field, {
        enumerable: true,
        value: caster(value[field], context ? `${context}.${field}` : `${field}`, reportError),
      }),
      Object.create(null) as S,
    );
};

export const struct = <S extends {}>(schema: StructSchema<S>, typeName: string = 'struct') =>
  createCaster(typeName, isAnObj as TypeGuard<S>, transformStruct(schema));
