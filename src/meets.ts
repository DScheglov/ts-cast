import { isEmpty } from './guards';
import { Caster, RuleFn } from './types';

const applyRule = <T>(value: T, context?: string) => (rule: RuleFn<T>) => {
  const error = rule(value);
  if (error) {
    throw new TypeError(
      [JSON.stringify(value), context ? ` in ${context}` : '', ` ${error}`].join(''),
    );
  }
};

export const meets = <T>(caster: Caster<T>) =>
  (...rules: RuleFn<T>[]) =>
    (value: any, context?: string): T => {
      const typedValue: T = caster(value, context);

      if (!isEmpty(value)) rules.forEach(applyRule(typedValue, context));

      return typedValue;
    };
