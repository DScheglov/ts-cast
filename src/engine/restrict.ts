import { isEmpty } from './guards';
import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter, RuleFn } from './types';

const applyRule = <T>(value: T, context?: string, reportError?: ErrorReporter) =>
  (rule: RuleFn<T>) => {
    const error = rule(value);
    if (!error) return;

    reportError!(
      `${context ? `${context} should be` : 'expected value is'} ${error} but received ${value}.`,
      context,
    );
  };

export const restrict = <T>(caster: CasterFn<T>, rules: RuleFn<T>[]) => {
  const validator = (
    value: unknown,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ): T => {
    const typedValue: T = caster(value, context, reportError);

    if (!isEmpty(typedValue)) rules.forEach(applyRule(typedValue, context, reportError));

    return typedValue;
  };

  Reflect.defineProperty(validator, 'name', { value: caster.name });

  return validator;
};
