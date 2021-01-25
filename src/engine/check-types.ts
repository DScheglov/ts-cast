import { CasterFn } from './types';

export type TypeCheckingResult<T> = {
  result?: T;
  errors: Array<{ context: string | undefined, message: string }>;
  ok: boolean;
}

export const checkTypes = <T>(casterFn: CasterFn<T>) =>
  (value: any, context?: string): TypeCheckingResult<T> => {
    const errors: Array<{ context: string | undefined, message: string }> = [];
    const reportError = (message: string, ctx?: string) => {
      errors.push({ message, context: ctx });
    };
    try {
      const result = casterFn(value, context, reportError);
      return errors.length === 0 ? { result, errors, ok: true } : { errors, ok: false };
    } catch (err) {
      errors.unshift({ message: err.message, context });
      return { errors, ok: false };
    }
  };
