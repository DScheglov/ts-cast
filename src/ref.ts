import { Caster, CasterFn, ErrorReporter } from './engine/types';
import { casterApi } from './engine/create-caster';
import { throwTypeError } from './engine/throw-type-error';

export const ref = <T>(casterRef: () => CasterFn<T>, typeName: string = '<recursively-defined-type>'): Caster<T> => {
  let caster: CasterFn<T> = (
    value: any,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ): T => {
    caster = casterRef();
    return caster(value, context, reportError);
  };

  const referredCaster = (
    value: any,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ): T => caster(value, context, reportError);

  Object.defineProperty(referredCaster, 'name', { get: () => caster.name ?? typeName });

  return casterApi(referredCaster);
};
