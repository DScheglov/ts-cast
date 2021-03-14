import { createCaster } from '../engine';
import { isAnObj } from '../engine/guards';
import {
  Caster, StructSchema, TypeGuard, OptionalUndefined, ErrorReporter, StructCaster,
} from '../engine/types';
import optional from '../engine/optional';

const transformStruct = <S extends {}>(schema: StructSchema<S>) => {
  const fields = Object.entries(schema) as Array<[keyof S, Caster<any>]>;
  return (
    value: any,
    context?: string,
    reportError?: ErrorReporter,
  ): OptionalUndefined<S> =>
    fields.reduce(
      (target, [field, caster]) => Object.defineProperty(target, field, {
        enumerable: true,
        value: caster(value[field], context ? `${context}.${field}` : `${field}`, reportError),
      }),
      Object.create(null) as S,
    );
};

const partial = <S extends {}>(schema: StructSchema<S>) =>
  (Object.keys(schema) as Array<keyof S>).reduce(
    (newSchema, field) => {
      newSchema[field] = optional(schema[field]);
      return newSchema;
    },
    Object.create(null) as StructSchema<Partial<S>>,
  );

export const struct = <S extends {}>(
  schema: StructSchema<S>,
  typeName: string = 'struct',
): StructCaster<S> =>
    Object.defineProperties(
      createCaster(typeName, isAnObj as TypeGuard<S>, transformStruct(schema)), {
        partial: {
          get: () => struct(partial(schema), `Partial<${typeName}>`),
        },
      },
    );
