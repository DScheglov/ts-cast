import { withName } from '../helpers/names';
import { throwTypeError } from './throw-type-error';
import {
  CasterFn, ErrorReporter, TypeChecker, TypeGuard,
} from './types';

const required = <T>(
  typeName: string, typeGuard: TypeGuard<T> | TypeChecker, transform?: CasterFn<T>,
): CasterFn<T> => withName(
    (value: unknown, context?: string, reportError: ErrorReporter = throwTypeError): T => {
      if (value === undefined || !typeGuard(value)) {
        return reportError(
          `${typeName} is expected${context ? ` in ${context}` : ''} but "${value}" received.`,
          context,
        ) as any;
      }

      return (
        typeof transform === 'function'
          ? transform(value, context, reportError)
          : value
      );
    },
    typeName,
  );

export default required;
