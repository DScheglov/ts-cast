import { withName } from '../helpers/names';
import {
  CasterFn, ValidationResult, ErrorMessage, NonEmptyArray,
} from './types';

const isNonEmpty = <T>(value: T[]): value is NonEmptyArray<T> => value.length > 0;

export const validate = <T>(casterFn: CasterFn<T>) =>
  (value: unknown, context?: string): ValidationResult<T> => {
    const errors: ErrorMessage[] = [];
    const reportError = (message: string, ctx?: string) => {
      errors.push({ message, context: ctx });
    };
    try {
      const result = casterFn(value, context, reportError as any);
      return isNonEmpty(errors) ? { ok: false, errors } : { ok: true, result, errors: [] };
    } catch (err) {
      return { errors: [{ message: err.message, context }], ok: false };
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
