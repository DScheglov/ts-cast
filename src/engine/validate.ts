import { withName } from '../helpers/names';
import { CasterFn } from './types';

export type ErrorMessage = {
  context: string | undefined,
  message: string,
};

export type ValidationResult<T> = {
  result?: T;
  errors: ErrorMessage[];
  ok: boolean;
}

export const validate = <T>(casterFn: CasterFn<T>) =>
  (value: any, context?: string): ValidationResult<T> => {
    const errors: ErrorMessage[] = [];
    const reportError = (message: string, ctx?: string) => {
      errors.push({ message, context: ctx });
    };
    try {
      const result = casterFn(value, context, reportError as any);
      return errors.length === 0 ? { result, errors, ok: true } : { errors, ok: false };
    } catch (err) {
      return { errors: [{ message: err.message, context }], ok: false };
    }
  };

export const validation = <T, Valid, Invalid>(
  casterFn: CasterFn<T>,
  invalidFactory: (errors: ErrorMessage[]) => Invalid,
  validFactory: (value: T) => Valid,
) => {
  const validator = validate(casterFn);
  return withName(
    (value: any, context?: string) => {
      const { ok, errors, result } = validator(value, context);
      return ok ? validFactory(result!) : invalidFactory(errors);
    },
    `validation<*, ${casterFn}>`,
  );
};
