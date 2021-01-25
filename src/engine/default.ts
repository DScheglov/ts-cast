import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter } from './types';

const defValue = <T>(casterFn: CasterFn<T>, defaultValue: T): CasterFn<Exclude<T, undefined>> => {
  const defaultCaster = (
    value: any,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ) => (
    casterFn(value !== undefined ? value : defaultValue, context, reportError)
  ) as any;

  Object.defineProperty(defaultCaster, 'name', { value: casterFn.name.replace(/\?$/, '') });

  return defaultCaster;
};

export default defValue;
