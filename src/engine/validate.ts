import { withName } from '../helpers/names';
import {
  CasterFn, ValidationResult, ErrorMessage, NonEmptyArray, ValidationSuccess, ValidationFailure,
} from './types';

const isNonEmpty = <T>(value: T[]): value is NonEmptyArray<T> => value.length > 0;

const success = <T>(result: T): ValidationSuccess<T> =>
  ({ ok: true, result, errors: [] });
const failure = (errors: NonEmptyArray<ErrorMessage>): ValidationFailure =>
  ({ ok: false, result: undefined, errors });

export const validate = <T>(casterFn: CasterFn<T>) =>
  (value: unknown, context?: string): ValidationResult<T> => {
    const errors: ErrorMessage[] = [];
    const reportError = (message: string, ctx?: string) => {
      errors.push({ message, context: ctx });
    };
    try {
      const result = casterFn(value, context, reportError as any);
      return isNonEmpty(errors) ? failure(errors) : success(result);
    } catch (err) {
      return failure([{ message: err.message, context }]);
    }
  };

export const validation = <T, Valid, Invalid>(
  casterFn: CasterFn<T>,
  invalidFactory: (errors: NonEmptyArray<ErrorMessage>) => Invalid,
  validFactory: (value: T) => Valid,
) => {
  const validator = validate(casterFn);
  return withName(
    (value: unknown, context?: string) => {
      const vResult = validator(value, context);
      return vResult.ok ? validFactory(vResult.result) : invalidFactory(vResult.errors);
    },
    `validation<*, ${casterFn}>`,
  );
};
