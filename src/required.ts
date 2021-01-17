import { isEmpty } from './guards';
import { CasterFn, TypeGuard } from './types';

export const id = <T>(value: T): T => value;

const required = <T>(
  typeName: string, typeGuard: TypeGuard<T>, transform: CasterFn<T> = id,
): CasterFn<T> => {
  const casterFn = (value: any, context?: string): T => {
    if (!isEmpty(value) && typeGuard(value)) {
      return transform(value, context);
    }

    throw new TypeError(
      `${typeName} is expected${
        context ? ` in ${context}` : ''
      } but "${value}" received.`,
    );
  };

  Reflect.defineProperty(casterFn, 'name', { value: typeName });

  return casterFn;
};

export default required;
