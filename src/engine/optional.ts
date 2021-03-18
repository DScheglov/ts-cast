import { withName } from '../helpers/names';
import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter } from './types';

const optional = <T>(caster: CasterFn<T>): CasterFn<T | undefined> =>
  withName(
    (value: unknown, context?: string, reportError: ErrorReporter = throwTypeError) => (
      value !== undefined
        ? caster(value, context, reportError)
        : value
    ),
    `${caster.name} | undefined`,
  );

export default optional;
