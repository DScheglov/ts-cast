import { withName } from '../helpers/names';
import { Predicate } from './types';

export const greaterThen: {
  (limit: number): Predicate<number>;
  (limit: string): Predicate<string>;
} = (limit: number | string) => withName(
  (value: number | string): boolean => value > limit,
  `greater then ${limit}`,
);

export const gt = greaterThen;

export const notLessThen: {
  (limit: number): Predicate<number>;
  (limit: string): Predicate<string>;
} = (limit: number | string) => withName(
  (value: number | string): boolean => value >= limit,
  `not less then ${limit}`,
);

export const gte = notLessThen;
