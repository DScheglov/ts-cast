import { isEmpty } from './guards';
import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter, TypeGuard } from './types';

export const id = <T>(value: T): T => value;

const required = <T>(
  typeName: string, typeGuard: TypeGuard<T>, transform: CasterFn<T> = id,
): CasterFn<T> => {
  const casterFn = (
    value: any,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ): T => {
    if (!isEmpty(value) && typeGuard(value)) {
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
