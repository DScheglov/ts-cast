import { createCaster } from '../engine';
import { isAnObj } from '../engine/guards';
import {
  Caster, StructSchema, TypeGuard, OptionalUndefined, ErrorReporter, StructCaster, CasterFn,
} from '../engine/types';
import optional from '../engine/optional';

type CasterRef<S> = { caster: CasterFn<S> };

const transformStruct = <S extends {}>(schema: StructSchema<S>, ref: CasterRef<S>) => {
  const fields = Object.entries(schema) as Array<[keyof S, Caster<any>]>;
  return (
    value: unknown,
    context?: string,
    reportError?: ErrorReporter,
  ): OptionalUndefined<S> =>
    fields.reduce(
      (target, [field, caster]) => Object.defineProperty(target, field, {
        enumerable: true,
        writable: true,
        configurable: true,
        value: caster(
          (value as any)[field],
          context ? `${context}.${field}` : `${field}`,
          reportError,
        ),
      }),
      Object.create(ref.caster.prototype) as S,
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
): StructCaster<OptionalUndefined<S>> => {
  const ref: { caster: CasterFn<S> } = {} as any;
  const caster = Object.defineProperties(
    createCaster(typeName, isAnObj as TypeGuard<S>, transformStruct(schema, ref)), {
      name: {
        value: typeName,
      },
      partial: {
        enumerable: true,
        get: () => struct(partial(schema), `Partial<${typeName}>`),
      },
    },
  );

  ref.caster = Object.defineProperty(caster, 'prototype', {
    enumerable: false,
    configurable: false,
    writable: true,
    value: {
      constructor: caster,
    },
  });

  return caster;
};
