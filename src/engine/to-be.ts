import { withName } from '../helpers/names';
import { Predicate } from '../rules';
import { throwTypeError } from './throw-type-error';
import { CasterFn, Guard } from './types';

export const toBe =
  <T, S extends T>(
    casterFn: CasterFn<T>,
    predicate: Predicate<T> | Guard<T, S>,
    typeName: string = `${casterFn.name}<${predicate.name}>`,
  ) =>
      withName(
        (value, context, reportError = throwTypeError) => {
          const typedValue = casterFn(value, context, reportError);
          if (!predicate(typedValue)) {
            reportError(`${typeName} expected${context ? ` in ${context}` : ''} but "${value}" received.`, context);
            return undefined as any as never;
          }

          return typedValue;
        },
        typeName,
      ) as CasterFn<T | S>;
