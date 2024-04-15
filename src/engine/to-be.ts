import { withName } from '../helpers/names';
import { Predicate } from '../rules';
import { throwTypeError } from './throw-type-error';
import { CasterFn, Guard } from './types';

const spy = <Args extends any[], R>(fn: (...args: Args) => R) => {
  let isCalled: boolean = false;
  const result = (...args: Args) => {
    isCalled = true;
    return fn(...args);
  };

  Object.defineProperty(result, 'isCalled', {
    get: () => isCalled,
  });

  return result as {
    (...args: Args): R;
    isCalled: boolean;
  };
};

export const toBe =
  <T, S extends T>(
    casterFn: CasterFn<T>,
    predicate: Predicate<T> | Guard<T, S>,
    typeName: string = `${casterFn.name}<${predicate.name}>`,
  ) =>
      withName(
        (value, context, reportError = throwTypeError) => {
          const spyReportError = spy(reportError);
          const typedValue = casterFn(value, context, spyReportError);

          if (spyReportError.isCalled) return typedValue;

          if (!predicate(typedValue)) {
            reportError(`${typeName} expected${context ? ` in ${context}` : ''} but "${value}" received.`, context);
            return undefined as any as never;
          }

          return typedValue;
        },
        typeName,
      ) as CasterFn<T | S>;
