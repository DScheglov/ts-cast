import { predicateName } from './predicate';
import { Predicate } from './types';

export const toBe = <T>(
  predicate: Predicate<T>,
  errorMessage: string = predicateName(predicate),
) => (value: T) => (predicate(value) ? null : errorMessage);

export const notToBe = <T>(
  predicate: Predicate<T>,
  errorMessage: string = predicateName(predicate),
) => (value: T) => (predicate(value) ? `not ${errorMessage}` : null);
