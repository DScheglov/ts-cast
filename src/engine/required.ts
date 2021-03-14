import { throwTypeError } from './throw-type-error';
import {
  CasterFn, ErrorReporter, TypeChecker, TypeGuard,
} from './types';

export const id = <T>(value: T): T => value;

const required = <T>(
  typeName: string, typeGuard: TypeGuard<T> | TypeChecker, transform: CasterFn<T> = id,
): CasterFn<T> => {
  const casterFn = (
    value: any,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ): T => {
    if (value !== undefined && typeGuard(value)) {
      return transform(value, context, reportError);
    }

    return reportError(
      `${typeName} is expected${
        context ? ` in ${context}` : ''
      } but "${value}" received.`,
      context,
    ) as any;
  };

  Reflect.defineProperty(casterFn, 'name', { value: typeName });

  return casterFn;
};

export default required;
