import { throwTypeError } from './throw-type-error';
import { CasterFn } from './types';

export const is = <T>(casterFn: CasterFn<T>) => (value: unknown): value is T => {
  try {
    casterFn(value, undefined, throwTypeError);
    return true;
  } catch (err) {
    return false;
  }
};
