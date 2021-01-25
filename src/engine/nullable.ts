import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter } from './types';

export const nullable = <T>(caster: CasterFn<T>): CasterFn<T | null> => {
  const nullableCaster = (
    value: any,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ) =>
    (value !== null
      ? caster(value, context, reportError)
      : null);

  Object.defineProperty(nullableCaster, 'name', { value: `${caster.name}|null` });

  return nullableCaster;
};
