import createCaster from './create-caster';
import { isAnObj } from './guards';
import { Caster, StructSchema, TypeGuard } from './types';

const transformStruct = <S extends {}>(schema: StructSchema<S>) => {
  const fields = Object.entries(schema) as Array<[keyof S, Caster<any>]>;
  return (value: any, context?: string): S =>
    fields.reduce(
      (target, [field, caster]) => Object.defineProperty(target, field, {
        enumerable: true,
        value: caster(value[field], context ? `${context}.${field}` : `${field}`),
      }),
      Object.create(null) as S,
    );
};

export const struct = <S extends {}>(schema: StructSchema<S>, typeName: string = 'struct') =>
  createCaster(typeName, isAnObj as TypeGuard<S>, transformStruct(schema));
