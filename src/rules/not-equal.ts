import { withName } from '../helpers/names';
import { Predicate } from './types';

export const notEqual: {
  (pattern: number): Predicate<number>;
  (pattern: string): Predicate<string>;
  (pattern: boolean): Predicate<boolean>;
} = (pattern: number | string | boolean) => withName(
  (value: number | string | boolean) => value !== pattern,
  `not equal to ${pattern}`,
);

export const ne = notEqual;
