import createCaster from './create-caster';
import { Caster, TypeGuard } from './types';

const transformArray = <T>(caster: Caster<T>) => (
  value: any[],
  context?: string,
) => {
  if (value.length === 0) {
    try {
      caster(undefined);
      return [];
    } catch (err) {
      throw new TypeError(
        `Expected${context ? ` ${context}` : ''} to have at least one item.`,
      );
    }
  }

  return value.map((item, index) =>
    caster(item, context ? `${context}[${index}]` : `${index}`));
};

export const array = <T>(caster: Caster<T>, typeName: string = 'array') =>
  createCaster(
    typeName,
    Array.isArray as TypeGuard<T[]>,
    transformArray(caster),
  );
