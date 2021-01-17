import { isEmpty } from './guards';
import { CasterFn, RuleFn } from './types';

const applyRule = <T>(value: T, context?: string) => (rule: RuleFn<T>) => {
  const error = rule(value);
  if (!error) return;

  throw new TypeError(
    `${context ? `${context} should be` : 'expected value is'} ${error} but received ${value}.`,
  );
};

export const validate = <T>(caster: CasterFn<T>, rules: RuleFn<T>[]) => {
  const validator = (value: any, context?: string): T => {
    const typedValue: T = caster(value, context);

    if (!isEmpty(value)) rules.forEach(applyRule(typedValue, context));

    return typedValue;
  };

  Reflect.defineProperty(validator, 'name', { value: caster.name });

  return validator;
};
