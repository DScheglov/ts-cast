import { isEmpty } from './guards';
import { meets } from './meets';
import { Caster, CasterObj, TypeGuard } from './types';

const id = <T>(value: T) => value;

const createCaster = <T>(
  typeName: string,
  typeGuard: TypeGuard<T>,
  transform: Caster<T> = id,
): CasterObj<T> => {
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

  optional.meets = meets(optional);
  required.meets = meets(required);
  required.optional = optional;
  required.required = required;

  return required;
};

export default createCaster;
