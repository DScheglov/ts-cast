import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter } from './types';

const optional = <T>(caster: CasterFn<T>): CasterFn<T | undefined> => {
  const casterFn = (value: any, context?: string, reportError: ErrorReporter = throwTypeError) =>
    (value === undefined ? value : caster(value, context, reportError));

  Reflect.defineProperty(casterFn, 'name', { value: `${caster.name}?` });

  return casterFn;
};

export default optional;
