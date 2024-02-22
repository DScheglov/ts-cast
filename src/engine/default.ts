import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter } from './types';

const defValue = <T>(casterFn: CasterFn<T>, defaultValue: T): CasterFn<Exclude<T, undefined>> => {
  const defaultCaster = (
    value: unknown,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ) => (
    value !== undefined ? casterFn(value, context, reportError) : defaultValue
  ) as any;

  Object.defineProperty(defaultCaster, 'name', { value: casterFn.name.replace(/\?$/, '') });

  return defaultCaster;
};

export default defValue;
