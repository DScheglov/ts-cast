import createCaster from './create-caster';
import { isAnObj } from './guards';
import { StructSchema, TypeGuard } from './types';

const transformStruct = <S extends {}>(schema: StructSchema<S>) => (
  value: any,
  context?: string,
): S =>
  Object.assign(
    Object.create(null), ...(Object.keys(schema) as Array<keyof S>).map(
      field => ({
        [field]: (schema[field] as any)(
          value[field],
          context ? `${context}.${field}` : field,
        ),
      }),
    ),
  );

export const struct = <S extends {}>(schema: StructSchema<S>, typeName: string = 'struct') =>
  createCaster(typeName, isAnObj as TypeGuard<S>, transformStruct(schema));
