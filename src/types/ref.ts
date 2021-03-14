import { Caster, CasterFn, ErrorReporter } from '../engine/types';
import { casterApi } from '../engine';
import { throwTypeError } from '../engine/throw-type-error';

export const ref = <T>(
  casterRef: () => CasterFn<T>,
  typeName: string = '<type-reference>',
): Caster<T> => {
  let caster: CasterFn<T> = (
    value: any,
    context?: string,
    reportError?: ErrorReporter,
  ): T => {
    caster = casterRef();
    return caster(value, context, reportError);
  };

  const referredCaster = (
    value: any,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ): T => caster(value, context, reportError);

  Object.defineProperty(referredCaster, 'name', { value: typeName });

  return casterApi(referredCaster);
};
