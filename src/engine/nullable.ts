import { withName } from '../helpers/names';
import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter } from './types';

export const nullable = <T>(caster: CasterFn<T>): CasterFn<T | null> => withName(
  (value: unknown, context?: string, reportError: ErrorReporter = throwTypeError) => (
    value !== null
      ? caster(value, context, reportError)
      : null
  ),
  `${caster.name} | null`,
);
