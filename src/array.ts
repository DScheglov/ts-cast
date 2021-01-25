import createCaster from './engine/create-caster';
import { throwTypeError } from './engine/throw-type-error';
import {
  Caster, CasterFn, ErrorReporter, TypeGuard,
} from './engine/types';

const transformArray = <T>(caster: CasterFn<T>) => (
  value: any[],
  context?: string,
  reportError: ErrorReporter = throwTypeError,
) => {
  if (value.length > 0) {
    return value.map((item, index) =>
      caster(item, context ? `${context}[${index}]` : `#${index}`));
  }

  try {
    caster(undefined);
    return [];
  } catch (err) {
    return reportError(
      `Expected${context ? ` ${context}` : ''} to have at least one item.`,
    );
  }
};

export const array = <T>(caster: CasterFn<T>, typeName: string = `${caster.name}[]`): Caster<T[]> =>
  createCaster(
    typeName,
    Array.isArray as TypeGuard<T[]>,
    transformArray(caster),
  );
