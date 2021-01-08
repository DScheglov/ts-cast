import { isEmpty } from './guards';
import { CasterFn, RuleFn } from './types';

const applyRule = <T>(value: T, context?: string) => (rule: RuleFn<T>) => {
  const error = rule(value);
  if (error) {
    throw new TypeError(
      `${JSON.stringify(value)}${context ? ` in ${context}` : ''}  ${error}`,
    );
  }
};

export const validate = <T>(caster: CasterFn<T>, typeName: string = caster.name) =>
  (...rules: RuleFn<T>[]) => {
    const meetsCaster = (value: any, context?: string): T => {
      const typedValue: T = caster(value, context);

      if (!isEmpty(value)) rules.forEach(applyRule(typedValue, context));

      return typedValue;
    };

    Reflect.defineProperty(meetsCaster, 'name', { value: typeName });

    return meetsCaster;
  };
