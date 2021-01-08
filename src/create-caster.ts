import { isEmpty } from './guards';
import { validate } from './validate';
import { CasterFn, Caster, TypeGuard } from './types';

const id = <T>(value: T) => value;

const createCaster = <T>(
  typeName: string,
  typeGuard: TypeGuard<T>,
  transform: CasterFn<T> = id,
): Caster<T> => {
  const optional = (value: any, context?: string): T | undefined | null => {
    if (isEmpty(value)) return value;
    if (typeGuard(value)) return transform(value, context);

    throw TypeError(
      `${value}${context ? ` in ${context}` : ''} is not ${typeName}.`,
    );
  };

  const required = (value: any, context?: string): T => {
    if (isEmpty(value)) {
      throw new TypeError(
        `${typeName} is expecred but "${value}" received${
          context ? ` in ${context}` : ''
        }.`,
      );
    }
    if (typeGuard(value)) return transform(value, context);

    throw TypeError(`${value} is not ${typeName}.`);
  };

  optional.validate = validate(optional);
  required.validate = validate(required);
  required.optional = optional;
  required.required = required;

  Reflect.defineProperty(required.optional, 'name', { value: `${typeName}?` });
  Reflect.defineProperty(required, 'name', { value: typeName });

  return required;
};

export default createCaster;
