import { createCaster } from '../engine';
import {
  Caster, CasterFn, ErrorReporter, TypeGuard,
} from '../engine/types';

const transformArray = <T>(caster: CasterFn<T>) => (
  value: any[],
  context?: string,
  reportError?: ErrorReporter,
) => value.map((item, index) =>
  caster(item, context ? `${context}[${index}]` : `#${index}`, reportError));

export const array = <T>(caster: CasterFn<T>, typeName: string = `${caster.name}[]`): Caster<T[]> =>
  createCaster(
    typeName,
    Array.isArray as TypeGuard<T[]>,
    transformArray(caster),
  );
